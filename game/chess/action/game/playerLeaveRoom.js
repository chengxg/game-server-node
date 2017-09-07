var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {

	socket.on('leaveRoom', function(data, fn) {
		server.leaveRoom(socket.player);
		if(fn) {
			fn({
				success: true
			});
		}
	});
}