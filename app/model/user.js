/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email:{
      type: STRING(30),
      allowNull: true
    },
    mobile: {
      type: STRING(15),
      allowNull: true
    },
    password: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    realname: {
      type: STRING(20),
      allowNull: true
    },
    address: {
      type: STRING(20),
      allowNull: true
    },
    valid: {
      type: INTEGER,
      allowNull: true
    },
    currentRound: {
      type: INTEGER,
      allowNull: true
    },
    activecode: {
      type: STRING(40),
      allowNull: true
    },
    activesign: {
      type: INTEGER,
      allowNull: true
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'user'
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Production,{sourceKey:'Id',foreignKey: 'userId'});

    app.model.User.belongsToMany(app.model.Role, {
      through: {
        model: app.model.UserRole,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });
  };

  User.listUsers = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Role
      ]
    });
  }

  User.findUserById = async function (id) {
    const user = await this.findById(id,{
      include:[
        app.model.Role
      ]
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  User.createUser = async function (user) {
    return this.create(user);
  }

  User.updateUser = async function ({ id, updates }) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.update(updates);
  }

  User.delUserById = async function (id) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.destroy();
  }

  User.findByUserWithMobile = async function (mobile){
    return await this.findOne({
      where:{
        mobile:mobile
      },
      include:[
        {
          model: app.model.Role,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','name']
        }
      ],
      attributes:['Id','mobile','realname','password']
    });
  }

  User.findByUserWithEmail = async function (email){
    return await this.findOne({
      where:{
        email:email
      },
      include:[
        {
          model: app.model.Role,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','rolename']
        }
      ],
      attributes:['Id','email','realname','mobile','password']
    });
  }

  User.updateUserActiveCodeByEmail = async function(email, activeCode){
    return await this.update({
      activecode:activeCode
    },{
      where:{
        email:email
      }
    });
  }

  User.loginFindByUserWithMobile = async function (mobile){
    return await this.findOne({
      where:{
        mobile:mobile,
        activesign:1,
        valid:0,
      },
      include:[
        {
          model: app.model.Role,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','rolename']
        }
      ],
      attributes:['Id','mobile','realname','password']
    });
  }

  User.loginFindByUserWithEmail = async function (email){
    return await this.findOne({
      where:{
        email:email,
        activesign:1,
        valid:0,
      },
      include:[
        {
          model: app.model.Role,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','rolename']
        }
      ],
      attributes:['Id','mobile','realname','password']
    });
  }

  User.updateAcviveByUserId = async function(userId,active){
    return await this.update({
      activesign:active
    },{
      where:{
        Id:userId
      }
    });
  }

  User.updateValidByUserId = async function(userId,valid){
    return await this.update({
      valid:valid
    },{
      where:{
        Id:userId
      }
    });
  }

  User.updatePwdWithMobileAndSmsCode = async function(mobile, password){
    return await this.update({
      password:password
    },{
      where:{
        mobile:mobile
      }
    });
  }

  User.updatePwdWithEmailAndActiveCode = async function(email, activeCode, newPwd){
    return await this.update({
      password:newPwd
    },{
      where:{
        email:email,
        activecode:activeCode,
      }
    });
  }

  User.updateUserActiveCodeByEmail = async function(email, activecode){
    return await this.update({
      activecode:activecode
    },{
      where:{
        email:email
      }
    });
  }

  User.updateAcviveByActiveCodeAndEmail = async function(email,activecode,active){

    return await this.update({
      activesign:active
    },{
      where:{
        email:email,
        activecode:activecode
      }
    });
  }

  User.findUserByMobile = async function(mobile){
    return await this.findOne({
      where:{
        mobile:mobile
      },
      include:[
        {
          model: app.model.Role,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','rolename']
        }
      ],
    });
  }

  User.findUserByEmail = async function(email){
    return await this.findOne({
      where:{
        email:email
      },
    });
  }

  User.updatePwd = async function(userId, newPwd){
    return await this.update({
      password:newPwd,
    },{
      where:{
        Id:userId
      }
    });
  }

  User.searchByRealname = async function({ offset = 0, limit = 10, realname='' }){

    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Role
      ]
    };

    if(realname != null && realname !=''){
      condition.where = {};
      condition.where.realname = {
        [app.Sequelize.Op.like]: '%'+realname+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  User.searchByMobile = async function({ offset = 0, limit = 10, mobile='' }){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Role
      ]
    };

    if(mobile != null && mobile !=''){
      condition.where = {};
      condition.where.mobile = {
        [app.Sequelize.Op.like]: '%'+mobile+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  User.updateUserAvatarUrl = async function(data){
    return await this.update({
      avatarUrl:data.avatarUrl
    },{
      where:{
        Id:data.userId
      }
    });
  }

  return User;
};
