const utils = require('../utils/utils');
const responseMessage = require('../utils/responseMessage');
const statusCode = require('../utils/statusCode');
const fs = require('fs');
const dummyBoardURL = './dummyDB/dummyBoard.txt'

module.exports = {
  getAllBoard : () => {
    return new Promise((resolve,reject)=>{
      fs.readFile(dummyBoardURL,'utf-8',(err,data)=>{
        if(err){
          resolve({
            code: statusCode.DB_ERROR,
            json: utils.fail(statusCode.DB_ERROR,responseMessage.REGIST_ALL_FAIL)
          });
        }else{
          console.log(data);
          const boardJson = JSON.parse(data);
          if(boardJson){
            resolve({
              code: statusCode.OK,
              json: utils.success(statusCode.OK,responseMessage.REGIST_ALL_SUCCESS,boardJson)
            });
          }else{
            resolve({
              code: statusCode.DB_ERROR,
              json: utils.fail(statusCode.DB_ERROR,responseMessage.REGIST_ALL_FAIL)
            });
          }  
        }
      });
    });
  },
  getBoard: (no)=>{
    return new Promise((resolve,reject)=>{
      fs.readFile(dummyBoardURL,'utf-8',function(err,data){
        if(err){
          resolve({
            code: statusCode.DB_ERROR,
            json: utils.fail(statusCode.DB_ERROR,responseMessage.REGIST_ALL_FAIL)
          });
        }else{
          const boardJson = JSON.parse(data);
          boardJson.forEach(element => {
            if(element.no==no){
              resolve({
                code: statusCode.OK,
                json: utils.success(statusCode.OK,responseMessage.REGIST_SUCCESS,element)
              });
            }
          });
        }
      });
    })
  },
  newBoard:(userId,text)=>{
    return new Promise((resolve,reject)=>{
      fs.readFile(dummyBoardURL,'utf-8',(err,data)=>{
        if(err){
          resolve({
            code: statusCode.NO_CONTENT,
            json: utils(statusCode.NO_CONTENT,responseMessage.POST_FAIL)
          });
        }
        let boardJson = JSON.parse(data);
        if(boardJson){
          let no = boardJson.length+1;
          boardJson.push({no,userId,text});
        }else{
          resolve({
            code:statusCode.INTERNAL_SERVER_ERROR,
            json:fail(statusCode,INTERNAL_SERVER_ERROR,responseMessage.POST_FAIL)
          })
        }
        fs.writeFile(dummyBoardURL,JSON.stringify(boardJson),'utf-8',(err)=>{
          if(err){
            resolve({
              code: statusCode.DB_ERROR,
              json: utils.fail(statusCode.DB_ERROR,responseMessage.POST_FAIL)
            });
          }else{
            resolve({
              code: statusCode.OK,
              json: utils.success(statusCode.OK,responseMessage.POST_SUCCESS)
            });
          }
        });
      });
    });
  },
  updateBoard:(no,text)=>{
    return new Promise((resolve,reject)=>{
      fs.readFile(dummyBoardURL,'utf-8',(err,data)=>{
        if(err){
          resolve({
            code: statusCode.NO_CONTENT,
            json: utils(statusCode.NO_CONTENT,responseMessage.POST_UPDATE_FAIL)
          });
        }
        let boardJson = JSON.parse(data);
        if(boardJson){
          console.log(boardJson[no-1]);
          boardJson[no-1].text=text;
        }else{
          resolve({
            code:statusCode.INTERNAL_SERVER_ERROR,
            json:fail(statusCode,INTERNAL_SERVER_ERROR,responseMessage.POST_UPDATE_FAIL)
          })
        }
        fs.writeFile(dummyBoardURL,JSON.stringify(boardJson),'utf-8',(err)=>{
          if(err){
            resolve({
              code: statusCode.DB_ERROR,
              json: utils.fail(statusCode.DB_ERROR,responseMessage.POST_UPDATE_FAIL)
            });
          }else{
            resolve({
              code: statusCode.OK,
              json: utils.success(statusCode.OK,responseMessage.POST_UPDATE_SUCCESS)
            });
          }
        });
      });
    })
  },
  deleteBoard: (no) =>{
    console.log(no);
    return new Promise((resolve,reject)=>{
      fs.readFile(dummyBoardURL,'utf-8',(err,data)=>{
        if(err){
          resolve({
            code: statusCode.NO_CONTENT,
            json: utils(statusCode.NO_CONTENT,responseMessage.POST_FAIL)
          });
        }
        let boardJson = JSON.parse(data);
        if(boardJson){
          boardJson = boardJson.filter(element=>{
            return element.no!=no;
          }).map(element=>{
            console.log(element);
            if(element.no>no){
              element.no-=1;
              return element;
            }else{
              return element;
            }
          },data=>{
            console.log(data);
          });
        }else{
          resolve({
            code:statusCode.INTERNAL_SERVER_ERROR,
            json:fail(statusCode,INTERNAL_SERVER_ERROR,responseMessage.POST_FAIL)
          })
        }
        fs.writeFile(dummyBoardURL,JSON.stringify(boardJson),'utf-8',(err)=>{
          if(err){
            resolve({
              code: statusCode.DB_ERROR,
              json: utils.fail(statusCode.DB_ERROR,responseMessage.POST_FAIL)
            });
          }else{
            resolve({
              code: statusCode.OK,
              json: utils.success(statusCode.OK,responseMessage.POST_SUCCESS)
            });
          }
        });
      });
    })
  }
}