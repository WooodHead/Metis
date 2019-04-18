/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING } = app.Sequelize;

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

  RoundJudge.createRoundJudge = async function(roundJudge){
    return this.create(roundJudge);
  }

  RoundJudge.updateRoundJudge = async function({ id, updates }){
    const roundJudge = await this.findById(id);
    if (!roundJudge) {
      throw new Error('roundJudge not found');
    }
    return review.update(roundJudge);
  }

  RoundJudge.deleteRoundJudge = async function(id){
    const roundJudge = await this.findById(id);
    if (!roundJudge) {
      throw new Error('roundJudge not found');
    }
    return roundJudge.destroy();
  }

  return RoundJudge;
};
