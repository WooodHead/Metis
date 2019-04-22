'use strict';

const Service = require('egg').Service;

class JudgeService extends Service {

  async listJudges({ offset = 0, limit = 10, language = 0 }){
      return await this.ctx.model.Judge.listJudges({ offset = 0, limit = 10, language = 0 });
  }

  async createJudge(judge){
    return await this.ctx.model.Judge.createJudge(judge);
  }

  async updateJudge({id,updates}){
    return await this.ctx.model.Judge.updateJudge({id,updates});
  }

  async delJudgeById(id){
    return await this.ctx.model.Judge.delJudgeById(id);
  }

  async getJudgeById(id){
    return await this.ctx.model.Judge.getJudgeById(id);
  }
}

module.exports = JudgeService;
