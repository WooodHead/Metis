'use strict';

const Service = require('egg').Service;
const smsUtil = require('../utils/smsUtils.js');
const moment = require('moment');

class SmsMessage extends Service {

  async createSmsMessage(smsMessage) {
    let code = this.ctx.helper.randomNumber(6);
    smsMessage.code = code;


    let smsSendResult = await smsUtil.sendSMS(smsMessage,3);

    let result = false;

    if (smsSendResult.Code == 'OK'){
      await this.ctx.model.SmsMessage.createSmsMessage(smsMessage);
      result = true;
    }
    else{
      result = false;
    }

    return result;
  }

  async getDataByCondition(smsMessage) {
    let curDate = new Date();
    let preDate = moment(new Date(curDate.getTime() - 30 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss');
    let smsObject = await this.ctx.model.SmsMessage.vertifyCode(smsMessage);

    if (smsObject){
      if(smsObject.createAt > preDate){
        return {success:true,data:'验证成功!',status:200};
      }
      else{
        return {success:true,data:'验证码已失效!',status:500};
      }
    }
    else{
      return {success:true,data:'验证失败!',status:500};
    }
  }

  async sendGetBackPwdSms(smsMessage) {
    let result = {};

    let user = await this.ctx.model.User.findUserByMobile(smsMessage.mobile);
    if (user){
      let code = this.ctx.helper.randomNumber(6);
      smsMessage.code = code;

      let smsSendResult = await smsUtil.sendSMS(smsMessage,1);

      if (smsSendResult.Code == 'OK'){
        await this.ctx.model.SmsMessage.createSmsMessage(smsMessage);
        result.success = true;
      }
      else{
        result.success = false;
      }
    }
    else{
      result.success = false;
      result.message = this.ctx.__('noMobile');
    }

    return result;
  }

  async getCountDataByDatetime(syncType, date) {
    return await this.ctx.model.SmsMessage.getCountDataByDatetime(smsMessage);
  }

}

module.exports = SmsMessage;
