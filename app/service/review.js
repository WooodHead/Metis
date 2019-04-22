'use strict';

const Service = require('egg').Service;

class ReviewService extends Service {

  async createReview(review){
    return await this.ctx.model.Review.createReview(review);
  }

  async updateReview(){
    return await this.ctx.model.Review.createReview({ id, updates });
  }

  async deleteReview(){
    return await this.ctx.model.Review.deleteReview(id);
  }

}

module.exports = ReviewService;
