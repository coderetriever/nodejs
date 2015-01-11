var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/findSlash"] = requestHandlers.findSlash;
handle["/show"] = requestHandlers.show;
handle["/upload"] = requestHandlers.upload;

/*
 * Pass in the verb rather than the noun
 * i.e. pass in router.route rather than router to the start function of the server module
 */
server.start(router.route, handle);