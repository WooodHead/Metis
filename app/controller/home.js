'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async login() {
    const ctx = this.ctx;
    if (ctx.isAuthenticated()){
      await ctx.render('frontend/works.html', {
        user : ctx.user
      });
    }
    else{
      await ctx.render('frontend/login.html', {

      });
    }

    //console.log(this.ctx.cookies.get('locale', { httpOnly: false, signed: false }));
  }

  async logout(){
    const ctx = this.ctx;
    ctx.logout();
    await ctx.render('frontend/index.html');
  }

  async index(){
      const ctx = this.ctx;
      await ctx.render('frontend/index.html', {
        user : ctx.user
      });
  }

  async news(){
      const ctx = this.ctx;
      await ctx.render('frontend/news.html', {
        user : ctx.user
      });
  }


  async newsDetail(){
      const ctx = this.ctx;
      await ctx.render('frontend/newsDetail.html', {
        user : ctx.user
      });
  }

  async rule(){
      const ctx = this.ctx;
      await ctx.render('frontend/rule.html', {
        user : ctx.user
      });
  }

  async judges(){
      const ctx = this.ctx;
      await ctx.render('frontend/judges.html', {
        user : ctx.user
      });
  }

  async judgeDetail(){
      const ctx = this.ctx;
      await ctx.render('frontend/judgeDetail.html', {
        user : ctx.user
      });
  }

  async register() {
    const ctx = this.ctx;
    await ctx.render('frontend/register.html', {

    });
  }

  async uploadWork() {
    const ctx = this.ctx;
    await ctx.render('frontend/uploadWork.html', {
      user : ctx.user
    });
  }

  async forgetPwd() {
    const ctx = this.ctx;
    await ctx.render('frontend/forgetPwd.html', {

    });
  }

  async resetPwd(){
    const ctx = this.ctx;
    await ctx.render('frontend/resetPwd.html');
  }

  async works() {
    const ctx = this.ctx;
    if(ctx.user.roles[0].rolename == 'judge'){
      await ctx.render('frontend/judge.html', {
        user : ctx.user
      });
    }
    else{
      await ctx.render('frontend/works.html', {
        user : ctx.user
      });
    }

  }

  async worksDetail() {
    const ctx = this.ctx;
    await ctx.render('frontend/worksDetail.html', {
      user : ctx.user
    });
  }

  async resetInfo() {
    const ctx = this.ctx;
    await ctx.render('frontend/resetInfo.html', {
      user : ctx.user
    });
  }

  async judge() {
    const ctx = this.ctx;
    await ctx.render('frontend/judge.html', {
        user : ctx.user
    });
  }

  async contact() {
    const ctx = this.ctx;
    await ctx.render('frontend/contact.html', {
        user : ctx.user
    });
  }

  async legal() {
    const ctx = this.ctx;
    await ctx.render('frontend/legal.html', {
        user : ctx.user
    });
  }

  async sitemap() {
    const ctx = this.ctx;
    await ctx.render('frontend/sitemap.html', {
        user : ctx.user
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

  async userCOU(){
    const ctx = this.ctx;
    await ctx.render('backend/userCOU.html', {

    });
  }

  async scoreMgr(){
    const ctx = this.ctx;
    await ctx.render('backend/scoreMgr.html', {

    });
  }
}

module.exports = HomeController;
