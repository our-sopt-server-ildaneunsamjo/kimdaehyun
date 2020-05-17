const statusCode = require('../utils/statusCode');
const responseMessage = require('../utils/responseMessage');
const utils = require('../utils/utils');
const fs = require('fs');
const dummyUserURL = './dummyDB/dummyUser.txt';
const encrypt = require('../utils/encrypt');

module.exports={
  signUp: async (userid,name,pwd,email)=>{
    console.log(name);
    let errFlag=true;
    var userData;
    return new Promise((resolve,reject)=>{
      if(!userid&&!name&&!pwd&&!email){
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.success(statusCode.BAD_REQUEST,responseMessage.OUT_OF_VALUE,)
        })
      }
      fs.readFile(dummyUserURL,'utf-8',(err,data)=>{
        if(err){
          resolve({
            code : statusCode.DB_ERROR,
            json : utils.fail(statusCode.DB_ERROR,responseMessage.CREATED_USER_FAIL)
          });
        }
        console.log(data);
        userData = JSON.parse(data);
        userData.forEach(ele => {
          if(ele.id==userid){
            errFlag=false;
            resolve({
              code : statusCode.BAD_REQUEST,
              json : utils.fail(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID)
            });
          }
          console.log(userData);
        });
        encrypt.encrypt(pwd)
        .then((response)=>{
          const user = {
            id: userid,
            name: name,
            pwd: response.hashed,
            salt: response.salt,
            email: email
          }
          if(errFlag){
            console.log(userData);
            userData.push(user);
            fs.writeFile(dummyUserURL,JSON.stringify(userData),'utf-8',(err)=>{
              if(err){
                resolve({
                  code: statusCode.DB_ERROR,
                  json: utils.fail(statusCode.DB_ERROR,responseMessage.CREATED_USER_FAIL)
                });
              }else{
                resolve({
                  code: statusCode.OK,
                  json: utils.success(statusCode.OK,responseMessage.CREATED_USER)
                });
              }
            });
          }
        });
      });
    });
  },
  logIn:(userId,pwd)=>{
    console.log(pwd);
    return new Promise((resolve,reject)=>{
      if(!userId&&!pwd){
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.fail(statusCode.BAD_REQUEST,responseMessage.LOGIN_FAIL)
        })
      }
      const data = fs.readFileSync(dummyUserURL,'utf-8');
      if(!data){
        resolve({
          code : statusCode.DB_ERROR,
          json : utils.fail(statusCode.DB_ERROR,responseMessage.CREATED_USER_FAIL)
        });
      }
      let userData = JSON.parse(data);
      userData.forEach(async ele => {
        console.log(ele.id);
        console.log(userId);
        if(ele.id==userId){
          console.log('비교중--');
          const userHashed = await encrypt.encryptWithSalt({
            password : pwd,
            salt : ele.salt
          });
          console.log(userHashed);
          if(ele.pwd==userHashed.hashed){
            console.log(ele.hashed,userHashed);
            resolve({
              code : statusCode.OK,
              json : utils.success(statusCode.OK,responseMessage.LOGIN_SUCCESS)
            })
          }
          else{
            resolve({
              code : statusCode.UNAUTHORIZED,
              json : utils.fail(statusCode.UNAUTHORIZED,responseMessage.LOGIN_FAIL)
            })
          }
        }
      });
    });
  }
}