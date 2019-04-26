'use strict';

const ueditor = require('egg-ueditor')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.get('/logout', controller.home.logout);
  router.get('/register', controller.home.register);
  router.get('/relogin', controller.home.relogin);
  router.get('/uploadWork/:id', controller.home.uploadWork);
  router.get('/works', controller.home.works);
  router.get('/worksDetail/:id', controller.home.worksDetail);
  router.get('/resetInfo', controller.home.resetInfo);
  router.get('/judge', controller.home.judge);

  router.get('/judgeMgr', controller.home.judgeMgr);
  router.get('/judgeCOU/:id', controller.home.judgeCOU);
  router.get('/judgeRoundMgr', controller.home.judgeRoundMgr);
  router.get('/judgeRoundCOU/:id', controller.home.judgeRoundCOU);
  router.get('/worksMgr', controller.home.worksMgr);
  router.get('/workDetail/:id', controller.home.workDetail);
  router.get('/newsMgr', controller.home.newsMgr);
  router.get('/newsCOU/:id', controller.home.newsCOU);
  router.get('/userMgr', controller.home.userMgr);

  router.get('/roleIndex', controller.home.roleIndex);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/roleIndex',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));

  router.get('/website/sms/sendMessage', controller.website.smsMessage.createSmsMessage);
  router.get('/website/sms/vertifySms', controller.website.smsMessage.vertifySms);

  router.get('/getCaptcha',controller.website.user.getCaptcha);
  router.get('/checkCaptcha',controller.website.user.checkCaptcha);

  router.get('/getSTSSignature/:fileType', controller.website.alioss.getSTSSignature);
  router.get('/getUrlSignature', controller.website.alioss.getUrlSignature);

  router.post('/website/user/createUser', controller.website.user.createUser);
  router.get('/website/user/updateAcviveByActiveCodeAndEmail', controller.website.user.updateAcviveByActiveCodeAndEmail);
  router.post('/website/file/uploadFile/:fileType',controller.website.file.uploadFile);
  router.get('/website/news/getTopNews',controller.website.news.getTopNews);
  router.put('/website/user/updateValidByUserId/:id', controller.website.user.updateValidByUserId);

  router.get('/website/production/listProductionByUserId', controller.website.production.listProductionByUserId);
  router.put('/website/production/updateScore/:id', controller.website.production.updateScore);
  router.put('/website/production/updateStatus/:id', controller.website.production.updateStatus);
  router.put('/website/roundJudge/bindJudge/:id', controller.website.roundJudge.bindJudge);
  router.put('/website/roundJudge/updateBindJudge/:id', controller.website.roundJudge.updateBindJudge);

  router.resources('/website/user',controller.website.user);
  router.resources('/website/judge',controller.website.judge);
  router.resources('/website/roundJudge',controller.website.roundJudge);
  router.resources('/website/news',controller.website.news);
  router.resources('/website/production',controller.website.production);
  router.resources('/website/review',controller.website.review);

  router.all('/ueditor', ueditor(['app/public','public'],{
  	"imageAllowFiles": [".png", ".jpg", ".jpeg"],
  	"imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{time}{rand:6}"  // 保存为原文件名
  }))
};
