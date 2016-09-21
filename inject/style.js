(function(){
	let forum = /forums/i.test(location.pathname);
	document.title = forum && document.title.replace(/heroes \& generals/i, "H&G Forum").replace(/ - moderator sub-fora/gi, "") || document.title.replace(/heroes \& generals/gi, "H&G");
	if(forum){
		chrome.storage.sync.get("hide_forum", setOptions);
		let listening = document.getElementById("bbp-forum-1145121");
		if(listening){
			listening.innerHTML = listening.innerHTML.replace(/we are listening\. influence/gi, "We are NEVER listening. You don't influence");
		}
	}
	else{
		let imgs = document.body.getElementsByTagName("img");
		let i = imgs.length;
		while(i--){
			imgs[i].removeAttribute("sizes");
		}
	}
	//resizes the player profile image to 200px
	let asides = document.body.getElementsByTagName("aside");
	let i = asides.length;
	while(i--){
		let imgs = document.body.getElementsByTagName("img");
		let j = imgs.length;
		while(j--){
			if([imgs[j].parentElement.parentElement.className, imgs[j].parentElement.className].indexOf("forum-sidebar-user-info-avatar align-center")!=-1){
				imgs[j].src = imgs[j].src.replace(/s=80/gi, "s=200");
				imgs[j].width = imgs[j].height = "200";
			}		}
	}
	//change stylesheet
	//changes include: new fonts, font size increase, background image removal, element resizes and hiding
	let injectStyle = document.createElement("style");
	injectStyle.innerHTML = `@import 'https://fonts.googleapis.com/css?family=Open+Sans|Roboto';*:not(.fa):not(.dashicons){font-family:"Roboto","Open Sans",Arial,Helvetica,sans-serif !important;}
	.menu-fixed .site-menu{width:calc(100% - 17px)} .promobar{display:none} .wrap{overflow-x:hidden;overflow-y:auto} .sidebar{max-width:400px} .row{max-width:`
	+(/gallery/i.test(location.pathname)?"1200px":"initial")+`} .bbp-forum-link-list-header{padding:5px} .bbp-forum-link-list{display:block} .bbp-forum-link-title{display:inline}
	.bbp-forum-last-post{display:inline;float:right} .bbp-forum-link{padding:5px 20px} h3.forum-sidebar-user-info-name a{font-size:200%} body{background-color:#202329} h1,h2,h3,h4,h5,h6{text-transform:none}
	h1,h2,h3{font-variant:small-caps;font-weight:600} div.bbp-reply-content h6{font-weight:normal !important;font-size:1rem !important} .username{font-variant:normal}
	a.forum-sidebar-user-menu-item{text-transform:none;font-variant:small-caps} .gdbbx-footer-meta{overflow:hidden}	.bbp-thanks-list a{text-decoration:none}`;
	document.head.appendChild(injectStyle);
	let styles = document.documentElement.getElementsByTagName("style");
	i = styles.length;
	while(i--){
		styles[i].innerHTML = styles[i].innerHTML.replace(/(background-image: ).*(;)/gi, "$1 none$2");
	}

	//remove certain texts
	let magnificent = document.getElementById("text-2");
	magnificent.innerHTML = magnificent.innerHTML.replace(/the heart of magnificent copenhagen/gi, "Copenhagen");
})();


//removes the selected non-english subforum from the forums
function setOptions(res){
	//checks if there is no value stored or if this is not the forum homepage
	let container = document.getElementById("forums-list-0");
	if(!res || !res.hide_forum || !container){
		return;
	}
	let storage = res.hide_forum;
	let children = container.children;
	let subforums = storage.subforums;
	if(subforums){
		let i = children.length;
		while(i--){
			let list = children[i].firstElementChild.getElementsByClassName("bbp-forum-link-list")[0].children;
			let j = list.length;
			while(j--){
				let elem = list[j];
				let text = elem.getElementsByTagName("h3")[0].textContent.trim().replace(/\s+/g, "_").toLowerCase();
				if(subforums.indexOf(text)!=-1 || subforums.indexOf(text.split("_|_")[0])!=-1){
					elem.parentElement.removeChild(elem);
				}
			}
		}
	}
	let sections = storage.sections;
	if(sections){
		let i = children.length;
		while(i--){
			let elem = children[i];
			let text = elem.firstElementChild.firstElementChild.textContent.trim().replace(/\s+/, "_").toLowerCase();
			if(sections.indexOf(text)!=-1){
				container.removeChild(elem);
			}
		}
	}
}
