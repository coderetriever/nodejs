var http = require("http");
var url = require("url");

function start(route, handle)
{
	http.createServer(function(request, response)
			{
				var postData = "";
				
				/*
				 * For
				 * request.url =
				 * http://localhost:8888/start?foo=bar&hello=world
				 * 
				 * url.parse(request.url).pathname =
				 * start
				 * 
				 * querystring(pathname) =
				 * foo=bar&hello=world
				 */
				var pathname = url.parse(request.url).pathname;	
				console.log("Request for " + pathname + " received");
				
				/*
				 * Expect the encoding of the received data to be UTF-8
				 */
				request.setEncoding("utf8");
				
				/*
				 * NodeJS serves our code the POST data in small chunks
				 * data event: when a new chunk of POST data arrives
				 * end event: when all chunks have been received 
				 */
				request.addListener("data", function(postDataChunk)
						{
							postData += postDataChunk;
							
							console.log("Received POST data chunk '" + postDataChunk + "'.");
						});
				
				request.addListener("end", function()
						{
							route(handle, pathname, response, postData);
						});							
			}
			).listen(8888);

	console.log("Server has started");
}

/*
 * exporting the start function so that it can be used in other modules
 */
exports.start = start;