var ReturnVo = require(process.cwd() + '/game/ReturnVo');
var AV = require('leanengine');

module.exports = function(server, socket) {

	socket.on('register', function(data, fn) {
		var ret = new ReturnVo();

		function sendRet() {
			if(fn) {
				fn(ret);
			}
		}
		if(!data) {
			ret.addErrMsg("未获取数据,请重新登录后重试!");
			sendRet();
			return;
		}
		let username = data["userName"];
		let email = data["userEmail"];
		let pwd = data["userPwd"];
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
		if(!pwd) {
			ret.addErrMsg("密码不能为空!");
			sendRet();
			return;
		}

		var user = new AV.User();
		// 设置用户名
		user.setUsername(username);
		// 设置密码
		user.setPassword(pwd);
		// 设置邮箱
		user.setEmail(email);
		user.signUp().then(function(logindUser) {
			//创建用户信息
			var UserInfo = AV.Object.extend('UserInfo');
			var userInfo = new UserInfo();
			userInfo.set("name", logindUser.getUsername());
			userInfo.set('owner', logindUser);
			userInfo.set("winCount", 0);
			userInfo.set("loseCount", 0);
			userInfo.set("drawCount", 0);
			userInfo.set("escapeCount", 0);
			userInfo.set("score", 0);
			userInfo.set("beans", 100000);
			userInfo.set('createDate', new Date());
			userInfo.save().then(function(info) {
				ret.data = info;
				sendRet();
			}, function(error) {
				ret.addErrMsg("创建用户关联信息失败!" + error.message);
				sendRet();
			});
		}, function(error) {
			ret.addErrMsg("创建用户失败!" + error.message);
			sendRet();
		});
	});
}