var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {

	socket.on('createRoom', function(data, fn) {
		let player = socket.player;
		server.leaveRoom(player);
		let room = server.createRoom();
		if(data["isFriendRoom"]) {
			room.isFriendRoom = true;
		}
		if(data["rpwd"]) {
			room.roomPwd = data["rpwd"];
		}
		if(data["rule"]) {
			room.setRoomRule(data["rule"]);
		}

		room.distributePlayer(player);
		if(fn) {
			fn({
				success: true
			});
		}
	});
}