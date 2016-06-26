/*@flow*/
var parser = require('./parser');

var parse = function (macro, context) {
  if (!macro) throw new Error('setParser(): "macro" prameter is undefined');
  if (!context) throw new Error('setParser(): "context" prameter is undefined');

  if (!macro.expression) throw new Error('setParser(): "macro.expression" is undefined');

  var tokens = macro.expression.split(';');

  tokens.forEach(function (expression) {
    var parsedExpression = parser.parseExpression(expression);
    parser.evaluateExpression(parsedExpression, context);
  });

  return '';
};

module.exports = {
  parse: parse
};
