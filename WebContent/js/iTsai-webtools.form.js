/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description 表单处理工具.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.form = {
	toString : function() {
		return 'iTsai.form - 表单处理工具';
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
	 * 在id区域内执行回车提交数据<br>
	 * 实际处理中应该将提交按键放在id区域外,避免重复提交
	 * 
	 * @param{String} id 被绑定对象的ID号
	 * @param{Function} fn 要选择的函数
	 * @returns {Boolean}
	 */
	bindingEnterKey : function(id, fn) {
		$('#' + id).keydown(function(e) {
			if (e.keyCode == 13) {
				if (fn)
					fn();
			}
		});
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
			var input = $(inputs[i]);
			var type = input.attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			var tagName = input.get(0).tagName;
			var id = input.attr('id');
			var name = input.attr('name');
			var value = null;

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

		var groups = frm.find('div[fieldset]');
		var jsonGroup = this._serializeGroups(groups);

		var inputs = frm
				.find('input[type!=button][type!=reset][type!=submit][type!=image],select,textarea');
		var json = this._serializeInputs(inputs);

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

		// 缓存json第一层数据对象
		var objects = {};
		// 缓存json嵌套层数据（第二层），将首先被赋值，以避免覆盖
		var groups = {};

		// 数据分组
		for ( var key in json) {
			var value = json[key];
			if (typeof value == 'object') {
				groups[key] = value;
			} else {
				objects[key] = value;
			}
		}

		var _deserializeInputs = this._deserializeInputs;
		var _filterInputs = this._filterInputs;
		var _findInputs = this._findInputs;

		// 填充嵌套层数据
		for ( var key in groups) {
			var json = groups[key];
			var div = frm.find('div[fieldset="' + key + '"]');
			if (!div.length) {
				continue;
			}
			var inputs = _filterInputs(div);
			if (!inputs.length) {
				continue;
			}
			for ( var k in json) {
				var val = json[k];
				var input = _findInputs(inputs, k);
				_deserializeInputs(input, val);
			}
		}

		// 填充第一层数据
		var inputs = _filterInputs(frm);
		for ( var key in objects) {
			var value = objects[key];
			var input = _findInputs(inputs, key);
			_deserializeInputs(input, value);
		}

		inputs.filter('._isSerialized').removeClass('_isSerialized');
		return this;
	}
};

(function ($) {
    $.fn.frmSerialize = function() {
       return iTsai.form.serialize($(this));
    };
}(jQuery));

$('#_lan').frmSerialize();
