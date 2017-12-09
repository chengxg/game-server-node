var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('chat', function(data, fn) {
		socket.player.chat(data["msg"]);
		if(fn) {
			fn();
		}
	});
}