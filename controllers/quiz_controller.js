// GET /quizes/question
exports.question = function(req, res) {
  var resultado = 'Incorrecto';
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};
// GET /quizes/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === 'Roma') {
    res.render('quizes/answer', {respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};