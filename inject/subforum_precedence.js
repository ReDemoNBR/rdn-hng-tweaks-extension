(function () {
	//checks if it is not in the home of the forum
	if(!/\/forums\/(?!(topic))/i.test(location.pathname)){
		return;
	}

	//forum precedence info
	let forums = [
		{
			id: "bbp-forum-1145134",
			name: "news",
			subforums: ["news & updates"]
		},
		{
			id: "bbp-forum-1145105",
			name: "gameplay",
			subforums: ["questions&answers", /beginner.{1}s guide/, "action game talk", "strategy game & lobby talk", "general gameplay talk"]
		},
		{
			id: "bbp-forum-1145121",
			name: "development",
			subforums: ["general development feedback", "action game feedback", "strategy game & lobby feedback", "wiki army talk", "bug hunters"]
		},
		{
			id: "bbp-forum-1145113",
			name: "community",
			subforums: ["us army talk", "german army talk", "soviet red army talk", "general clan talk", "clan\\/army seeking player\\(s\\)", "player\\(s\\) seeking clan\\/army", "video & pictures from the community"]
		},
		{
			id: "bbp-forum-1145124",
			name: "general discussion",
			subforums: ["historical chatter", "off topic"]
		},
		{
			id: "bbp-forum-1145138",
			name: "support",
			subforums: ["action game support", "strategy game & lobby support", "other issues"]
		},
		{
			id: "bbp-forum-1145157",
			name: "non-english",
			subforums: ["czech", "dutch", "finnish", "french", "german", "hungarian", "italian", "polish", "portuguese", "russian", "spanish", "turkish"]
		}
	];

	//checks each forum and fixes the precedence
	for(let i=0; i<forums.length; i++){
		let container = document.getElementById(forums[i].id).getElementsByClassName("bbp-forum-link-list")[0];
		let children = container.childNodes;
		let array = [];
		for(let j=0; j<children.length; j++){
			if(children[j].nodeType==1){
				array.push(children[j]);
			}
		}
		let sub = forums[i].subforums;
		let sortedArray = [];
		for(let j=0; j<sub.length; j++){
			let regex = new RegExp(sub[j], "gi");
			for(let k=0; k<array.length; k++){
				let text = /^(.{35})/i.exec(array[k].textContent.trim().replace(/\s+/g, " "))[1].toLowerCase();
				if(regex.test(text)){
					sortedArray.push(array[k]);
					break;
				}
			}
			console.groupEnd();
		}

		container.innerHTML = "";
		for(let j=0; j<sortedArray.length; j++){
			container.appendChild(sortedArray[j]);
		}
	}
})();
