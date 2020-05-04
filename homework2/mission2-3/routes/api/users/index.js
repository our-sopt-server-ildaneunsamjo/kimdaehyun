var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/signin', require('./signup'));

module.exports = router;