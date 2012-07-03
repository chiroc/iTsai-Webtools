/**
 * iTsai(Cai zhipeng) WebTools(Web开发工具集)
 * 
 */

/**
 * 数组处理工具
 */

/**
 * 判断数据中是否存在cell值，并返回第一个存在的位置
 */
Array.prototype.indexOf = function(cell) {
	for ( var i = 0, len = this.length; i < len; i++) {
		if (this[i] === cell)
			return i;
	}
	return -1;
};