/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai = {
	version : '0.2.0',
	toString : function() {
		return 'iTsai';
	},
	/**
	 * 生成唯一CID编号:时间+4位随机数
	 */
	random : function() {
		return new Date().getTime() + '' + Math.round(Math.random() * 10000);
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
		if (obj != parseInt(obj, 10)) {
			return false;
		}
		return true;
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
		var r = color >> 16, g = color >> 8 & 0x0000ff, b = color & 0x0000ff, _r = 255 - r, _g = 255 - g, _b = 255 - b, clr = '#'
				+ (_r << 16 | _g << 8 | _b).toString(16);
		return clr == '#0' ? '#000000' : clr;
	},
	/**
	 * 获取语言代码,如:'zh-cn'
	 */
	getLang : function() {
		var nav = window.navigator;
		return (nav.language || nav.userLanguage).toLowerCase();
	},
	/**
	 * 取消事件冒泡
	 * 
	 * @param e
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
	 * @param e
	 * @returns {Boolean}
	 */
	stopDefault : function(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			// ie
			window.event.returnValue = false;
		}
		return false;
	},
	printDocInfo : function() {
		var s = "";
		s += " 网页可见区域宽：" + document.body.clientWidth + "\n";
		s += " 网页可见区域高：" + document.body.clientHeight + "\n";
		s += " 网页可见区域宽：" + document.body.offsetWidth + " (包括边线和滚动条的宽)" + "\n";
		s += " 网页可见区域高：" + document.body.offsetHeight + " (包括边线的宽)" + "\n";
		s += " 网页正文全文宽：" + document.body.scrollWidth + "\n";
		s += " 网页正文全文高：" + document.body.scrollHeight + "\n";
		s += " 网页被卷去的高(ff)：" + document.body.scrollTop + "\n";
		s += " 网页被卷去的高(ie)：" + document.documentElement.scrollTop + "\n";
		s += " 网页被卷去的左：" + document.body.scrollLeft + "\n";
		s += " 网页正文部分上：" + window.screenTop + "\n";
		s += " 网页正文部分左：" + window.screenLeft + "\n";
		s += " 屏幕分辨率的高：" + window.screen.height + "\n";
		s += " 屏幕分辨率的宽：" + window.screen.width + "\n";
		s += " 屏幕可用工作区高度：" + window.screen.availHeight + "\n";
		s += " 屏幕可用工作区宽度：" + window.screen.availWidth + "\n";
		s += " 你的屏幕设置是 " + window.screen.colorDepth + " 位彩色" + "\n";
		s += " 你的屏幕设置 " + window.screen.deviceXDPI + " 像素/英寸" + "\n";
		s += " window的页面可视部分实际高度(ff) " + window.innerHeight + "\n";
		return s;
	}
};