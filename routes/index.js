var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
// Kike por el curso
//res.render('index', { title: 'Express' });
  res.render('index', { title: 'Quiz' });
});

module.exports = router;
