/*@flow*/
var storyParser = require('./storyParser');
var passage = {};

/**
 * Gets the parsed content for the passage
 * @return {string} the passage content
 */
passage.getContent = function () {
  var text = this._parser.parse(this._data, this._context);

  return text;
};

passage.getLinks = function () {
  return this._data.links;
};

function get (data, context) {
  var instance = Object.create(passage);

  instance._data = data;
  instance._context = context;
  instance._parser = storyParser.get();

  return instance;
}

module.exports = {
  get: get
};
