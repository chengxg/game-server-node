var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('giveUp', function(data, fn) {
		let player = socket.player;
		player.giveUp();
		if(fn) {
			fn();
		}
	});
}