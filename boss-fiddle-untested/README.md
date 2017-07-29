# Boss Fiddle (Untested)
A module that allows summoning of any boss/mob and starting skills on summoned entity using ids. Useless for end users.

Requires commands module. Change default enable in index.js (defaulted to false for disable)
## Commands
Type in /proxy chat or prefix with '!' in other chats. Use space between arguments

- `summontoggle`: Toggle enable/disable module
- `summon <templateId> <huntingZoneId>`: Summon an entity based on the template and huntingzone IDs
- `summonskill <skillid>` : starts the skill on the summoned entity. skill id is the one used in S_ACTION_STAGE
- `summondespawn`: Despawn the entity summoned

Only summon one entity at a time. Highly untested module, do not share.
