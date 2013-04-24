
/**
 * 在原生String对象基础上添加自定义函数，如：字符串处理工具常用API,包括空白处理、字符统计、字符容器等.
 *
 * @namespace iTsai
 * @class string
 */
iTsai.string = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'iTsai.string'
	 */
	toString : function() {
		return 'iTsai.string';
	},
	/**
	 * 字符串容器类
	 * 
	 * @Class StringBuffer
	 * @constructor
	 */
	StringBuffer : function() {
		this._string = [];
		/**
		 * 向容器内追加数据。
		 * 
		 * @method append
		 * @param {String/Number} str 追加字符串或数字
		 * @return {Object} iTsai.string.StringBuffer
		 */
		this.append = function(str) {
			var t = typeof str;
			if (t === 'string' || t === 'number') {
				this._string.push(str);
			}
			return this;
		};
		/**
		 * 以字符串形式显示容器内数据
		 * 
		 * @method toString
		 * @param {String/Number} spliter [optional,default=''] 字符串分隔符。
		 * @return {String} 容器内所有字符串行集合
		 */
		this.toString = function(spliter) {
			var t = typeof spliter;
			if (t !== 'string' && t !== 'number') {
				spliter = '';
			}
			return this._string.join(spliter);
		};
		/**
		 * 以数组形式显示容器内数据
		 * 
		 * @method toArray
		 * @return {Array} 容器数组
		 */
		this.toArray = function() {
			return this._string;
		};
	}
};

/**
 * 去掉字符串前面和最后的空格
 * 
 * @method trim
 * @return {String}
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的空格
 * 
 * @method trimBlanks
 * @return {String}
 */
String.prototype.trimBlanks = function() {
	return this.replace(/(\s*)/g, "");
};
/**
 * 去掉字符串前面(prefix)的空格blank
 * 
 * @method trimPreBlank
 * @return {String}
 */
String.prototype.trimPreBlank = function() {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 去掉字符串后面(suffix)的空格blank
 * 
 * @method trimSufBlank
 * @return {String}
 */
String.prototype.trimSufBlank = function() {
	return this.replace(/(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的character
 *
 * @method trimChars
 * @param {String/Number} character 字符
 * @param {Boolean} caseSensitive [optional,default=false] 是否区分大小写
 * @return {String}
 */
String.prototype.trimChars = function(character, caseSensitive) {
	if (character === '') {
		character = ' ';
	}
	var i = 'i';
	if (caseSensitive) {
		i = '';
	}
	return this.replace(new RegExp("(" + character + ")", i + "g"), "");
};
/**
 * 去掉字符串最后面的','end//[逗号Comma]
 * 
 * @method trimCom
 * @return {String}
 */
String.prototype.trimCom = function() {
	return this.replace(/(\,$)/g, "");
};
/**
 * 去掉字符串中前面的'0'
 * 
 * @method trimZero
 * @return {String}
 */
String.prototype.trimPreZero = function() {
	return this.replace(/(^0*)/g, "");
};

/**
 * 计算字符串的长度（一个双字节字符按UTF-8长度计3(aaa)，ASCII字符计1）
 * 
 * @method sizeUTF8
 * @return {String}
 */
String.prototype.sizeUTF8 = function() {
	return this.replace(/[^\x00-\xff]/g, "aaa").length;
};
/**
 * 计算字符串的长度（一个双字节字符按DWORD长度计2(aa)，ASCII字符计1）
 * 
 * @method sizeDW
 * @return {String}
 */
String.prototype.sizeDW = function() {
	return this.replace(/[^\x00-\xff]/g, "aa").length;
};
/**
 * 清除前面和后面的换行符
 * 
 * @method trimLines
 * @return {String}
 */
String.prototype.trimLines = function() {
	return this.replace(/(^\n+)|(\n+$)/g, "");
};
/**
 * 将多个换行替换为一个
 * 
 * @method rowSpan
 * @return {String}
 */
String.prototype.rowSpan = function() {
	return this.replace(/(\n+)/g, "\n");
};
/**
 * 将\n替换为\r\n<br>
 * 在windows系统下，回车换行符号是"\r\n".但是在Linux等系统下是"\n"符号
 * 
 * @method lr2crlf
 * @return {String}
 */
String.prototype.lf2crlf = function() {
	return this.replace(/(\n+)/g, "\r\n");
};
/**
 * 格式化字符串,将{n},替换为对应的参数，如：'I {0}&{1} China.'.formatArgs('love','like'); 输出："I
 * love&like China."
 * 
 * @method formatArgs
 * @param {String/Number} arguments
 * @return {String}
 */
String.prototype.formatArgs = function() {
	var thiz = this;
	for ( var i = 0; i < arguments.length; i++) {
		var param = "\{" + i + "\}";
		thiz = thiz.replace(param, arguments[i]);
	}
	return thiz;
};
