/*@flow*/
var parser = {};

var parsers = {
  if: require('./ifParser'),
  set: require('./setParser')
};

parser.parse = function (story, context) {
  var that = this;
  var retval;
  var resolvedMacros = story.macros.map(this.getResolver.call(this, context));

  retval = story.content.replace(/<<([0-9]*)>>/g, function(match, parameter){
    return resolvedMacros[parameter];
  });

  // ignoring links for now, not supporting links inline yet
  retval = retval.replace(/\[\[([0-9]*)\]\]/g, '');

  return retval;
};

parser.getResolver = function (context) {
  return function (macro, index) {

    macro.macros.forEach(function (innerMacro) {
      macro.content = this.parse(macro, context);
    }.bind(this));

    var parser = parsers[macro.type];
    if (!parser) return;
    var retval = parser.parse(macro, context);

    return retval;
  }.bind(this);
};

function get (options) {
  var instance = Object.create(parser);

  options = options || {};
  instance.showLinkText = options.showLinkText || false;

  return instance;
}

module.exports = {
  get: get
};
