//fired when the DOM of heroesandgenerals.com is loaded
chrome.webNavigation.onDOMContentLoaded.addListener(function(res) {
	chrome.tabs.executeScript(res.tabId, {file: "inject/style.js"});
	chrome.tabs.executeScript(res.tabId, {file: "inject/subforum_precedence.js"});
},
{
	url: [{urlContains: 'heroesandgenerals.com/'}],
});
