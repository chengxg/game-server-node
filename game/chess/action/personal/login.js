var ReturnVo = require(process.cwd() + '/game/ReturnVo');
var AV = require('leanengine');

/**
 * 玩家登陆事件
 * @param {Object} socket
 */
let playerLoginAction = function(server, socket) {
	socket.on('login', function(data, fn) {
		let name = data["userName"];
		userLogin(data, function(ret) {
			if(ret["success"]) {
				console.log("玩家：" + name + " 登录成功！");
				loginSuccess(ret);
			} else {
				if(fn) {
					fn(ret);
				}
			}
		});

		function loginSuccess(ret) {
			server.leaveRoom(socket.player);

			var player = server.getPlayerByName(name);
			if(!player) {
				player = server.createPlayer(name);
				server.playerArr.push(player);
			}
			player.userInfo = ret["userInfo"];
			player.logindUser = ret["logindUser"];
			player.socket = socket;
			socket.player = player;
			if(fn) {
				fn(ret);
			}
			player.login();
			//server.distributeRoom(player);
		}

	});
}

function userLogin(loginInfo, callback) {
	var ret = new ReturnVo();

	if(!loginInfo) {
		ret.addErrMsg("未获取到登录信息！");
		return ret;
	}
	//登录验证
	var userName = loginInfo.userName;
	if(!userName) {
		ret.addErrMsg("未获取到登录用户名！");
		return ret;
	}
	var userPwd = loginInfo.userPwd;
	if(!userName) {
		ret.addErrMsg("未获取到登录密码！");
		return ret;
	}

	new Promise(function(resolve, reject) {

		//调用 leancloud
		AV.User.logIn(userName, userPwd).then(function(logindUser) {
			var logindUserJSON = {
				username: logindUser.getUsername(),
				email: logindUser.getEmail(),
				createdAt: logindUser.getCreatedAt().getTime(),
				updatedAt: logindUser.getUpdatedAt().getTime()
			};
			ret.logindUser = logindUser;

			resolve(logindUserJSON);
		}, function(error) {
			ret.addErrMsg("登录失败!" + error.message);
			reject(ret);
		});
	}).then(function(logindUserJSON) {
		return new Promise(function(resolve, reject) {
			var query = new AV.Query('UserInfo');
			query.startsWith('name', logindUserJSON.username);
			query.include('headImage');
			query.find().then(function(results) {
				if(results && results.length > 0) {
					var userInfo = results[0];
					if(userInfo) {
						userInfo["username"] = logindUserJSON.username;
						ret.userInfo = userInfo;
						resolve(ret);
						return true;
					}
				}
				ret.addErrMsg("未获取到用户信息!");
				reject(ret);
			}, function(error) {
				ret.addErrMsg("获取用户信息失败!" + error.message);
				reject(ret);
			});
		})
	}).then(function(ret) {
		callback(ret);
	}).catch(function(err) {
		console.log("玩家登陆错误：" + JSON.stringify(err));
		callback(ret);
	});
}

module.exports = playerLoginAction