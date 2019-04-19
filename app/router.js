'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/website/sms/createSmsMessage', controller.smsMessage.createSmsMessage);
  router.get('/website/sms/vertifySms', controller.smsMessage.vertifySms);

  router.resources('/website/user',controller.website.user);
};
