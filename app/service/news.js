'use strict';

const Service = require('egg').Service;

class NewsService extends Service {

  async listNews({ offset = 0, limit = 10, language = 0 }){
    let resultObj = await this.ctx.model.News.listNews({offset,limit,language});
    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.newsPath + element.thumb, "thumb_300_300");
    });
    return resultObj;
  }

  async getTopNews({ limit = 10, language = 0 }){
    let resultObj =  await this.ctx.model.News.getTopNews({limit,language});
    const helper = this.ctx.helper;
    resultObj.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.newsPath + element.thumb, "thumb_300_300");
    });
    return resultObj;
  }

  async createNews(news){
    return await this.ctx.model.News.createNews(news);
  }

  async delNewsById(id){
    return await this.ctx.model.News.delNewsById(id);
  }

  async updateNews({id,updates}){
    return await this.ctx.model.News.updateNews({id,updates});
  }

  async getNewsById(id){
    const helper = this.ctx.helper;
    let resultObj = await this.ctx.model.News.getNewsById(id);
    resultObj.thumb = helper.signatureUrl(helper.newsPath + resultObj.thumb);
    return resultObj;
  }
}

module.exports = NewsService;
