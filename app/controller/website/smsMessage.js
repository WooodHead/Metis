'use strict'

const BaseController = require('../BaseController');

class SmsMessageController extends BaseController{

  async createSmsMessage() {
    const ctx = this.ctx;
    const query = {
      mobile: ctx.query.mobile,
    };

    try{
      const result = await ctx.service.smsMessage.createSmsMessage(query);
      if(result){
        super.success(ctx.__('sendSuccessful'));
      }
      else{
        super.failure(ctx.__('sendFailed'));
      }
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async sendGetBackPwdSms() {
    const ctx = this.ctx;
    const query = {
      mobile: ctx.query.mobile,
    };
    
    try{
      const result = await ctx.service.smsMessage.sendGetBackPwdSms(query);
      if(result.success){
        super.success(ctx.__('sendSuccessful'));
      }
      else{
        super.failure(result.message);
      }
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async vertifySms(){
    const ctx = this.ctx;
    const smsCode = ctx.query.code;
    const mobile = ctx.query.mobile;
    try{
      ctx.body = await ctx.service.smsMessage.getDataByCondition({mobile:mobile,code:smsCode});
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

}

module.exports = SmsMessageController;
