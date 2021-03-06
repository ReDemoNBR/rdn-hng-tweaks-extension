document.addEventListener("DOMContentLoaded", ()=>getTab(tab=>{
  let div = document.getElementById("divAreYouSure"), btn = document.getElementById("btnLock");
  if(/heroesandgenerals.com\/forums\/topic\//i.test(tab.url)){
    div.innerHTML = "The topic might not get completely locked if it has more than 1 page.<br>Are you sure you want to close the topic <i>\""
    +(/ \- (.*)$/i.exec(tab.title)[1])+"\"</i> ?";
    btn.addEventListener("click", ()=>chrome.tabs.executeScript(tab.id, {file: "lock_topic.js"}, ()=>window.open("popup.html", "_self")));
  }
  else{
    div.innerHTML = "You are not in a topic page in H&G forum";
    btn.style.display = "none";
  }
}));


function getTab(cb){
  chrome.tabs.query({active:true, currentWindow:true}, tabs=>cb(tabs[0]));
}
