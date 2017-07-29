const Command = require('command'),
		fs = require('fs'),
		path= require('path')
		
let enabled=false,
	showskill=true
// Notes: file name is date_huntingzoneid_templateid.json
// Use available data to find out what the boss is from the ids(Use shinra data)

module.exports = function bossattacks(dispatch) {
	const command = Command(dispatch)
	
	let bossid,
		bossinfo
	
	command.add('bosslogger', () => {
		enabled = !enabled
		command.message(enabled ? '(Bosslogger) Enabled' : '(Bosslogger) Disabled')
	})
	

	dispatch.hook('S_BOSS_GAGE_INFO',2,event => {
		if(enabled) {
			bossinfo = (parseInt(event.huntingZoneId) + '_' + parseInt(event.templateId)).toString(),
			bossid = event.id
		}
	})
	
	dispatch.hook('S_ACTION_STAGE',1,event => {
		if(enabled) {
			if(bossid.equals(event.source)) {
				fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Skill:'+event.skill.toString()+' Stage:'+event.stage.toString()+'\r\n'))
				if(showskill) command.message(event.skill)
			}
		}
	})
	
}
