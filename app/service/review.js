'use strict';

const Service = require('egg').Service;

class ReviewService extends Service {

  async createReview(review){
    let result = {};
    let production = await this.ctx.model.Production.getDetailById(review.productionId);
    if(production && production.status == 3){
      let reviews = await this.ctx.model.Review.getDataByRoundAndProductionId(review.round,review.productionId);

      if(reviews.length > 0){
        result.success = false;
        result.message = "不能重复设置";
      }
      else{
        let transaction;
        try {
          transaction = await this.ctx.model.transaction();
          let roundJudge = await this.ctx.model.RoundJudge.getRoundJudgeById(review.round);
          await this.ctx.model.Production.updateRound(review.productionId, review.round, transaction);
          if(roundJudge){
            let judges = roundJudge.judge.split(',');
            for (let judgeId of judges){
              review.userId = judgeId;
              await this.ctx.model.Review.createReview(review, transaction);
            }
          }

          await transaction.commit();
          result.success = true;
        } catch (e) {
          await transaction.rollback();
          this.ctx.logger.error(e.message);
          result.success = false;
          result.message = e.message;
        }
      }
    }
    else{
      result.success = false;
      result.message = "审核未通过，或者处于已提交状态";
    }
    return result;
  }

  async updateReview(){
    return await this.ctx.model.Review.createReview({ id, updates });
  }

  async deleteReview(){
    return await this.ctx.model.Review.deleteReview(id);
  }

  async getReviewDataByJudgeUserIdAndRound(query){

    let judge = await this.ctx.model.Judge.getJudgeByEmail(this.ctx.user.email);
    let result;
    if (judge){
      result = await this.ctx.model.Review.getReviewDataByJudgeUserIdAndRound(
        {
          offset:query.offset,
          limit:query.limit,
          judgeUserId:judge.Id,
          round:judge.currentRound,
          scoreSign:query.scoreSign,
        }
      );

      const helper = this.ctx.helper;

      result.rows.forEach((element, index)=>{
        let pImageArray = element.production.pImage.split(',');
        if (pImageArray[0]){
          element.production.pImage = helper.signatureUrl(helper.productPath + pImageArray[0], "thumb-594-840");
        }
      });

    }
    return result;
  }

  async updateReviewScore({ id, updates }){
    return await this.ctx.model.Review.updateReviewScore({ id, updates });
  }
}

module.exports = ReviewService;
