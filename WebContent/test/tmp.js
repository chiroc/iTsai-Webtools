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