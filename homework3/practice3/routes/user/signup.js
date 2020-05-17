var express = require('express');
var router = express.Router();
const utils = require('../../utils/utils');
const responseMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const user = require('../../model/user');

//회원가입
router.post('/',(req,res)=>{
  const {id,name,pwd,email}=req.body;
  user.signUp(id,name,pwd,email)
  .then(({code,json}) => {
    console.log(code,json);
    res.status(code).send(json);
  })
  .catch((err)=>{
    console.log(err);
    res.status(statusCode.NOT_FOUND)
    .send(utils.fail(statusCode.NOT_FOUND,responseMessage.LOGIN_FAIL));
  });
});

module.exports = router;