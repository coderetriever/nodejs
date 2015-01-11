var querystring = require("querystring");
var child_process = require("child_process");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData)
{
	console.log("Request handler 'start' was called");
	
	var body = '<html>'+
    				'<head>'+
    					'<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+
    				'</head>'+
    				'<body>'+
    					'<form action="/upload" enctype="multipart/form-data" '+ 'method="post">'+
    						'<textarea name="text" rows="20" cols="60"></textarea>' +
    						'<input type="file" name="upload" multiple="multiple">'+
    						'<input type="submit" value="Upload file" />'+
    					'</form>'+
    				'</body>'+
    			'</html>';
	
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();	
}

function findSlash(response, postData)
{
	console.log("Request handler 'start' was called");

	/*
	 * say op() is a long running blocking function i.e. a database call, network call that takes up a lot of time
	 * 
	 * calling op() directly from findSlash blocks the function and hence makes the user wait. 
	 * Because of how nodeJS works, any user trying to access start or upload functions would be blocked as well
	 * i.e. a blocking function blocks globally
	 * 
	 * so the idea is to call the long running function in a non-blocking way 
	 * i.e. execute asynchronously and provide a call back that should be called when the long running function completes. 
	 * 
	 * executeAsynchronously(op, callbackFuncion);
	 * 
	 */
	child_process.exec("find /", 	function(error, stdout, stderr)
			{
				response.writeHead(200, {"Content-Type" : "text/plain"});
				response.write(stdout);
				response.end();
			}
	);	
}

function upload(response, postData)
{
	console.log("Request handler 'upload' was called.");
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You've sent: " + postData);

	response.end();
}

function show(response, postData)
{
	console.log("Request handler 'show' was called.");
	
	fs.readFile("/tmp/test.png", "binary", function(error, file)
			{
				if(error)					
				{
					response.writeHead(500, {"Content-Type" : "text/plain"});
					response.write(error + "\n");
					response.end();
				}
				else
				{
					response.writeHead(200, {"Content-Type" : "image/png"});
					response.write(file, "binary");
					response.end();					
				}
			});
}

exports.start = start;
exports.findSlash = findSlash;
exports.show = show;
exports.upload = upload;