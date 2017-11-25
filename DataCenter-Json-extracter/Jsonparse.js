const fs = require('fs'),
	path= require('path')
	
	
//defaults	
const i = 0,					//Number in file name. Leave blank if irrelavant.
	filename='StrSheet_Item-',	//Input file name without the number
	output='item.json',			//Output file
	arrayprop='String',			//Property Name of the array (the first word you see)
	
	skipblank=true				//Skips the entry if string is blank.        
	
	
let temp={},
	content,
	j= 0,
	endoffile=false
	
fs.writeFileSync(path.join(__dirname,output), '{', err => {})	
read(i)


function read(i) {
	try { content = require('./'+filename+i+'.json'); }
	catch(e) {
		endoffile=!endoffile
		fs.appendFileSync(path.join(__dirname,output), '}', err => {})
		console.log('Finished Writing '+output+'\r\nTotal Empty Entries: '+j)
		return
	}
	console.log('Reading File '+i)
	if(Object.keys(content).length !== 0) {
		for(let obj of content[arrayprop]) {
			if(obj.string!=='' || !skipblank) {                            //If this part is different, Edit accordingly
				temp=Object.assign({},{[parseFloat(obj.id)]:obj.string})
				write(temp)
			}
			else if(skipblank) j++
		}
	}
	else
		console.log('Skipping Empty File ' + i) 
	
	if(!endoffile){
		i++
		console.log('Empty Entries skipped: ' + j) 
		read(i)
	}
}

	
function write(obj) {
	fs.appendFileSync(path.join(__dirname,output), JSON.stringify(obj).replace('{','').replace('}',',')+'\r\n', err => {
		if(err)	throw err
	})
}
	
				
	