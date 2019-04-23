'use strict';

const Service = require('egg').Service;

class JudgeService extends Service {

  async listJudges({ offset = 0, limit = 10, language = 0 }){
      let resultObj = await this.ctx.model.Judge.listJudges({ offset, limit, language });
      const helper = this.ctx.helper;
      resultObj.rows.forEach((element, index)=>{
        element.headicon = helper.signatureUrl(helper.judgesPath + element.headicon, "thumb_300_300");
      });
      return resultObj;
  }

  async createJudge(judge){
    return await this.ctx.model.Judge.createJudge(judge);
  }

  async updateJudge({id,updates}){
    return await this.ctx.model.Judge.updateJudge({id,updates});
  }

  async updateBindJudge({id,updates}){
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.Judge.updateBindJudge(id, updates.judge, transaction);

      let deleteJudges = updates.deleteJudges;
      let addJudges = updates.addJudges;
      
    } catch (e) {
      await transaction.rollback();
    }
  }

  async delJudgeById(id){
    return await this.ctx.model.Judge.delJudgeById(id);
  }

  async getJudgeById(id){
    const helper = this.ctx.helper;
    let resultObj = await this.ctx.model.Judge.getJudgeById(id);
    resultObj.headicon = helper.signatureUrl(helper.judgesPath + resultObj.headicon);
    return resultObj;
  }
}

module.exports = JudgeService;
