##Datacenter Json Extractor
Extracts a usable JSON file from the provided datacenter unpacked files in json format

This node module (run in node) combines various datacenter json files into 1 and pick out the correct property and value to create a single
json file for various modules.

Defaults to enter

- i = 0		                  	//First Number in file name. Leave blank if irrelavant.
- filename='StrSheet_Item-'	  //Input file name without the number (Assumed directory is same as the module, else edit accordingly)
- output='item.json'			    //Output file
- arrayprop='String'		    	//Property Name of the array (the first word you see)
- skipblank=true				      //Skips the entry if string is blank.        

Currently edited to combine StrSheet_Item in data center to generate a JSON file to match item strings to their id.
