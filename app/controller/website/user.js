'use strict'

const BaseController = require('../BaseController');
const Captcha = require('svg-captcha');
const request = require('request');

class UsersController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.users.list(query);
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
      const result = await ctx.service.users.find(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async createUser() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      if (data.captchaText != this.ctx.session.captcha){
        super.failure(ctx.__('verificationCodeError'));
      }
      else{
        const user = await ctx.service.users.createUser(data);
        super.success(ctx.__('createdSuccess'));
      }

    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      mobile: ctx.request.body.mobile,
    };

    try{
      await ctx.service.users.update({ id, updates });
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
      await ctx.service.users.del(id);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateAcviveByUserId(){
    const ctx = this.ctx;
    const userId = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.users.updateAcviveByUserId(userId);
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async getCaptcha(){
    let codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    }
    var captcha = Captcha.create(codeConfig);
    this.ctx.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

    this.ctx.body = captcha.data;
  }

  async checkCaptcha(){
    const captchaText = this.ctx.query.captchaText;
    if (captchaText.toLowerCase() == this.ctx.session.captcha){
      super.success(this.ctx.__('verificationSuccess'));
    }
    else{
      super.success(this.ctx.__('verificationError'));
    }
  }

  async getUserByUnionId(){
    const unionId = this.ctx.query.unionId;
    return await ctx.service.users.findByUnionId(unionId);
  }

  async updatePwd(){
    const ctx = this.ctx;
    const password = ctx.request.body.password;
    const newPwd = ctx.request.body.newPwd;
    if(ctx.user){
      const userObject = await ctx.service.users.find(ctx.user.Id);
      const app = this.ctx.helper;
      const crypwd = ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(password));
      if(userObject.password != crypwd){
        super.failure(ctx.__('oldPwdError'));
      }
      else{
        const result = await ctx.service.users.updatePwd(ctx.user.Id, ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(newPwd)));
        if (result){
          super.success(ctx.__('updateSuccessful'));
        }
        else{
          super.failure(ctx.__('updateFailed'));
        }
      }
    }
    else{
      ctx.redirect('/login');
    }
  }

  async updatePwdWithMobileAndSmsCode(){
    const ctx = this.ctx;
    const mobile = ctx.request.body.mobile;
    const smsCode = ctx.request.body.smsCode;
    const newPwd = ctx.request.body.newPwd;
    const result = await ctx.service.users.updatePwdWithMobileAndSmsCode(mobile, smsCode, newPwd);
    if (result.success){
      super.success(ctx.__('updateSuccessful'));
    }
    else{
      super.failure(result.message);
    }
  }

  async updateUserRole(){
    const ctx = this.ctx;
    const userId = ctx.request.body.userId;
    const operation = ctx.request.body.operation;
    const result = await ctx.service.users.updateUserRole(userId,operation);
    if (result){
      super.success(ctx.__('settingSuccessful'));
    }
    else{
      super.failure(ctx.__('settingFailed'));
    }
  }

  async searchByUsername(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const fullname = ctx.query.fullname;
    const query = {
      limit:limit,
      offset:offset,
      fullname:fullname
    };
    try{
      let result = await ctx.service.users.searchByUsername(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(ctx.__('getDataError'));
    }
  }

  async searchByMobile(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const mobile = ctx.query.mobile;
    const query = {
      limit:limit,
      offset:offset,
      mobile:mobile
    };
    try{
      let result = await ctx.service.users.searchByMobile(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(ctx.__('getDataError'));
    }
  }

  async updateUserAvatarUrl(){
    const ctx = this.ctx;
    const userId = ctx.helper.parseInt(ctx.params.id);
    const avatarUrl = ctx.request.body.avatarUrl;

    const data = {
      userId:userId,
      avatarUrl:avatarUrl
    };
    try{
      let result = await ctx.service.users.updateUserAvatarUrl(data);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(ctx.__('updateDataError'));
    }
  }
}

module.exports = UsersController;
