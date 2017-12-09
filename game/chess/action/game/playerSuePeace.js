var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('suePeace', function(data, fn) {
		let player = socket.player;
		player.suePeace(data["iss"], data["isr"]);
		if(fn) {
			fn();
		}
	});
}