/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 */


/**
 * 将函数注册到jQuery对象 TODO delete
 */
(function($) {
	$.fn.frmSerialize = function() {
		return iTsai.form.serialize($(this));
	};
	$.fn.frmDeserialize = function(json) {
		return iTsai.form.deserialize($(this), json);
	};
}(jQuery));