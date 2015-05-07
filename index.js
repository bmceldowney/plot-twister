// this is the API for pot twister
// 
// twister.loadStory(filePath, context) - returns a new PlotTwister story object populated with data from a file
// 

// Story class:
// 
// ** methods
// story.getCurrentPassage() - returns a PlotTwister passage object for the current passage
// story.chooseLink(index) - returns a the passage object for indicated link
// 
// 
// Passage class:
// ** methods
// passage.getContent() - the content to display
// passage.getLinks() - the available links
// 

function loadStory (filePath, context) {

}

module.exports = {
	loadStory: loadStory
}