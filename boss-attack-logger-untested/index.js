const fs = require('fs'),
	  path= require('path')
		
let enabled=false,
	showskill=false,
	showgageinfo=false
// Notes: file name is date_huntingzoneid_templateid.json
// Use available data to find out what the boss is from the ids(Use shinra data)/use datacenter datas
//'S_DUNGEON_EVENT_GAGE'

module.exports = function bossattacks(mod) {
	let bossid = 0,
		bossinfo=''
////Commands	
	mod.command.add('bosslogger', () => {
		enabled = !enabled
		mod.command.message(enabled ? '(Bosslogger) Enabled' : '(Bosslogger) Disabled')
	})
	
	mod.command.add('bossshowskill', () => {
		showskill = !showskill
		mod.command.message(showskill ? '(Bosslogger) Show skill id Enabled' : '(Bosslogger) Show skill id Disabled')
	})
////Dispatches	
	mod.hook('S_BOSS_GAGE_INFO',3,(event) => {
		if(enabled) {
			bossinfo = (parseInt(event.huntingZoneId) + '_' + parseInt(event.templateId)).toString(),
			bossid = event.id
			if(event.curHp-event.maxHp==0)
				fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Boss id: '+event.id.toString()+'\r\n'))
		}
	})
	
	mod.hook('S_ACTION_STAGE',  mod.majorPatchVersion >= 74 ? 7 : 6, (event) => {
		if(enabled) {
			if(event.gameId-bossid==0) {
				fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Skill:'+JSON.stringify(event.skill)+' Stage:'+event.stage.toString()+' model:'+event.templateId+' target:'+event.target.toString()+'\r\n'))
				if(showskill) mod.command.message(JSON.stringify(event.skill));
			}
		}
	})
	
	mod.hook('S_DUNGEON_EVENT_MESSAGE', 1, event => {
		if(enabled) {
			fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_event_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Message:'+event.message+'\r\n'))
		}
	})
	
	mod.hook('S_ABNORMALITY_BEGIN', 2, event => {
		if(enabled) {
			if(event.target-bossid==0 && (event.source-bossid==0 || event.source==0)) {
				fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Abnormality:'+event.id.toString()+' Stack:'+event.stacks.toString()+'\r\n'));
				//if(showskill) mod.command.message(event.id.toString())
			}
		}
	})
	
	/*mod.hook('S_DUNGEON_EVENT_GAGE', 1, event => {
		if(showgageinfo) {
			fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_gage_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] Type:'+event.type+' Value:'+event.value+' gageType:'+event.gageType+' message:'+event.message+'\r\n'))
		}
	})*/

	
	mod.hook('S_QUEST_BALLOON', 1, event => {
		if(enabled) {
			fs.appendFileSync(path.join(__dirname,(Date().slice(4,10)+'_Quest_'+bossinfo+'.json')),('['+Date().slice(16,24)+'] QuestMessageId:'+event.message.replace(/\D/g,'')+'\r\n'))
		}
	})

}