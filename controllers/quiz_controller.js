var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye un :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            }}).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes/index
exports.index = function(req, res) {
  var options = {};
  if(req.query.search){
  	options.where= ["pregunta like ?", "%"+req.query.search.replace(/\s/g,"%")+"%" ];
  	options.order= "pregunta" ;
  }
  models.Quiz.findAll(options).then( function(quizes) {
	res.render('quizes/index.ejs', {quizes: quizes});
  }).catch(function(error){next(error)});
};
// GET /quizes/show
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};
// GET /quizes/answer
exports.answer = function(req, res) {
	var resultado='Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
	    resultado='Correcto';
    } 
    res.render('quizes/answer', { quiz:req.quiz, respuesta: resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz 
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')});
        // res.redirect: Redirección HTTP a lista de preguntas
};