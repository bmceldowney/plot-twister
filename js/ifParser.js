/*@flow*/
var parser = require('./parser');

function parse(macro, context) {
  var elseIndex = 0;
  var retval = '';
  var expression;

  expression = parser.parseExpression(macro.expression);
  retval = parser.evaluateExpression(expression, context) ? macro.content : '';

  if (retval !== '') { return retval; }

  while (elseIndex < macro.else.length && retval === '') {
    expression = parser.parseExpression(macro.else[elseIndex].expression);
    retval = parser.evaluateExpression(expression, context) ? macro.else[elseIndex].content : '';
    if (retval !== '') { return retval; }

    elseIndex++;
  }

  return retval;
}

module.exports = {
  parse: parse
};
