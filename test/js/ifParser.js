var chai = require('chai');
var should = chai.should();

describe('ifParser', function () {
	var ifParser;
	var text;
	var context;
	var macro;

	beforeEach(function () {
		macro = {
			"type": "if",
			"expression": "$reputation > 4",
			"startIndex": 12,
			"endIndex": 227,
			"innerStartIndex": 33,
			"content": "\nYou seem like just the type for this sort of thing.\n",
			"contentStart": 33,
			"macros": [],
			"links": [],
			"else": [
				{
					"macros": [],
					"links": [],
					"else": [],
					"type": "else",
					"expression": "$reputation < 0",
					"startIndex": 87,
					"endIndex": 112,
					"content": "\nOr maybe I'm better off asking someone else...\n"
				},
				{
					"macros": [],
					"links": [],
					"else": [],
					"type": "else",
					"expression": "$reputation == 3",
					"startIndex": 161,
					"endIndex": 168,
					"content": "\nI'm apprehensive, but willing to give you a try.\n"
				}
			]
		};
		ifParser = require('../../js/ifParser.js');
	});

	describe('#parse', function () {
		it('should correctly parse a macro object', function () {
			var context = {
				reputation: -1
			};

			ifParser.parse(macro, context).should.equal(macro.else[0].content);

			context.reputation = 3;
			ifParser.parse(macro, context).should.equal(macro.else[1].content);

			context.reputation = 5;
			ifParser.parse(macro, context).should.equal(macro.content);

			context.reputation = 2;
			ifParser.parse(macro, context).should.equal('');
		});
	});
});
