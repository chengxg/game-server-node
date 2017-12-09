var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	/**
	 * 玩家进入房间事件
	 */
	socket.on('enterRoom', function(data, fn) {
		let ret = {
			success: false,
			errMsg: ""
		};
		if(data && data["rid"]) {
			let room = server.getRoomById(data["rid"]);
			if(room) {
				server.leaveRoom(socket.player);
				if(room.isFriendRoom) {
					if(room.roomPwd) {
						if(room.roomPwd === data["rpwd"]) {
							room.distributePlayer(socket.player);
							ret.success = true;
						} else {
							ret.errMsg = "房间密码不正确！";
						}
					} else {
						room.distributePlayer(socket.player);
						ret.success = true;
					}
				} else {
					room.distributePlayer(socket.player);
					ret.success = true;
				}
			} else {
				ret.errMsg = "未找到该房间！";
			}
		} else {
			server.leaveRoom(socket.player);
			server.distributeRoom(socket.player);
			ret.success = true;
		}
		if(fn) {
			fn(ret);
		}
	});
}