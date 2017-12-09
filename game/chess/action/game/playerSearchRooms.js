var ReturnVo = require(process.cwd() + '/game/ReturnVo');

module.exports = function(server, socket) {
	socket.on('searchRooms', function(searchModel, fn) {
		let roomArr = server.roomArr;
		let len = roomArr.length;
		let pageSize = 5;
		let roomInfoArr = [];

		let isPrevious = searchModel["isPrevious"];
		let isNext = searchModel["isNext"];
		let minRoomId = searchModel["minRoomId"];
		let maxRoomId = searchModel["maxRoomId"];

		let isPage = false;
		if(isNext && minRoomId) {
			isPage = true;
			let startIndex = server.getRoomIndexById(minRoomId);
			for(let i = startIndex + 1; i < len; i++) {
				addRoomInfo(roomArr[i]);
				if(roomInfoArr.length >= pageSize) {
					break;
				}
			}
		}
		if(isPrevious && maxRoomId) {
			isPage = true;
			let endIndex = server.getRoomIndexById(maxRoomId);
			for(let i = endIndex - 1; i >= 0; i--) {
				addRoomInfo(roomArr[i]);
				if(roomInfoArr.length >= pageSize) {
					break;
				}
			}
			roomInfoArr = roomInfoArr.reverse();
		}
		if(!isPage) {
			let endIndex = server.getRoomIndexById(maxRoomId);
			for(let i = 0; i < len; i++) {
				addRoomInfo(roomArr[i]);
				if(roomInfoArr.length >= pageSize) {
					break;
				}
			}
		}

		if(fn) {
			fn(roomInfoArr);
		}

		function addRoomInfo(room) {
			if(!(room.player1 && room.player2)) {
				if(searchModel["rule"]) {
					if(room.rule.name === searchModel["rule"]) {
						roomInfoArr.push({
							id: room.id,
							ruleName: room.rule.name,
							p1n: room.player1 ? room.player1.name : "",
							p2n: room.player2 ? room.player2.name : "",
						});
					}
				}
			}
		}

	});
}