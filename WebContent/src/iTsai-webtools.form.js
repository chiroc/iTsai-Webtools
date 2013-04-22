(function() {
	if (!window.iTsai)
		iTsai = {};
})();

/**
 * iTsai WebTools(Web开发工具集) <br>
 * 表单处理工具
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 */
iTsai.form = {
	toString : function() {
		return 'iTsai.form';
	},
	/**
	 * 常用键盘码对象
	 * 
	 * @type {Object}
	 * @namespace iTsai
	 * @module iTsai.form.KEYCODE
	 * @class KEYCODE
	 */
	KEYCODE : {
		/**
		 * 全屏F11(122)
		 * 
		 * @type {Number}
		 * @property F11
		 */
		F11 : 122,
		/**
		 * 退出Esc(27)
		 * 
		 * @type {Number}
		 * @property ESC
		 */
		ESC : 27,
		/**
		 * 回车Enter(13)
		 * 
		 * @type {Number}
		 * @property ENTER
		 */
		ENTER : 13,
		/**
		 * 上一页Page Up(33)
		 * 
		 * @type {Number}
		 * @property PAGEUP
		 */
		PAGEUP : 33,
		/**
		 * 下一页Page Down(34)
		 * 
		 * @type {Number}
		 * @property PAGEDOWN
		 */
		PAGEDOWN : 34,
		/**
		 * 页尾end(35)
		 * 
		 * @type {Number}
		 * @property END
		 */
		END : 35,
		/**
		 * 页首home(36)
		 * 
		 * @type {Number}
		 * @property HOME
		 */
		HOME : 36,
		/**
		 * 左箭头left(37)
		 * 
		 * @type {Number}
		 * @property LEFT
		 */
		LEFT : 37,
		/**
		 * 向上箭头up(38)
		 * 
		 * @type {Number}
		 * @property UP
		 */
		UP : 38,
		/**
		 * 右前头(39)
		 * 
		 * @type {Number}
		 * @property RIGHT
		 */
		RIGHT : 39,
		/**
		 * 向下箭头down(40)
		 * 
		 * @type {Number}
		 * @property DOWN
		 */
		DOWN : 40
	},
	/**
	 * 绑定键盘事件到元素，当焦点在元素上并触发键盘事件时响应该函数
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 */
	_bindKey : function(keyCode, element, callback) {
		element.keydown(function(e) {
			if (e.keyCode == keyCode) {
				if (typeof callback == 'function')
					callback(element, e);
			}
		});
	},
	/**
	 * 在element区域内响应Enter键盘事件<br>
	 * 实际处理中应该将提交按键(type="submit")放在element区域外,避免重复提交
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindEnterKey : function(element, callback) {
		this._bindKey(this.KEYCODE.ENTER, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Esc键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindEscKey : function(element, callback) {
		this._bindKey(this.KEYCODE.ESC, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应F11键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindF11Key : function(element, callback) {
		this._bindKey(this.KEYCODE.F11, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Page Down键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindPageDownKey : function(element, callback) {
		this._bindKey(this.KEYCODE.PAGEDOWN, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Page Up键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindPageUpKey : function(element, callback) {
		this._bindKey(this.KEYCODE.PAGEUP, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Left键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindLeftKey : function(element, callback) {
		this._bindKey(this.KEYCODE.LEFT, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Right键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindRightKey : function(element, callback) {
		this._bindKey(this.KEYCODE.RIGHT, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Up键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindUpKey : function(element, callback) {
		this._bindKey(this.KEYCODE.UP, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Down键盘事件<br>
	 * 
	 * @param{Object} element 被绑定元素的jQuery对象
	 * @param{Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @returns {Object} iTsai.form
	 */
	bindDownKey : function(element, callback) {
		this._bindKey(this.KEYCODE.DOWN, element, callback);
		return this;
	},
	/**
	 * 获取单选框值,如果有表单就在表单内查询,否则在全文查询
	 * 
	 * @param{String}name radio名称
	 * @param{$()} frm jQuery object
	 * @returns
	 */
	getRadioValue : function(name, frm) {
		if (frm && frm.find)
			return frm.find('input[name="' + name + '"]:checked').val();
		return $('input[name="' + name + '"]:checked').val();
	},
	/**
	 * 设置单选框值,如果有表单就在表单内查询,否则在全文查询
	 * 
	 * @param{String}name radio名称
	 * @param{String} value
	 * @param{$()} frm
	 * @returns
	 */
	setRadioValue : function(name, value, frm) {
		if (frm && frm.find)
			return frm
					.find('input[name="' + name + '"][value="' + value + '"]')
					.attr('checked', true);
		return $('input[name="' + name + '"][value="' + value + '"]').attr(
				'checked', true);
	},
	/**
	 * 设置select下拉框的值
	 * 
	 * @param{String} selectId 下拉框id号
	 * @param{String/Number} value 值
	 * @param{$()} form jQuery object
	 * @returns
	 */
	setSelectValue : function(selectId, value, frm) {
		if (frm && frm.find)
			return frm.find('#' + selectId + ' option[value="' + value + '"]')
					.attr('selected', true);
		return $('#' + selectId + ' option[value="' + value + '"]').attr(
				'selected', true);
	},
	/**
	 * 将object转换为select的列表模式，key为option的value，值为option的文本
	 * 
	 * @param objects
	 *            key-map对象
	 * @returns{String} html
	 */
	object2Options : function(objects) {
		if (!$.isPlainObject(objects)) {
			return '';
		}
		var html = [];
		for ( var i in objects) {
			html.push('<option value="' + i + '">' + objects[i] + '</option>');
		}
		return html.join('');
	},
	/**
	 * 禁用输入控件
	 * 
	 * @param{Object} frmObj iQuery表单对象（或其它任何包装容器，如：div）
	 * @param disabled
	 */
	formDisable : function(frmObj, disabled) {
		if ($.isPlainObject(frmObj)) {
			frmObj.find('input,select,textarea').attr('disabled', disabled);
		}
		return this;
	},
	/**
	 * 将输入控件集合序列化成对象<br>
	 * 名称或编号作为键，value属性作为值
	 * 
	 * @param {Array}
	 *            inputs input/select/textarea的对象集合
	 * @return {object} json 对象 {key:value,...}
	 */
	_serializeInputs : function(inputs) {
		var json = {};
		if (!inputs) {
			return json;
		}
		for ( var i = inputs.length - 1; i >= 0; i--) {
			var input = $(inputs[i]), type = input.attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			var tagName = input.get(0).tagName, id = input.attr('id'), name = input
					.attr('name'), value = null;

			// 判断输入框是否已经序列化过
			if (input.hasClass('_isSerialized')) {
				continue;
			}

			// input输入标签
			if (tagName == 'INPUT' && type) {
				switch (type) {
				case 'checkbox': {
					value = input.is(':checked');
				}
					break;

				case 'radio': {
					if (input.is(':checked')) {
						value = input.attr('value');
					} else {
						continue;
					}
				}
					break;

				default: {
					value = input.val();
				}
				}
			} else {
				// 非input输入标签，如：select,textarea
				value = input.val();
			}

			json[name || id] = value;
			// 清除序列化标记
			input.removeClass('_isSerialized');
		}
		return json;
	},
	/**
	 * 将值填充到输入标签里面
	 * 
	 * @param{Array} inputs 输入标签集合
	 * @param{String/Number} value 值
	 * @returns {___anonymous188_8285}
	 */
	_deserializeInputs : function(inputs, value) {
		if (!inputs && value == null) {
			return this;
		}

		for ( var i = inputs.length - 1; i >= 0; i--) {
			var input = $(inputs[i]);
			// 判断输入框是否已经序列化过
			if (input.hasClass('_isSerialized')) {
				continue;
			}
			var type = input.attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type) {
				switch (type) {
				case 'checkbox': {
					input.attr('checked', value);
				}
					break;

				case 'radio': {
					input.each(function(i) {
						var thiz = $(this);
						if (thiz.attr('value') == value) {
							thiz.attr('checked', true);
						}
					});
				}
					break;

				default: {
					input.val(value);
				}
				}
			} else {
				input.val(value);
			}

			input.addClass('_isSerialized');
		}

		return this;
	},
	/**
	 * 在分组中查找 fieldset (如：fieldset="user")开头的数据域<br>
	 * 
	 * @param {Array}
	 *            groups 输入框分组容器集合
	 * @return {Object} json 对象 {key:value,...}
	 */
	_serializeGroups : function(groups) {
		var json = {};
		if (!groups) {
			return json;
		}

		for ( var i = groups.length - 1; i >= 0; i--) {
			var group = $(groups[i]);
			var key = group.attr('fieldset');
			if (!key) {
				continue;
			}
			var inputs = group
					.find('input[type!=button][type!=reset][type!=submit],select,textarea');
			json[key] = this._serializeInputs(inputs);
			// 添加序列化标记
			inputs.addClass('_isSerialized');
		}
		return json;
	},
	/**
	 * 序列化表单值,结果以key/value形式返回key为表单对象名称(name||id),value为其值.<br>
	 * HTML格式：<br>
	 * 1).表单容器：通常是一个form表单（如果不存在就以body为父容器），里面包含输入标签和子容器;<br>
	 * 2).子容器（也可以没有）：必须包括属性fieldset="XXX" div标签，里面包含输入标签和子容器。<br>
	 * 序列化后将生成以XXX为主键的json对象.如果子容器存在嵌套则以fieldset为主键生成不同分组的json对象.<br>
	 * 3).输入标签：输入标签为input类型标签（包括：'checkbox','color','date','datetime','datetime-local',<br>
	 * 'email','file','hidden','month','number','password','radio','range
	 * ','reset','search','submit',<br>
	 * 'tel','text','time ','url','week'）.
	 * 而'button','reset','submit','image'会被过虑掉.
	 * 
	 * @param{$()} frm jQuery表单对象
	 * @returns {Object} json对象 最多包含两层结构
	 */
	serialize : function(frm) {
		var json = {};
		frm = frm || $('body');
		if (!frm) {
			return json;
		}

		var groups = frm.find('div[fieldset]'), jsonGroup = this
				._serializeGroups(groups), inputs = frm
				.find('input[type!=button][type!=reset][type!=submit][type!=image],select,textarea'), json = this
				._serializeInputs(inputs);

		for ( var key in jsonGroup) {
			json[key] = jsonGroup[key];
		}
		return json;
	},
	/**
	 * 填充表单内容：将json数据形式数据填充到表单内，只解析单层json结构
	 * 
	 * @param{$()} frm jQuery表单对象（或其它容器标签对象，如：div）
	 * @param{Object} json 序列化好的json数据对象，最多只包含两层嵌套
	 * @returns {Object} iTsai.form 对象
	 */
	deserializeSimple : function(frm, json) {
		frm = frm || $('body');
		if (!frm || !json) {
			return this;
		}

		var _deserializeInputs = this._deserializeInputs;
		for ( var key in json) {
			var value = json[key];
			_deserializeInputs(frm, key, value);
		}
		return this;
	},
	/**
	 * 获取合法的输入标签
	 * 
	 * @param {$()}
	 *            container 标签容器
	 * @returns {[]} inputs jQuery对象数组
	 */
	_filterInputs : function(container) {
		var inputs = $(container
				.find('input[type!=button][type!=reset][type!=submit][type!=image][type!=file],select,textarea'));
		return inputs;
	},
	/**
	 * 查找符合条件的输入标签
	 * 
	 * @param{Array} inputs jQueery输入标签数组
	 * @param{String} key 查询关键字
	 * @returns{Array} input 标签数组
	 */
	_findInputs : function(inputs, key) {
		var input = $(inputs.filter('input[name=' + key + '],input[id=' + key
				+ '],textarea[name=' + key + '],textarea[id=' + key
				+ '],select[name=' + key + '],select[id=' + key + ']'));
		return input;
	},
	/**
	 * 填充表单内容：将json数据形式数据填充到表单内，最多解析两层json结构
	 * 
	 * @param{$()} frm jQuery表单对象（或其它容器标签对象，如：div）
	 * @param{Object} json 序列化好的json数据对象，最多只包含两层嵌套
	 * @returns {Object} iTsai.form 对象
	 */
	deserialize : function(frm, json) {
		frm = frm || $('body');
		if (!frm || !json) {
			return this;
		}

		// objects缓存json第一层数据对象;
		// groups缓存json嵌套层数据（第二层），将首先被赋值，以避免覆盖
		var objects = {}, groups = {};

		// 数据分组
		for ( var key in json) {
			var value = json[key];
			if ($.isPlainObject(value)) {
				groups[key] = value;
			} else {
				objects[key] = value;
			}
		}

		var _deserializeInputs = this._deserializeInputs, _filterInputs = this._filterInputs, _findInputs = this._findInputs;

		// 填充嵌套层数据
		for ( var key in groups) {
			var json = groups[key], div = frm.find('div[fieldset="' + key
					+ '"]');
			if (!div.length) {
				continue;
			}
			var inputs = _filterInputs(div);
			if (!inputs.length) {
				continue;
			}
			for ( var k in json) {
				var val = json[k], input = _findInputs(inputs, k);
				_deserializeInputs(input, val);
			}
		}

		// 填充第一层数据
		var inputs = _filterInputs(frm);
		for ( var key in objects) {
			var value = objects[key], input = _findInputs(inputs, key);
			_deserializeInputs(input, value);
		}

		inputs.filter('._isSerialized').removeClass('_isSerialized');
		return this;
	}
};
