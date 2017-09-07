var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('changeRoom', function(data) {
		let player = socket.player;
		server.leaveRoom(player);
		server.distributeRoom(player);
	});
}