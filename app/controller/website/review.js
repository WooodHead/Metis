const BaseController = require('../BaseController');

class ReviewController extends BaseController{

  async create(){
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      await ctx.service.review.createReview(data);
      super.success(ctx.__('createdSuccess'));
    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update(){
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      productionId: ctx.request.body.productionId,
      userId: ctx.request.body.userId,
      round: ctx.request.body.round,
    };

    try{
      await ctx.service.review.updateReview({ id, updates });
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async destroy(){
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.review.deleteReview(id);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async createReviews(){
    const ctx = this.ctx;
    const data = {
      userId: ctx.helper.parseInt(ctx.query.userId),
      productIds: ctx.query.productIds,
      round: ctx.helper.parseInt(ctx.query.round),
    };


  }

  async bindProductAndRound(){
    const ctx = this.ctx;
    const data = {
      productId: ctx.helper.parseInt(ctx.query.productId),
      round: ctx.helper.parseInt(ctx.query.round),
    };
  }

  async getReviewListByProductionId(){

  }

  async getReviewListByJudgeId(){
    const ctx = this.ctx;
    let query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.review.getReviewDataByJudgeUserIdAndRound(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateReviewScore(){

  }

  async getScoreByProductId(){

  }
}

module.exports = ReviewController;
