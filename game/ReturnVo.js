'use strict';
/**
 * 返回结果类
 * @author chengxg
 * @since 2017-09-01
 */
var ReturnVo = (function() {
	/**
	 * 返回结果类
	 * @constructor
	 */
	function ReturnVo() {
		this.success = true; //返回结果
		this.errMsgArr = []; //错误信息
		this.tipMsgArr = []; //提示信息
		this.data = null; //返回的数据
	}
	/**
	 * 合并返回结果
	 * @param {ReturnVo} returnVo
	 */
	ReturnVo.prototype.mergeReturnVo = function(returnVo) {
		if(!returnVo) {
			return this;
		}
		if(typeof returnVo["success"] === 'boolean') {
			this.success = this.success && returnVo["success"];
		}
		this.errMsgArr.push.apply(this.errMsgArr, returnVo["errMsgArr"]);
		this.tipMsgArr.push.apply(this.tipMsgArr, returnVo["tipMsgArr"]);
	}

	/**
	 * 添加 错误
	 * @param {String} errName
	 * @param {String} errDetail
	 */
	ReturnVo.prototype.addErrMsg = function(errName, errDetail) {
		this.success = false;
		this.errMsgArr.push({
			"errName": errName,
			"errDetail": errDetail
		});
	}

	/**
	 * 添加 提示信息
	 * @param {String} msgName
	 * @param {String} msgDetail
	 */
	ReturnVo.prototype.addTipMsg = function(msgName, msgDetail) {
		this.tipMsgArr.push({
			"msgName": msgName,
			"msgDetail": msgDetail
		});
	}
	return ReturnVo;
})();

module.exports = ReturnVo;