var express = require('express');
var router = express.Router();

router.use('/users',require('./api/users'));
router.use('/blog',require('./api/blog'));

router.get('/',function(req,res,nect){
  res.send(`
  index
  `);
});

module.exports = router;
