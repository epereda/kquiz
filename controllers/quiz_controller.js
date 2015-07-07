var models = require('../models/models.js');

// GET /quizes/index
exports.index = function(req, res) {
  var options = {};
  if(req.query.search){
  	options.where= ["pregunta like ?", "%"+req.query.search.replace(/\s/g,"%")+"%" ];
  	options.order= "pregunta" ;
  }
  models.Quiz.findAll(options).then( function(quizes) {
	res.render('quizes/index.ejs', {quizes: quizes});
  })
};
// GET /quizes/show
exports.show = function(req, res) {
  models.Quiz.find({where:{id: Number(req.params.quizId)}}).then( function(quiz) {
	res.render('quizes/show', {quiz: quiz});
  })
};
// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.find({where:{id: Number(req.params.quizId)}}).then( function(quiz) {
	  if (req.query.respuesta === quiz.respuesta) {
	    res.render('quizes/answer', { quiz:quiz, respuesta: 'Correcto'});
	  } else {
	    res.render('quizes/answer', { quiz:quiz,respuesta: 'Incorrecto'});
	  }
  })
};