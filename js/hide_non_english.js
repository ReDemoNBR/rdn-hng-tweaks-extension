document.addEventListener("DOMContentLoaded", function(){
	chrome.storage.sync.get("hide_non_english", getOptions);
	document.getElementById("btnApply").addEventListener("click", saveHideNonEnglish);
	var rows = document.getElementsByClassName("select-forums")[0].rows;
	for(let i=0; i<rows.length; i++){
		let cells = rows[i].cells;
		for(let i=0; i<cells.length; i++){
			cells[i].addEventListener("click", ()=>cells[i].getElementsByTagName("label")[0].click());
		}
	}
});


function getOptions(res){
	if(!res || !res.hide_non_english){
		return;
	}
	var options = JSON.parse(res.hide_non_english);
	for(let i=0; i<options.length; i++){
		document.getElementById(getLanguageShort(options[i])).checked = true;
	}
}


function saveHideNonEnglish(){
	var status = document.getElementById("divStatus");
	status.innerHTML = "saving...";
	var obj = {
		czech: document.getElementById("cz").checked,
		dutch: document.getElementById("nl").checked,
		finnish: document.getElementById("fi").checked,
		french: document.getElementById("fr").checked,
		german: document.getElementById("de").checked,
		hungarian: document.getElementById("hu").checked,
		italian: document.getElementById("it").checked,
		polish: document.getElementById("pl").checked,
		portuguese: document.getElementById("pt").checked,
		russian: document.getElementById("ru").checked,
		spanish: document.getElementById("es").checked,
		turkish: document.getElementById("tr").checked
	};
	var array = [];
	for(var i in obj)
		if(obj[i])
			array.push(i);
	status.innerHTML = JSON.stringify(array, null, "\t");
	chrome.storage.local.set({hide_non_english: JSON.stringify(array)}, ()=>status.innerHTML="Settings saved");
}


function getLanguageShort(lang){
	lang = lang.toLowerCase();
	switch(lang){
		case "czech": return "cz";
		case "dutch": return "nl";
		case "finnish": return "fi";
		case "french": return "fr";
		case "german": return "de";
		case "hungarian": return "hu";
		case "italian": return "it";
		case "polish": return "pl";
		case "portuguese": return "pt";
		case "russian": return "ru";
		case "spanish": return "es";
		case "turkish": return "tr";
		default: return "error";
	}
}
