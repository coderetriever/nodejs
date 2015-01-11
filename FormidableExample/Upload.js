var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) 
		{
			if (req.url === '/upload' && req.method.toLowerCase() === 'post') 
			{
				// parse a file upload
				var form = new formidable.IncomingForm();

				form.parse(req, function(err, fields, files) 
				{
					res.writeHead(200, {'content-type': 'text/plain'});
					res.write('Received upload:\n\n');
					res.end(util.inspect(files));
				});

			  return;
			}

			// show a file upload form
			res.writeHead(200, {'content-type': 'text/html'});
			res.end(
					'<form action="/upload" enctype="multipart/form-data" method="post">'+
					'<input type="file" name="upload" multiple="multiple"><br>'+
					'<input type="submit" value="Upload">'+
					'</form>'
					);
		}).listen(8889);

/*
 *     What you see in the browser is ...
 *     
 *      Received upload:

{ upload: 
   { domain: null,
     _events: {},
     _maxListeners: 10,
     size: 13,
     path: '/tmp/upload_8dd7d2905c1ee6e91eb9c37cfb401067',
     name: 'sam.txt',
     type: 'text/plain',
     hash: null,
     lastModifiedDate: Sat Jan 10 2015 11:45:46 GMT-0500 (EST),
     _writeStream: 
      { _writableState: [Object],
        writable: true,
        domain: null,
        _events: {},
        _maxListeners: 10,
        path: '/tmp/upload_8dd7d2905c1ee6e91eb9c37cfb401067',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        pos: undefined,
        bytesWritten: 13,
        closed: true } } }
 */
