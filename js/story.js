var passage = require('./passage');
var story = {};

/**
 * Gets the current passage for the story
 * @return {passage} the current passage
 */
story.getCurrentPassage = function () {
	var passageData = this._passages[this._currentPassageIndex];
	var retval = passage.get(passageData, this._context);

	return retval;
};

/**
 * Chooses one of the links for the current passage
 * @param  {String} linkTarget the name of the target to choose
 */
story.chooseLink = function (linkTarget) {
	var indexFound;

	this._passages.some(function (passage, index) {
		if (passage.id === linkTarget) {
			this._currentPassageIndex = index;
			indexFound = true;
			return indexFound;
		}

		return false;
	}, this);

	if (!indexFound) throw new Error('Link "' + linkTarget + '" not found');
};

function get (data, context) {
	if (!data) throw new Error('Error initializing story: data parameter must not be undefined.');
	if (!context) throw new Error('Error initializing story: context parameter must not be undefined.');

	var instance = Object.create(story);
	instance._passages = data.passages;
	instance._context = context;
	instance._currentPassageIndex = 0;

	return instance;
}

module.exports = {
	get: get
};
