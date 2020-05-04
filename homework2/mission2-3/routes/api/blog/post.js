var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('글을 등록하였다.');
});

module.exports = router;
