var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("chat");
  res.render('chat', { title: req.params.room_name });
});

module.exports = router;
