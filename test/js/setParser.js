var expect = require('chai').expect;

describe('setParser', function () {
	var parser;
	var data;
	var context;

	beforeEach(function () {
		data = {"macros":[], "links":[], "else":[], "expression":"$started = true", "type":"set", "content":""};
		context = { started: false };
		parser = require('../../js/setParser');
	});

	describe('parse()', function () {
		it('should apply a set macro', function () {
			var result = parser.parse(data, context);

			expect(result).to.equal('');
			expect(context.started).to.equal(true);
		});

		it('should handle multiple set conditions', function () {
			data = {"macros":[], "links":[], "else":[], "expression":"$started = true; $reputation to 4; $balls = \"party\"", "type":"set", "content":""};
			var result = parser.parse(data, context);

			expect(result).to.equal('');
			expect(context.started).to.equal(true);
			expect(context.reputation).to.equal(4);
			expect(context.balls).to.equal('party');
		});
	});
});
