var express = require('express');
var router = express.Router();
const responseMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const user = require('../../model/user');

//로그인
router.post('/',(req,res)=>{
  const {id,pwd}=req.body;
  user.logIn(id,pwd)
  .then(({code,json}) => {
    res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.NOT_FOUND)
      .send(utils.fail(statusCode.NOT_FOUND,responseMessage.LOGIN_FAIL));
  });
});

module.exports = router;