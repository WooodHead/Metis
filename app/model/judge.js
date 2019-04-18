/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING } = app.Sequelize;

  const Judge = app.model.define('judge', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false
    },
    headicon:{
      type: STRING,
      allowNull: false
    },
    sub_title:{
      type: STRING,
      allowNull: false
    },
    category:{
      type: INTEGER,
      allowNull: false
    },
    language:{
      type: INTEGER,
      allowNull: false
    },
    description:{
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
    tableName: 'judge'
  });

  Judge.listJudges = async function ({ offset = 0, limit = 10, language = 0 }) {
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        language:0
      }
    };

    if (language != 0){
      condition.where.language = language;
    }

    return this.findAndCountAll(condition);
  }

  Judge.createJudge = async function(judge){
    return this.create(judge);
  }

  Judge.updateJudge = async function({ id, updates }){
    const judge = await this.findById(id);
    if (!judge) {
      throw new Error('judge not found');
    }
    return judge.update(updates);
  }

  Judge.delJudgeById = async function (id) {
    const judge = await this.findById(id);
    if (!judge) {
      throw new Error('judge not found');
    }
    return judge.destroy();
  }

  Judge.getJudgeById = async function (id) {
    return await this.findById(id);
  }

  return Judge;
};
