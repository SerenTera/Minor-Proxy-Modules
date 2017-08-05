Command = require('command')

module.exports = function testmsg(dispatch) {
	const command = Command(dispatch)
	
	command.add('cmd', str => {
		command.message(str)
		console.log(str)
	})
	
	command.add('cmdnotice', str => {
		notice(str,2,0,0)
		console.log(str)
	})
	
	command.add('cmdmessage', str => {
		message(str)
		console.log(str)
	})
	
	command.add('cmdnoticeex', (str,unk1,unk2,unk3) => {
		notice(str,unk1,unk2,unk3)
		console.log(str,unk1,unk2,unk3)
	})
	
	function notice(msg,unk1,unk2,unk3) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: unk1,
            unk2: unk2,
            unk3: unk3,
            message: '</FONT><FONT COLOR="#ff1493">'+msg
        })
    }
	
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '</FONT><FONT COLOR="#ff1493">'+msg
		})
	}
}
