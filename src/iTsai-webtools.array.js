
/**
 * 判断数据中是否存在cell值，并返回第一个存在的位置
 * 
 * @method indexOf
 * @param {String/Number} cell 数组元素值
 * @returns {Number} 查询成功返回0-n的索引号，失败返回-1
 */
Array.prototype.indexOf = function(cell) {
	for ( var i = 0, len = this.length; i < len; i++) {
		if (this[i] === cell)
			return i;
	}
	return -1;
};

/**
 * 数组基本操作API
 * @namespace iTsai
 * @class array
 */
iTsai.array = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'iTsai.array'
	 */
	toString : function() {
		return 'iTsai.array';
	},
	/**
	 * 数据相减:mArr-sArr,得到的数组是mArr的子集
	 * 
	 * @method arrayReduce
	 * @param {Array} mArr 被减数组
	 * @param {Array} sArr 减数据
	 * @return {Array} 两数组之差
	 */
	arrayReduce : function(mArr, sArr) {
		if (!sArr) {
			return mArr;
		}
		var subArr = [], str = sArr.join("&quot;&quot;");
		for ( var i in mArr) {
			if (str.indexOf(mArr[i]) == -1) {
				subArr.push(mArr[i]);
			}
		}
		return subArr;
	}
};