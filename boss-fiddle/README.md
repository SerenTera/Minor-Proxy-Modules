# Boss Fiddle

summontoggle - enable/disable module

summon <huntingZone> <template> [shapeId]: summon boss with given huntingzone and template. shapeId is optional

summondespawn: Despawn the above spawned boss.

summonskill <skillId> [stage] [skillModel] [type] : Start skill on boss. Id is event.skill.id.  stage,skillModel,type are optional.

summonabn <id> [stack]: Apply abnormality on boss. Stack is optional.

summonquest <message>: Display S_QUEST_BALLOON message on boss. use this for certain dungeon messages. Use `@monsterBehavior:Id` Where id is the Quest message Id referenced in datacentre

summonmodel: Changes model parameter

selfabn <id> [stack]: Apply abnormality on self. stack is optional
