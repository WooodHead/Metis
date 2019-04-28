'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = ctx.__('hiEgg');
  }

  async login() {
    const ctx = this.ctx;
    await ctx.render('frontend/login.html', {

    });
    //console.log(this.ctx.cookies.get('locale', { httpOnly: false, signed: false }));
  }

  async logout(){
    const ctx = this.ctx;
    ctx.logout();
    await ctx.render('frontend/index.html');
  }

  async register() {
    const ctx = this.ctx;
    await ctx.render('frontend/register.html', {

    });
  }

  async uploadWork() {
    const ctx = this.ctx;
    await ctx.render('frontend/uploadWork.html', {

    });
  }

  async updatePwd(){
    const ctx = this.ctx;
    await ctx.render('frontend/updatePwd.html');
  }

  async works() {
    const ctx = this.ctx;
    await ctx.render('frontend/works.html', {

    });
  }

  async worksDetail() {
    const ctx = this.ctx;
    await ctx.render('frontend/worksDetail.html', {

    });
  }

  async resetInfo() {
    const ctx = this.ctx;
    await ctx.render('frontend/resetInfo.html', {

    });
  }

  async judge() {
    const ctx = this.ctx;
    await ctx.render('frontend/judge.html', {

    });
  }

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('frontend/login.html', {
      message:ctx.__('usernameOrPwdError')
    });
  }
  async roleIndex(){
    const ctx = this.ctx;
    if(ctx.isAuthenticated()){
      if(ctx.user.roles && ctx.user.roles.length > 0){
        if (ctx.user.roles[0].rolename == 'admin'){
          ctx.redirect('/newsMgr');
        }
        else if (ctx.user.roles[0].rolename == 'judge'){
          ctx.redirect('/judge');
        }
        else{
          ctx.redirect('/works');
        }
      }
      else{
        ctx.redirect('/login');
      }
    }
    else{
      ctx.redirect('/login');
    }

  }

  async judgeMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/judgeMgr.html', {

    });
  }

  async judgeCOU(){
    const ctx = this.ctx;
    await ctx.render('backend/judgeCOU.html', {

    });
  }

  async judgeRoundMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/judgeRoundMgr.html', {

    });
  }

  async judgeRoundCOU(){
    const ctx = this.ctx;
    await ctx.render('backend/judgeRoundCOU.html', {

    });
  }

  async worksMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/worksMgr.html', {

    });
  }

  async workDetail(){
    const ctx = this.ctx;
    await ctx.render('backend/workDetail.html', {

    });
  }

  async newsMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/newsMgr.html', {

    });
  }

  async newsCOU(){
    const ctx = this.ctx;
    await ctx.render('backend/newsCOU.html', {

    });
  }

  async userMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/userMgr.html', {

    });
  }
}

module.exports = HomeController;
