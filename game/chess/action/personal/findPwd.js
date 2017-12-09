var ReturnVo = require(process.cwd() + '/game/ReturnVo');
var AV = require('leanengine');

module.exports = function(server, socket) {
	socket.on('findPwd', function(data, fn) {
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
		let email = data["userEmail"];
		if(!email) {
			ret.addErrMsg("邮箱不能为空!");
			sendRet();
			return;
		}

		AV.User.requestPasswordReset(email).then(function(success) {
			ret.data = success;
			sendRet();
		}, function(error) {
			ret.addErrMsg("找回密码失败!" + error.message);
			sendRet();
		});
	});
}