'use strict';

const Service = require('egg').Service;

class RoundJudgeService extends Service {

  async list({ offset = 0, limit = 10}){
    return await this.ctx.model.RoundJudge.list({offset,limit});
  }

  async createRoundJudge(roundJudge){
    return await this.ctx.model.RoundJudge.createRoundJudge(roundJudge);
  }

  async updateRoundJudge({ id, updates }){
    return await this.ctx.model.RoundJudge.updateRoundJudge({ id, updates });
  }

  async deleteRoundJudge(id){
    return await this.ctx.model.RoundJudge.deleteRoundJudge(id);
  }

  async getRoundJudgeById(id){
      return await this.ctx.model.RoundJudge.getRoundJudgeById(id);
  }

  async updateBindJudge({id,updates}){
    let productionList = await this.ctx.model.Review.getProductionIdByRound(id);
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.RoundJudge.updateBindJudge(id, updates.judge, transaction);

      if (updates.deleteJudges != ''){
        let deleteJudges = updates.deleteJudges;
        let deleteJudgesArray = deleteJudges.split(',');
        if (deleteJudgesArray.length > 0){
          for (let judgeId of deleteJudgesArray){
            await this.ctx.model.Review.deleteByRoundIdAndJudgeId(id,judgeId,transaction);
          }
        }
      }
      
      if (updates.addJudges != ''){
        let addJudges = updates.addJudges;
        let judgeIds = addJudges.split(',');
        if(judgeIds.length > 0 && productionList.length > 0){
          for (let element of productionList){
            let productionId = element.productionId;
            for (let judgeId of judgeIds){
              let review = {
                productionId:productionId,
                userId:judgeId,
                round:id,
              };
              await this.ctx.model.Review.createReview(review,transaction);
            }
          }
        }
      }

      await transaction.commit();
      return true
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      this.ctx.logger.error(e.message);
      return false
    }
  }
}

module.exports = RoundJudgeService;
