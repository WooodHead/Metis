/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, DATE } = app.Sequelize;

  const SendSMS = app.model.define('send_message', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    mobile: {
      type: STRING,
      allowNull: false
    },
    code:{
      type: STRING,
      allowNull: false
    },
    createAt:{
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  }, {
    tableName: 'send_message'
  });

  SendSMS.createSMS = async function(sms){
    return this.create(sms);
  }

  SendSMS.vertifyCode = async function(code, mobile){
    return this.findAll({
      where:{
        code: code,
        mobile: mobile
      }
    });
  }

  return SendSMS;
};
