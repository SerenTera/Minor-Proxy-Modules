module.exports=function tester(dispatch) {
	let duration=600000; //10min default time
	let ids,
		stack=1;
	
	
	dispatch.hook('S_LOGIN', 1, event => {
		playerid = event.cid;
	});
	
	dispatch.hook('C_CHAT',1,event => {
		if(event.message.includes('!abstart')) {
			ids=parseInt((event.message.replace(/[^0-9\.\-]/g, '')),10),
			abbegin(ids),
			message('Attempted to start abnormality ' + ids);
			return false;
		};
		if(event.message.includes('!abend')) {
			ids=parseInt((event.message.replace(/[^0-9\.\-]/g, '')),10),
			abend(ids),
			message('Attempted to end abnormality ' + ids);
			return false;
		};
		if(event.message.includes('!abstack')) {
			stack=parseInt((event.message.replace(/[^0-9\.\-]/g, '')),10),
			message('Abnomality stack' + stack);
			return false;
		};
	});
				
	function abbegin(iden) {	
		dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
			target: playerid, //aim on yourself
			source: playerid, //from yourself
			id:iden,
			duration: duration,
			unk:0,
			stacks: stack,
			unk2:0,
		});
	};

	function abend(iden) {
		dispatch.toClient('S_ABNORMALITY_END', 1, {
			target:playerid,
			id:iden
		});
	};

	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '(DressUpFriends)'+msg
		});
	};
};
