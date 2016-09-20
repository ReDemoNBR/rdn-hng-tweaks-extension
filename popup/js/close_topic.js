document.addEventListener("DOMContentLoaded", ()=>getTab(function(tab){
  if(/heroesandgenerals.com\/forums\/topic\//i.test(tab.url)){
    let btn = document.getElementById("btnLock").addEventListener("click", ()=>chrome.tabs.executeScript(tab.id, {file: "lock_topic.js"}, ()=>window.open("popup.html", "_self")));
    let name = / \- (.*)$/i.exec(tab.title)[1];
    document.getElementById("divAreYouSure").innerHTML = "The topic might not get completely locked if it has more than 1 page.<br>Are you sure you want to close the topic <i>\""+name+"\"</i> ?";
  }
}));


function getTab(cb){
  chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>cb(tabs[0]));
}
