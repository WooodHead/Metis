/* jshint indent: 2 */

module.exports = app => {

  const { INTEGER } = app.Sequelize;

  const UserRole = app.model.define('user_role', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    userId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    roleId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'user_role'
  });

  UserRole.creteUserRole = async function(userId,roleId) {
    const userRole = {
      userId:userId,
      roleId:roleId
    };
     return await this.create(userRole);
  }

  UserRole.delUserRoleByUserId = async function(userId,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        userId:userId
      }
    });
  }

  UserRole.delUserRoleByRoleId = async function(roleId) {
    return await this.destroy({
      where:{
        roleId:roleId
      }
    });
  }

  UserRole.updateUserRole = async function(userId, operation, transaction){
    let roleId = 1;
    if (operation == 'user'){
      roleId = 3;
    }
    else if (operation == 'judge'){
      roleId = 2;
    }
    else if (operation == 'admin'){
      roleId = 1;
    }
    return await this.update({
      roleId:roleId
    },{
      transaction: transaction,
      where:{
        userId:userId
      }
    });
  }

  return UserRole;
};
