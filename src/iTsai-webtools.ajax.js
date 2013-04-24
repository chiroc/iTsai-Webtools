
/**
 * @namespace iTsai.ajax
 */
iTsai.ajax = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return{String} 'iTsai.ajax'
	 */
	toString : function() {
		return 'iTsai.ajax';
	},
	/**
	 * 初始化Request对象请求参数
	 * 
	 * @method setup
	 * @param{Object} s 配置对象，数据格式：{ url:'/', timeout:10000, sucCode : 200 }
	 * @return{Object} iTsai.ajax
	 */
	setup : function(s) {
		if ($.isPlainObject(s)) {
			var thiz = iTsai.ajax;
			thiz.REQ_URL = s.url ? s.url : '/';
			thiz.TIME_OUT = s.timeout ? s.timeout : 10000;
			thiz.REQ_CODE.SUCC = s.sucCode ? s.sucCode : 200;
			thiz.SHOW_SUCC_INFO = s.sucInfo ? true : false;
		}
		return this;
	},
	/**
	 * 请求状态码
	 * 
	 * @type {Object}
	 * @namespace iTsai.ajax
	 * @module iTsai.ajax.REQ_CODE
	 * @class REQ_CODE
	 */
	REQ_CODE : {
		/**
		 * 成功返回码200
		 * 
		 * @type {Number} 200
		 * @property SUCC
		 */
		SUCC : 200
	},
	/**
	 * 动作执行指令对象
	 * 
	 * @type {Object}
	 * @namespace iTsai.ajax
	 * @module iTsai.ajax.ACTIOIN
	 * @class ACTION
	 */
	ACTION : {
		/**
		 * 创建
		 * 
		 * @type {String}
		 * @property C
		 */
		C : 'c',
		/**
		 * 读取
		 * 
		 * @type {String}
		 * @property R
		 */
		R : 'r',
		/**
		 * 更新
		 * 
		 * @type {String}
		 * @property U
		 */
		U : 'u',
		/**
		 * 删除
		 * 
		 * @type {String}
		 * @property D
		 */
		D : 'd'
	},
	/**
	 * HTTP(POST/GET)请求相对地址
	 * 
	 * @type {String}
	 * @property REQ_URL
	 */
	REQ_URL : '/',
	/**
	 * 超时,默认超时30000ms
	 * 
	 * @type {Number} 15000ms
	 * @property TIME_OUT
	 */
	TIME_OUT : 10000,
	/**
	 * 显示请求成功信息
	 * 
	 * @type {Boolean} false
	 * @property SHOW_SUCC_INFO
	 */
	SHOW_SUCC_INFO : false,
	/**
	 * POST请求
	 * 
	 * @method post
	 * @param{Object} cmd json对象参数
	 * @param{Function} callback [optional,default=undefined] POST请求成功回调函数
	 * @param{Boolean} sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
	 */
	post : function(cmd, callback, sync) {
		this.ajax('POST', cmd, callback, sync);
	},
	/**
	 * postR是对iTsai.ajax.post的封装,为读请求:Posa.ACTION.R
	 * 
	 * @method postR
	 * @param{Object} cmd json对象参数
	 * @param{Function} callback [optional,default=undefined] POST请求成功回调函数
	 * @param{Boolean} sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
	 */
	postR : function(cmd, callback, sync) {
		cmd.action = this.ACTION.R;
		this.ajax('POST', cmd, callback, sync);
	},
	/**
	 * postU是对iTsai.ajax.post的封装,为更新请求:Posa.ACTION.U
	 * 
	 * @method postU
	 * @param{Object} cmd json对象参数
	 * @param{Function} callback [optional,default=undefined] POST请求成功回调函数
	 * @param{Boolean} sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
	 */
	postU : function(cmd, callback, sync) {
		cmd.action = this.ACTION.U;
		this.ajax('POST', cmd, callback, sync);
	},
	/**
	 * GET请求
	 * 
	 * @method get
	 * @param{Object} cmd json对象参数
	 * @param{Function} callback [optional,default=undefined] POST请求成功回调函数
	 * @param{Boolean} sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
	 */
	get : function(cmd, callback, sync) {
		this.ajax('GET', cmd, callback, sync);
	},
	/**
	 * ajax
	 * 
	 * @method ajax
	 * @param{String} type POST/GET
	 * @param{Object} cmd json参数命令和数据
	 * @param{Function} callback [optional,default=undefined]
	 *                  请求成功回调函数,返回数据data和isSuc
	 * @param{Boolean} sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
	 */
	ajax : function(type, cmd, callback, sync) {
		cmd = JSON.stringify(cmd);
		var thiz = iTsai.ajax;
		$.ajax({
			data : cmd,
			type : type,
			async : sync ? false : true,
			url : thiz.REQ_URL,
			timeout : thiz.TIME_OUT,
			success : function(data, textStatus) {
				if (!data) {
					return;
				}
				if (typeof data !== 'object') {
					return;
				}
				data = $.parseJSON(data);
				var isSuc = thiz.printReqInfo(data);
				if (callback && data) {
					callback(data.data || {}, isSuc);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus == "timeout") {
					iTsai.msg.infoError("访问超时:" + errorThrown);
				}
				throw {
					XMLHttpRequest : XMLHttpRequest,
					textStatus : textStatus,
					errorThrown : errorThrown
				};
			}
		});
	},
	/**
	 * 打开请求返回代码和信息
	 * 
	 * @method printRegInfo
	 * @param{Object} data 请求返回JSON数据
	 * @return{Boolean} true-成功;false-失败
	 */
	printReqInfo : function(data) {
		if (!data)
			return false;
		var code = data.code, msg = data.msg, succ = this.REQ_CODE.SUCC;
		if (code === succ && this.SHOW_SUCC_INFO) {
			iTsai.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
		} else {
			iTsai.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
		}
		return code === succ ? true : false;
	}
};