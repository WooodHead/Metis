/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Review = app.model.define('review', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    productionId: {
      type: INTEGER,
      allowNull: false
    },
    userId:{
      type: INTEGER,
      allowNull: false
    },
    score:{
      type: INTEGER,
      allowNull: true
    },
    round:{
      type: INTEGER,
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
    tableName: 'review'
  });

  Review.associate = function(){

    app.model.Review.belongsTo(app.model.Production, {foreignKey: 'productionId'});

  };

  Review.createReview = async function(review,transaction){
    return this.create(review,{
      transaction:transaction
    });
  }

  Review.updateReview = async function({ id, updates }){
    const review = await this.findById(id);
    if (!review) {
      throw new Error('review not found');
    }
    return review.update(updates);
  }

  Review.deleteReview = async function(id){
    const review = await this.findById(id);
    if (!review) {
      throw new Error('review not found');
    }
    return review.destroy();
  }

  Review.deleteByRoundIdAndJudgeId = async function(roundId, judgeId, transaction){
    return this.destroy({
      transaction:transaction,
      where:{
        round : roundId,
        userId : judgeId,
      }
    });
  }

  Review.getScoreByRoundAndProductionId = async function(round,productionId){
    return await this.findAll({
      where:{
        round:round,
        productionId:productionId
      },
      attributes:['score']
    });
  }

  Review.getReviewDataByJudgeUserIdAndRound = async function({ offset = 0, limit = 10, judgeUserId = 0, round = 0 }){
    return await this.findAndCountAll({
      offset,
      limit,
      where:{
        userId : judgeUserId,
        round : round,
      },
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Production
      ]
    });
  }
  return Review;
};
