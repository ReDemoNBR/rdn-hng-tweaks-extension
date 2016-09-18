document.addEventListener("DOMContentLoaded", onLoad, false);

function onLoad(){
	//add click event listeners for the cells, so clicking the cell also changes the checkbox
	var rows = document.getElementById("tblHideOptions").rows;
	let i = rows.length;
	while(i--){
		let j = rows[i].cells.length;
		while(j--){
			rows[i].cells[j].addEventListener("click", (e)=>e.target.firstElementChild && e.target.firstElementChild.click(), false);
		}
	}
	var chks = document.getElementsByTagName("input");
	i = chks.length;
	while(i--){
		if(/_section/gi.test(chks[i].id)){
			chks[i].addEventListener("change", (e)=>checkboxChanged(e.target), false);
		}
	}
	//add click event listeners for the buttons
	document.getElementById("btnClose").addEventListener("click", ()=>window.close());
	document.getElementById("btnReset").addEventListener("click", chrome.storage.sync.get("hide_forums", setOptions));
	document.getElementById("btnApply").addEventListener("click", setStorage);
	//get options from chrome sync
	chrome.storage.sync.get("hide_forums", setOptions);
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
	let chks = document.getElementById("tblHideOptions").getElementsByTagName("input")[0];
	var array = [];
	let i = chks.length;
	while(i--){
		if(chks[i].checked){
			array.push(chks[i].id);
		}
	}
	chrome.storage.sync.set("hide_forums", JSON.stringify(array));
}


function setOptions(res){
	if(!res || !res.hide_forums){
		return;
	}
	var options = JSON.parse(res.hide_non_english);
	let i = options.length;
	while(i--){
		document.getElementById(res).checked = true;
	}
}
