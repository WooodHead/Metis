'use strict';

const Service = require('egg').Service;

class NewsService extends Service {

  async listNews({ offset = 0, limit = 10, language = 0 }){
    return await this.ctx.mode.News.listNews({offset,limit,language});
  }

  async getTopNews({ limit = 10, language = 0 }){
    return await this.ctx.mode.News.getTopNews({limit,language});
  }

  async createNews(news){
    return await this.ctx.mode.News.createNews(news);
  }

  async delNewsById(id){
    return await this.ctx.mode.News.delNewsById(id);
  }

  async updateNews({id,updates}){
    return await this.ctx.mode.News.updateNews({id,updates});
  }

  async getNewsById(id){
    return await this.ctx.mode.News.getNewsById(id);
  }
}

module.exports = NewsService;
