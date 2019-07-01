/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, FLOAT, DATE } = app.Sequelize;

  const Production = app.model.define('production', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    userId:{
      type: INTEGER,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    title_en: {
      type: STRING,
      allowNull: false,
    },
    pImage: {
      type: STRING,
      allowNull: false,
    },
    mobile: {
      type: STRING,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    content_en: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: INTEGER, ////1.已提交、2.审核未通过、3.审核已通过、4.初选入围、5.初选未入围、6.复选入围、7复选未入围
      allowNull: true,
    },
    participant_type: {
      type: INTEGER,
      allowNull: false,
    },
    participant_name: {
      type: STRING,
      allowNull: false,
    },
    participant_id_number: {
      type: STRING,
      allowNull: true,
    },
    participant_brief: {
      type: STRING,
      allowNull: true,
    },
    adviser: {
      type: STRING,
      allowNull: true,
    },
    team_member: {
      type: STRING,
      allowNull: true,
    },
    affiliatedUnit: {
      type: STRING,
      allowNull: true,
    },
    score: {
      type: FLOAT,
      allowNull: true,
    },
    round: {
      type: INTEGER,
      allowNull: true,
    },
    attach_file: {
      type: STRING,
      allowNull: true,
    },
    groupNum: {
      type: INTEGER,
      allowNull: false,
    },
    subGroupNum: {
      type: INTEGER,
      allowNull: false,
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
    tableName: 'production'
  });

  Production.associate = function() {
    app.model.Production.belongsTo(app.model.User, {
      targetKey: 'Id',
      foreignKey: 'userId'
    });

    app.model.Production.hasMany(app.model.Review, {sourceKey: 'Id',foreignKey: 'productionId'});
  };

  Production.createProduction = async function (production) {
    return this.create(production);
  }

  Production.updateProduction = async function ({ id, updates }) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('production not found');
    }
    return production.update(updates);
  }

  Production.delProductionById = async function (id) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('production not found');
    }
    return production.destroy();
  }

  Production.listProduction = async function ({offset = 0, limit = 10, groupNum = 0, subGroupNum = 0, status = 0}){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{

      }
    };

    if (status != 0){
      condition.where.status = status;
    }

    if (groupNum != 0 && subGroupNum == 0){
      condition.where.groupNum = groupNum;
    }
    else if (groupNum == 0 && subGroupNum != 0){
      condition.where.subGroupNum = subGroupNum;
    }
    else if (groupNum != 0 && subGroupNum != 0){
      condition.where.groupNum = groupNum;
      condition.where.subGroupNum = subGroupNum;
    }

    return this.findAndCountAll(condition);
  }

  Production.listProductionByUserId = async function ({offset = 0, limit = 10, userId = 0}){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        userId:userId
      }
    };

    return this.findAndCountAll(condition);
  }

  Production.getDetailById = async function(id){
    return await this.findByPk(id);
  }

  Production.updateScore = async function({Id, averageScore, round}){
    return await this.update({
      score:averageScore,
      round:round
    },{
      where:{
        Id:Id
      }
    });
  }

  Production.updateRound = async function(Id, round, transaction){
    return await this.update({
      round:round
    },{
      transaction:transaction,
      where:{
        Id:Id
      }
    });
  }

  Production.updateStatus = async function(Id,status){
    return await this.update({
      status:status
    },{
      where:{
        Id:Id
      }
    });
  }

  Production.getProductionIdByRound = async function(roundId){
    return await this.findAll({
      where:{
        round:roundId
      },
      attributes:['Id']
    });
  }

  Production.listProductionByIds = async function(idArray){
    return await this.findAll({
      where:{
        Id:idArray
      },
    });
  }

  return Production;
};
