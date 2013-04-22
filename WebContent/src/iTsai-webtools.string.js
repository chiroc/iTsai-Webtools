(function() {
	if (!window.iTsai)
		iTsai = {};
})();

/**
 * iTsai WebTools(Web开发工具集)<br>
 * 
 * 在原生String对象基础上添加自定义函数，如：字符串处理工具常用API,包括空白处理、字符统计、字符缓存工具等.
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 */
iTsai.string = {
	/**
	 * 字符串容器
	 * 
	 * @param{String/Number} spliter 分隔符,默认为空.
	 */
	StringBuffer : function(spliter) {
		this._string = [];
		this.append = function(string) {
			this._string.push(string);
			return this;
		};
		this.toString = function() {
			return this._string.join(!spliter ? '' : spliter);
		};
	}
};

/**
 * 去掉字符串前面和最后的空格
 * 
 * @method trim
 * @returns{String}
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的空格
 * 
 * @method trims
 * @returns{String}
 */
String.prototype.trims = function() {
	return this.replace(/(\s*)/g, "");
};
/**
 * 去掉字符串前面(prefix)的空格blank
 * 
 * @method trimpb
 * @returns{String}
 */
String.prototype.trimpb = function() {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 去掉字符串后面(suffix)的空格blank
 * 
 * @method trimsb
 * @returns{String}
 */
String.prototype.trimsb = function() {
	return this.replace(/(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的character
 * 
 * @param character
 *            字符
 * @param caseSensitive
 *            区分大小写
 * @method trimall
 * @returns{String}
 */
String.prototype.trimall = function(character, caseSensitive) {
	if (character === '')
		character = ' ';
	var i = 'i';
	if (caseSensitive) {
		i = '';
	}
	return this.replace(new RegExp("(" + character + ")", i + "g"), "");
};
/**
 * 去掉字符串最后面的','end//[逗号Comma]
 * 
 * @method trimc
 * @returns{String}
 */
String.prototype.trimc = function() {
	return this.replace(/(\,$)/g, "");
};
/**
 * 去掉字符串最后面的';'end//[分号Comma]
 * 
 * @method trimsem
 * @returns{String}
 */
String.prototype.trimsem = function() {
	return this.replace(/(\;$)/g, "");
};
/**
 * 去掉字符串中前面的'0'
 * 
 * @method trimz
 * @returns{String}
 */
String.prototype.trimz = function() {
	return this.replace(/(^0*)/g, "");
};
/**
 * 清除前面和后面的换行符
 * 
 * @method trimlines
 * @returns{String}
 */
String.prototype.trimlines = function() {
	return this.replace(/(^\n+)|(\n+$)/g, "");
};
/**
 * 清除前面和后面的()
 * 
 * @method trimbracket
 * @returns{String}
 */
String.prototype.trimbracket = function() {
	return this.replace(/(^\()|(\)$)/g, "");
};
/**
 * 计算字符串的长度（一个双字节字符按UTF-8长度计3(aaa)，ASCII字符计1）
 * 
 * @method sizeutf8
 * @returns{String}
 */
String.prototype.sizeutf8 = function() {
	return this.replace(/[^\x00-\xff]/g, "aaa").length;
};
/**
 * 计算字符串的长度（一个双字节字符按DWORD长度计2(aa)，ASCII字符计1）
 * 
 * @method sizedw
 * @returns{String}
 */
String.prototype.sizedw = function() {
	return this.replace(/[^\x00-\xff]/g, "aa").length;
};
/**
 * 将NULl转换为空字符
 * 
 * @method null2Empty
 * @returns{String}
 */
String.prototype.null2empty = function() {
	return this === null ? "" : this;
};
/**
 * 将多个换行替换为一个
 * 
 * @method rowspan
 * @returns{String}
 */
String.prototype.rowspan = function() {
	return this.replace(/(\n+)/g, "\n");
};
/**
 * 将\n替换为\r\n<br>
 * 在windows系统下，回车换行符号是"\r\n".但是在Linux等系统下是"\n"符号
 * 
 * @method lr2crlf
 * @returns{String}
 */
String.prototype.lf2crlf = function() {
	return this.replace(/(\n+)/g, "\r\n");
};
/**
 * 格式化字符串,将{n},替换为对应的参数，如：'I {0}&{1} China.'.formatArgs('love','like'); 输出："I
 * love&like China."
 * 
 * @method fillArgs
 * @returns{String}
 */
String.prototype.formatArgs = function() {
	var formated = this;
	for ( var i = 0; i < arguments.length; i++) {
		var param = "\{" + i + "\}";
		formated = formated.replace(param, arguments[i]);
	}
	return formated;
};
