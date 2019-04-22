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
}

module.exports = RoundJudgeService;
