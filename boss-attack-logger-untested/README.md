# boss-attack-logger

Logs every single bosses attacks in a file (will have repitition), with time stamps to better distinguish.

Each new .json file is created when the date changes or the target boss changes (according to template and huntingzone ids). Module is by default enabled

Currently logs: ACTION STAGE, DUNGEON EVENT MESSAGE, QUEST BALLOON, DUNGEON EVENT GAGE, ABNORMALITIES (begin only)

Requires commands module by Pinkie-Pie

## Commands
Type in /proxy chat without '!' or type in other chat with '!' prefixed.

- bosslogger : toggles enable or disable of this module.

## Settings in index.js
- `showskill`: True to display skills in the ingame chat message
- `showgageinfo`: True to record boss gage info

## TO DO
- Expand logging into actionscripts and abnormalitity refresh/ends too
