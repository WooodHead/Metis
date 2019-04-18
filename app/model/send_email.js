/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING } = app.Sequelize;

  const SendEmail = app.model.define('send_email', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    email: {
      type: STRING,
      allowNull: false
    },
    sign:{
      type: INTEGER,
      allowNull: false
    },
    round:{
      type: INTEGER,
      allowNull: false
    },
    remark:{
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
    tableName: 'round_judge'
  });

  SendEmail.createEmail = async function(){
    
  }

  return SendEmail;
};
