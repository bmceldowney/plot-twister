var expect = require('chai').expect;

describe('passage', function () {
  var passage;
  var data;
  var context;

  beforeEach(function () {
    passage = require('../../js/passage');
    data = {"macros":[{"macros":[], "links":[], "else":[], "expression":"$started = true", "type":"set", "content":""}], "links":[{"text":"Go on", "target":"go"}], "content":"<<0>>\nHere is the start.\n\n[[0]]\n\n\n", "id":"Start", "tags":[]};
    context = { started: false };
  });

  describe('get()', function () {
    it('should return a new passage object', function () {
      var instance = passage.get(data, context);

      expect(instance).to.have.property('getContent');
      expect(instance).to.have.property('getLinks');
      expect(instance._data).to.equal(data);
      expect(instance._context).to.equal(context);
    });
  });

  describe('instance', function () {
    var instance;

    beforeEach(function () {
      instance = passage.get(data, context);
    });

    describe('getContent()', function () {

      it('should return the content of the passage', function () {
        expect(context.started).to.equal(false);

        var content = instance.getContent();

        expect(content).to.equal('\nHere is the start.\n\n\n\n\n');
        expect(context.started).to.equal(true);
      });
    });

    describe('getLinks', function () {
      it('should get a collection of links for the passage', function () {
        var links = instance.getLinks();

        expect(links.length).to.equal(1);
        expect(links[0].text).to.equal('Go on');
        expect(links[0].target).to.equal('go');
      });
    });
  });
});
