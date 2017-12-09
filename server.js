'use strict';
var AV = require('leanengine');

/**
 * 部署到leancloud上，会自动赋值，如果在本地运行可以手动填充
 */
AV.init({
	appId: process.env.LEANCLOUD_APP_ID,
	appKey: process.env.LEANCLOUD_APP_KEY,
	masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

//可以将你应用的appid，appKey，masterKey
/*AV.init({
	appId: 'nraoxxxxxxxxxxxxxxxxxHsz',
	appKey: '1exxxxxxxxxxxxxxxx64',
	masterKey: 'xgxxxxxxxxxxxxxxxxxPE'
});*/

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

var server = require('http').Server(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf-8'
	});
	res.end("这是小游戏后台服务器！");
});

server.listen(PORT, function(err) {
	console.log('Node app is running on port:', PORT);　
	// 注册全局未捕获异常处理器
	process.on('uncaughtException', function(err) {
		console.error("Caught exception:", err.stack);
	});
	process.on('unhandledRejection', function(reason, p) {
		console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
	});
});

//测试运行 nodemon server.js
//发布 lean deploy

//创建websocket服务器
var io = require('socket.io')(server);

var ChessServer = require("./game/chess/ChessServer");
var chessServer = new ChessServer();
chessServer.initIO(io);