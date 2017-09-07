let game = require('./game/index');
let personal = require('./personal/index');

module.exports = {
	game,
	personal,
	/**
	 * 初始化socket事件
	 * @param {ChessServer} server
	 * @param {Object} socket
	 */
	initSocketEvent: function(server, socket) {
		for(let filed in this) {
			let eventObj = this[filed];
			for(let f in eventObj) {
				eventObj[f](server, socket);
			}
		}
	}
}