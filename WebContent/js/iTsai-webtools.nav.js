/**
 * iTsai(Cai zhipeng) WebTools(Web开发工具集)
 * 
 */

iTsai.nav = {
	/**
	 * 获取URL地址栏参数
	 * 
	 * @param name
	 * @returns
	 */
	getParameter : function(name) {
		// 获取URL地址参数部分
		var paramStr = window.location.search;
		// ?devno=888888&clsid=53EACB5F-D068-422F-8836-FAC0C0C75CCA
		// alert("paramStr:\n"+paramStr);
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
	setHomepage : function(url) {
		if (document.all) {
			// IE
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(url);
		} else if (window.sidebar) {
			// 火狐
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