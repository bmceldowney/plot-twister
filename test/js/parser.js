var should = require('chai').should();

describe('parser', function () {
  var parser;

  beforeEach(function () {
    parser = require('../../js/parser');
  });

  describe('evaluateExpression()', function () {
    it('should evaluate a string expression', function () {
      var context = {
        'false': false,
        'value': 5,
        'isclauseis': 'this is the is clause'
      };

      var expression = "context.isclauseis === 'this is the is clause'";
      parser.evaluateExpression(expression, context).should.equal(true);
    });
  });

  describe('parseExpression()', function () {
    it('should correctly parse "is"', function () {
      var expression = '$false is true';
      parser.parseExpression(expression).should.equal('context.false == true');

      expression = '$value is 5';
      parser.parseExpression(expression).should.equal('context.value == 5');

      expression = "$isclauseis is 'this is the is clause'";
      parser.parseExpression(expression).should.equal("context.isclauseis == 'this is the is clause'");

      expression = "$isclauseis is $isclauseis";
      parser.parseExpression(expression).should.equal("context.isclauseis == context.isclauseis");

      expression = "$isclauseis == 'this is my isclause'";
      parser.parseExpression(expression).should.equal("context.isclauseis == 'this is my isclause'");
    });

    it('should correctly parse "neq"', function () {
      var expression = '$neqClause neq "neq is soo uneqe"';
      parser.parseExpression(expression).should.equal('context.neqClause != "neq is soo uneqe"');
    });

    it('should correctly parse "gt"', function () {
      var expression = '$gtClause gt 5';
      parser.parseExpression(expression).should.equal('context.gtClause > 5');
    });

    it('should correctly parse "lt"', function () {
      var expression = '$ltClause lt 5';
      parser.parseExpression(expression).should.equal('context.ltClause < 5');
    });

    it('should correctly parse "and"', function () {
      var expression = '$value is "this and that" and $ltClause lt 5';
      parser.parseExpression(expression).should.equal('context.value == "this and that" && context.ltClause < 5');
    });

    it('should correctly parse "or"', function () {
      var expression = '$value is "this or that" or $ltClause lt 5';
      parser.parseExpression(expression).should.equal('context.value == "this or that" || context.ltClause < 5');
    });
  });
});
