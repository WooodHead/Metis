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
      allowNull: false
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
    app.model.Review.hasOne(app.model.Production, {foreignKey: 'productionId',sourceKey: 'Id'});

  };

  Review.createReview = async function(review){
    return this.create(review);
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

  return Review;
};
