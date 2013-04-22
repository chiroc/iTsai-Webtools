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
		return 'iTsai.nav';
	},
	/**
	 * 获取URL地址栏参数
	 * 
	 * @param{String} name 参数名
	 * @prarm{String} url URL地址默认为当前URL
	 * @returns
	 */
	getParameter : function(name, url) {
		var paramStr = url || window.location.search;
		if (paramStr.length == 0) {
			return null;
		}
		if (paramStr.charAt(0) != "?") {
			return null;
		}
		paramStr = unescape(paramStr).substring(1);
		if (paramStr.length == 0) {
			return null;
		}
		var params = paramStr.split('&');
		for ( var i = 0; i < params.length; i++) {
			var parts = params[i].split('=', 2);
			if (parts[0] == name) {
				if (parts.length < 2 || typeof (parts[1]) === "undefined"
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
	 * 转到当前页(刷新页面)
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
		window.opener = null;
		window.open('', '_self');
		window.close();
	},
	/**
	 * 浏览器名称
	 * 
	 * @type {String}
	 * @property name
	 */
	name : '',
	/**
	 * 浏览器主版本号,如：8
	 * 
	 * @type {String}
	 * @property version
	 */
	version : '',
	/**
	 * 浏览器详细版本号,如：8.2.11
	 * 
	 * @type {String}
	 * @property versions
	 */
	versions : '',
	/**
	 * 获取浏览器Agent信息,并返回包含name/version/versioins键的对象
	 * 
	 * @method agent
	 * @returns{Object} {name : '浏览器名称', version : '浏览器主版本号', versions :
	 *                  '浏览器详细版本号' }
	 */
	agent : function() {
		var browser = {}, userAgent = navigator.userAgent.toLowerCase(), s;
		(s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1]
				: (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1]
						: (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1]
								: (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1]
										: (s = userAgent
												.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1]
												: 0;

		var name = '', version = '';
		if (browser.ie) {
			name = 'msie';
			version = browser.ie;
		} else if (browser.firefox) {
			name = 'firefox';
			version = browser.firefox;
		} else if (browser.chrome) {
			name = 'chrome';
			version = browser.chrome;
		} else if (browser.opera) {
			name = 'opera';
			version = browser.opera;
		} else if (browser.safari) {
			name = 'safari';
			version = browser.safari;
		} else {
			name = 'unknown';
		}
		return {
			name : name,
			version : version.split('.')[0],
			versions : version
		};
	}
};
/**
 * 在页面加载时初始化当前API中部分参数
 * 
 * @type {Function} ()
 * @method ()
 */
(function() {
	// 初始化浏览器信息
	var nav = iTsai.nav, agent = nav.agent();
	nav.name = agent.name;
	nav.version = agent.version;
	nav.versions = agent.versions;
})();