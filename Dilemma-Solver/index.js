module.exports = function luckroller(dispatch) {
	
	dispatch.hook('C_CHAT', 1, event => {
		if(event.message.includes('!coin')) {
			let messagec='Flip ' + coinflip();     //Change Coin message here
			if(event.message.includes('announce')) {
				event.message=(event.message.replace('!coin',(messagec)).replace('announce','').replace(' ',''));
				return true
			}
			else
				message(messagec);
				return false;
		};
			
		if(event.message.includes('!dice')) {
			let messaged='Roll ' + diceroll();     //Change dice message here
			if(event.message.includes('announce')) {
				event.message=(event.message.replace('!dice',(messaged)).replace('announce','').replace(' ',''));
				return true
			}
			else
				message(messaged);
				return false;
		};
	});
	
	function coinflip() {
		return ((Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails'); //change coin messages here, 
	};
	
	function diceroll() {
		return (Math.floor(Math.random() * 100+1)).toString();
	};
	
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: msg
		});
	};
};
