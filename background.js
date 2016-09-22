//fired when the DOM of heroesandgenerals.com is loaded
chrome.webNavigation.onDOMContentLoaded.addListener(res=>{
	console.log("in H&G website");
	chrome.pageAction.show(res.tabId);
	console.log("inject style");
	chrome.tabs.executeScript(res.tabId, {file: "inject/style.js"});
	console.log("inject precedence");
	chrome.tabs.executeScript(res.tabId, {file: "inject/subforum_precedence.js"})
});
