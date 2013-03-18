<!DOCTYPE html>
<html>
<head>
    <title>Upload Files using XMLHttpRequest - Minimal</title>
    
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="jsaes.js" ></script>
    <script type="text/javascript" src="jquery-1.7.2.min.js" ></script>
    <script type="text/javascript" src="script.js" ></script>
    
</head>
<body>
	<div class="row">
	  <div class="offset1 span10"><h2>Encrypted File Uploader</h2></div>	

      <div class="offset1 span8 well">
      	<label for="fileToUpload">Select a File to Upload</label><br />
      	<input type="file" name="fileToUpload" id="fileToUpload" class="span4"/> <br /><br />
     	<input type="button" id="encrypt" value="Encrypt" class="btn btn-primary span4" /> <br /><br />
     	<textarea id="code" class="span4" ></textarea><br /><br />
     	
		<h6>Encryption</h6>
		<div  class="progress progress-success progress-striped active">
  			<div id="encrypting" class="bar" style="width: 0%"></div>
		</div>
     	
      </div>
      
      <div class="span3 well">
      	<h5>File Information</h5>
      	<div id="fileName"></div>
      	<div id="fileSize"></div>
      	<div id="fileType"></div> <br /><br /><br />
      	<h6>Time Taken : </h6><div id="Time"></div>
      </div>
      
       <div class="offset1 span8 well">
    	<h5>Decrypt Image</h5>
    	<textarea id="decrypt-text"></textarea><br /><br />
    	<input type="button" id="decrypt" value="Decrypt" class="btn btn-success span4" /> <br /><br />
    	
    	<h6>Decrypting</h6>
		<div  class="progress progress-success progress-striped active">
  			<div id="decrypting" class="bar" style="width: 0%"></div>
		</div>
    	
       </div>
       	
       <div class="span3 well">
      	<h5 id="imgLabel">Image</h5>
      </div>	
      
      
       	
    </div> 
    
   
  
</body>
</html>