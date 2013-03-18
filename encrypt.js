importScripts("/js/jsaes.js");


function sendLog(str) {
	self.postMessage({command:'log',value:str});
}



self.onmessage = function(event) {
   switch(event.data.command) {
  	case 'text'  :
  	case 'image' : 
  		var str       = event.data.value;
  		var chunkSize = event.data.chunk;
		var blocks    = 1;
		var code      = "";
		var percSent  = {};
		
		if(str.length >= chunkSize)
			blocks += Math.round(str.length / chunkSize);
	
		for (var i=0;i<=blocks;i++) {
			code += encode(str.slice(chunkSize * i, chunkSize * (i+1)),'test');
			code += "\n";
			var perc = Math.round((i/blocks)  * 100);	
			if(perc > 0 && (perc % 5 == 0) && percSent[perc] != 1) {	
				percSent[perc] = 1;
				self.postMessage({command:'progress',value:perc,chunkCode:code});
			}
		}
	
		self.postMessage({command:'encrypting',chunkCode:code});
	
		break;
  }
};