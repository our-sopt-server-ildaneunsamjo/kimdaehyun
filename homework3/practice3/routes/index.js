var express = require('express');
var router = express.Router();

//게시판
router.use('/board', require('./board'));
//회원가입
router.use('/user', require('./user'));

module.exports = router;