importScripts("/js/jsaes.js");


function sendLog(str) {
	self.postMessage({command:'log',value:str});
}


self.onmessage = function(event) {
  switch(event.data.command) {
  	case 'image' : 
  		var encryptedText  = event.data.value;
  		var chunkSize      = event.data.chunk;
		var code           = "";
		var percSent       = {};
		
		var splitData = encryptedText.split("\n");
		var blocks    = splitData.length - 2; // Remove Height/Width
		var code      = "";
		
		for (var i=2;i<splitData.length;i++) {
			code += decode(splitData[i],'test');
			var perc = Math.round((i/(blocks-1))  * 100);
			if(perc > 0 && (perc % 5 == 0) && percSent[perc] != 1) {	
				percSent[perc] = 1;
				self.postMessage({command:'progress',value:perc});
			}
		}
		
		self.postMessage({command:'decrypting',code:code});
		
		break;
  }
};