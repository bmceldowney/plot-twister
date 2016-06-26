/*@flow*/
var parseExpression = function (expression) {
  var operatorMap = {
    to  : '=',
    is  : '==',
    neq : '!=',
    gt  : '>',
    lt  : '<',
    and : '&&',
    or  : '||'
  };

  expression = expression.replace(/\$/g, 'context.');
  var matches = expression.match(/('.*?'|".*?"|\S+)/g);
  if (!matches) { return true; } // no expression, let it pass

  for (var i = 0; i < matches.length; i++) {
    matches[i] = operatorMap[matches[i]] || matches[i];
  }

  expression = matches.join(' ');
  return expression;
};

var evaluateExpression = function (expression, context) {
  var innerExpression = 'return '.concat(expression);
  var exec = new Function("context", innerExpression);

  return exec(context);
};


module.exports = {
  type                : 'parser',
  evaluateExpression  : evaluateExpression,
  parseExpression     : parseExpression
};
