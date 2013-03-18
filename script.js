$(document).ready(function() {
			var canvas    = document.createElement('canvas');
			var ctx       = canvas.getContext("2d");
			var watch     = new StopWatch();
			var chunkSize = 500;
			var imgd      = ctx.getImageData(0,0,225,225);
			var img,pix;
			var file = {};
				
			document.getElementById('fileToUpload').addEventListener('change', handleFileSelect, false);
			document.getElementById('encrypt').addEventListener('click', encryptFile, false);
			
			function handleFileSelect(evt) {
				fileSelected()
				var files = evt.target.files; // FileList object
				for (var i = 0, f; f = files[i]; i++) {
					var reader = new FileReader();
				  	if (f.type.match('image.*')) {
						reader.onload = function(theFile) {
				  			img = new Image();
							img.src = reader.result;
							img.onload = function () {
								canvas.width  = img.width;
								canvas.height = img.height;
								ctx.drawImage(img, 0, 0, img.width, img.height);
								file.type   = 'image';
								file.data   = reader.result;
								file.height =  img.height;
								file.width  =  img.width
							}
						};
					}
					
					if (f.type.match('text/*') || f.type.match('msword')) {
						reader.onload = function(theFile) {
							file.data = reader.result;
							file.type = 'text';
						}
					}
		
					reader.readAsDataURL(f);
			  	}
 			}
 			
 			
			
			
			
			
			function fileSelected() {
				var file = document.getElementById('fileToUpload').files[0];
				if (file) {
					var fileSize = 0;
					if (file.size > 1024 * 1024)
				  		fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
					else
				  		fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
		  
					document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
					document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
					document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
				}
			}
			
			
			
			
			function encryptFile() {	
				var code     = '';
				var eWorker  = new Worker('encrypt.js');
				watch.start();
				
				//imgd         = ctx.getImageData(0,0,img.width,img.height);
				eWorker.postMessage({command:file.type,value:file.data,chunk:chunkSize});
				eWorker.onmessage = function(event) {
					switch(event.data.command) {
						case 'log' :
							console.log('Worker Log : ' + event.data.value);
							break;
			
						case 'progress' :
							$('#encrypting').css("width",event.data.value + "%");
							break;
				
						case 'encrypting' :
							code = event.data.chunkCode;
							
							if(file.height != null)
								code = file.height + "\n" + file.width + "\n" + code; 
								
							$('#code').val(code);
							watch.stop();
							$('#Time').html(watch.duration());
							eWorker.terminate();
							break;
					}
				}
			}
		
		
		  	$('#decrypt').click(function(e) {
		  		var encryptedText = $('#decrypt-text').val();
		  		var dWorker       = new Worker('decrypt.js');
		  		dWorker.postMessage({command:'image',value:encryptedText,chunk:chunkSize});
		  		watch.start();
							
		  		dWorker.onmessage = function(event) {
					switch(event.data.command) {
						case 'log' :
							console.log('Worker Log : ' + event.data.value);
							break;
					
						case 'progress' :
							$('#decrypting').css("width",event.data.value + "%");
							break;
							
							
						case 'decrypting' :
							
							
							var image = new Image();
							image.src = event.data.code;
							$(image).insertAfter('#imgLabel');
							watch.stop();
							$('#Time').html(watch.duration());
							dWorker.terminate();
							break;
							
					}
				}
		  	});
		  	
		  
			function StopWatch(){
  				var startTime = null; 
  				var stopTime = null; 
 				var running = false; 
 				
 				function getTime(){
  					var day = new Date();
  					return day.getTime();
				}
				
				
				this.start = function(){ 
					if (running == true)        return;
					else if (startTime != null) stopTime = null; 

					running = true;    
					startTime = getTime();
				}
				
				
				this.stop = function(){ 
					if (running == false) return;    
					stopTime = getTime();
					running = false; 
				}
				
				this.duration = function(){ 
					if(startTime == null || stopTime == null)return 'Undefined';
					else  return (stopTime - startTime) / 1000;
				}
  			}
		
});
			