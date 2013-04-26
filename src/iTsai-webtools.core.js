/**
 *  iTsai WebTools(Web开发工具集)
 *  当前库依赖第三方库：
 *  1).jQuery（v1.7.x）。详细了解：http://jquery.com/
 *  2).json2.js库。如果浏览器支持JSON.stringify和JSON.parse接口就不需要此库，详细了解：http://www.json.org/
 *  当前库实现的基本功能：
 *  0). iTsai: 基础库；
 *  1).iTsai.ajax: 异步数据请求封装；
 *  2).iTsai.array: 数组的基本操作；
 *  3).iTsai.calendar: 日期时间操作；
 *  4).iTsai.form: 表单操作；
 *  5).iTsai.layer: 页面遮罩层；
 *  6).iTsai.msg: 提示信息；
 *  7).iTsai.nav: 页面导航工具；
 *  8).iTsai.regexp: 常用正则表达式；
 *  9).iTsai.string: 字符串操作。
 * @author Chihpeng Tsai(470597142@qq.com)
 * git: https://github.com/iiTsai
 * osc: http://my.oschina.net/tsai
 * @method ()
 */
(function() {
	if (!window.iTsai){
        window.iTsai = {};
    }
})();

/**
 * iTsai为顶层入口对象
 * @module iTsai
 */
iTsai = {
	/**
	 * iTsai库版本
     * @type {String}
     * @property version
	 */
	version : '0.2.9',
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'iTsai'
	 */
	toString : function() {
		return 'iTsai';
	},
	/**
	 * 生成唯一CID编号:时间+4位随机数
	 * 
	 * @method random
	 * @return {String} 随机数
	 */
	random : function() {
		return new Date().getTime() + '' + Math.round(Math.random() * 10000);
	},
	/**
	 * 判断是否含有'.'号
	 * 
	 * @method hasDot
	 * @param {String} str 输入字符串
	 * @return {Boolean}
	 */
	hasDot : function(str) {
		if (typeof str != 'string') {
			return false;
		}
		if (str.indexOf('.') != -1) {
			return true;
		}
		return false;
	},
	/**
	 * 判断对象是否为纯整形数字或整形数字字符串 011=9(011 表示8进制)
	 * 
	 * @method isInteger
	 * @param {Number/String} obj 输入数字或字符串
	 * @return {Boolean}
	 */
	isInteger : function(obj) {
		if (obj != parseInt(obj, 10)) {
			return false;
		}
		return true;
	},
	/**
	 * 将"undefined"和null转换为空串
	 * 
	 * @method obj2Empty
	 * @param {Object} obj 输入对象
	 * @return {Object}
	 */
	obj2Empty : function(obj) {
		if (typeof obj == "undefined" || obj == null) {
			return '';
		}
		return obj;
	},
	/**
	 * 检测插件是否存在,如:'Quicktime'/'Quicktime.Quicktime'<br>
	 * IE浏览器控件的名称通道和其它浏览器插件名称不一致
	 * 
	 * @method checkPlugin
	 * @param {String} name 插件名称
	 * @param {String} nameIE [optional,default=name] IE浏览器ActiveX插件名称
	 * @return {Boolean} true-插件已经安装;false-未安装
	 */
	checkPlugin : function(name, nameIE) {
		var ie = '';
		if (typeof nameIE === 'undefined') {
			ie = name;
		} else {
			ie = nameIE;
		}
		return this.hasPluginIE(ie) || this.hasPlugin(name);
	},
	/**
	 * 检测非IE浏览器插件是否存在
	 * 
	 * @method hasPlugin
	 * @param {String} name 插件名称
	 * @return {Boolean} true-插件已经安装;false-未安装
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
	 * @method hasPluginIE
	 * @param {String} name IE浏览器ActiveX插件名称
	 * @return {Boolean} true-插件已经安装;false-未安装
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
	 * 颜色取反，如将白色'#ffffff'转换为黑色'#000000'
	 * 
	 * @method colorInverse
	 * @param {String} color 颜色16进制字符表示形式，如：'#ff0000'，表示红色。
	 * @return {String} 取反后的颜色
	 */
	colorInverse : function(color) {
		color = !color ? '' : color;
		color = parseInt(color.replace('#', '0x'));
		var r = color >> 16, g = color >> 8 & 0x0000ff, b = color & 0x0000ff, _r = 255 - r, _g = 255 - g, _b = 255 - b, clr = '#'
				+ (_r << 16 | _g << 8 | _b).toString(16);
		return clr == '#0' ? '#000000' : clr;
	},
	/**
	 * 获取浏览器语言代码,如:'zh-CN'
	 * 
	 * @method getLang
	 * @return {String} 语言代码
	 */
	getLang : function() {
		var nav = window.navigator;
		return (nav.language || nav.userLanguage);
	},
	/**
	 * 取消事件冒泡
	 * 
	 * @method stopBubble
	 * @param {Object} e 事件对象
	 */
	stopBubble : function(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			// ie
			window.event.cancelBubble = true;
		}
	},
	/**
	 * 阻止浏览器默认行为
	 * 
	 * @method stopDefault
	 * @param {Object} e 事件对象
	 * @return {Boolean}
	 */
	preventDefault : function(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			// ie
			window.event.returnValue = false;
		}
		return false;
	}
};