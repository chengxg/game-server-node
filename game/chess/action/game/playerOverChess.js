var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('overChess', function(data) {
		var player = socket.player;
		player.overChess(data.l);
	});
}