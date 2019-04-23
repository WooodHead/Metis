'use strict';

const Service = require('egg').Service;

class ProductionService extends Service {

  async createProduction(production){
    return this.ctx.model.Production.createProduction(production);
  }

  async updateProduction({id,updates}){
    return this.ctx.model.Production.updateProduction({id,updates});
  }

  async delProductionById(){
    return this.ctx.model.Production.delProductionById(id);
  }

  async listProduction({offset = 0, limit = 10, groupNum = 0, subGroupNum = 0, status = 0}){
    let resultObj =  this.ctx.model.Production.listProduction({offset, limit, groupNum, subGroupNum, status});
    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      let pImageArray = element.pImage.split(',');
      if (pImageArray[0]){
        element.pImage += helper.signatureUrl(helper.productPath + pImageArray[0], "thumb-594-840");
      }
    });
    return resultObj;
  }

  async listProductionByUserId({offset = 0, limit = 10, userId = 0}){
    let resultObj =  this.ctx.model.Production.listProduction({offset, limit, userId});
    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      let pImageArray = element.pImage.split(',');
      if (pImageArray[0]){
        element.pImage += helper.signatureUrl(helper.productPath + pImageArray[0], "thumb-594-840");
      }
    });
    return resultObj;
  }

  async getDetailById(id){
    let resultObj =  await this.ctx.model.Production.getDetailById(id);
    const helper = this.ctx.helper;
    let pImageArray = resultObj.pImage.split(',');
    let imageStr = '';
    for (let image of pImageArray){
      imageStr += helper.signatureUrl(helper.productPath + image, "thumb-792-1120") + ',';
    }
    resultObj.pImage = imageStr;
    if(resultObj.attach_file){
      resultObj.attach_file = helper.signatureUrl(helper.attachmentPath + resultObj.attach_file);
    }
    return resultObj;
  }

  async updateScore({Id, averageScore, round}){
    return this.ctx.model.Production.updateScore({Id, averageScore, round});
  }

  async updateStatus(Id,status){
    return this.ctx.model.Production.updateStatus(Id,status);
  }
}

module.exports = ProductionService;
