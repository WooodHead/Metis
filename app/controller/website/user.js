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
      const result = await ctx.service.user.list(query);
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
      const result = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
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
      if (data.captchaText.toLowerCase() != this.ctx.session.captcha){
        super.failure(ctx.__('verificationCodeError'));
      }
      else{
        const user = await ctx.service.user.createUser(data);
        super.success(ctx.__('createdSuccess'));
      }

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      mobile: ctx.request.body.mobile,
      email: ctx.request.body.email,
    };

    try{
      await ctx.service.user.update({ id, updates });
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
      await ctx.service.user.del(id);
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
      await ctx.service.user.updateAcviveByUserId(userId);
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateValidByUserId(){
    const ctx = this.ctx;
    const userId = ctx.helper.parseInt(ctx.params.id);
    const valid = ctx.helper.parseInt(ctx.request.body.valid);
    try{
      await ctx.service.user.updateValidByUserId(userId,valid);
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
      super.failure(this.ctx.__('verificationError'));
    }
  }

  async updatePwd(){
    const ctx = this.ctx;
    const password = ctx.request.body.password;
    const newPwd = ctx.request.body.newPwd;
    if(ctx.user){
      const userObject = await ctx.service.user.find(ctx.user.Id);
      const app = this.ctx.helper;
      const crypwd = ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(password));
      if(userObject.password != crypwd){
        super.failure(ctx.__('oldPwdError'));
      }
      else{
        const result = await ctx.service.user.updatePwd(ctx.user.Id, ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(newPwd)));
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
    const result = await ctx.service.user.updatePwdWithMobileAndSmsCode(mobile, smsCode, newPwd);
    if (result.success){
      super.success(ctx.__('updateSuccessful'));
    }
    else{
      super.failure(result.message);
    }
  }

  async updateAcviveByActiveCodeAndEmail(){
    const ctx = this.ctx;
    const email = ctx.query.email;
    const activeCode = ctx.query.activeCode;

    try{
      await ctx.service.user.updateAcviveByActiveCodeAndEmail(email,activeCode);
      ctx.redirect('/login');
    }
    catch(e){
      console.log(e);
      ctx.redirect('/login');
    }
  }

  async updateUserRole(){
    const ctx = this.ctx;
    const userId = ctx.request.body.userId;
    const operation = ctx.request.body.operation;
    const result = await ctx.service.user.updateUserRole(userId,operation);
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
      let result = await ctx.service.user.searchByUsername(query);
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
      let result = await ctx.service.user.searchByMobile(query);
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
      let result = await ctx.service.user.updateUserAvatarUrl(data);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(ctx.__('updateDataError'));
    }
  }

  async getBackPwdWithEmail(){
    const ctx = this.ctx;
    const email = ctx.query.email;
    const userObj = await ctx.service.user.findByUserWithEmail(email);
    if (userObj){
      const result = await ctx.service.user.getBackPwdWithEmail(email);
      if(result){
        super.success(ctx.__('sendEmailSuccess'));
      }
      else{
        super.failure(ctx.__('sendEmailFailure'));
      }
    }
    else{
      super.failure(ctx.__('emailIsNotExist'));
    }
  }

  async updatePwdWithEmailAndActiveCode(){
    const ctx = this.ctx;
    const email = ctx.request.body.email;
    const activeCode = ctx.request.body.activeCode;
    const newPwd = ctx.request.body.newPwd;
    const result = await ctx.service.user.updatePwdWithEmailAndActiveCode(email, activeCode, newPwd);
    if (result){
      super.success(ctx.__('updateSuccessful'));
    }
    else{
      super.failure(ctx.__('updateFailed'));
    }
  }

  async createUserByAdmin() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      const user = await ctx.service.user.createUserByAdmin(data, ctx.request.body.role);
      super.success(ctx.__('createdSuccess'));
    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async updateUserByAdmin() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      mobile: ctx.request.body.mobile,
      email: ctx.request.body.email,
      realname: ctx.request.body.realname,
      role: ctx.request.body.role,
      id: id,
    };

    try{
      await ctx.service.user.updateUserByAdmin(updates);
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async getCountDownDay(){
    const ctx = this.ctx;
    let expire = ctx.helper.getCountDownDay();
    if (expire < 0){
      expire = 0;
    }
    ctx.body = expire;
  }
}

module.exports = UsersController;
