/**
 * iTsai(Cai zhipeng) WebTools(Web开发工具集)
 * 
 */

/**
 * 字符串处理工具,根据需要持续增加中
 */
/**
 * 去掉字符串前面和最后的空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的空格
 * 
 * @returns
 */
String.prototype.trims = function() {
	return this.replace(/(\s*)/g, "");
};
/**
 * 去掉字符串前面的空格front
 * 
 * @returns
 */
String.prototype.trimf = function() {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 去掉字符串后面的空格back
 * 
 * @returns
 */
String.prototype.trimb = function() {
	return this.replace(/(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的character
 * 
 * @param character
 *            字符
 * @param caseSensitive
 *            区分大小写
 * @returns
 */
String.prototype.trimall = function(character, caseSensitive) {
	if (character === '')
		character = ' ';
	var i = '';
	if (caseSensitive) {
		i = 'i';
	}
	var re = new RegExp("(\\" + character + ")", i + "g");
	return this.replace(re, "");
};
/**
 * 去掉字符串最后面的','end//[逗号Comma]
 * 
 * @returns
 */
String.prototype.trimc = function() {
	return this.replace(/(\,$)/g, "");
};
/**
 * 去掉字符串最后面的';'end//[分号Comma]
 * 
 * @returns
 */
String.prototype.trimsem = function() {
	return this.replace(/(\;$)/g, "");
};
/**
 * 去掉字符串中前面的'0'
 * 
 * @returns
 */
String.prototype.trimz = function() {
	return this.replace(/(^0*)/g, "");
};
/**
 * 计算字符串的长度（一个双字节字符按UTF-8长度计3(aaa)，ASCII字符计1）
 * 
 * @returns
 */
String.prototype.sizeutf8 = function() {
	return this.replace(/[^\x00-\xff]/g, "aaa").length;
};
/**
 * 计算字符串的长度（一个双字节字符按DWORD长度计2(aa)，ASCII字符计1）
 * 
 * @returns
 */
String.prototype.sizedw = function() {
	return this.replace(/[^\x00-\xff]/g, "aa").length;
};
/**
 * 将多个换行替换为一个
 * 
 * @returns
 */
String.prototype.mergeline = function() {
	return this.replace(/(\n+)/g, "\n");
};
/**
 * 将\n替换为\r\n<br>
 * 在windows系统下，回车换行符号是"\r\n".但是在Linux等系统下是"\n"符号
 * 
 * @returns
 */
String.prototype.lf2crlf = function() {
	return this.replace(/(\n+)/g, "\r\n");
};
/**
 * 清除前面和后面的换行符
 * 
 * @returns
 */
String.prototype.trimlines = function() {
	return this.replace(/(^\n+)|(\n+$)/g, "");
};

/**
 * 填充字符串,将{n},替换为对应的参数
 * 
 * @returns {String}
 */
String.prototype.fillArgs = function() {
	var formated = this;
	for ( var i = 0; i < arguments.length; i++) {
		var param = "\{" + i + "\}";
		formated = formated.replace(param, arguments[i]);
	}
	return formated;
};

/**
 * 清除前面和后面的()
 * 
 * @returns
 */
String.prototype.trimbracket = function() {
	return this.replace(/(^\()|(\)$)/g, "");
};
function StringBuffer() {
	this._string = new Array();
}
StringBuffer.prototype.append = function(string) {
	this._string.push(string);
	return this;
};
StringBuffer.prototype.toString = function() {
	return this._string.join('');
};

/**
 * 字符串容器
 * 
 * @param{String/Number} spliter 分隔符,默认或0为空.
 */
function StringBuffer(spliter) {
	this._string = [];

	this.append = function(string) {
		this._string.push(string);
		return this;
	};
	this.toString = function() {
		return this._string.join(!spliter ? '' : spliter);
	};
}
