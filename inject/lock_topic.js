(function(){
  let path = location.pathname;
  let status = document.getElementById("divStatus");
  if(!/forums\/topic\//gi.test(path)){
    status.innerHTML = "Can not close. Please enter in a in H&G Forum.";
    setTimeout(()=>status.innerHTML="", 5000);
    return;
  }
  let postCount = document.getElementsByClassName("bbp-pagination-count")[0].textContent.trim().replace(/\s+/g, " ");
  let num = Number(/\(of (.*) total\)/.exec(postCount)[1]);
  if(num<25){
    document.getElementById("bbp_reply_content").value = '<div class="modal"><div class="modal-dialog modal-content">Topic locked</div></div>';
    document.getElementById('new-post').submit();
  }
  else {
    status.innerHTML = "The topic must have up to 24 posts";
  }
})();
