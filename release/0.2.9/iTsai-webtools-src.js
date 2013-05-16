/**
 *  iTsai WebTools(Web开发工具集)
 *  当前库依赖第三方库：
 *  1).jQuery（v1.7.x）。详细了解：http://jquery.com/
 *  2).json2.js库。如果浏览器支持JSON.stringify和JSON.parse接口就不需要此库，详细了解：http://www.json.org/
 *  当前库实现的基本功能：
 *  0). iTsai: 基础库；
 *  1).iTsai.ajax: 异步数据请求封装；
 *  2).iTsai.array: 数组的基本操作；
 *  3).iTsai.calendar: 日期时间操作；
 *  4).iTsai.form: 表单操作；
 *  5).iTsai.layer: 页面遮罩层；
 *  6).iTsai.msg: 提示信息；
 *  7).iTsai.nav: 页面导航工具；
 *  8).iTsai.regexp: 常用正则表达式；
 *  9).iTsai.string: 字符串操作。
 * @author Chihpeng Tsai(470597142@qq.com)
 * git: https://github.com/iiTsai
 * osc: http://my.oschina.net/tsai
 * @method ()
 */
 
(function() {
    if (!window.iTsai) {
        window.iTsai = {};
    }
})();

/**
 * iTsai为顶层入口对象
 * 
 * @module iTsai
 */
iTsai = {
    /**
     * iTsai库版本
     * 
     * @type {String}
     * @property version
     */
    version : '0.2.9',
    /**
     * 显示当前对象名称路径
     * 
     * @method toString
     * @return {String} 'iTsai'
     */
    toString : function() {
        return 'iTsai';
    },
    /**
     * 生成唯一CID编号:时间+4位随机数
     * 
     * @method random
     * @return {String} 随机数
     */
    random : function() {
        return new Date().getTime() + '' + Math.round(Math.random() * 10000);
    },
    /**
     * 判断是否含有'.'号
     * 
     * @method hasDot
     * @param {String}
     *            str 输入字符串
     * @return {Boolean}
     */
    hasDot : function(str) {
        if (typeof str != 'string') {
            return false;
        }
        if (str.indexOf('.') != -1) {
            return true;
        }
        return false;
    },
    /**
     * 判断对象是否为纯整形数字或整形数字字符串 011=9(011 表示8进制)
     * 
     * @method isInteger
     * @param {Number/String}
     *            obj 输入数字或字符串
     * @return {Boolean}
     */
    isInteger : function(obj) {
        if (obj != parseInt(obj, 10)) {
            return false;
        }
        return true;
    },
    /**
     * 将"undefined"和null转换为空串
     * 
     * @method obj2Empty
     * @param {Object}
     *            obj 输入对象
     * @return {Object}
     */
    obj2Empty : function(obj) {
        if (typeof obj == "undefined" || obj == null) {
            return '';
        }
        return obj;
    },
    /**
     * 检测插件是否存在,如:'Quicktime'/'Quicktime.Quicktime'<br>
     * IE浏览器控件的名称通道和其它浏览器插件名称不一致
     * 
     * @method checkPlugin
     * @param {String}
     *            name 插件名称
     * @param {String}
     *            nameIE [optional,default=name] IE浏览器ActiveX插件名称
     * @return {Boolean} true-插件已经安装;false-未安装
     */
    checkPlugin : function(name, nameIE) {
        var ie = '';
        if (typeof nameIE === 'undefined') {
            ie = name;
        } else {
            ie = nameIE;
        }
        return this.hasPluginIE(ie) || this.hasPlugin(name);
    },
    /**
     * 检测非IE浏览器插件是否存在
     * 
     * @method hasPlugin
     * @param {String}
     *            name 插件名称
     * @return {Boolean} true-插件已经安装;false-未安装
     */
    hasPlugin : function(name) {
        if (!name)
            return false;
        name = name.toLowerCase();
        var plugins = window.navigator.plugins;
        for ( var i = 0; i < plugins.length; i++) {
            if (plugins[i] && plugins[i].name.toLowerCase().indexOf(name) > -1) {
                return true;
            }
        }
        return false;
    },
    /**
     * 检测IE浏览器插件是否存在
     * 
     * @method hasPluginIE
     * @param {String}
     *            name IE浏览器ActiveX插件名称
     * @return {Boolean} true-插件已经安装;false-未安装
     */
    hasPluginIE : function(name) {
        if (!name)
            return false;
        try {
            new ActiveXObject(name);
            return true;
        } catch (ex) {
            return false;
        }
    },
    /**
     * 颜色取反，如将白色'#ffffff'转换为黑色'#000000'
     * 
     * @method colorInverse
     * @param {String}
     *            color 颜色16进制字符表示形式，如：'#ff0000'，表示红色。
     * @return {String} 取反后的颜色
     */
    colorInverse : function(color) {
        color = !color ? '' : color;
        color = parseInt(color.replace('#', '0x'));
        var r = color >> 16, g = color >> 8 & 0x0000ff, b = color & 0x0000ff, _r = 255 - r, _g = 255 - g, _b = 255 - b, clr = '#'
                + (_r << 16 | _g << 8 | _b).toString(16);
        return clr == '#0' ? '#000000' : clr;
    },
    /**
     * 获取浏览器语言代码,如:'zh-CN'
     * 
     * @method getLang
     * @return {String} 语言代码
     */
    getLang : function() {
        var nav = window.navigator;
        return (nav.language || nav.userLanguage);
    },
    /**
     * 取消事件冒泡
     * 
     * @method stopBubble
     * @param {Object}
     *            e 事件对象
     */
    stopBubble : function(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            // ie
            window.event.cancelBubble = true;
        }
    },
    /**
     * 阻止浏览器默认行为
     * 
     * @method stopDefault
     * @param {Object}
     *            e 事件对象
     * @return {Boolean}
     */
    preventDefault : function(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            // ie
            window.event.returnValue = false;
        }
        return false;
    }
};

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
         * @param {String/Number}
         *            str 追加字符串或数字
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
         * @param {String/Number}
         *            spliter [optional,default=''] 字符串分隔符。
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
 * @param {String/Number}
 *            character 字符
 * @param {Boolean}
 *            caseSensitive [optional,default=false] 是否区分大小写
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
 * @param {String/Number}
 *            arguments
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

/**
 * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
 * 
 * @namespace iTsai
 * @class ajax
 */
iTsai.ajax = {
    /**
     * 显示当前对象名称路径
     * 
     * @method toString
     * @return {String} 'iTsai.ajax'
     */
    toString : function() {
        return 'iTsai.ajax';
    },
    /**
     * 初始化全局Request对象请求参数，包括：请求URL，超时，成功返回码。
     * 
     * @method setup
     * @param {Object}
     *            s 配置对象，数据格式：{ url:'/', timeout:10000, sucCode : 200 }
     * @return {Object} iTsai.ajax
     */
    setup : function(s) {
        if ($.isPlainObject(s)) {
            var thiz = iTsai.ajax;
            thiz.REQ_URL = s.url ? s.url : '/';
            thiz.TIME_OUT = s.timeout ? s.timeout : 10000;
            thiz.reqCode.SUCC = s.sucCode ? s.sucCode : 200;
            thiz.SHOW_SUCC_INFO = s.sucInfo ? true : false;
        }
        return this;
    },
    /**
     * 请求状态码
     * 
     * @type {Object}
     * @namespace iTsai.ajax
     * @class reqCode
     */
    reqCode : {
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
     * @class action
     */
    action : {
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
     * HTTP(POST/GET)请求地址
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
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    post : function(cmd, callback, sync) {
        this.ajax('POST', cmd, callback, sync);
    },
    /**
     * postC是对iTsai.ajax.post的封装,为创建请求:iTsai.ajax.action.C
     * 
     * @method postC
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    postC : function(cmd, callback, sync) {
        cmd.action = this.action.C;
        this.ajax('POST', cmd, callback, sync);
    },
    /**
     * postR是对iTsai.ajax.post的封装,为读请求:iTsai.ajax.action.R
     * 
     * @method postR
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    postR : function(cmd, callback, sync) {
        cmd.action = this.action.R;
        this.ajax('POST', cmd, callback, sync);
    },
    /**
     * postU是对iTsai.ajax.post的封装,为更新请求:iTsai.ajax.action.U
     * 
     * @method postU
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    postU : function(cmd, callback, sync) {
        cmd.action = this.action.U;
        this.ajax('POST', cmd, callback, sync);
    },
    /**
     * postD是对iTsai.ajax.post的封装,为读请求:iTsai.ajax.action.D
     * 
     * @method postD
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    postD : function(cmd, callback, sync) {
        cmd.action = this.action.D;
        this.ajax('POST', cmd, callback, sync);
    },
    /**
     * GET请求
     * 
     * @method get
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] GET请求成功回调函数
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
     */
    get : function(cmd, callback, sync) {
        this.ajax('GET', cmd, callback, sync);
    },
    /**
     * ajax
     * 
     * @method ajax
     * @param {String}
     *            type POST/GET
     * @param {Object}
     *            cmd json参数命令和数据
     * @param {Function}
     *            callback [optional,default=undefined] 请求成功回调函数,返回数据data和isSuc
     * @param {Boolean}
     *            sync [optional,default=false] 是否为同步请求:false-异步;true-同步。
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
     * @param {Object}
     *            data 请求返回JSON数据
     * @return {Boolean} true-成功;false-失败
     */
    printReqInfo : function(data) {
        if (!data)
            return false;
        var code = data.code, msg = data.msg, succ = this.reqCode.SUCC;
        if (code === succ && this.SHOW_SUCC_INFO) {
            iTsai.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
        } else if (code !== succ) {
            iTsai.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
        }
        return code === succ ? true : false;
    }
};
/**
 * 常用正则表达式
 * 
 * @namespace iTsai
 * @class regexp
 */
iTsai.regexp = {
    /**
     * 显示当前对象名称路径
     * 
     * @method toString
     * @return {String} iTsai.regexp
     */
    toString : function() {
        return 'iTsai.regexp';
    },
    domain : /^[\w-]*(\.[\w-]*)+/ig,
    url : /https?:\/\/[\w-]*(\.[\w-]*)+/ig,
    ftp : /ftp:\/\/[\w-]*(\.[\w-]*)+/ig,
    smtp : /smtp:\/\/[\w-]*(\.[\w-]*)+/ig,
    email : /^[-a-zA-Z0-9_\.]+@([0-9A-Za-z][0-9A-Za-z-]+\.)+[A-Za-z]{2,5}$/,
    ipv4 : /^([01]?\d\d?|2[0-4]\d|25[0-5])(\.([01]?\d\d?|2[0-4]\d|25[0-5])){3}$/,
    mac : /^[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}$/,
    rang0t65535 : /^(\d{1,4}|[1-5]\d{4}|6([0-4]\d{3}|5([0-4]\d{2}|5([0-2]\d|3[0-5]))))$/,
    phone : /(^[0-9]{1,4}\-[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)/,// 9999-9999-99999999可包含国际码
    char_zhcn : /[u4e00-u9fa5]/,// 中文字符
    byte : /[^x00-xff]/,
    ascii : /[^\x00-xff]/,// ASCII字符
    blank : /\s/,
    notBlank : /\S/
};
/**
 * 页面提示信息
 * 
 * @namespace iTsai
 * @class msg
 */
iTsai.msg = {
    /**
     * 显示当前对象名称路径。
     * 
     * @method toString
     * @return {String} 'iTsai.msg'
     */
    toString : function() {
        return 'iTsai.msg';
    },
    /**
     * 普通信息提示。
     * 
     * @method infoAlert
     * @param {String}
     *            info 信息
     * @param {Number}
     *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
     */
    infoAlert : function(info, seconds) {
        this._infoImpl(info, 'c_alert_f', seconds);
    },
    /**
     * 正确信息提示。
     * 
     * @method infoCorrect
     * @param {String}
     *            info 信息
     * @param {Number}
     *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
     */
    infoCorrect : function(info, seconds) {
        this._infoImpl(info, 'c_correct_f', seconds);
    },
    /**
     * 警告信息提示。
     * 
     * @method infoWarning
     * @param {String}
     *            info 信息
     * @param {Number}
     *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
     */
    infoWarning : function(info, seconds) {
        this._infoImpl(info, 'c_warning_f', seconds);
    },
    /**
     * 错误信息提示。
     * 
     * @method infoError
     * @param {String}
     *            info 信息
     * @param {Number}
     *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
     */
    infoError : function(info, seconds) {
        this._infoImpl(info, 'c_error_f', seconds);
    },
    /**
     * 清除提示信息。
     * 
     * @method infoClear
     */
    infoClear : function() {
        $('#c_msg_x').remove();
    },
    /**
     * 通用提示信息样式为.c_correct。
     * 
     * @method _infoImpl
     * @param {String}
     *            info 提示信息
     * @param {String}
     *            cls 样式
     * @param {Number}
     *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除
     */
    _infoImpl : function(info, cls, seconds) {
        $('#c_msg_x').remove();
        var cMsgObj = $('<span id="c_msg_x"></span>');
        cMsgObj.css({
            position : 'absolute'
        }).addClass(cls).html(info);
        var body = $('body');
        if (seconds < 0) {
            body.prepend(cMsgObj);
        } else {
            seconds = (seconds == undefined ? 5 : seconds);
            body.prepend(cMsgObj.fadeIn().delay(seconds * 1000).fadeOut());
        }
        var _msg_x = $('#c_msg_x'), top_orig = _msg_x.position().top, _resetPos = function(
                top_orig) {
            _msg_x.delay(10).css({
                left : (body.width() - _msg_x.width()) / 2,
                top : top_orig + $(document).scrollTop()
            });
        };
        _resetPos(top_orig);
        $(window).bind('resize scroll', function() {
            _resetPos(top_orig);
        });
    }
};
/**
 * 页面导航和浏览器基本信息
 * 
 * @namespace iTsai
 * @class nav
 */
iTsai.nav = {
    /**
     * 显示当前对象名称路径
     * 
     * @method toString
     * @return {String} 'iTsai.nav'
     */
    toString : function() {
        return 'iTsai.nav';
    },
    /**
     * 获取URL地址栏参数值
     * 
     * @method getParameter
     * @param {String}
     *            name 参数名
     * @param {String}
     *            url [optional,default=当前URL]URL地址
     * @return {String} 参数值
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
     * 转到上一页（缓存页）
     * 
     * @method goPrevPage
     * @return iTsai.nav
     */
    goPrevPage : function() {
        history.go(-1);
        return this;
    },
    /**
     * 转到下一页
     * 
     * @method goNextPage
     * @return iTsai.nav
     */
    goNextPage : function() {
        history.go(1);
        return this;
    },
    /**
     * 转到当前页(刷新页面)
     * 
     * @method refreshPage
     * @return iTsai.nav
     */
    refreshPage : function() {
        history.go(0);
        return this;
    },
    /**
     * 设置主页
     * 
     * @method setHomepage
     * @param {String}
     *            url 设置的URL
     * @return iTsai.nav
     */
    setHomepage : function(url) {
        url = (url ? url : location.href);
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
            try {
                var prefs = Components.classes['@mozilla.org/preferences-service;1']
                        .getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', url);
            } catch (e) {
                alert('设置失败');
            }
        } else {
            alert('请用Ctrl+D将地址添加到收藏夹');
        }
        return this;
    },
    /**
     * 获取域名或主机IP
     * 
     * @method getHost
     * @return {String}
     */
    getHost : function() {
        return location.host.split(':')[0];
    },
    /**
     * Firefox需要手动开启dom.allow_scripts_to_close_windows<br>
     * about:config -> dom.allow_scripts_to_close_windows = true。
     * 
     * @method closeWin
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
     * @return {Object} {name : '浏览器名称', version : '浏览器主版本号', versions :
     *         '浏览器详细版本号' }
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
/**
 * 遮盖层工具，包括页面遮盖和元素遮盖等。
 * 
 * @namespace iTsai
 * @class layer
 */
iTsai.layer = {
    /**
     * 显示当前对象名称路径。
     * 
     * @method toString
     * @return {String} 'iTsai.layer'
     */
    toString : function() {
        return 'iTsai.layer';
    },
    /**
     * 创建遮盖层(如果已经存在遮蔽层就先清除)。
     * 
     * @method add
     * @param {String}
     *            content 显示信息
     * @return {Object} iTsai.layer
     */
    add : function(content) {
        if ($('#itsai-layer').length > 0) {
            this.clear();
        }
        var tip = "数据处理中...";
        if (content) {
            tip = content;
        }
        var div = $('<div></div>'), doc = $(document), txt = $([ '<span>', tip,
                '</span>' ].join(''));
        div.attr('id', 'itsai-layer').html(txt);
        $('body').append(div);

        var _resetPos = function() {
            var offset = doc.height() / 2 + doc.scrollTop();
            txt.css({
                top : offset,
                left : (doc.width() - txt.width()) / 2,
                position : 'absolute'
            });
            div.css({
                height : doc.height()
            });
        };
        _resetPos();
        $(window).bind('resize scroll', function() {
            _resetPos();
        });
        return this;
    },
    /**
     * 清除遮盖层。
     * 
     * @method clear
     * @return {Object} iTsai.layer
     */
    clear : function() {
        $('#itsai-layer').remove();
        return this;
    },
    /**
     * 添加遮盖层信息。
     * 
     * @method addInfo
     * @param {String}
     *            info 显示信息
     * @param {Boolean}
     *            isAppend 追加或重写信息。true-追加信息到之前内容;false-替换已有信息
     * @return {Object} iTsai.layer
     */
    addInfo : function(info, isAppend) {
        if (isAppend) {
            $('#itsai-layer span').append(info);
        } else {
            $('#itsai-layer span').html(info);
        }
        return this;
    },
    /**
     * 为对象添加遮盖层。
     * 
     * @method mask
     * @param {Object}
     *            obj jQuery对象
     * @param {String}
     *            info 显示信息
     * @return {Object} mask jQuery对象
     */
    mask : function(obj, info) {
        if ($.isPlainObject(obj)) {
            $('#' + obj.attr('masker')).remove();
            var id = 'itsai-mask-' + iTsai.random(), o_h = obj.outerHeight(), o_w = obj
                    .outerWidth(), pos = obj.position(), txt = $([ '<div>',
                    (info ? info : ''), '</div>' ].join('')), mask = $([
                    '<div class="itsai-mask" id="', id, '"></div>' ].join(''));
            obj.after(mask).attr('masker', id);
            mask.append(txt).css({
                position : 'absolute',
                top : pos.top,
                left : pos.left,
                height : o_h,
                width : o_w
            });
            txt.css({
                top : (o_h - txt.height()) / 2,
                left : (o_w - txt.width()) / 2
            });
            return mask;
        }
    },
    /**
     * 清除对象mask。
     * 
     * @method clearMask
     * @param {Object}
     *            obj jQuery对象 被屏蔽的对象,如果没有就清除所有对象mask
     * @return {Object} iTsai.layer
     */
    clearMask : function(obj) {
        if ($.isPlainObject(obj)) {
            $('#' + obj.attr('masker')).remove();
        } else {
            $('.itsai-mask').remove();
        }
        return this;
    },
    /**
     * 将元素移动到文档中间。
     * 
     * @method move2Center
     * @param {Object}
     *            obj jQuery对象
     * @param {Boolean}
     *            adaptive 自动适应文档可视区大小同时改变对象位置
     * @param {Number}
     *            zIndex 层叠顺序
     * @return {Object} obj jQuery对象
     */
    move2Center : function(obj, adaptive, zIndex) {
        var doc = $(document), _resetPos = function() {
            obj
                    .css({
                        'z-index' : zIndex ? zIndex : 0,
                        position : 'absolute',
                        left : (doc.width() - obj.width()) / 2,
                        top : doc.scrollTop()
                                + (($.browser.msie ? doc.height()
                                        : window.innerHeight) - obj.height())
                                / 2
                    });
        };
        _resetPos();
        if (adaptive) {
            $(window).bind('resize scroll', function() {
                _resetPos();
            });
        }
        return obj;
    }
};
/**
 * 表单处理工具
 * 
 * @namespace iTsai
 * @class form
 */
iTsai.form = {
    /**
     * 显示当前对象名称路径。
     * 
     * @method toString
     * @return {String} 'iTsai.form'
     */
    toString : function() {
        return 'iTsai.form';
    },
    /**
     * 常用键盘码对象。
     * 
     * @type {Object}
     * @namespace iTsai.form
     * @class keycode
     */
    keycode : {
        /**
         * 全屏F11(122)
         * 
         * @type {Number}
         * @property F11
         */
        F11 : 122,
        /**
         * 退出Esc(27)
         * 
         * @type {Number}
         * @property ESC
         */
        ESC : 27,
        /**
         * 回车Enter(13)
         * 
         * @type {Number}
         * @property ENTER
         */
        ENTER : 13,
        /**
         * 上一页Page Up(33)
         * 
         * @type {Number}
         * @property PAGEUP
         */
        PAGEUP : 33,
        /**
         * 下一页Page Down(34)
         * 
         * @type {Number}
         * @property PAGEDOWN
         */
        PAGEDOWN : 34,
        /**
         * 页尾end(35)
         * 
         * @type {Number}
         * @property END
         */
        END : 35,
        /**
         * 页首home(36)
         * 
         * @type {Number}
         * @property HOME
         */
        HOME : 36,
        /**
         * 左箭头left(37)
         * 
         * @type {Number}
         * @property LEFT
         */
        LEFT : 37,
        /**
         * 向上箭头up(38)
         * 
         * @type {Number}
         * @property UP
         */
        UP : 38,
        /**
         * 右前头(39)
         * 
         * @type {Number}
         * @property RIGHT
         */
        RIGHT : 39,
        /**
         * 向下箭头down(40)
         * 
         * @type {Number}
         * @property DOWN
         */
        DOWN : 40
    },
    /**
     * 绑定键盘事件到元素，当焦点在元素上并触发键盘事件时响应该函数。
     * 
     * @method _bindKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Number}
     *            iTsai.form.keycode 键盘码
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     */
    _bindKey : function(element, keycode, callback) {
        element.keydown(function(e) {
            if (e.keyCode == keycode) {
                if (typeof callback == 'function')
                    callback(element, e);
            }
        });
    },
    /**
     * 在element区域内响应Enter键盘事件。<br>
     * 实际处理中应该将提交按键(type="submit")放在element区域外,避免重复提交。
     * 
     * @method bindEnterKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindEnterKey : function(element, callback) {
        this._bindKey(this.keycode.ENTER, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Esc键盘事件。
     * 
     * @method bindEscKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindEscKey : function(element, callback) {
        this._bindKey(this.keycode.ESC, element, callback);
        return this;
    },
    /**
     * 在element区域内响应F11键盘事件。
     * 
     * @method bindF11Key
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindF11Key : function(element, callback) {
        this._bindKey(this.keycode.F11, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Page Down键盘事件。
     * 
     * @method bindPageDownKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindPageDownKey : function(element, callback) {
        this._bindKey(this.keycode.PAGEDOWN, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Page Up键盘事件。
     * 
     * @method bindPageUpKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindPageUpKey : function(element, callback) {
        this._bindKey(this.keycode.PAGEUP, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Left键盘事件。
     * 
     * @method bindLeftKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindLeftKey : function(element, callback) {
        this._bindKey(this.keycode.LEFT, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Right键盘事件。
     * 
     * @method bindRightKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindRightKey : function(element, callback) {
        this._bindKey(this.keycode.RIGHT, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Up键盘事件。
     * 
     * @method bindUpKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindUpKey : function(element, callback) {
        this._bindKey(this.keycode.UP, element, callback);
        return this;
    },
    /**
     * 在element区域内响应Down键盘事件。
     * 
     * @method bindDownKey
     * @param {Object}
     *            element 被绑定元素的jQuery对象
     * @param {Function}
     *            callback 回调函数，参数为绑定的元素对象element和事件e
     * @return {Object} iTsai.form
     */
    bindDownKey : function(element, callback) {
        this._bindKey(this.keycode.DOWN, element, callback);
        return this;
    },
    /**
     * 获取单选框值,如果有表单就在表单内查询,否则在全文查询
     * 
     * @method getRadioValue
     * @param {String}name
     *            radio名称
     * @param {Object}
     *            frm [optional,default=document] jQuery表单（或其它容器对象）对象
     * @return {Object} radio jQuery对象
     */
    getRadioValue : function(name, frm) {
        if (frm && frm.find)
            return frm.find('input[name="' + name + '"]:checked').val();
        return $('input[name="' + name + '"]:checked').val();
    },
    /**
     * 设置单选框值,如果有表单就在表单内查询,否则在全文查询。
     * 
     * @method setRadioValue
     * @param {String}
     *            name radio名称
     * @param {String}
     *            value radio表单value值
     * @param {Object}
     *            frm [optional,default=document] jQuery表单（或其它容器对象）对象
     * @return {Object} radio jQuery对象
     */
    setRadioValue : function(name, value, frm) {
        if (frm && frm.find)
            return frm
                    .find('input[name="' + name + '"][value="' + value + '"]')
                    .attr('checked', true);
        return $('input[name="' + name + '"][value="' + value + '"]').attr(
                'checked', true);
    },
    /**
     * 设置select下拉框的值
     * 
     * @method setRadioValue
     * @param {String}
     *            selectId 下拉框id号
     * @param {String/Number}
     *            value select表单value值
     * @param {Object}
     *            frm [optional,default=document] jQuery表单（或其它容器对象）对象
     * @return {Object} select jQuery对象
     */
    setSelectValue : function(selectId, value, frm) {
        if (frm && frm.find)
            return frm.find('#' + selectId + ' option[value="' + value + '"]')
                    .attr('selected', true);
        return $('#' + selectId + ' option[value="' + value + '"]').attr(
                'selected', true);
    },
    /**
     * 将object转换为select的列表模式，key为option的value，值为option的文本。
     * 
     * @method object2Options
     * @param {Object}objects
     *            key-map对象
     * @return {String} html
     */
    object2Options : function(objects) {
        if (!$.isPlainObject(objects)) {
            return '';
        }
        var html = [];
        for ( var i in objects) {
            html.push('<option value="' + i + '">' + objects[i] + '</option>');
        }
        return html.join('');
    },
    /**
     * 禁用/启用输入控件。
     * 
     * @method formDisable
     * @param {Object}
     *            frmObj iQuery表单对象（或其它任何包装容器，如：div）
     * @param {Boolean}
     *            disabled true-禁用;false-启用
     * @return {Object} iTsai.form
     */
    formDisable : function(frmObj, disabled) {
        if ($.isPlainObject(frmObj)) {
            frmObj.find('input,select,textarea').attr('disabled', disabled);
        }
        return this;
    },
    /**
     * 将输入控件集合序列化成对象， 名称或编号作为键，value属性作为值。
     * 
     * @method _serializeInputs
     * @param {Array}
     *            inputs input/select/textarea的对象集合
     * @return {Object} json 对象 {key:value,...}
     */
    _serializeInputs : function(inputs) {
        var json = {};
        if (!inputs) {
            return json;
        }
        for ( var i = inputs.length - 1; i >= 0; i--) {
            var input = $(inputs[i]), type = input.attr('type');
            if (type) {
                type = type.toLowerCase();
            }
            var tagName = input.get(0).tagName, id = input.attr('id'), name = input
                    .attr('name'), value = null;

            // 判断输入框是否已经序列化过
            if (input.hasClass('_isSerialized')) {
                continue;
            }

            // input输入标签
            if (tagName == 'INPUT' && type) {
                switch (type) {
                case 'checkbox': {
                    value = input.is(':checked');
                }
                    break;

                case 'radio': {
                    if (input.is(':checked')) {
                        value = input.attr('value');
                    } else {
                        continue;
                    }
                }
                    break;

                default: {
                    value = input.val();
                }
                }
            } else {
                // 非input输入标签，如：select,textarea
                value = input.val();
            }

            json[name || id] = value;
            // 清除序列化标记
            input.removeClass('_isSerialized');
        }
        return json;
    },
    /**
     * 将值填充到输入标签里面。
     * 
     * @method _deserializeInputs
     * @param {Array}
     *            inputs 输入标签集合
     * @param {String/Number}
     *            value 值
     * @return {Object} iTsai.form
     */
    _deserializeInputs : function(inputs, value) {
        if (!inputs && value == null) {
            return this;
        }

        for ( var i = inputs.length - 1; i >= 0; i--) {
            var input = $(inputs[i]);
            // 判断输入框是否已经序列化过
            if (input.hasClass('_isSerialized')) {
                continue;
            }
            var type = input.attr('type');
            if (type) {
                type = type.toLowerCase();
            }
            if (type) {
                switch (type) {
                case 'checkbox': {
                    input.attr('checked', value);
                }
                    break;

                case 'radio': {
                    input.each(function(i) {
                        var thiz = $(this);
                        if (thiz.attr('value') == value) {
                            thiz.attr('checked', true);
                        }
                    });
                }
                    break;

                default: {
                    input.val(value);
                }
                }
            } else {
                input.val(value);
            }

            input.addClass('_isSerialized');
        }

        return this;
    },
    /**
     * 在分组中查找 fieldset (如：fieldset="user")开头的数据域。
     * 
     * @method _serializeGroups
     * @param {Array}
     *            groups 输入框分组容器集合
     * @return {Object} json 对象 {key:value,...}
     */
    _serializeGroups : function(groups) {
        var json = {};
        if (!groups) {
            return json;
        }
        for ( var i = groups.length - 1; i >= 0; i--) {
            var group = $(groups[i]), key = group.attr('fieldset');
            if (!key) {
                continue;
            }
            var inputs = group
                    .find('input[type!=button][type!=reset][type!=submit],select,textarea');
            json[key] = this._serializeInputs(inputs);
            // 添加序列化标记
            inputs.addClass('_isSerialized');
        }
        return json;
    },
    /**
     * 序列化表单值,结果以key/value形式返回key为表单对象名称(name||id),value为其值。<br>
     * HTML格式：<br>
     * 1).表单容器：通常是一个form表单（如果不存在就以body为父容器），里面包含输入标签和子容器;<br>
     * 2).子容器（也可以没有）：必须包括属性fieldset="XXXX" div标签，里面包含输入标签和子容器。<br>
     * 序列化后将生成以XXX为主键的json对象.如果子容器存在嵌套则以fieldset为主键生成不同分组的json对象。<br>
     * 3).输入标签：输入标签为input类型标签（包括：'checkbox','color','date','datetime','datetime-local',<br>
     * 'email','file','hidden','month','number','password','radio','range
     * ','reset','search','submit',<br>
     * 'tel','text','time ','url','week'）。
     * 而'button','reset','submit','image'会被过虑掉。
     * 
     * @method serialize
     * @param {Object}
     *            frm jQuery表单对象
     * @return {Object} json对象，最多包含两层结构
     */
    serialize : function(frm) {
        var json = {};
        frm = frm || $('body');
        if (!frm) {
            return json;
        }
        var groups = frm.find('div[fieldset]'), jsonGroup = this
                ._serializeGroups(groups), inputs = frm
                .find('input[type!=button][type!=reset][type!=submit][type!=image],select,textarea'), json = this
                ._serializeInputs(inputs);

        for ( var key in jsonGroup) {
            json[key] = jsonGroup[key];
        }
        return json;
    },
    /**
     * 填充表单内容：将json数据形式数据填充到表单内，只解析单层json结构。
     * 
     * @method deserializeSimple
     * @param {Object}
     *            frm jQuery表单对象（或其它容器标签对象，如：div）
     * @param {Object}
     *            json 序列化好的json数据对象，最多只包含两层嵌套
     * @return {Object} iTsai.form
     */
    deserializeSimple : function(frm, json) {
        frm = frm || $('body');
        if (!frm || !json) {
            return this;
        }

        var _deserializeInputs = this._deserializeInputs;
        for ( var key in json) {
            var value = json[key];
            _deserializeInputs(frm, key, value);
        }
        return this;
    },
    /**
     * 获取合法的输入标签。
     * 
     * @method _filterInputs
     * @param {Object}
     *            container jQuery对象，标签容器
     * @return {Array} inputs jQuery对象数组
     */
    _filterInputs : function(container) {
        return $(container
                .find('input[type!=button][type!=reset][type!=submit][type!=image][type!=file],select,textarea'));
    },
    /**
     * 查找符合条件的输入标签。
     * 
     * @method _findInputs
     * @param {Array}
     *            inputs jQueery输入标签数组
     * @param {String}
     *            key 查询关键字
     * @return {Array} inputs jQuery对象数组
     */
    _findInputs : function(inputs, key) {
        return $(inputs.filter('input[name=' + key + '],input[id=' + key
                + '],textarea[name=' + key + '],textarea[id=' + key
                + '],select[name=' + key + '],select[id=' + key + ']'));
    },
    /**
     * 填充表单内容：将json数据形式数据填充到表单内，最多解析两层json结构。
     * 
     * @method deserialize
     * @param {Object}
     *            frm jQuery表单对象（或其它容器标签对象，如：div）
     * @param {Object}
     *            json 序列化好的json数据对象，最多只包含两层嵌套
     * @return {Object} iTsai.form
     */
    deserialize : function(frm, json) {
        frm = frm || $('body');
        if (!frm || !json) {
            return this;
        }

        // objects缓存json第一层数据对象;
        // groups缓存json嵌套层数据（第二层），将首先被赋值，以避免覆盖
        var objects = {}, groups = {};

        // 数据分组
        for ( var key in json) {
            var value = json[key];
            if ($.isPlainObject(value)) {
                groups[key] = value;
            } else {
                objects[key] = value;
            }
        }

        var _deserializeInputs = this._deserializeInputs, _filterInputs = this._filterInputs, _findInputs = this._findInputs;

        // 填充嵌套层数据
        for ( var key in groups) {
            var json = groups[key], div = frm.find('div[fieldset="' + key
                    + '"]');
            if (!div.length) {
                continue;
            }
            var inputs = _filterInputs(div);
            if (!inputs.length) {
                continue;
            }
            for ( var k in json) {
                var val = json[k], input = _findInputs(inputs, k);
                _deserializeInputs(input, val);
            }
        }

        // 填充第一层数据
        var inputs = _filterInputs(frm);
        for ( var key in objects) {
            var value = objects[key], input = _findInputs(inputs, key);
            _deserializeInputs(input, value);
        }

        inputs.filter('._isSerialized').removeClass('_isSerialized');
        return this;
    }
};

/**
 * 日期时间处理工具
 * 
 * @namespace iTsai
 * @class calendar
 */
iTsai.calendar = {
    /**
     * 显示当前对象名称路径
     * 
     * @method toString
     * @return {String} 'iTsai.calendar'
     */
    toString : function() {
        return 'iTsai.calendar';
    },
    /**
     * 将小于10数字前加0
     * 
     * @method _zeroCompletion
     * @param {Number}
     *            time 时间
     * @return {String}
     */
    _zeroCompletion : function(time) {
        if (time < 10) {
            return '0' + time;
        }
        return time + '';
    },
    /**
     * 将秒转换为时间hh:mm:ss格式
     * 
     * @method secs2Time
     * @param {Number}
     *            secs 秒
     * @return {String} 格式化时间字符串'00:00:00'
     */
    secs2Time : function(secs) {
        if (secs < 0) {
            secs = 0;
        }
        secs = parseInt(secs, 10);
        var hours = Math.floor(secs / 3600), mins = Math
                .floor((secs % 3600) / 60), sec = secs % 3600 % 60;
        return this._zeroCompletion(hours) + ':' + this._zeroCompletion(mins)
                + ':' + this._zeroCompletion(sec);
    },
    /**
     * 格式化日期时间字符串
     * 
     * @method dateTime2str
     * @param {Date}
     *            dt 日期对象
     * @param {String}
     *            fmt 格式化字符串，如：'yyyy-MM-dd hh:mm:ss'
     * @return {String} 格式化后的日期时间字符串
     */
    dateTime2str : function(dt, fmt) {
        var z = {
            M : dt.getMonth() + 1,
            d : dt.getDate(),
            h : dt.getHours(),
            m : dt.getMinutes(),
            s : dt.getSeconds()
        };
        fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
                    .slice(-2);
        });
        return fmt.replace(/(y+)/g, function(v) {
            return dt.getFullYear().toString().slice(-v.length);
        });
    },
    /**
     * 根据日期时间格式获取获取当前日期时间
     * 
     * @method dateTimeWrapper
     * @param {String}
     *            日期时间格式，如："yyyy-MM-dd hh:mm:ss";
     * @return {String} 格式化后的日期时间字符串
     */
    dateTimeWrapper : function(fmt) {
        if (arguments[0])
            fmt = arguments[0];
        return this.dateTime2str(new Date(), fmt);
    },
    /**
     * 获取当前日期时间
     * 
     * @method getDatetime
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
     * @return {String} 格式化后的日期时间字符串
     */
    getDatetime : function(fmt) {
        return this.dateTimeWrapper(fmt || 'yyyy-MM-dd hh:mm:ss');
    },
    /**
     * 获取当前日期时间+毫秒
     * 
     * @method getDatetimes
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
     * @return {String} 格式化后的日期时间字符串
     */
    getDatetimes : function(fmt) {
        var dt = new Date();
        return this.dateTime2str(dt, fmt || 'yyyy-MM-dd hh:mm:ss') + '.'
                + dt.getMilliseconds();
    },
    /**
     * 获取当前日期（年-月-日）
     * 
     * @method getDate
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd'] 日期格式。
     * @return {String} 格式化后的日期字符串
     */
    getDate : function(fmt) {
        return this.dateTimeWrapper(fmt || 'yyyy-MM-dd');
    },
    /**
     * 获取当前时间（时:分:秒）
     * 
     * @method getTime
     * @param {String}
     *            fmt [optional,default='hh:mm:ss'] 日期格式。
     * @return {String} 格式化后的时间字符串
     */
    getTime : function(fmt) {
        return this.dateTimeWrapper(fmt || 'hh:mm:ss');
    },
    /**
     * 初始化日期段选择器，依赖于jQueryUI的日期控件
     * 
     * @method initDatePickerRange
     * @param {String}
     *            datefrom 开始日期id
     * @param {String}
     *            dateto 结束日期id
     */
    initDatePickerRange : function(datefrom, dateto) {
        var picker = $('#' + datefrom + ',' + '#' + dateto), dates = {};
        dates = picker.datepicker(
                {
                    changeMonth : true,
                    numberOfMonths : 1,
                    dateFormat : 'yy-mm-dd',
                    onSelect : function(selectedDate) {
                        var option = this.id == datefrom ? "minDate"
                                : "maxDate", instance = $(this).data(
                                "datepicker"), date = $.datepicker.parseDate(
                                instance.settings.dateFormat
                                        || $.datepicker._defaults.dateFormat,
                                selectedDate, instance.settings);
                        dates.not(this).datepicker("option", option, date);
                    },
                    setDate : new Date()
                }).datepicker('setDate', new Date());
    }
};
/**
 * 判断数据中是否存在cell值，并返回第一个存在的位置
 * 
 * @method indexOf
 * @param {String/Number}
 *            cell 数组元素值
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
 * 
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
     * @param {Array}
     *            mArr 被减数组
     * @param {Array}
     *            sArr 减数据
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