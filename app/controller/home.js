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

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('frontend/login.html', {
      message:ctx.__('usernameOrPwdError')
    });
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
}

module.exports = HomeController;
