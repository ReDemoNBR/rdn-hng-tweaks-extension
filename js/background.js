//fired when the DOM of heroesandgenerals.com is loaded
console.log("background");
chrome.webNavigation.onDOMContentLoaded.addListener(function(res) {
	chrome.tabs.executeScript(res.tabId, {file: "js/load_style.js"});
	chrome.tabs.executeScript(res.tabId, {file: "js/load_subforum_precedence.js"});
});
