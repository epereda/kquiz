var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye un :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment
            }]
          }).then(function(quiz) {
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
	res.render('quizes/index.ejs', {quizes: quizes, errors: []});
  }).catch(function(error){next(error)});
};

// GET /quizes/show
exports.show = function(req, res) {
  models.Quiz.find({where:{id: Number(req.params.quizId)},
            include: [{
                model: models.Comment
            }]
}).then( function(quiz) {
	res.render('quizes/show', {quiz: quiz, errors: []});
  })
};
// GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
  	}
	res.render(
	    'quizes/answer', 
	    { quiz: req.quiz, 
	      respuesta: resultado, 
	      errors: []
	    }
    );
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz 
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
  	function(err) {
  	  if (err) {
  	  	res.render('/quizes/new',{quiz: quiz, errors: err.errors});
  	  } else {
  		quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')});
        // res.redirect: Redirección HTTP a lista de preguntas
       }
    }
  );
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz // Autoload de instancia de quiz
    
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema      = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta, respuesta y tema en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  ).catch(function(error){next(error)});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

//  console.log("req.quiz.id: " + req.quiz.id);