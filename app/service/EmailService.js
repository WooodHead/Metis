'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

class Email extends Service {

  async sendActiveEmail(email, activeCode, mailType = 0) {
    const ctx = this.ctx;
    // 开启一个 SMTP 连接池
    await ctx.model.User.updateUserActiveCodeByEmail(email,activeCode);
    var transport = nodemailer.createTransport({
      host: ctx.helper.email_host, // 主机
      secure: true, // 使用 SSL
      secureConnection: true, // 使用 SSL
      port: 465, // SMTP 端口
      auth: {
        user: ctx.helper.email_user, // 账号
        pass: ctx.helper.email_pwd // 密码
      }
    });

    // 设置邮件内容
    var mailOptions = {
      from: ctx.helper.email_send_address, // 发件地址
      to: email, // 收件列表
      subject: "邮件激活", // 标题blog-simple.html
      //html: fs.createReadStream(path.resolve(__dirname,'../../', 'blog-simple.html'))
    }

    if (mailType == 0){
      mailOptions.text = "您好 ";
       mailOptions.html = '<b>感谢您注册成为首届中国（怀化）乡村振兴设计创新大赛用户!</b> <a href="'+ctx.helper.email_verify_address
         +'?email='+email+'&activeCode='+activeCode+'">请点击激活账号</a>';
    }
    else if (mailType == 1){
      mailOptions.text = "您好，您的激活码为:" + activeCode;
    }

    // 发送邮件
    await transport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
        return false;
      } else {
        return true;
      }
      transport.close(); // 如果没用，关闭连接池
    });
  }

  async sendBackPwdEmail(email, activeCode) {
    const ctx = this.ctx;
    // 开启一个 SMTP 连接池
    var transport = nodemailer.createTransport({
      host: ctx.helper.email_host, // 主机
      secure: true, // 使用 SSL
      secureConnection: true, // 使用 SSL
      port: 465, // SMTP 端口
      auth: {
        user: ctx.helper.email_user, // 账号
        pass: ctx.helper.email_pwd // 密码
      }
    });

    // 设置邮件内容
    var mailOptions = {
      from: ctx.helper.email_send_address, // 发件地址
      to: email, // 收件列表
      subject: "邮件找回密码", // 标题
    }

    mailOptions.text = "您好 ";
      mailOptions.html = '<b>感谢您成为首届中国（怀化）乡村振兴设计创新大赛用户!</b> <a href="'+ctx.helper.getBackPwd_email_verify_address
        +'?email='+email+'&activeCode='+activeCode+'">请点击修改该账号的密码</a>';

    // 发送邮件
    await transport.sendMail(mailOptions, function(error, response) {
      if (error) {
        return false;
      } else {
        return true;
      }
      transport.close(); // 如果没用，关闭连接池
    });
  }

}

module.exports = Email;
