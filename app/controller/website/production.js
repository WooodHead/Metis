const BaseController = require('../BaseController');

class ProductionController extends BaseController{
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      groupNum: ctx.helper.parseInt(ctx.query.groupNum),
      subGroupNum: ctx.helper.parseInt(ctx.query.subGroupNum),
      status: ctx.helper.parseInt(ctx.query.status),
    };

    try{
      const result = await ctx.service.production.listProduction(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.production.getDetailById(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      await ctx.service.production.createProduction(data);
      super.success(ctx.__('createdSuccess'));

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      userId: ctx.request.body.userId,
      title: ctx.request.body.title,
      title_en: ctx.request.body.title_en,
      pImage: ctx.request.body.pImage,
      content: ctx.request.body.content,
      content_en: ctx.request.body.content_en,
      status: ctx.request.body.status,
      participant_type: ctx.request.body.participant_type,
      participant_name: ctx.request.body.participant_name,
      participant_id_number: ctx.request.body.participant_id_number,
      participant_brief: ctx.request.body.participant_brief,
      adviser: ctx.request.body.adviser,
      team_member: ctx.request.body.team_member,
      affiliatedUnit: ctx.request.body.affiliatedUnit,
      attach_file: ctx.request.body.attach_file,
      groupNum: ctx.request.body.groupNum,
      subGroupNum: ctx.request.body.subGroupNum,
    };

    try{
      await ctx.service.production.updateProduction({ id, updates });
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.production.delProductionById(id);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateScore() {
    const ctx = this.ctx;
    const Id = ctx.helper.parseInt(ctx.params.id);
    const averageScore = ctx.query.averageScore;
    const round = ctx.helper.parseInt(ctx.query.round);
    try{
      await ctx.service.production.updateScore({Id,averageScore,round});
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateStatus() {
    const ctx = this.ctx;
    const Id = ctx.helper.parseInt(ctx.params.id);
    const status = ctx.helper.parseInt(ctx.query.status);
    try{
      await ctx.service.production.updateStatus(Id, status);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = ProductionController;
