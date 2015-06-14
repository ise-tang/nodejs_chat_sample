var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hoge");
  res.render('chat', { title: 'Exp' });
});

module.exports = router;
