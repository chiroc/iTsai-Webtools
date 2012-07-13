/**
 * iTsai WebTools(Web开发工具集)
 * 
 * @author Chihpeng Tsai(470597142@qq.com)
 * @description 页面导航工具等.
 */

(function() {
	if (!window.iTsai)
		iTsai = {};
})();

iTsai.nav = {
	toString : function() {
		return 'iTsai.layer - 页面导航工具等';
	},
	/**
	 * 获取URL地址栏参数
	 * 
	 * @param{String} name 参数名
	 * @prarm{String} url URL地址默认为当前URL
 	 * @returns
	 */
	getParameter : function(name,url) {
		var paramStr = url || window.location.search;
		if (paramStr.length == 0) {
			return null;
		}
		if (paramStr.charAt(0) != "?") {
			return null;
		}
		paramStr = unescape(paramStr);
		paramStr = paramStr.substring(1);

		if (paramStr.length == 0) {
			return null;
		}
		var params = paramStr.split('&');
		for ( var i = 0; i < params.length; i++) {
			var parts = params[i].split('=', 2);
			if (parts[0] == name) {
				if (parts.length < 2 || typeof (parts[1]) == "undefined"
						|| parts[1] == "undefined" || parts[1] == "null")
					return '';
				return parts[1];
			}
		}
		return null;
	},
	/**
	 * 转到上一页[缓存页]
	 */
	goPrevPage : function() {
		history.go(-1);
		return this;
	},
	/**
	 * 转到下一页
	 */
	goNextPage : function() {
		history.go(1);
		return this;
	},
	/**
	 * 转到当前页=刷新
	 */
	refreshPage : function() {
		history.go(0);
		return this;
	},
	/**
	 * 设置主页
	 * 
	 * @param url
	 * @returns {___anonymous186_2244}
	 */
	setHomepage : function(url) {
		if (document.all) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(url);
		} else if (window.sidebar) {
			if (window.netscape) {
				try {
					window.netscape.security.PrivilegeManager
							.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert('此操作被浏览器拒绝！请在地址栏输入"about:config"并回车然后将[signed.applets.codebase_principal_support]的值设置为true');
				}
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1']
					.getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		} else {
			alert('请用Ctrl+D将地址添加到收藏夹');
		}
		return this;
	},
	/**
	 * 获取域名或主机IP
	 * 
	 * @returns
	 */
	getHost : function() {
		return location.host.split(':')[0];
	},
	/**
	 * Firefox需要手动开启dom.allow_scripts_to_close_windows<br>
	 * about:config -> dom.allow_scripts_to_close_windows = true
	 */
	closeWin : function() {
		var x = 0;
		window.opener = null;
		window.open('', '_self');
		window.close();
	}
};