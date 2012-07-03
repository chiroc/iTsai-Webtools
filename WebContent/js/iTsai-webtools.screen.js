/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description 屏幕处理工具，包括移动屏幕元素、窗口处理等.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.screen = {
	toString : function() {
		return 'iTsai.screen - 屏幕处理工具，包括移动屏幕元素、窗口处理等';
	},
	/**
	 * 将元素移动到屏幕中间
	 * 
	 * @param obj
	 */
	move2Center : function(obj) {
		if (!obj)
			return false;
		var body = $('body');
		var doc = $(document);
		obj.css({
			position : 'absolute',
			left : (doc.width() - obj.width()) / 2,
			top : doc.scrollTop()
					+ (window.innerHeight || doc.height() - obj.height()) / 2
		});
	},
	toString : function() {
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
	},
};