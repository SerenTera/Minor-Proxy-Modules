const Command = require('command')

let enabled=false

module.exports = function bosssummon(dispatch) {
	const command = Command(dispatch)
	
	let npccid=2222222,
		id=1111111,
		bossloc={},
		loc={},
		cid
	
	/////Commands
	command.add('summontoggle', () => {
		enabled = !enabled
		command.message(enabled ? '(Boss Fiddle) Enabled' : '(Boss Fiddle) Disabled')
	})
	
	command.add('summon', (template,huntingZone) => { //summon <templateId> <huntingZoneId>
		spawnNpc(parseInt(template),parseInt(huntingZone))
	})
	
	command.add('summonskill', skillid => {
		startskill(skillid)
	})
	
	command.add('summondespawn',() => {
		despawnNpc()
	})
	
	
	//////Dispatches
	dispatch.hook('S_LOGIN', 2, (event) => {
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
	
	
	//////Functions
	function startskill(skillid) {
		dispatch.toClient('S_ACTION_STAGE',1, {
			source:{ low: npccid, high: 0, unsigned: true },
			x:bossloc.x,
			y:bossloc.y,
			z:bossloc.z,
			w:bossloc.w,
			model:1000,
			skill:skillid,
			stage:0,
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
	}

	function spawnNpc(templateId,huntingZoneId)	{ 
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
		Object.assign(bossloc,loc)
	}
}
