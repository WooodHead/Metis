/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING,FLOAT } = app.Sequelize;

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
    content: {
      type: STRING,
      allowNull: false,
    },
    content_en: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
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
      allowNull: false,
    },
    participant_brief: {
      type: STRING,
      allowNull: false,
    },
    adviser: {
      type: STRING,
      allowNull: false,
    },
    team_member: {
      type: STRING,
      allowNull: false,
    },
    affiliatedUnit: {
      type: STRING,
      allowNull: false,
    },
    score: {
      type: FLOAT,
      allowNull: false,
    },
    attach_file: {
      type: STRING,
      allowNull: false,
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

    app.model.Production.belongsTo(app.model.Review, {foreignKey: 'productionId',targetKey: 'Id'});
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

  Production.listProductionByUserId = async function ({offset = 0, limit = 10, groupNum = 0, int subGroupNum = 0, userId = 0}){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        userId:userId
      }
    };

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

  Production.getDetailById = async function(id){
    return await this.findById(id);
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

  Production.updateStatus = async function(Id,status){
    return await this.update({
      status:status
    },{
      where:{
        Id:Id
      }
    });
  }

  
  return Production;
};
