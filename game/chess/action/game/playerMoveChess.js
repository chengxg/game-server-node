var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('moveChess', function(data) {
		var player = socket.player;
		player.moveChess(data);
	});
}