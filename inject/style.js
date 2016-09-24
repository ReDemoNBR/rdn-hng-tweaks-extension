(function(){
	let forum = /forums/i.test(location.pathname), noscripts = document.documentElement.getElementsByTagName("noscript"), i = noscripts.length, doc = document.documentElement;
	document.title = forum && document.title.replace(/heroes \& generals/i, "H&G Forum").replace(/ - moderator sub-fora/gi, "") || document.title.replace(/heroes \& generals/gi, "H&G");
	//remove all bootstrap data-tooltip attributes from all HTML elements
	doc.innerHTML = doc.innerHTML.replace(/(<\w+\s)data-tooltip="([^"]*)/gi, (s,m1,m2)=>m1+"title=\""+m2.replace(/<br>|<\/br>/gi, "\n"));
	while(i--){
		noscripts[i].parentElement.removeChild(noscripts[i]);
	}
	if(forum){
		chrome.storage.sync.get("hide_forum", setOptions);
		let listening = document.getElementById("bbp-forum-1145121");
		if(listening){
			listening.innerHTML = listening.innerHTML.replace(/we are listening\. influence/gi, "We are NEVER listening. You don't influence");
		}
	}
	else{
		let imgs = document.body.getElementsByTagName("img"), i = imgs.length;
		while(i--){
			imgs[i].removeAttribute("sizes");
		}
	}
	//resizes the player profile image to 200px
	i = document.body.getElementsByTagName("aside").length;
	while(i--){
		let imgs = document.body.getElementsByTagName("img"), j = imgs.length;
		while(j--){
			if([imgs[j].parentElement.parentElement.className, imgs[j].parentElement.className].indexOf("forum-sidebar-user-info-avatar align-center")!=-1){
				imgs[j].src = imgs[j].src.replace(/s=80/gi, "s=200");
				imgs[j].width = imgs[j].height = "200";
			}
		}
	}
	//change stylesheet
	//changes include: new fonts, font size increase, background image removal, element resizes and hiding
	let injectStyle = document.createElement("link");
	injectStyle.rel = "stylesheet";
	injectStyle.href = chrome.extension.getURL("inject/style.css");
	let body = document.body;
	body.appendChild(injectStyle);
	body.innerHTML += "<style>.row{max-width:"+(/gallery/i.test(location.pathname)?"1200px":"initial")+"}</style>";
	let styles = document.documentElement.getElementsByTagName("style");
	i = styles.length;
	while(i--){
		styles[i].innerHTML = styles[i].innerHTML.replace(/(background-image:)\s*url.*(;|\})/gi, "$1 none$2");
	}
	//remove bootstrap data-tooltip
	let as = document.documentElement.getElementsByTagName("a");
	i = as.length;
	while(i--){
		if(as[i].hasAttribute("data-tooltip")){
			as[i].title = as[i].getAttribute("data-tooltip");
			as[i].removeAttribute("data-tooltip");
		}
	}

	//remove magnificent Copenhagen
	let magnificent = document.getElementById("text-2");
	magnificent && (magnificent.innerHTML = magnificent.innerHTML.replace(/the heart of magnificent copenhagen/gi, "Copenhagen"));
})();


//removes the selected non-english subforum from the forums
function setOptions(res){
	//checks if there is no value stored or if this is not the forum homepage
	let container = document.getElementById("forums-list-0");
	if(!res || !res.hide_forum || !container){
		return;
	}
	let storage = res.hide_forum, children = container.children, subforums = storage.subforums;
	if(subforums){
		let i = children.length;
		while(i--){
			let list = children[i].firstElementChild.getElementsByClassName("bbp-forum-link-list")[0].children, j = list.length;
			while(j--){
				let elem = list[j], text = elem.getElementsByTagName("h3")[0].textContent.trim().replace(/\s+/g, "_").toLowerCase();
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
			let elem = children[i], text = elem.firstElementChild.firstElementChild.textContent.trim().replace(/\s+/, "_").toLowerCase();
			if(sections.indexOf(text)!=-1){
				container.removeChild(elem);
			}
		}
	}
}
