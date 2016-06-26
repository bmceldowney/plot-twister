var chai = require('chai');
var should = chai.should();

describe('storyParser', function () {
  var storyParser;
  var data;
  var context;

  beforeEach(function () {
    storyParser = require('../../js/storyParser.js');
    context = {
      reputation: -1
    };
    data = { "macros":[ { "macros":[ { "macros":[], "links":[], "else":[ { "macros":[], "links":[], "else":[], "expression":"$reputation < 0", "startIndex":115, "endIndex":140, "type":"else", "content":"\nOr maybe I'm better off asking someone else...\n" }, { "macros":[], "links":[], "else":[], "expression":"", "startIndex":189, "endIndex":196, "type":"else", "content":"\nI'm apprehensive, but willing to give you a try.\n" } ], "expression":"$reputation > 4", "startIndex":40, "endIndex":255, "type":"if", "content":"\nYou seem like just the type for this sort of thing.\n", "innerStartIndex":61, "contentStart":61 } ], "links":[], "else":[], "expression":"$spotty is 'bockchoy'", "startIndex":12, "endIndex":306, "type":"if", "content":"<<0>>This bockchoy is not NEARLY spotty enough.", "innerStartIndex":39, "contentStart":39 } ], "links":[ { "startIndex":309, "text":"Why can’t you talk to him?", "target":"Why", "endIndex":342 }, { "startIndex":344, "text":"What’s it worth to you?", "target":"HowMuch", "endIndex":378 } ], "content":"This content<<0>>\n\n[[0]]\n[[1]]\n", "contentStart":-1 };
  });

  describe('init()', function () {
    it('should take a configuration object', function () {
      var opts = {
        showLinkText: true
      };

      var parser = storyParser.get(opts);

      parser.showLinkText.should.equal(true);
    });
  });

  describe('parse()', function () {
    it('should parse a story fragment', function () {
      var context = {
        reputation: -1,
        spotty: 'bockchoy'
      };

      var parser = storyParser.get();
      var story = parser.parse(data, context);

      story.should.equal("This content\nOr maybe I'm better off asking someone else...\nThis bockchoy is not NEARLY spotty enough.\n\n\n\n");
    });
  });
});
