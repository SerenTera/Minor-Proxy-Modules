const Command = require('command')

let enabled=true,
	SAFE_SPAWN=true

module.exports = function bosssummon(dispatch) {
	const command = Command(dispatch)
	
	let npccid=2222222,
	    model=0,
		huntid=0,
		id=1111111,
		spawning=false,
		bossloc={},
		loc={},
		cid
	
	/////Commands
	command.add('summontoggle', () => {
		enabled = !enabled
		command.message(enabled ? '(Boss Fiddle) Enabled' : '(Boss Fiddle) Disabled')
	})
	
	command.add('summon', (huntingZone,template) => { //summon huntingZoneId templateId
		spawnNpc(parseInt(huntingZone),parseInt(template))
	})
	
	command.add('summonskill', (skillid,stage) => { //summonskill skillid stage
		if(stage===undefined) {
			stage=0
		}
		startskill(skillid,stage)
	})
	
	command.add('summonabn', (id,stack) => {
		if(stack===undefined) {
			stack=1
		}
		startabn(parseInt(id),parseInt(stack))
	})
	
	command.add('summonquest',msg => {
		bossquest(msg)
	})
	
	command.add('summoninfo', (arg1,arg2) => {
		bossinfo(parseInt(arg1),parseInt(arg2))
	})
	
	command.add('summonmodel', arg => {
		model=parseInt(arg)
	})
	
	command.add('summondespawn',() => {
		despawnNpc()
	})
	
	
	//////Dispatches
	dispatch.hook('S_LOGIN', 2, event => {
		cid = event.cid
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, event =>{
		if(enabled) {
			loc.w = event.w
			loc.x = event.x1
			loc.y = event.y1
			loc.z = event.z1	
		}
	})
	
	dispatch.hook('S_LOAD_TOPO', 1, event => {
		spawning = false
	})
	
	dispatch.hook('C_MEET_BOSS_INFO', 1, event => {
		if(spawning && SAFE_SPAWN) return false
	})
	
	dispatch.hook('C_REQUEST_BOSS_GAGE_INFO', 'raw', () => {
		if(spawning && SAFE_SPAWN) return false
	})
	
	//////Functions
	function startskill(skillid,stage) {
		dispatch.toClient('S_ACTION_STAGE',1, {
			source:{ low: npccid, high: 0, unsigned: true },
			x:bossloc.x,
			y:bossloc.y,
			z:bossloc.z,
			w:bossloc.w,
			model:model,
			skill:skillid,
			stage:stage,
			speed:1,
			id:id++,
			unk:1,
			unk1:0,
			toX:0,
			toY:0,
			toZ:0,
			unk2:cid.low,
			unk3:cid.high,
			movement:[]
		})
		console.log(skillid)
	}

	
	function despawnNpc(){
		dispatch.toClient('S_DESPAWN_NPC', 1, {
			target: npccid,
			type: 1	
		})
		spawning=false
	}

	function spawnNpc(huntingZoneId,templateId)	{ 
		dispatch.toClient('S_SPAWN_NPC', 3, {
			id: {low:npccid,high:0,unsigned:true}, //unique id, use high=0.
			target: 0,
			x: loc.x,
			y: loc.y,
			z: loc.z,
			w: loc.w,
			unk1: 12,
			templateId: templateId,
			huntingZoneId: huntingZoneId,
			unk4: 110, 
			unk5: 0,
			unk6: 0, 
			unk7: 5, 
			unk8: 1, 
			unk9: 1, 
			unk10: 1,
			unk11: 0, 
			unk12: 0,
			ink13: 0, 
			unk14: 0, 
			unk15: 0,
			unk16: 0,
			unk17: 0,
			unk18: 0,
			unk19: 0,
			unk20: 16777216,
			unk25: 16777216				
		})
		model=templateId
		huntid=huntingZoneId
		spawning=true
		Object.assign(bossloc,loc)
	}
	
	
	function startabn(id,stack) {
		dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
			target: {low:npccid,high:0,unsigned:true}, //aim on yourself
			source: {low:npccid,high:0,unsigned:true}, //from yourself
			id:id,
			duration: 10000,
			unk:0,
			stacks: stack,
			unk2:0
		})
	}
	
	function bossquest(msg) {
		dispatch.toClient('S_QUEST_BALLOON', 1, {
			source:{low:npccid,high:0,unsigned:true},
			message:msg
		})
	}
	
	function bossinfo(unk1,stack) {
		dispatch.toClient('S_BOSS_BATTLE_INFO', 1, {
			id:{low:npccid,high:0,unsigned:true},
			huntingZoneId:huntid,
			templateId:model,
			unk1:unk1,
			stack:stack
		})
	}
	
	
}
