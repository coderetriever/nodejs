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

				route(handle, pathname, response, request);
			}
			).listen(8888);

	console.log("Server has started");
}

/*
 * exporting the start function so that it can be used in other modules
 */
exports.start = start;