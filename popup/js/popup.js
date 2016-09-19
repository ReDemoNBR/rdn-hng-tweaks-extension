document.addEventListener("DOMContentLoaded", onLoad);


function onLoad(){
  getTabURL((url)=>/\/forums\/topic\//i.test(url) && document.getElementById("btnLockTopic").setAttribute("style", "display:inline"));
  document.getElementById("btnOptions").addEventListener("click", ()=>chrome.runtime.openOptionsPage());
}


function getTabURL(cb) {
  chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>cb(tabs[0].url));
}


function getDomain(url){
  return /\/\/(.*?)(\/|$)/i.exec(url)[1];
}
