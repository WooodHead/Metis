/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, DATE } = app.Sequelize;

  const SmsMessage = app.model.define('sms_message', {
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

  SmsMessage.createSmsMessage = async function(sms){
    return this.create(sms);
  }

  SmsMessage.vertifyCode = async function(smsMessage){
    return this.findOne({
      where:{
        mobile:smsMessage.mobile,
        code: smsMessage.code,
      }
    });
  }

  SmsMessage.getCountDataByDatetime = async function (smsMessage) {
    return this.count({
      where:{
        mobile:smsMessage.mobile,
        createtime:{
          [app.Sequelize.Op.gte]:smsMessage.createtime
        }
      }
    });
  }

  return SmsMessage;
};
