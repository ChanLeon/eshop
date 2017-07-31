/* 该文件禁止任何修改 */
var kraken = require('kraken-js'),
	express = require('express'),
	app = express(),
	path = require('path'),
	options = require('./lib/option')(),
	port = process.env.PORT || 3704;

app.use(kraken(options));

app.use(express.static(path.join(__dirname, 'public')));  //上传的图片存放在public目录，该路径作为静态路径导入，不编译

app.listen(port, function(err) {
	console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});