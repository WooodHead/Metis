/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, DATE } = app.Sequelize;

  const SendSMS = app.model.define('sms_message', {
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
    tableName: 'sms_message'
  });

  SendSMS.createSmsMessage = async function(sms){
    return this.create(sms);
  }

  SendSMS.vertifyCode = async function(smsMessage){
    return this.findOne({
      where:{
        cmobile:smsMessage.mobile,
        code: smsMessage.code,
      }
    });
  }

  SendSMS.getCountDataByDatetime = async function (smsMessage) {
    return this.count({
      where:{
        mobile:smsMessage.mobile,
        createtime:{
          [app.Sequelize.Op.gte]:smsMessage.createtime
        }
      }
    });
  }

  return SendSMS;
};
