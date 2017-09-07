var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('ready', function(data) {
		let player = socket.player;
		player.ready();
	});
}