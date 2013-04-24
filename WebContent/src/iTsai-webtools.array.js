
(function() {
	if (!window.iTsai)
		iTsai = {};
})();

/**
 * 判断数据中是否存在cell值，并返回第一个存在的位置
 * 
 * @method indexOf
 * @returns{Number}
 */
Array.prototype.indexOf = function(cell) {
	for ( var i = 0, len = this.length; i < len; i++) {
		if (this[i] === cell)
			return i;
	}
	return -1;
};

/**
 * @namespace iTsai.array
 */
iTsai.array = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return{String} 'iTsai.array'
	 */
	toString : function() {
		return 'iTsai.array';
	},
	/**
	 * 数据相减:mArr-sArr,得到的数组是mArr的子集
	 * 
	 * @method arrayReduce
	 * @param{Array} mArr 被减数组
	 * @param{Array} sArr 减数据
	 * @returns []
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