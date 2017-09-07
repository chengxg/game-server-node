var ReturnVo = require(process.cwd() + '/game/ReturnVo');
var AV = require('leanengine');

module.exports = function(server, socket) {
	socket.on('editUser', function(data, fn) {
		var ret = new ReturnVo();

		function sendRet() {
			if(fn) {
				fn(ret);
			}
		}

		var player = socket.player;
		if(!player) {
			ret.addErrMsg("您未登录!");
			sendRet();
			return;
		}
		var logindUser = player.logindUser;
		if(!logindUser) {
			ret.addErrMsg("未获取到用户信息,请重新登录后重试!");
			sendRet();
			return;
		}
		if(!data) {
			ret.addErrMsg("未获取数据,请重新登录后重试!");
			sendRet();
			return;
		}
		let username = data["userName"];
		let email = data["userEmail"];
		if(!username) {
			ret.addErrMsg("用户名不能为空!");
			sendRet();
			return;
		}
		if(!email) {
			ret.addErrMsg("注册邮箱不能为空!");
			sendRet();
			return;
		}

		let oldUsername = logindUser.getUsername(),
			oldEmail = logindUser.getEmail();

		var query = new AV.Query('UserInfo');
		query.startsWith('name', oldUsername);
		logindUser.setUsername(username);
		logindUser.setEmail(email);
		logindUser.save().then(function(user) {
			//修改关联userinfo关联表
			query.find().then(function(results) {
				if(results && results.length > 0) {
					var userInfo = results[0];
					if(userInfo) {
						userInfo.set('name', user.getUsername());
						userInfo.save().then(function(info) {
							ret.data = info;
							sendRet();
						}, function(error) {
							ret.addErrMsg("对不起，修改用户关联信息失败!" + error.message);
							rollback();
						});
					}
				}
			}, function(error) {

			});
		}, function(error) {
			ret.addErrMsg("修改用户信息失败!" + error.message);
			sendRet();
		});

		function rollback() {
			logindUser.setUsername(oldUsername);
			logindUser.setEmail(oldEmail);
			logindUser.save().then(function(user) {
				sendRet();
			}, function(error) {
				ret.addErrMsg("回滚用户信息失败!" + error.message);
				sendRet();
			});
		}
	});
}