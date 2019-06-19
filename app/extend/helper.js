'use strict';

let OSS = require('ali-oss');
const crypto = require('crypto');
const path = require('path');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  aliConfig: () => {
    const alioss = exports = {};

    alioss.region = 'oss-cn-shanghai';
    alioss.AccessKeyId = 'LTAIsvXXw2cmRUG2';
    alioss.AccessKeySecret = 'fs0sVuCJm0AeQi2XduYwdF0EqzL5Rc';
    alioss.endpoint = 'oss-cn-shanghai.aliyuncs.com';
    alioss.PolicyFile = 'policy/all_policy.txt';
    alioss.RoleArn = 'acs:ram::1455326322404332:role/cidic-oss-role';
    alioss.TokenExpireTime = '3600';
    alioss.bucket = 'dc-jd';

    return alioss;
  },

  basePath: path.join(__dirname, '../public/newsImages/'),
  imagePath: 'images',

  attachmentPath: 'attachment/',
  productPath: 'product/',
  judgesPath: 'judges/',
  newsPath: 'news/',
  othersPath: 'others/',

  email_host:'smtp.exmail.qq.com',
  email_user:'d_seniors2018@cidic.cn',
  email_pwd:'Yl2018',
  email_send_address:'d_seniors2018@cidic.cn',
  email_verify_address:'http://127.0.0.1:7001/website/user/updateAcviveByActiveCodeAndEmail',
  wx_email_verify_address:'http://127.0.0.1:7001/website/user/updateWxActive',
  getBackPwd_email_verify_address:'http://127.0.0.1:7001/resetPwd',

  signatureUrl(objectPath,thumbName){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    if (typeof(thumbName) == "undefined"){
      return client.signatureUrl(objectPath, {expires: 3600});
    }
    else{
      return client.signatureUrl(objectPath, {expires: 3600,process : 'style/'+thumbName});
    }

  },

  async deleteOssObject(objectPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.delete(objectPath);
  },

  async deleteOssMultiObject(objectArrayPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.deleteMulti(objectArrayPath);
  },

  async putOssObject(objectName,stream){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    try {
      let result = await client.putStream(objectName, stream);
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  },

  cryptoPwd:(password)=>{
    const prefix = '13ervbh#$61';
    var sha1 = crypto.createHash('sha1');
    sha1.update(prefix + password);
    var pwd = sha1.digest('hex');
    return pwd;
  },

  randomString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },

  loginSuccess: (message,token,username,userId)=>{
    const result = {
      'status':200,
      'message':message,
      'token':token,
      'username':username,
      'userId':userId,
    };
    return result;
  },

  randomNumber:(num)=>{
    var str = '';
    for(var i = 0; i < num; i += 1){
      str += Math.floor(Math.random() * 10);
    }
    return str;
  },

  judgeEmail:(email)=>{
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(emailReg.test(email)){
      return true;
    }
    else{
      return false;
    }
  },


  getCountDownDay:()=>{
    let date1 = new Date(2019,12,1);
    let date2 = new Date();
    let date3 = new Date(date2.getFullYear(),date2.getMonth()+1,date2.getDate());
    let date = (date1.getTime() - date3.getTime()) / (1000 * 60 * 60 * 24);
    return date;
  }
};
