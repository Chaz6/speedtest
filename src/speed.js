var http = require("http");
var url = require("url");
var zerostream = require("./zerostream.js");

var MEBIBYTE = 1024 * 1024;
var MEGABYTE = 10 ** 6;

var opts = {
	url: [],
	port: process.env.LISTEN_PORT || 8080,
	ip: process.env.LISTEN_HOST || "0.0.0.0",
	max_size: process.env.MAX_SIZE || 1024 * 1024 * MEGABYTE,
};

opts.url.push({
	target: /^\/\d+MiB/,
	cb: function (req, res) {
		parsed = url.parse(req.url, false);
		var size = Math.min(
			parseInt(parsed.pathname.slice(1, -3)) * MEBIBYTE,
			opts.max_size,
		);
		res.writeHead(200, { "Content-length": size });
		zerostream(size).pipe(res);
	},
});

opts.url.push({
	target: /^\/\d+MB/,
	cb: function (req, res) {
		parsed = url.parse(req.url, false);
		var size = Math.min(
			parseInt(parsed.pathname.slice(1, -2)) * MEGABYTE,
			opts.max_size,
		);
		res.writeHead(200, { "Content-length": size });
		zerostream(size).pipe(res);
	},
});

opts.url.push({
	target: /^\/\d+GiB/,
	cb: function (req, res) {
		parsed = url.parse(req.url, false);
		var size = Math.min(
			parseInt(parsed.pathname.slice(1, -3)) * 1024 * MEBIBYTE,
			opts.max_size,
		);
		res.writeHead(200, { "Content-length": size });
		zerostream(size).pipe(res);
	},
});

opts.url.push({
	target: /^\/\d+GB/,
	cb: function (req, res) {
		parsed = url.parse(req.url, false);
		var size = Math.min(
			parseInt(parsed.pathname.slice(1, -2)) * 1024 * MEGABYTE,
			opts.max_size,
		);
		res.writeHead(200, { "Content-length": size });
		zerostream(size).pipe(res);
	},
});

opts.url.push({
	target: /^\/\d+$/,
	cb: function (req, res) {
		parsed = url.parse(req.url, false);
		var size = Math.min(parseInt(parsed.pathname.slice(1)), opts.max_size);
		res.writeHead(200, { "Content-length": size });
		zerostream(size).pipe(res);
	},
});

opts.url.push({
	target: "/ip",
	cb: function (req, res) {
		var ip_headers = ["x-real-ip", "x-forwarded-for"];
		var res_ips = { remote_ip: req.connection.remoteAddress };
		for (var i in ip_headers) {
			if (req.headers[ip_headers[i]])
				res_ips[ip_headers[i]] = req.headers[ip_headers[i]];
		}
		res.end(JSON.stringify(res_ips));
	},
});

opts.url.push({
	target: null,
	cb: function (req, res) {
		res.writeHead(200);
		res.end(`
<html>
 <head>
  <title>Speedtest</title>
 </head>
 <body>
  <h1>Speedtest</h1>
  You can access any size, either using a number of bytes, or by using one of the following suffixes:-
  <ul>
   <li>MB</li>
   <li>GB</li>
	 <li>MiB</li>
	 <li>GiB</li>
	</ul>
  <ul>
   <li><a href="/10MB">10MB</a></li>
   <li><a href="/100MB">100MB</a></li>
   <li><a href="/250MB">200MB</a></li>
   <li><a href="/500MB">500MB</a></li>
   <li><a href="/1GB">1GB</a></li>
   <li><a href="/2GB">2GB</a></li>
   <li><a href="/4GB">4GB</a></li>
   <li><a href="/8MiB">8MiB</a></li>
   <li><a href="/128MiB">128MiB</a></li>
   <li><a href="/256MiB">256MiB</a></li>
   <li><a href="/512MiB">512MiB</a></li>
   <li><a href="/1GiB">1GiB</a></li>
   <li><a href="/2GiB">2GiB</a></li>
   <li><a href="/4GiB">4GiB</a></li>
  </ul>
 </body>
</html>
`);
	},
});

var httpd = http.createServer(function (req, res) {
	var route = null;
	var urlpath = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`)
		.pathname;
	opts.url.forEach(function (cv) {
		if (route) return;
		else if (typeof cv.target == "string" && cv.target == urlpath) route = cv;
		else if (cv.target instanceof RegExp && cv.target.test(urlpath)) route = cv;
	});
	if (route == null) {
		route = opts.url[opts.url.length - 1];
	}
	route.cb.call(this, req, res);
});

httpd.listen(opts.port, opts.ip);
