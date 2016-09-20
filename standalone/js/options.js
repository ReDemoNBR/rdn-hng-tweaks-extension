document.addEventListener("DOMContentLoaded", onLoad);

function onLoad(){
	//add click event listeners for the cells, so clicking the cell also changes the checkbox
	let rows = document.getElementById("tblHideOptions").rows;
	let i = rows.length;
	while(i--){
		let j = rows[i].cells.length;
		while(j--){
			rows[i].cells[j].addEventListener("click", (e)=>e.target.firstElementChild && e.target.firstElementChild.click());
		}
	}
	let chks = document.getElementsByTagName("input");
	i = chks.length;
	while(i--){
		if(/_section/gi.test(chks[i].id)){
			chks[i].addEventListener("change", (e)=>checkboxChanged(e.target));
		}
	}
	//add click event listeners for the buttons
	document.getElementById("btnClose").addEventListener("click", ()=>window.close());
	document.getElementById("btnReset").addEventListener("click", ()=>chrome.storage.sync.get("hide_forums", setOptions));
	document.getElementById("btnApply").addEventListener("click", setStorage);
	//get options from chrome sync
	chrome.storage.sync.get("hide_forum", setOptions);
	let query = location.search && location.search.substring(1).split(/\&/);
	i = query.length;
	while(i--){
		let param = query[i].split(/=/);
		if(param[0]=="save"){
			alert("options saved "+param[1]);
			break;
		}
	}
}


function checkboxChanged(chk){
	if(/_section/gi.test(chk.id)){
		let checked = chk.checked;
		let row = chk.parentElement.parentElement;
		let index = row.rowIndex;
		let rows = row.parentElement.parentElement.rows;
		let i = row.cells[0].rowSpan;
		while(i--){
			let chk = rows[index+i].cells[i?0:1].firstElementChild;
			chk.checked = chk.disabled = checked;
		}
	}
}


function setStorage(){
	let overlay = document.createElement("div"), msg = document.createElement("span");
	overlay.className = "overlay";
	overlay.style.display = "flex";
	msg.innerHTML = "Wait while the options are being set...";
	overlay.appendChild(msg);
	document.body.appendChild(overlay);
	let chks = document.getElementById("tblHideOptions").getElementsByTagName("input"), sections = [], subforums = [], i = chks.length;
	while(i--){
		if(chks[i].checked){
			if(/_section/.test(chks[i].id)){
				sections.push(chks[i].id.replace(/_section/, ""));
			}
			else subforums.push(chks[i].id.replace(/_forum/, ""));
		}
	}
	chrome.storage.sync.set({hide_forum: {sections: sections, subforums: subforums}}, ()=>overlay.parentElement.removeChild(overlay) && window.open(location.origin+location.pathname+"?save=successfully", "_self"));
}


function setOptions(res){
	if(!res || !res.hide_forum){
		return;
	}
	let storage = res.hide_forum, sections = storage.sections, i = sections.length;
	while(i--){
		sections[i] = sections[i]+"_section";
	}
	let subforums = storage.subforums;
	i = subforums.length;
	while(i--){
		subforums[i] = subforums[i]+"_forum";
	}
	let options = [...sections, ...subforums];
	i = options.length;
	while(i--){
		let chk = document.getElementById(options[i]);
		chk.checked = true;
		checkboxChanged(chk);
	}
}
