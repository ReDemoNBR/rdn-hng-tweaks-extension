(function(){
	document.title = document.title.replace(/heroes \& generals/i, "H&G Forum").replace(/ - moderator sub-fora/gi, "");
	//get his options to hide the non english subforum from chrome sync and sets the hideNonEnglish function as a callback
	var forum = /forum/i.test(document.title) && true || false;
	if(forum){
		chrome.storage.sync.get("hide_non_english", hideNonEnglish);
		var listening = document.getElementById("bbp-forum-1145121");
		if(listening){
			listening.innerHTML = listening.innerHTML.replace(/we are listening\. influence/gi, "We are NEVER listening. You don't influence");
		}
		//resizes the player profile image to 200px
		var imgs = document.body.getElementsByTagName("img");
		for(var i=0; i<imgs.length; i++){
			if([imgs[i].parentElement.parentElement.className, imgs[i].parentElement.className].indexOf("forum-sidebar-user-info-avatar align-center")!=-1){
				imgs[i].src = imgs[i].src.replace(/s=80/gi, "s=200");
				imgs[i].width = "200";
				imgs[i].height = "200";
			}
		}
	}
	//change stylesheet
	//changes include: new fonts, font size increase, background image removal, element resizes and hiding
	var style = document.createElement("style");
	style.innerHTML = `@import 'https://fonts.googleapis.com/css?family=Open+Sans|Roboto';*:not(.fa):not(.dashicons){font-family:"Roboto","Open Sans",Arial,Helvetica,sans-serif !important;}
	.menu-fixed .site-menu{width:calc(100% - 17px)} .promobar{display:none} .wrap{overflow-x:hidden;overflow-y:auto} .sidebar{max-width:400px} .row{max-width:`+(forum?"initial":"1200px")+`}
	.bbp-forum-link-list-header{padding:5px} .bbp-forum-link-list{display:block} .bbp-forum-link-title{display:inline} .bbp-forum-last-post{display:inline;float:right} .bbp-forum-link{padding:5px 20px}
	h3.forum-sidebar-user-info-name a{font-size:200%} body{background-color:#202329} h1,h2,h3,h4,h5,h6{text-transform:none} h1,h2,h3{font-variant:small-caps;font-weight:600} div.bbp-reply-content
	h6{font-weight:normal !important;font-size:1rem !important} .username{font-variant:normal} a.forum-sidebar-user-menu-item{text-transform:none;font-variant:small-caps} .gdbbx-footer-meta{overflow:hidden}
	.bbp-thanks-list a{text-decoration:none}`;
	document.head.appendChild(style);
	var styles = document.documentElement.getElementsByTagName("style");
	for(var i=0; i<styles.length; i++){
		styles[i].innerHTML = styles[i].innerHTML.replace(/(background-image: ).*(;)/gi, "$1 none$2");
	}

	//remove certain texts
	var magnificent = document.getElementById("text-2");
	magnificent.innerHTML = magnificent.innerHTML.replace(/the heart of magnificent copenhagen/gi, "Copenhagen");
})();


//removes the selected non-english subforum from the forums
function hideNonEnglish(value){
	//checks if there is no value stored or if this is not the forum homepage
	var container = document.getElementById("bbp-forum-1145157");
	if(!value || !value.hide_non_english || !container){
		return;
	}

	//remove the elements
	var list = JSON.parse(value.hide_non_english);
	var divNonEnglish = container.getElementsByClassName("bbp-forum-link-list")[0];
	var children = divNonEnglish.children;
	for(var i=children.length-1; i>=0; i--){
		let text = children[i].textContent.trim().replace(/\s+/g, " ");
		text = text.substring(0, text.indexOf(" ")).toLowerCase();
		for(let j=0; j<list.length; j++){
			if(new RegExp(list[j],"gi").test(text)){
				divNonEnglish.removeChild(children[i]);
				break;
			}
		}
	}
}
