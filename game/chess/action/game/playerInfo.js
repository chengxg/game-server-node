var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {

	socket.on('playerInfo', function(data, fn) {
		var ret = new ReturnVo();

		if(!data || !data["pn"]) {
			ret.addErrMsg("未获取到玩家名称！");
			sendRet();
			return;
		}

		let player = server.getPlayerByName(data["pn"]);
		if(player) {
			ret.userInfo = player.userInfo;
		} else {
			ret.addErrMsg("未获取查询到该玩家！");
		}
		sendRet();

		function sendRet() {
			if(fn) {
				fn(ret);
			}
		}
	});

}