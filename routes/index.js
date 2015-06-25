var express = require('express');
var router = express.Router();

// K:importar quiz_controller.js
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
// Kike por el curso
//res.render('index', { title: 'Express' });
  res.render('index', { title: 'K-Quiz' });
});

// K: Definición de rutas de /quizes
router.get('/quizes/question', 				quizController.question);
router.get('/quizes/answer', 				quizController.answer);

// K: Definición de rutas de /author
router.get('/author', 				function(req, res, next) {
// Kike para el curso ejercicio
  res.render('author', { title: 'K-Quiz' });
});

module.exports = router;
