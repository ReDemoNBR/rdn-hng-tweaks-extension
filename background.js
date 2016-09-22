//fired when the DOM of heroesandgenerals.com is loaded
chrome.webNavigation.onCompleted.addListener(
	res=>chrome.pageAction.show(res.tabId) || chrome.tabs.executeScript(res.tabId, {file: "inject/style.js"}) || chrome.tabs.executeScript(res.tabId, {file: "inject/subforum_precedence.js"})
);
