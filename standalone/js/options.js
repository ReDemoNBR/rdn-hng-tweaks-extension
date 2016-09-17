document.addEventListener("DOMContentLoaded", ()=>chrome.storage.sync.get("hide_non_english", getOptions));

function getOptions(res){
	if(!res || !res.hide_non_english){
		return;
	}
	var options = JSON.parse(res.hide_non_english);
	for(let i=0; i<options.length; i++){
		document.getElementById(getLanguageShort(options[i])).checked = true;
	}
}
