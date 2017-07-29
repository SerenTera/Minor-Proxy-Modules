module.exports=function memefy(dispatch) {
	const minifyid=[7000017,7000005],
		aotid=[7000029],
		combinedid=[7000017,7000005,7000029];
	
	let playerid,
		targetcid,
		players=[],
		minify=false,
		atkontitan=false,
		enable=true //default enable module
		
	dispatch.hook('C_CHAT',1,event => {    
		if(event.message.includes('!memefy')) {
			if(!minify) {
				minify=true,
				atkontitan=false;
				for(let index of players) {
					abend(index,aotid),
					abbegin(index,minifyid,-1);
				};
				message('everyone a midget now');
			}
			else {
				minify=false;
				for(let index of players) {
					abend(index,minifyid)
				};
			};
			return false
		};
		if(event.message.includes('!attackontitan')) {
			if(!atkontitan) {
				atkontitan=true,
				minify=false;
				for(let index of players) {
					abend(index,minifyid),
					abbegin(index,aotid,18);
				};
				message('here comes the titans');
			}
			else {
				atkontitan=false;
				for(let index of players) {
					abend(index,aotid)
				};
			};
			return false
		};
		if(event.message.includes('!memeforever')) {
			if(!enable) {
				enable=true,
				message('set to memefy');
			}
			else {
				enable=false;
				for(let index of players) {
					abend(index,combinedid)
				};
				players=[],
				minify=false,
				atkontitan=false,
				message('party pooper');
			};
			return false
		};
	});

	dispatch.hook('S_SPAWN_USER',3,event => {  
		targetcid=event.cid
		if(enable){
			players.push(targetcid)
		if(minify){
			process.nextTick(() => {abbegin(targetcid,minifyid,-1)})
		}
		if(atkontitan){
			process.nextTick(() => {abbegin(targetcid,aotid,18)})
		}
	})
	
	dispatch.hook('S_DESPAWN_USER',1,event => { 	
		for(var i=0; i<players.length ;i++) {
			if(event.target.equals(players[i])) {	
				abend(players[i],combinedid),
				players.splice((i),1);
				break;
			};
		};
	});
	
	dispatch.hook('S_SPAWN_ME',1, event => {
		players=[];
	});

	function abbegin(targetid,abnomid,stack) {
		for(let skillid of abnomid) {
			dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
				target: targetid,
				source: targetid, 
				id:skillid,
				duration: 60000,
				unk:0,
				stacks: stack,
				unk2:0
			});
		};
	};
	
	function abend(targetid,abnomid) {
		for(let skillid of abnomid) {
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target:targetid,
				id:skillid
			});
		};
	};
	
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			authorName: '',
			message: '(memefy)'+msg
		});
	};
};
