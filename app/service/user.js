'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const moment = require('moment');
const path = require('path');

class User extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.User.listUsers({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findUserById(id);

    return user;
  }

  async createUser(user) {
    if (user.mobileOrEmail == 1){
      if (user.mobile == '' || user.mobile == null) {
        throw new Error('用户电话号码不能为空');
      } else {
        const userObj = await this.ctx.model.User.findUserByMobile(user.mobile);
        if (userObj) {
          throw new Error('用户已经存在');
        } else {
          //判断短信验证码是否正确
          let curDate = new Date();
          let preDate = moment(new Date(curDate.getTime() - 30 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss');
          let smsObject = await this.ctx.model.SmsMessage.vertifyCode({
            mobile: user.mobile,
            code: user.smsCode
          });
          if (smsObject) {
            if (smsObject.createAt > preDate) {
              let transaction;
              try {
                transaction = await this.ctx.model.transaction();
                const helper = this.ctx.helper;
                user.password = helper.cryptoPwd(helper.cryptoPwd(user.password));
                user.activeCode = UUID.v1();
                user.activesign = 1;
                const createUserObj = await this.ctx.model.User.createUser(user, transaction);
                await this.ctx.model.UserRole.creteUserRole(createUserObj.Id, 1, transaction);
                await transaction.commit();

                return createUserObj;
              } catch (e) {
                this.ctx.logger.error(e.message);
                await transaction.rollback();
                return false;
              }
            } else {
              throw new Error('手机验证码失效');
            }
          } else {
            throw new Error('手机验证码不正确');
          }
        }
      }
    }
    else{
      if (user.email == '' || user.email == null) {
        throw new Error('邮箱地址不能为空');
      } else {
        const userObj = await this.ctx.model.User.findUserByEmail(user.email);
        if (userObj){
          throw new Error('用户已经存在');
        }
        else{
          let transaction;
          try {
            transaction = await this.ctx.model.transaction();
            const helper = this.ctx.helper;
            user.password = helper.cryptoPwd(helper.cryptoPwd(user.password));
            user.activeCode =  UUID.v1();
            const createUserObj = await this.ctx.model.User.createUser(user,transaction);
            await this.ctx.model.UserRole.creteUserRole(createUserObj.Id, 1, transaction);
            await this.ctx.service.emailService.sendActiveEmail(user.email, user.activeCode);
            await transaction.commit();
            return createUserObj;
          } catch (e) {
            console.log(e);
            this.ctx.logger.error(e.message);
            await transaction.rollback();
            return false;
          }
        }
      }
    }

  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.User.updateUser({
      id,
      updates
    });
  }

  async del(id) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.User.delUserById(id, transaction);
      await this.ctx.model.UserRole.delUserRoleByUserId(id, transaction);
      await this.ctx.model.Artifacts.delArtifactById(id, transaction);
      await this.ctx.model.ArtifactAssets.delAssetsByArtifactId(id, transaction);
      await this.ctx.model.ArtifactAssets.delCommentByArtifactId(id, transaction);
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      this.ctx.logger.error(e.message);
      return false
    }

  }

  async findByUnionId(unionId) {
    return await this.ctx.model.User.findByUnionId(unionId);
  }

  async findByUserWithMobile(mobile) {
    let user = await this.ctx.model.User.findByUserWithMobile(mobile);
    if(user.avatarUrl){
      let helper = this.ctx.helper;
      user.avatarUrl = helper.baseUrl + path.join(helper.othersPath, (user.Id).toString(), user.avatarUrl);
    }
    return user;
  }

  async loginFindByUserWithMobile(mobile) {
    let user = await this.ctx.model.User.loginFindByUserWithMobile(mobile);

    return user;
  }

  async loginFindByUserWithEmail(email) {
    let user = await this.ctx.model.User.loginFindByUserWithEmail(email);

    return user;
  }

  async updateAcviveByUserId(userId) {
    return await this.ctx.model.User.updateAcviveByUserId(userId);
  }

  async updatePwd(userId, newPwd) {
    try {
      await this.ctx.model.User.updatePwd(userId, newPwd);
      return true;
    } catch (e) {
      this.ctx.logger.error(e.message);
      return false;
    }
  }

  async updateValidByUserId(userId,valid){
    await this.ctx.model.User.updateValidByUserId(userId, valid);
  }

  async updatePwdWithMobileAndSmsCode(mobile, smsCode, newPwd) {
    try {
      const helper = this.ctx.helper;
      let curDate = new Date();
      let preDate = moment(new Date(curDate.getTime() - 30 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss');
      let smsObject = await this.ctx.model.SmsMessage.getDataByCondition({
        mobile: mobile,
        code: smsCode
      });
      if (smsObject) {
        if (smsObject.createtime > preDate) {
          const password = helper.cryptoPwd(helper.cryptoPwd(newPwd));
          await this.ctx.model.User.updatePwdWithMobileAndSmsCode(mobile, password);
          return {
            success: true,
            message: '修改成功!'
          };
        } else {
          return {
            success: false,
            message: '验证码超时!'
          };
        }
      } else {
        return {
          success: false,
          message: '验证码错误!'
        };
      }

    } catch (e) {
      this.ctx.logger.error(e.message);
      return {
        success: false,
        message: e.message
      };
    }
  }

  async updateUserRole(userId, operation) {
    try {
      await this.ctx.model.UserRole.updateUserRole(userId, operation);
      return true;
    } catch (e) {
      this.ctx.logger.error(e.message);
      return false;
    }
  }

  async updateAcviveByActiveCodeAndEmail(email,activeCode){
    return await this.ctx.model.User.updateAcviveByActiveCodeAndEmail(email,activeCode,1);
  }

  async searchByUsername(query) {
    return await this.ctx.model.User.searchByUsername(query);
  }

  async searchByMobile(query) {
    return await this.ctx.model.User.searchByMobile(query);
  }

  async updateUserAvatarUrl(data){
    return await this.ctx.model.User.updateUserAvatarUrl(data);
  }
}

module.exports = User;
