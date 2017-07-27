const abid=[999001011,905434,70237] //Add more abnormality effect you wanna block off here

module.exports=function eventhelper(dispatch) {
	dispatch.hook('S_ABNORMALITY_BEGIN', 2, event => {
		if(abid.includes(event.id)) return false
	})
}
