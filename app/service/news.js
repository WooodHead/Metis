'use strict';

const Service = require('egg').Service;

class NewsService extends Service {

  async listNews({ offset = 0, limit = 10, language = 0 }){
    let resultObj = await this.ctx.mode.News.listNews({offset,limit,language});
    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.newsPath + element.thumb, "thumb_300_300");
    });
    return resultObj;
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
    const helper = this.ctx.helper;
    let resultObj = await this.ctx.mode.News.getNewsById(id);
    resultObj.thumb = helper.signatureUrl(helper.newsPath + resultObj.thumb);
    return resultObj;
  }
}

module.exports = NewsService;
