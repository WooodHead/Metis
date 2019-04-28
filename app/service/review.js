'use strict';

const Service = require('egg').Service;

class ReviewService extends Service {

  async createReview(review){
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
      return true
    } catch (e) {
      await transaction.rollback();
      this.ctx.logger.error(e.message);
      return false
    }
  }

  async updateReview(){
    return await this.ctx.model.Review.createReview({ id, updates });
  }

  async deleteReview(){
    return await this.ctx.model.Review.deleteReview(id);
  }

  async getReviewDataByJudgeUserIdAndRound(query){

    let judge = this.ctx.model.Judge.getJudgeByEmail(ctx.user.email);
    let result;
    if (judge){
      result = await this.ctx.model.Review.getReviewDataByJudgeUserIdAndRound(
        {
          offset:query.offset,
          limit:query.limit,
          judgeUserId:judge.judgeUserId,
          currentRound:judge.currentRound
        }
      );
    }
    return result;
  }
}

module.exports = ReviewService;
