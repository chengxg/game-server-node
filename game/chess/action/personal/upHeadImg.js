var ReturnVo = require(process.cwd() + '/game/ReturnVo');
var AV = require('leanengine');

module.exports = function(server, socket) {
	socket.on('upHeadImg', function(data, fn) {
		var ret = new ReturnVo();

		let userInfo = socket.player.userInfo;
		console.log("上传" + userInfo["username"]);

		if(userInfo.get("headImage")) {
			var headImage = userInfo.get("headImage");
			var fileId = headImage.get("objectId");
			var file = AV.File.createWithoutData(fileId);
			file.destroy().then(function(success) {}, function(error) {

			});
		}

		var avFile = new AV.File(userInfo["username"] + "-head.png", data);
		userInfo.set('headImage', avFile);
		userInfo.save().then(function(info) {
			ret.data = info;
			sendRet();
		}, function(error) {
			ret.addErrMsg("发生错误：" + error.message);
			sendRet();
		});

		function sendRet() {
			if(fn) {
				fn(ret);
			}
		}

	});
}