(function() {
	if (!window.iTsai)
		iTsai = {};
})();

/**
 * @namespace iTsai.msg
 */
iTsai.msg = {
	/**
	 * 显示当前对象名称路径。
	 * 
	 * @method toString
	 * @return{String} 'iTsai.msg'
	 */
	toString : function() {
		return 'iTsai.msg';
	},
	/**
	 * 普通信息提示。
	 * 
	 * @method infoAlert
	 * @param{String} info 信息
	 * @param{Number} seconds [optional,default=5]
	 *                等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoAlert : function(info, seconds) {
		this._infoImpl(info, 'c_alert_f', seconds);
	},
	/**
	 * 正确信息提示。
	 * 
	 * @method infoCorrect
	 * @param{String} info 信息
	 * @param{Number} seconds [optional,default=5]
	 *                等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoCorrect : function(info, seconds) {
		this._infoImpl(info, 'c_correct_f', seconds);
	},
	/**
	 * 警告信息提示。
	 * 
	 * @method infoWarning
	 * @param{String} info 信息
	 * @param{Number} seconds [optional,default=5]
	 *                等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoWarning : function(info, seconds) {
		this._infoImpl(info, 'c_warning_f', seconds);
	},
	/**
	 * 错误信息提示。
	 * 
	 * @method infoError
	 * @param{String} info 信息
	 * @param{Number} seconds [optional,default=5]
	 *                等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoError : function(info, seconds) {
		this._infoImpl(info, 'c_error_f', seconds);
	},
	/**
	 * 清除提示信息。
	 * 
	 * @method infoClear
	 */
	infoClear : function() {
		$('#c_msg_x').remove();
	},
	/**
	 * 通用提示信息样式为.c_correct。
	 * 
	 * @method _infoImpl
	 * @param{String} info 提示信息
	 * @param{String} cls 样式
	 * @param{Number} seconds [optional,default=5]
	 *                等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除
	 */
	_infoImpl : function(info, cls, seconds) {
		$('#c_msg_x').remove();
		var cMsgObj = $('<span id="c_msg_x"></span>');
		cMsgObj.css({
			position : 'absolute'
		}).addClass(cls).html(info);
		var body = $('body');
		if (seconds < 0) {
			body.prepend(cMsgObj);
		} else {
			seconds = (seconds == undefined ? 5 : seconds);
			body.prepend(cMsgObj.fadeIn().delay(seconds * 1000).fadeOut());
		}
		var _msg_x = $('#c_msg_x'), top_orig = _msg_x.position().top, _resetPos = function(
				top_orig) {
			_msg_x.delay(10).css({
				left : (body.width() - _msg_x.width()) / 2,
				top : top_orig + $(document).scrollTop()
			});
		};
		_resetPos(top_orig);
		$(window).bind('resize scroll', function() {
			_resetPos(top_orig);
		});
	}
};
