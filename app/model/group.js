/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING,DATE } = app.Sequelize;

  const Group = app.model.define('group', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false,
      defaultValue: '0',
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
    tableName: 'group'
  });



  return Group;
};
