'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.get('/register', controller.home.register);
  router.get('/relogin', controller.home.relogin);

  router.get('/judgeMgr', controller.home.judgeMgr);
  router.get('/judgeCOU/:id', controller.home.judgeCOU);
  router.get('/judgeRoundCOU/:id', controller.home.judgeRoundCOU);

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

  router.resources('/website/user',controller.website.user);
  router.resources('/website/judge',controller.website.judge);
  router.resources('/website/roundJudge',controller.website.roundJudge);
};
