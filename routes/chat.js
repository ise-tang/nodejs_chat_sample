var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:room_name', function(req, res, next) {
  console.log("hoge");
  res.render('chat', { title: req.params.room_name });
});

module.exports = router;
