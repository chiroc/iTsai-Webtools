/**
 * iTsai(Cai zhipeng) WebTools(Web开发工具集)
 * 
 */

iTsai.form = {
	/**
	 * 获取单选框值,如果有表单就在表单内查询,否则在全文查询
	 * 
	 * @param{String}name radio名称
	 * @param{$()} frm jquery object
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
	 * @param{$()} form jquery object
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
	}
};