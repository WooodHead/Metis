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
  
  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/index',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));

  router.get('/website/sms/createSmsMessage', controller.website.smsMessage.createSmsMessage);
  router.get('/website/sms/vertifySms', controller.website.smsMessage.vertifySms);

  router.resources('/website/user',controller.website.user);
};
