/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Role = app.model.define('role', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rolename: {
      type: STRING(30),
      allowNull: false,
      defaultValue: ''
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
    tableName: 'role'
  });

  Role.associate = function() {

    app.model.Role.belongsToMany(app.model.User, {
      through: {
        model: app.model.UserRole,
        unique: false,
        scope: {
          taggable: 'role'
        }
      },
      foreignKey: 'roleId',
      constraints: false
    });
  };

  Role.listRoles = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Role.findRoleById = async function (Id) {
    const role = await this.findById(Id);
    if (!role) {
      throw new Error('role not found');
    }
    return role;
  }

  Role.createRole = async function (role) {

      const roleObj = await this.findAll({
        where:{
          name:role.name
        }
      });
      if (roleObj.length == 0){
        return this.create(role);
      }
      else{
        return roleObj[0];
      }

  }

  Role.updateRole = async function ({ Id, updates }) {
    const role = await this.findById(id);
    if (!role) {
      throw new Error('role not found');
    }
    return this.update(updates);
  }

  Role.delRoleById = async function (id) {
    const role = await this.findById(id);
    if (!role) {
      throw new Error('role not found');
    }
    return this.destroy();
  }

  return Role;
};
