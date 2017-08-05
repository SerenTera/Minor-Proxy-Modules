const Command = require('command'),
	Interval_Duration=30000 	//Interval to search for online persons, in milliseconds

module.exports = function playerfinder(dispatch) {
	const command = Command(dispatch)
	
	let namestring=[],
	    	timer,
		interval,
		indexvalue
	
	command.add('find',string => {
		namestring.push(string.toLowerCase())
		finder(string.toLowerCase(),namestring.indexOf(string.toLowerCase()))
		command.message('Looking out for '+string)
	})
	
	command.add('clearfind',string => {
		if(namestring.includes(event.name.toLowerCase())) {
			clearTimeout(timer[namestring.indexOf(string.toLowerCase())])
			timer.splice(namestring.indexOf(string.toLowerCase()),1)
			namestring.splice(namestring.indexOf(string.toLowerCase()),1)
			command.message('Cleared finding '+string)
		}
		else
			command.message('Wrong/Invalid/Missing name input')
	})
	
	dispatch.hook('S_USER_PAPERDOLL_INFO', 3, (event) => {
		if(namestring.includes(event.name.toLowerCase())) {
			indexvalue=namestring.indexOf(event.name.toLowerCase())
			command.message('User '+ event.name+' is online.')
			clearTimeout(timer[indexvalue])
			timer.splice(indexvalue,1)
			namestring.splice(indexvalue,1)
			return false
		}
	})
	
	
	function finder(nametofind,i) {
		dispatch.toServer('C_REQUEST_USER_PAPERDOLL_INFO',1, {
			name:namestring
		})
		timer[i] = setTimeout(finder(nametofind,i), Interval_Duration)
	}
}
	
