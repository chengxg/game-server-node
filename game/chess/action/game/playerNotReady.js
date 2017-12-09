var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('notReady', function(data) {
		let player = socket.player;
		player.notReady();
	});
}