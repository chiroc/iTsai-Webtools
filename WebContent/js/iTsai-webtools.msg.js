/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description Javascript 常用API,包括信息提示、插件检测等.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.msg = {
	toString : function() {
		return 'iTsai.msg';
	},
	/**
	 * 普通信息提示
	 * 
	 * @param{String} info 信息
	 * @param{Number} seconds 显示时间
	 */
	infoAlert : function(info, seconds) {
		this._infoImpl(info, seconds, 'c_alert_f');
	},
	/**
	 * 正确信息提示
	 * 
	 * @param{String} info 信息
	 * @param{Number} seconds 显示时间
	 */
	infoCorrect : function(info, seconds) {
		this._infoImpl(info, seconds, 'c_correct_f');
	},
	/**
	 * 警告信息提示
	 * 
	 * @param{String} info 信息
	 * @param{Number} seconds 显示时间
	 */
	infoWarning : function(info, seconds) {
		this._infoImpl(info, seconds, 'c_warning_f');
	},
	/**
	 * 错误信息提示
	 * 
	 * @param{String} info 信息
	 * @param{Number} seconds 显示时间
	 */
	infoError : function(info, seconds) {
		this._infoImpl(info, seconds, 'c_error_f');
	},
	/**
	 * 清除提示信息
	 */
	infoClear : function() {
		$('#c_msg_x').remove();
	},
	/**
	 * * 通用提示信息样式为.c_correct
	 * 
	 * @param{String} info 提示信息
	 * @param{Number} seconds 等待关闭秒数 小于0表示一直显示,默认为5
	 * @param{String} cls 样式
	 */
	_infoImpl : function(info, seconds, cls) {
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
		var _msg_x = $('#c_msg_x'),top_orig = _msg_x.position().top ;
		function _resetPos(top_orig) {
			_msg_x.delay(10).css({
				left : (body.width() - _msg_x.width()) / 2,
				top : top_orig + $(document).scrollTop()
			});
		}
		_resetPos(top_orig);
		$(window).bind('resize scroll', function() {
			_resetPos(top_orig);
		});
	}
};
