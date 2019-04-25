'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const ctx = this.ctx;
    await ctx.render('frontend/login.html', {

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
          ctx.redirect('/login');
        }
        else if (ctx.user.roles[0].rolename == 'judge'){
          ctx.redirect('/login');
        }
        else{
          ctx.redirect('/login');
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

  async newsCOU(){
    const ctx = this.ctx;
    await ctx.render('backend/newsCOU.html', {

    });
  }
}

module.exports = HomeController;
