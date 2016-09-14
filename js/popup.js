document.addEventListener("DOMContentLoaded", function() {
  getTabURL(function(url) {
    if(/heroesandgenerals.com/i.test(url)){
      if(/\/forums\/topic\//i.test(url)){
        let btn = document.getElementById("btnLockTopic");
        btn.style.display = "inline";
      }
    }
    else{
      document.getElementById("divStatus").innerHTML = "Not in H&G site, extension makes no effect";
    }
  });
});


function getTabURL(cb) {
  chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>cb(tabs[0].url));
}


function getDomain(url){
  return /\/\/(.*?)(\/|$)/i.exec(url)[1];
}
