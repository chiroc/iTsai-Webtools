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
		return 'iTsai.calendar - 日期时间处理工具';
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
		secs = parseInt(secs);
		var hours = Math.floor(secs / 3600);
		var mins = Math.floor((secs % 3600) / 60);
		var sec = secs % 3600 % 60;
		return this.fillZero(hours) + ':' + this.fillZero(mins) + ':'
				+ this.fillZero(sec);
	},
	fillZero : function(time) {
		if (time < 10) {
			return '0' + time;
		}
		return time;
	},
	/**
	 * 格式化日期时间字符串
	 * 
	 * @param{Date} dt datetime
	 * @param{String} fmt format string. 'yyyy-MM-dd hh:mm:ss'
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
	 * 初始化日期时间控件控件分日期(#x_date)、时(#x_h)、分(#x_m)、秒(#x_s)
	 * 
	 * @param {String}calendarId
	 *            日期控件前缀
	 * @param {String}
	 *            datetime 完整时间格式'yyyy-MM-dd hh:mm:ss'
	 */
	setWidgetDatetime : function(calendarId, datetime) {
		var _datetime = datetime
				|| this.dateTime2str(new Date(), 'yyyy-MM-dd hh:mm:ss');
		var dt = _datetime.split(' ');
		$('#' + calendarId + '_date').val(dt[0]);
		var t = dt[1].split(':');
		$('#' + calendarId + '_h').val(t[0]);
		$('#' + calendarId + '_m').val(t[1]);
		$('#' + calendarId + '_s').val(t[2]);
	},
	/**
	 * 获取日期时分秒:2012-02-22 14:34:47<br>
	 * 日期和时间控件ID格式要完全统一
	 * 
	 * @param{String} calendarId 日期控件ID,时/分/少分别+'_h'/'_m'/'_s'
	 */
	getWidgetDatetime : function(calendarId) {
		var zz = '00';
		var dd = ':';
		var date = $('#' + calendarId + '_date').val();
		date = !date ? this.date() : date;
		var h = $('#' + calendarId + '_h').val();
		h = !h ? zz : h;
		var m = $('#' + calendarId + '_m').val();
		m = !m ? zz : m;
		var s = $('#' + calendarId + '_s').val();
		s = !s ? zz : s;
		return [ date, ' ', h, dd, m, dd, s ].join('');
	},
	/**
	 * 获取当前日期时间
	 * 
	 * @param{String} arguments 可设置一个日期时间格式,如:'yyyy/MM/dd hh:mm:ss'
	 * @returns
	 */
	getDatetime : function() {
		var fmt = "yyyy-MM-dd hh:mm:ss";
		if (arguments[0])
			fmt = arguments[0];
		return this.dateTime2str(new Date(), fmt);
	},
	/**
	 * 初始化日期段选择器
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
