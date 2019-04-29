'use strict';

const ueditor = require('egg-ueditor')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const pageAuthCheck = app.middleware.pageAuthCheck();
  const pageAdminAuthCheck = app.middleware.pageAdminAuthCheck();
  const pageJudgeAuthCheck = app.middleware.pageJudgeAuthCheck();
  const ajaxAuthCheck = app.middleware.ajaxAuthCheck();
  const ajaxAdminAuthCheck = app.middleware.adminAuthCheck();
  const ajaxJudgeAuthCheck = app.middleware.judgeAuthCheck();

  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.get('/logout', pageAuthCheck, controller.home.logout);
  router.get('/register', controller.home.register);
  router.get('/relogin', controller.home.relogin);
  router.get('/uploadWork/:id', pageAuthCheck, controller.home.uploadWork);
  router.get('/works', pageAuthCheck, controller.home.works);
  router.get('/worksDetail/:id', pageAuthCheck, controller.home.worksDetail);
  router.get('/resetInfo', pageAuthCheck, controller.home.resetInfo);
  router.get('/judge', controller.home.judge);
  router.get('/forgetPwd', controller.home.forgetPwd);
  router.get('/resetPwd',controller.home.resetPwd);

  router.get('/judgeMgr', pageAdminAuthCheck, controller.home.judgeMgr);
  router.get('/judgeCOU/:id', pageAdminAuthCheck, controller.home.judgeCOU);
  router.get('/judgeRoundMgr', pageAdminAuthCheck, controller.home.judgeRoundMgr);
  router.get('/judgeRoundCOU/:id', pageAdminAuthCheck, controller.home.judgeRoundCOU);
  router.get('/worksMgr', pageAdminAuthCheck, controller.home.worksMgr);
  router.get('/workDetail/:id', pageAdminAuthCheck, controller.home.workDetail);
  router.get('/newsMgr', pageAdminAuthCheck, controller.home.newsMgr);
  router.get('/newsCOU/:id', pageAdminAuthCheck, controller.home.newsCOU);
  router.get('/userMgr', pageAdminAuthCheck, controller.home.userMgr);
  router.get('/userCOU/:id', pageAdminAuthCheck, controller.home.userCOU);

  router.get('/roleIndex', controller.home.roleIndex);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/roleIndex',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));

  router.get('/website/sms/sendMessage', controller.website.smsMessage.createSmsMessage);
  router.get('/website/sms/vertifySms', controller.website.smsMessage.vertifySms);
  router.get('/website/sms/sendGetBackPwdSms', controller.website.smsMessage.sendGetBackPwdSms);

  router.get('/getCaptcha',controller.website.user.getCaptcha);
  router.get('/checkCaptcha',controller.website.user.checkCaptcha);

  router.get('/getSTSSignature/:fileType', ajaxAuthCheck, controller.website.alioss.getSTSSignature);
  router.get('/getUrlSignature', ajaxAuthCheck, controller.website.alioss.getUrlSignature);

  router.post('/website/user/createUser', controller.website.user.createUser);
  router.get('/website/user/updateAcviveByActiveCodeAndEmail', controller.website.user.updateAcviveByActiveCodeAndEmail);
  router.post('/website/file/uploadFile/:fileType', ajaxAuthCheck, controller.website.file.uploadFile);
  router.get('/website/news/getTopNews',controller.website.news.getTopNews);
  router.put('/website/user/updateValidByUserId/:id',ajaxAdminAuthCheck, controller.website.user.updateValidByUserId);
  router.put('/website/user/updatePwd', ajaxAuthCheck, controller.website.user.updatePwd);
  router.get('/website/user/getBackPwdWithEmail', controller.website.user.getBackPwdWithEmail);
  router.put('/website/user/updatePwdWithEmailAndActiveCode', controller.website.user.updatePwdWithEmailAndActiveCode);
  router.put('/website/user/updatePwdWithMobileAndSmsCode', controller.website.user.updatePwdWithMobileAndSmsCode);
  router.post('/website/user/createUserByAdmin', ajaxAdminAuthCheck, controller.website.user.createUserByAdmin);
  router.put('/website/user/updateUserByAdmin/:id', ajaxAdminAuthCheck, controller.website.user.updateUserByAdmin);

  router.get('/website/production/listProductionByUserId', ajaxAdminAuthCheck, controller.website.production.listProductionByUserId);
  router.put('/website/production/updateAverageScore', ajaxAdminAuthCheck, controller.website.production.updateAverageScore);
  router.get('/website/production/getScoreDetailById/:id', ajaxAdminAuthCheck, controller.website.production.getScoreDetailById);

  router.put('/website/production/updateStatus/:id', ajaxAdminAuthCheck, controller.website.production.updateStatus);
  router.put('/website/roundJudge/bindJudge/:id', ajaxAdminAuthCheck, controller.website.roundJudge.bindJudge);
  router.put('/website/roundJudge/updateBindJudge/:id', ajaxAdminAuthCheck, controller.website.roundJudge.updateBindJudge);

  router.resources('/website/user',controller.website.user);
  router.resources('/website/judge',controller.website.judge);
  router.resources('/website/roundJudge', ajaxAdminAuthCheck, controller.website.roundJudge);
  router.resources('/website/news',controller.website.news);
  router.resources('/website/production', controller.website.production);
  router.resources('/website/review', controller.website.review);

  router.all('/ueditor', ueditor(['app/public','public'],{
  	"imageAllowFiles": [".png", ".jpg", ".jpeg"],
  	"imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{time}{rand:6}"  // 保存为原文件名
  }))
};
