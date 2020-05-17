const utils = require('./utils');
const fs = require('fs');

module.exports = {
  query_duplicate_id : (url, id)=>{
    fs.readFile(dummyUserURL,'utf-8',(err,data)=>{
      if(err){
        resolve({
          code : statusCode.DB_ERROR,
          json : utils.fail(statusCode.DB_ERROR,responseMessage.CREATED_USER_FAIL)
        });
      }
      let userData = JSON.parse(data);
      console.log(userData.length);
      userData.forEach(ele => {
        console.log(ele.id+'와'+user.id+'를 비교');
        console.log(ele.id==user.id);
        if(ele.id==user.id){
          resolve(utils.fail(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID))
          flag=1;
        }
        else{
          return userData;
        }
      });
    });
  }
};