document.addEventListener("DOMContentLoaded", function(){
  getTab(function(tab){
    let div = document.getElementById("divAreYouSure");
    if(/heroesandgenerals.com\/forums\/topic\//i.test(tab.url)){
      let btn = document.getElementById("btnLock").addEventListener("click", ()=>injectLockTopic(tab.id));
      let name = / \- (.*)$/i.exec(tab.title)[1];
      div.innerHTML = "Are you sure you want to close the topic <i>\""+name+"\"</i>?";
    }
    else{
      div.innerHTML = "You are not in a topic in H&G forum that contains up to 24 posts";
    }
  });
});


function getTab(cb) {
  chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>cb(tabs[0]));
}


function injectLockTopic(tabId){
  chrome.tabs.executeScript(tabId, {file: "lock_topic.js"}, ()=>window.open("popup.html", "_self"));
}
