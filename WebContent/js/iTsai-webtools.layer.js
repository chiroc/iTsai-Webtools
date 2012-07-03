/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description 遮盖层工具，包括页面遮盖和元素遮盖等.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.layer = {
	toString : function() {
		return 'iTsai.layer - 遮盖层工具，包括页面遮盖和元素遮盖等';
	},
	color : '#999',
	opacity : 0.5,
	/**
	 * 创建遮盖层(如果已经存在遮蔽层就先清除)
	 * 
	 * @param{String} content 显示信息
	 */
	add : function(content) {
		if ($('#itsai-layer').length > 0) {
			this.clear();
		}
		var tip = "数据处理中...";
		if (content != null) {
			tip = content;
		}
		var div = $('<div></div>');
		var doc = $(document);
		var txt = $([ '<span>', tip, '</span>' ].join(''));
		div.attr('id', 'itsai-layer').html(txt);
		function _resetPos() {
			var offset = doc.height() / 2 + doc.scrollTop();
			txt.css({
				top : offset,
				left : (doc.width() - txt.width()) / 2,
				position : 'absolute'
			});
			div.css({
				height : doc.height()
			});
		}
		$('body').append(div);
		_resetPos();
		$(window).bind('resize', function() {
			_resetPos();
		});
	},
	/**
	 * 清除遮盖层
	 */
	clear : function() {
		$('#itsai-layer').remove();
	},
	/**
	 * 添加遮盖层信息
	 * 
	 * @param{String} info 显示信息
	 * @param{Boolean} isAppend 追加或重写信息
	 */
	addInfo : function(info, isAppend) {
		if (isAppend) {
			$('#itsai-layer span').append(info);
		} else {
			$('#itsai-layer span').html(info);
		}
	},
	/**
	 * 为对象添加遮盖层
	 * 
	 * @param{$()} obj
	 * @param{String} info 显示信息
	 */
	mask : function(obj, info) {
		if (!obj)
			return false;
		$('#' + obj.attr('masker')).remove();
		var id = 'itsai-mask-' + iTsai.util.random();
		var o_h = obj.outerHeight();
		var o_w = obj.outerWidth();
		var pos = obj.position();
		var txt = $([ '<div>', (info ? info : ''), '</div>' ].join(''));
		var mask = $([ '<div class="itsai-mask" id="', id, '"></div>' ]
				.join(''));
		obj.after(mask).attr('masker', id);
		mask.append(txt).css({
			position : 'absolute',
			top : pos.top,
			left : pos.left,
			height : o_h,
			width : o_w
		});
		txt.css({
			top : (o_h - txt.height()) / 2,
			left : (o_w - txt.width()) / 2
		});
		return mask;
	},
	/**
	 * 清除mask
	 * 
	 * @param{$()} obj 被屏蔽的对象,如果没有就清除所有对象mask
	 */
	clearMask : function(obj) {
		if (obj) {
			$('#' + obj.attr('masker')).remove();
		} else {
			$('.itsai-mask').remove();
		}
	}
};
