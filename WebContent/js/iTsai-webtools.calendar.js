/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description 日期时间处理工具.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.calendar = {
	toString : function() {
		return 'iTsai.calendar';
	},
	/**
	 * 将秒转换为时间hh:mm:ss格式
	 * 
	 * @param secs
	 * @returns {String}
	 */
	secs2Time : function(secs) {
		if (secs < 0) {
			secs = 0;
		}
		secs = parseInt(secs, 10);
		var hours = Math.floor(secs / 3600), mins = Math
				.floor((secs % 3600) / 60), sec = secs % 3600 % 60;
		return this.zeroCompletion(hours) + ':' + this.zeroCompletion(mins)
				+ ':' + this.zeroCompletion(sec);
	},
	zeroCompletion : function(time) {
		if (time < 10) {
			return '0' + time;
		}
		return time;
	},
	/**
	 * 格式化日期时间字符串
	 * 
	 * @param{Date} dt 日期对象
	 * @param{String} fmt 格式化字符串，如：'yyyy-MM-dd hh:mm:ss'
	 * @returns
	 */
	dateTime2str : function(dt, fmt) {
		var z = {
			M : dt.getMonth() + 1,
			d : dt.getDate(),
			h : dt.getHours(),
			m : dt.getMinutes(),
			s : dt.getSeconds()
		};
		fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
			return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
					.slice(-2);
		});
		return fmt.replace(/(y+)/g, function(v) {
			return dt.getFullYear().toString().slice(-v.length);
		});
	},
	/**
	 * 根据日期时间格式获取获取当前日期时间
	 * 
	 * @prarm{String} 日期时间格式，如："yyyy-MM-dd hh:mm:ss";
	 * @return{String} 格式化后的日期时间字符串
	 */
	dateTimeWrapper : function(fmt) {
		if (arguments[0])
			fmt = arguments[0];
		return this.dateTime2str(new Date(), fmt);
	},
	/**
	 * 获取当前日期时间
	 * 
	 * @param{String} fmt 日期时间格式，默认为简体标准日期时间格式'yyyy/MM/dd hh:mm:ss'
	 * @returns
	 */
	getDatetime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd hh:mm:ss');
	},
	/**
	 * 获取当前日期时间+毫秒
	 * 
	 * @param{String} fmt 日期时间格式，默认为简体标准日期时间格式'yyyy-MM-dd hh:mm:ss'
	 * @returns {String}
	 */
	getDatetimes : function(fmt) {
		var dt = new Date();
		return this.dateTime2str(dt, fmt || 'yyyy-MM-dd hh:mm:ss') + '.'
				+ dt.getMilliseconds();
	},
	/**
	 * 获取当前日期（年-月-日）
	 * 
	 * @param{String} fmt 日期格式，默认为简体标准日期格式
	 * @returns {String}
	 */
	getDate : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd');
	},
	/**
	 * 获取当前时间（时:分:秒）
	 * 
	 * @param{String} fmt 日期格式，默认为简体标准时间格式
	 * @returns {String}
	 */
	getTime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'hh:mm:ss');
	},
	/**
	 * 初始化日期段选择器，依赖于jQueryUI的日期控件
	 * 
	 * @param{String} datefrom 开始日期id
	 * @param{String} dateto 结束日期id
	 */
	initDatePickerRange : function(datefrom, dateto) {
		var picker = $('#' + datefrom + ',' + '#' + dateto);
		var dates = picker.datepicker(
				{
					changeMonth : true,
					numberOfMonths : 1,
					dateFormat : 'yy-mm-dd',
					onSelect : function(selectedDate) {
						var option = this.id == datefrom ? "minDate"
								: "maxDate", instance = $(this).data(
								"datepicker"), date = $.datepicker.parseDate(
								instance.settings.dateFormat
										|| $.datepicker._defaults.dateFormat,
								selectedDate, instance.settings);
						dates.not(this).datepicker("option", option, date);
					},
					setDate : new Date()
				}).datepicker('setDate', new Date());
	}
};