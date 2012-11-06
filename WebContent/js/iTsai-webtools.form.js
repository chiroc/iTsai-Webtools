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
	},
	/**
	 * 序列化表单值,结果以key/value形式返回key为表单对象名称(name||id),value为其值
	 * 
	 * @param{$()} frm 表单对象
	 * @returns {}
	 */
	serialize : function(frm) {
		var obj = {};
		if (!frm) {
			return obj;
		};
		var types = ['button','checkbox','color','date ','datetime ','datetime-local ','email ','file','hidden','image','month ','number ','password','radio','range ','reset','search','submit','tel','text','time ','url','week'];
		var obj = {
		    k1 : 'v1',
		    k2 : 'v2'
		};
		for(var o in obj){
		    console.log(o,' - ',obj[o]);
		}

		return obj;
	},
	/**
	 * 将序列化表单值---以key/value形式返回key为表单对象名称(name||id),value为其值
	 * 
	 * @param{$()} frm 表单对象
	 * @returns {}
	 */
	deserialize : function(frm){
		
	}
};