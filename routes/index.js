var express = require('express');
var router = express.Router();

// K:importar quiz_controller.js
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
// Kike por el curso
  res.render('index', { title: 'K-Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// K: Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', 				   quizController.new);
router.post('/quizes/create',              quizController.create);

// K: Definición de rutas de /author
router.get('/author', 				function(req, res, next) {
// Kike para el curso ejercicio
  res.render('author', { title: 'K-Quiz' });
});

module.exports = router;
