'use strict';

const Service = require('egg').Service;

class ProductionService extends Service {

  async createProduction(production){
    return await this.ctx.model.Production.createProduction(production);
  }

  async updateProduction({id,updates}){
    return await this.ctx.model.Production.updateProduction({id,updates});
  }

  async delProductionById(id){
    return await this.ctx.model.Production.delProductionById(id);
  }

  async listProduction({offset = 0, limit = 10, groupNum = 0, subGroupNum = 0, status = 0}){
    let resultObj =  await this.ctx.model.Production.listProduction({offset, limit, groupNum, subGroupNum, status});
    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      let pImageArray = element.pImage.split(',');
      if (pImageArray[0]){
        element.pImage = helper.signatureUrl(helper.productPath + pImageArray[0], "thumb-594-840");
      }
    });
    return resultObj;
  }

  async listProductionByUserId({offset = 0, limit = 10, userId = 0}){
    let resultObj =  await this.ctx.model.Production.listProduction({offset, limit, userId});
    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      let pImageArray = element.pImage.split(',');
      if (pImageArray[0]){
        element.pImage = helper.signatureUrl(helper.productPath + pImageArray[0], "thumb-594-840");
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

  async updateScore(round){
    let productionList = await this.ctx.model.Production.getProductionIdByRound(round);
    if(productionList.length > 0){
      for (let production of productionList){
        let reviewList = await this.ctx.model.Review.getScoreByRoundAndProductionId(round,production.Id);
        let judgeCount = reviewList.length;
        let scoreCount = 0;
        for (let review of reviewList){
          scoreCount += review.score;
        }
        let averageScore = (parseFloat(scoreCount) / parseFloat(judgeCount)).toFixed(2);
        await this.ctx.model.Production.updateScore({production.Id,averageScore,round});
      }
    }
    return await this.ctx.model.Production.updateScore({Id, averageScore, round});
  }

  async getScoreDetailById(id){
    let result = new Array();
    let roundJudges = await this.ctx.model.RoundJudge.getAllRoundJudge();
    for (let roundJudge of roundJudges){
      let reviewList = await this.ctx.model.Review.getScoreByRoundAndProductionId(roundJudge.Id, id);
      if (reviewList.length > 0){
        let judgeCount = reviewList.length;
        let scoreCount = 0;
        for (let review of reviewList){
          scoreCount += review.score;
        }
        let averageScore = (parseFloat(scoreCount) / parseFloat(judgeCount)).toFixed(2);
        let scoreObject = {
          roundName:roundJudge.roundName,
          averageScore:averageScore,
        };
        result.push(scoreObject);
      }
    }
    return result;
  }

  async updateStatus(Id,status){
    return await this.ctx.model.Production.updateStatus(Id,status);
  }
}

module.exports = ProductionService;
