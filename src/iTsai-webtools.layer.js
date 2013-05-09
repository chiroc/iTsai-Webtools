/**
 * 遮盖层工具，包括页面遮盖和元素遮盖等。
 * 
 * @namespace iTsai
 * @class layer
 */
iTsai.layer = {
	/**
	 * 显示当前对象名称路径。
	 * 
	 * @method toString
	 * @return {String} 'iTsai.layer'
	 */
	toString : function() {
		return 'iTsai.layer';
	},
	/**
	 * 创建遮盖层(如果已经存在遮蔽层就先清除)。
	 * 
	 * @method add
	 * @param {String}
	 *            content 显示信息
	 * @return {Object} iTsai.layer
	 */
	add : function(content) {
		if ($('#itsai-layer').length > 0) {
			this.clear();
		}
		var tip = "数据处理中...";
		if (content) {
			tip = content;
		}
		var div = $('<div></div>'), doc = $(document), txt = $([ '<span>', tip,
				'</span>' ].join(''));
		div.attr('id', 'itsai-layer').html(txt);
		$('body').append(div);

		var _resetPos = function() {
			var offset = doc.height() / 2 + doc.scrollTop();
			txt.css({
				top : offset,
				left : (doc.width() - txt.width()) / 2,
				position : 'absolute'
			});
			div.css({
				height : doc.height()
			});
		};
		_resetPos();
		$(window).bind('resize scroll', function() {
			_resetPos();
		});
		return this;
	},
	/**
	 * 清除遮盖层。
	 * 
	 * @method clear
	 * @return {Object} iTsai.layer
	 */
	clear : function() {
		$('#itsai-layer').remove();
		return this;
	},
	/**
	 * 添加遮盖层信息。
	 * 
	 * @method addInfo
	 * @param {String}
	 *            info 显示信息
	 * @param {Boolean}
	 *            isAppend 追加或重写信息。true-追加信息到之前内容;false-替换已有信息
	 * @return {Object} iTsai.layer
	 */
	addInfo : function(info, isAppend) {
		if (isAppend) {
			$('#itsai-layer span').append(info);
		} else {
			$('#itsai-layer span').html(info);
		}
		return this;
	},
	/**
	 * 为对象添加遮盖层。
	 * 
	 * @method mask
	 * @param {Object}
	 *            obj jQuery对象
	 * @param {String}
	 *            info 显示信息
	 * @return {Object} mask jQuery对象
	 */
	mask : function(obj, info) {
		if ($.isPlainObject(obj)) {
			$('#' + obj.attr('masker')).remove();
			var id = 'itsai-mask-' + iTsai.random(), o_h = obj.outerHeight(), o_w = obj
					.outerWidth(), pos = obj.position(), txt = $([ '<div>',
					(info ? info : ''), '</div>' ].join('')), mask = $([
					'<div class="itsai-mask" id="', id, '"></div>' ].join(''));
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
		}
	},
	/**
	 * 清除对象mask。
	 * 
	 * @method clearMask
	 * @param {Object}
	 *            obj jQuery对象 被屏蔽的对象,如果没有就清除所有对象mask
	 * @return {Object} iTsai.layer
	 */
	clearMask : function(obj) {
		if ($.isPlainObject(obj)) {
			$('#' + obj.attr('masker')).remove();
		} else {
			$('.itsai-mask').remove();
		}
		return this;
	},
	/**
	 * 将元素移动到文档中间。
	 * 
	 * @method move2Center
	 * @param {Object}
	 *            obj jQuery对象
	 * @param {Boolean}
	 *            adaptive 自动适应文档可视区大小同时改变对象位置
	 * @param {Number}
	 *            zIndex 层叠顺序
	 * @return {Object} obj jQuery对象
	 */
	move2Center : function(obj, adaptive, zIndex) {
		var doc = $(document), _resetPos = function() {
			obj
					.css({
						'z-index' : zIndex ? zIndex : 0,
						position : 'absolute',
						left : (doc.width() - obj.width()) / 2,
						top : doc.scrollTop()
								+ (($.browser.msie ? doc.height()
										: window.innerHeight) - obj.height())
								/ 2
					});
		};
		_resetPos();
		if (adaptive) {
			$(window).bind('resize scroll', function() {
				_resetPos();
			});
		}
		return obj;
	}
};