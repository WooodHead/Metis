/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING } = app.Sequelize;

  const RoundJudge = app.model.define('round_judge', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    roundName: {
      type: STRING,
      allowNull: false
    },
    judge:{
      type: STRING,
      allowNull: false
    },
    describes:{
      type: STRING,
      allowNull: false
    },
  }, {
    tableName: 'round_judge'
  });

  RoundJudge.list = async function({ offset = 0, limit = 10}){
    let condition = {
      offset,
      limit,
      order: [ [ 'Id', 'desc' ]],
    };

    return this.findAndCountAll(condition);
  }

  RoundJudge.createRoundJudge = async function(roundJudge){
    return this.create(roundJudge);
  }

  RoundJudge.updateRoundJudge = async function({ id, updates }){
    const roundJudge = await this.findByPk(id);
    if (!roundJudge) {
      throw new Error('roundJudge not found');
    }
    return roundJudge.update(updates);
  }

  RoundJudge.deleteRoundJudge = async function(id){
    const roundJudge = await this.findByPk(id);
    if (!roundJudge) {
      throw new Error('roundJudge not found');
    }
    return roundJudge.destroy();
  }

  RoundJudge.getRoundJudgeById = async function(id){
    const roundJudge = await this.findOne({
      where:{
          Id:id
      }
    });

    return roundJudge;
  }

  RoundJudge.updateBindJudge = async function(id, judge, transaction){
    return roundJudge.update({
      judge:judge
    },{
      transaction:transaction,
      where : {
        Id:id
      }
    });
  }

  return RoundJudge;
};
