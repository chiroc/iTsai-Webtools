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
iTsai.util = {
	toString : function() {
		return 'iTsai.util - Javascript 常用API,包括信息提示、插件检测等';
	},
	/**
	 * 生成唯一CID编号:时间+4位随机数
	 */
	random : function() {
		return iTsai.calendar.dateTime2str(new Date(), "yyyyMMddhhmmss")
				+ Math.round(Math.random() * 10000);
	},
	/**
	 * 判断是否含有'.'号
	 * 
	 * @param string
	 * @returns {Boolean}
	 */
	hasDot : function(string) {
		if (string.indexOf('.') != -1) {
			return true;
		}
		return false;
	},
	/**
	 * 011=9(011 表示8进制)
	 * 
	 * @param{Object} obj
	 * @returns {Boolean}
	 */
	isInteger : function(obj) {
		if (obj != parseInt(obj)) {
			return false;
		}
		return true;
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
		var _msg_x = $('#c_msg_x');
		var top_orig = _msg_x.position().top;
		function _resetPos(top_orig) {
			_msg_x.css({
				left : (body.width() - _msg_x.width()) / 2,
				top : top_orig + $(document).scrollTop()
			});
		}
		_resetPos(top_orig);
		$(window).bind('resize scroll', function() {
			_resetPos(top_orig);
		});
	},
	/**
	 * 数据相减:mArr-sArr,得到的数组是mArr的子集
	 * 
	 * @param{Array} mArr 被减数组
	 * @param{Array} sArr 减数据
	 * @returns []
	 */
	arrayDive : function(mArr, sArr) {
		if (!sArr) {
			return mArr;
		}
		var subArr = [];
		var str = sArr.join("&quot;&quot;");
		for ( var i in mArr) {
			if (str.indexOf(mArr[i]) == -1) {
				subArr.push(mArr[i]);
			}
		}
		return subArr;
	},
	null2Empty : function(obj) {
		if (obj == 0) {
			return obj;
		}
		return (!obj ? '' : obj);
	},
	/**
	 * 检测插件是否存在,如:'Quicktime'/'Quicktime.Quicktime'<br>
	 * IE浏览器控件的名称通道和其它浏览器插件名称不一致
	 * 
	 * @param name
	 *            插件名称
	 * @param nameIE
	 *            IE浏览器ActiveX插件名称
	 * @returns {Boolean}
	 */
	checkPlugin : function(name, nameIE) {
		return this.hasPluginIE(nameIE) || this.hasPlugin(name);
	},
	/**
	 * 检测非IE浏览器插件是否存在
	 * 
	 * @param{String} name 插件名称
	 * @returns {Boolean}
	 */
	hasPlugin : function(name) {
		if (!name)
			return false;
		name = name.toLowerCase();
		var plugins = window.navigator.plugins;
		for ( var i = 0; i < plugins.length; i++) {
			if (plugins[i] && plugins[i].name.toLowerCase().indexOf(name) > -1) {
				return true;
			}
		}
		return false;
	},
	/**
	 * 检测IE浏览器插件是否存在
	 * 
	 * @param{String} name IE浏览器ActiveX插件名称
	 * @returns {Boolean}
	 */
	hasPluginIE : function(name) {
		if (!name)
			return false;
		try {
			new ActiveXObject(name);
			return true;
		} catch (ex) {
			return false;
		}
	},
	/**
	 * 颜色取反
	 */
	colorInverse : function(color) {
		color = !color ? '' : color;
		color = parseInt(color.replace('#', '0x'));
		var r = color >> 16;
		var g = color >> 8 & 0x0000ff;
		var b = color & 0x0000ff;
		var _r = 255 - r;
		var _g = 255 - g;
		var _b = 255 - b;
		var clr = '#' + (_r << 16 | _g << 8 | _b).toString(16);
		return clr == '#0' ? '#000000' : clr;
	},
	/**
	 * 获取语言代码,如:'zh-cn'
	 */
	getLang : function() {
		var nav = window.navigator;
		return (nav.language || nav.userLanguage).toLowerCase();
	}
};
