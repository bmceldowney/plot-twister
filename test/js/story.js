var chai = require('chai');
var expect = chai.expect;

describe('story', function () {
	var story;
	var testData;
	var context;

	beforeEach(function () {
		story = require('../../js/story');
		testData = {"passages":[{"macros":[{"macros":[], "links":[], "else":[], "expression":"$started = true", "type":"set", "content":""}], "links":[{"text":"Go on", "target":"go"}], "content":"<<0>>\nHere is the start.\n\n[[0]]\n\n\n", "id":"Start", "tags":[]}, {"macros":[{"macros":[], "links":[], "else":[], "expression":"$started", "type":"if", "content":"And you've started!"}], "links":[], "content":"You're here!\n\n<<0>>\n\n\n", "id":"go", "tags":[]}]};
		context = { started: false };
	});

	describe('get()', function () {
		it('should throw and error if no data or context is passed', function () {

			expect(story.get).to.throw();
			expect(function () { story.get(testData); }).to.throw();
		});

		it('should return a new story object', function () {
			var instance = story.get(testData, context);

			expect(instance).to.have.property('getCurrentPassage');
			expect(instance).to.have.property('chooseLink');
			expect(instance._passages.length).to.equal(2);
			expect(instance._context).to.equal(context);
			expect(instance._currentPassageIndex).to.equal(0);
		});
	});

	describe('instance', function () {
		var instance;
		var passage;
		var content;

		beforeEach(function () {
			instance = story.get(testData, context);
			passage = instance.getCurrentPassage();
			content = passage.getContent();
		});

		describe('getCurrentPassage()', function () {
			it('should return a parsed passage', function () {
				expect(instance._context.started).to.equal(true);
				expect(content).to.equal('\nHere is the start.\n\n\n\n\n');
			});
		});

		describe('chooseLink()', function () {
			it('should advance the current passage', function () {
				instance.chooseLink('go');

				passage = instance.getCurrentPassage();
				content = passage.getContent();

				expect(content).to.equal('You\'re here!\n\nAnd you\'ve started!\n\n\n');
			});

			it('should throw an error if an invalid target is passed', function () {
				var thrower = function () {
					instance.chooseLink('gorb');
				};

				expect(thrower).to.throw();
			});
		});
	});
});
