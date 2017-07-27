# finder
Finds player and notifies if player is online via ingame chat. Untested af, most likely has bugs or cannot even start, too lazy to check.

Requires commands module by pinkie-pie

Interval_Duration in index.js is the Interval to search for online persons, in milliseconds.

## Commands
- find <playername>: Searches for player and return if hes online. Continues searching for <Interval_Duration> of time until player is online or command 'clearfind' is used
- clearfind <playername> : Stops finding for the player and clear the timer for finding it
