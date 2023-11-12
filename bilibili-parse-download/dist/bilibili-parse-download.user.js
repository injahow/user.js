// ==UserScript==
// @name          bilibili视频下载
// @namespace     https://github.com/injahow
// @version       2.5.4
// @description   支持Web、RPC、Blob、Aria等下载方式；支持下载flv、dash、mp4视频格式；支持下载港区番剧；支持下载字幕弹幕；支持换源播放等功能
// @author        injahow
// @copyright     2021, injahow (https://github.com/injahow)
// @license       MIT
// @source        https://github.com/injahow/user.js
// @supportURL    https://github.com/injahow/user.js/issues
// @downloadURL   https://greasyfork.org/scripts/413228-bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD/code/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.user.js
// @updateURL     https://greasyfork.org/scripts/413228-bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD/code/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.user.js
// @match         *://www.bilibili.com/video/av*
// @match         *://www.bilibili.com/video/BV*
// @match         *://www.bilibili.com/list/*
// @match         *://www.bilibili.com/bangumi/play/ep*
// @match         *://www.bilibili.com/bangumi/play/ss*
// @match         *://www.bilibili.com/cheese/play/ep*
// @match         *://www.bilibili.com/cheese/play/ss*
// @match         https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png*
// @require       https://static.hdslb.com/js/jquery.min.js
// @icon          https://static.hdslb.com/images/favicon.ico
// @compatible    chrome
// @compatible    firefox
// @grant         none
// ==/UserScript==
/* globals $ waitForKeyElements */
// @[ You can find all source codes in GitHub repo ]
!function() {
    "use strict";
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var user = new (function() {
        function User() {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, User), this.is_login = !1, this.vip_status = 0, this.mid = "", this.uname = "", 
            this.has_init = !1, this.lazyInit();
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(User, [ {
            key: "needReplace",
            value: function needReplace() {
                return !this.is_login || !this.vip_status && video.base().needVip();
            }
        }, {
            key: "isVIP",
            value: function isVIP() {
                return 1 === this.vip_status;
            }
        }, {
            key: "lazyInit",
            value: function lazyInit(last_init) {
                this.has_init || (window.__BILI_USER_INFO__ ? (this.is_login = window.__BILI_USER_INFO__.isLogin, 
                this.vip_status = window.__BILI_USER_INFO__.vipStatus, this.mid = window.__BILI_USER_INFO__.mid || "", 
                this.uname = window.__BILI_USER_INFO__.uname || "") : window.__BiliUser__ && (this.is_login = window.__BiliUser__.isLogin, 
                window.__BiliUser__.cache ? (this.vip_status = window.__BiliUser__.cache.data.vipStatus, 
                this.mid = window.__BiliUser__.cache.data.mid || "", this.uname = window.__BiliUser__.cache.data.uname || "") : (this.vip_status = 0, 
                this.mid = "", this.uname = "")), this.has_init = last_init);
            }
        } ]), User;
    }());
    function store_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var Store = function() {
        function Store() {
            !function store_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Store), this.prefix = "bp_";
        }
        return function store_createClass(Constructor, protoProps, staticProps) {
            return protoProps && store_defineProperties(Constructor.prototype, protoProps), 
            staticProps && store_defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(Store, [ {
            key: "get",
            value: function get() {
                var key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return localStorage.getItem(this.prefix + key) || "";
            }
        }, {
            key: "set",
            value: function set() {
                var key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", value = arguments.length > 1 ? arguments[1] : void 0;
                localStorage.setItem(this.prefix + key, value);
            }
        } ]), Store;
    }(), store = new Store;
    var scroll_scroll = {
        show: function show_scroll() {
            $("div#bp_config").is(":hidden") && $("div#message_box").is(":hidden") && $("body").css("overflow", "auto");
        },
        hide: function hide_scroll() {
            $("body").css("overflow", "hidden");
        }
    }, message = '<div class="message-bg"></div> <div id="message_box"> <div class="message-box-mark"></div> <div class="message-box-bg"> <span style="font-size:20px"><b>提示：</b></span> <div id="message_box_context" style="margin:2% 0">...</div><br/><br/> <div class="message-box-btn"> <button name="affirm">确定</button> <button name="cancel">取消</button> </div> </div> </div> <style>.message-bg{position:fixed;float:right;right:0;top:2%;z-index:30000}.message{margin-bottom:15px;padding:2% 2%;width:300px;display:flex;margin-top:-70px;opacity:0}.message-success{background-color:#dfd;border-left:6px solid #4caf50}.message-error{background-color:#fdd;border-left:6px solid #f44336}.message-info{background-color:#e7f3fe;border-left:6px solid #0c86de}.message-warning{background-color:#ffc;border-left:6px solid #ffeb3b}.message-context{font-size:21px;word-wrap:break-word;word-break:break-all}.message-context p{margin:0}#message_box{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:20000}.message-box-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;z-index:20001}.message-box-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:20000}.message-box-btn{text-align:right}.message-box-btn button{margin:0 5px;width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}.message-box-btn button:hover{background:#59f}</style> ';
    function messageBox(ctx, type) {
        "confirm" === type ? $('.message-box-btn button[name="cancel"]').show() : "alert" === type && $('.message-box-btn button[name="cancel"]').hide(), 
        ctx.html ? $("#message_box_context").html('<div style="font-size:18px">'.concat(ctx.html, "</div>")) : $("#message_box_context").html('<div style="font-size:18px">╰(￣▽￣)╮</div>'), 
        scroll_scroll.hide(), $("#message_box").show(), $("#message_box").animate({
            opacity: "1"
        }, 300);
        var option = {
            affirm: function affirm() {
                $("#message_box").hide(), $("#message_box").css("opacity", 0), scroll_scroll.show(), 
                ctx.callback && ctx.callback.affirm && ctx.callback.affirm();
            },
            cancel: function cancel() {
                $("#message_box").hide(), $("#message_box").css("opacity", 0), scroll_scroll.show(), 
                ctx.callback && ctx.callback.cancel && ctx.callback.cancel();
            }
        };
        return $('.message-box-btn button[name="affirm"]')[0].onclick = option.affirm, $('.message-box-btn button[name="cancel"]')[0].onclick = option.cancel, 
        option;
    }
    var id = 0;
    function message_message(html, type) {
        (function messageEnQueue(message, id) {
            $(".message-bg").append(message), $("#message_".concat(id)).animate({
                "margin-top": "+=70px",
                opacity: "1"
            }, 300);
        })('<div id="message_'.concat(id += 1, '" class="message message-').concat(type, '"><div class="message-context"><p><strong>').concat(type, "：</strong></p><p>").concat(html, "</p></div></div>"), id), 
        function messageDeQueue(id) {
            var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
            setTimeout((function() {
                var e = "div#message_".concat(id);
                $(e).animate({
                    "margin-top": "-=70px",
                    opacity: "0"
                }, 300, (function() {
                    $(e).remove();
                }));
            }), 1e3 * time);
        }(id, 3);
    }
    var Message_success = function success(html) {
        return message_message(html, "success");
    }, Message_warning = function warning(html) {
        return message_message(html, "warning");
    }, Message_error = function error(html) {
        return message_message(html, "error");
    }, Message_info = function info(html) {
        return message_message(html, "info");
    }, Message_miaow = function miaow() {
        return message_message("(^・ω・^)~喵喵喵~", "info");
    }, MessageBox_alert = function alert(html, affirm) {
        return messageBox({
            html: html,
            callback: {
                affirm: affirm
            }
        }, "alert");
    }, MessageBox_confirm = function confirm(html, affirm, cancel) {
        return messageBox({
            html: html,
            callback: {
                affirm: affirm,
                cancel: cancel
            }
        }, "confirm");
    };
    function ajax(obj) {
        return new Promise((function(resolve, reject) {
            obj.success = function(res) {
                res && res.code && Message_warning("".concat(res.message || "CODE:".concat(res.code))), 
                resolve(res);
            }, obj.error = function(err) {
                Message_error("网络异常"), reject(err);
            }, $.ajax(obj);
        }));
    }
    function _ajax(obj) {
        return new Promise((function(resolve, reject) {
            obj.success || (obj.success = function(res) {
                resolve(res);
            }), obj.error || (obj.error = function(err) {
                reject(err);
            }), $.ajax(obj);
        }));
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = "undefined" != typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = function _unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                "Object" === n && o.constructor && (n = o.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(o);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
            }(o)) || allowArrayLike && o && "number" == typeof o.length) {
                it && (o = it);
                var i = 0, F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return i >= o.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var err, normalCompletion = !0, didErr = !1;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                return normalCompletion = step.done, step;
            },
            e: function e(_e2) {
                didErr = !0, err = _e2;
            },
            f: function f() {
                try {
                    normalCompletion || null == it.return || it.return();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function _arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function get_url_base(page, quality, video_format, success, error, request_type) {
        var _success, _error;
        _success = "function" == typeof success ? function _success(e) {
            success(e);
        } : function _success(res) {
            return console.log(res);
        }, _error = "function" == typeof error ? function _error(e) {
            Message_error("请求失败"), error(e);
        } : function _error(err) {
            return console.error(err);
        };
        var vb = video.base(), _ref = [ vb.aid(page), vb.bvid(page), vb.cid(page), vb.epid(page), quality || video.get_quality().q, vb.type() ], aid = _ref[0], bvid = _ref[1], cid = _ref[2], epid = _ref[3], q = _ref[4], type = _ref[5], format = video_format || config_config.format;
        "auto" === request_type && user.needReplace() && (request_type = "remote");
        var base_api, url_replace_cdn = function url_replace_cdn(url) {
            if ("0" !== config_config.host_key) {
                var url_tmp = url.split("/");
                url_tmp[2] = hostMap[config_config.host_key], url = url_tmp.join("/");
            }
            return url;
        }, ajax_obj = {
            type: "GET",
            dataType: "json"
        };
        if ("auto" === request_type || "local" === request_type) {
            var fnver, fnval;
            "cheese" === type ? (base_api = "https://api.bilibili.com/pugv/player/web/playurl", 
            fnver = "mp4" === format ? 1 : 0, fnval = 80) : (base_api = "video" === type ? "https://api.bilibili.com/x/player/playurl" : "https://api.bilibili.com/pgc/player/web/playurl", 
            fnver = 0, fnval = {
                dash: 4048,
                flv: 4049,
                mp4: 0
            }[format] || 0), base_api += "?avid=".concat(aid, "&bvid=").concat(bvid, "&cid=").concat(cid, "&qn=").concat(q, "&fnver=").concat(fnver, "&fnval=").concat(fnval, "&fourk=1&ep_id=").concat(epid, "&type=").concat(format, "&otype=json"), 
            base_api += "mp4" === format ? "&platform=html5&high_quality=1" : "", ajax_obj.xhrFields = {
                withCredentials: !0
            };
        } else {
            base_api = config_config.base_api, base_api += "?av=".concat(aid, "&bv=").concat(bvid, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(format, "&otype=json");
            var _ref2 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref2[0], auth_sec = _ref2[1];
            auth_id && auth_sec && (base_api += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec), 
            page && (base_api += "&s"));
        }
        ajax_obj.url = base_api, ajax(ajax_obj).then((function(res) {
            var data;
            if (res.code || (data = res.result || res.data), !data) return "auto" === request_type ? void get_url_base(page, quality, video_format, success, error, "remote") : (res.url && (res.url = url_replace_cdn(res.url)), 
            res.video && (res.video = url_replace_cdn(res.video)), res.audio && (res.audio = url_replace_cdn(res.audio)), 
            void _success(res));
            var resultConvertor = function resultConvertor(data, _success) {
                _ajax({
                    type: "GET",
                    url: data.url ? data.url : data.video,
                    cache: !1,
                    timeout: 1e3,
                    success: function success() {
                        _success(data);
                    },
                    error: function error(res) {
                        "timeout" == res.statusText ? (console.log("use url"), _success(data)) : (console.log("use backup_url"), 
                        data.backup_url && (data.url = data.backup_url), data.backup_video && (data.video = data.backup_video), 
                        data.backup_audio && (data.audio = data.backup_audio), _success(data));
                    }
                });
            };
            if (data.dash) {
                for (var result = {
                    code: 0,
                    quality: data.quality,
                    accept_quality: data.accept_quality,
                    video: "",
                    audio: ""
                }, videos = data.dash.video, i = 0; i < videos.length; i++) {
                    var _video = videos[i];
                    if (_video.id <= q) {
                        result.video = url_replace_cdn(_video.base_url), result.audio = url_replace_cdn(data.dash.audio[0].base_url), 
                        result.backup_video = _video.backup_url && url_replace_cdn(_video.backup_url[0]), 
                        result.backup_audio = data.dash.audio[0].backup_url && url_replace_cdn(data.dash.audio[0].backup_url[0]);
                        break;
                    }
                }
                resultConvertor(result, _success);
            } else resultConvertor({
                code: 0,
                quality: data.quality,
                accept_quality: data.accept_quality,
                url: url_replace_cdn(data.durl[0].url),
                backup_url: data.durl[0].backup_url && url_replace_cdn(data.durl[0].backup_url[0])
            }, _success);
        })).catch((function(err) {
            return _error(err);
        }));
    }
    function _get_subtitle(p, callback) {
        var to_blob_url = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], vb = video.base(), _ref3 = [ vb.aid(p), vb.cid(p), vb.epid(p) ], aid = _ref3[0], cid = _ref3[1], epid = _ref3[2];
        ajax({
            url: "https://api.bilibili.com/x/player/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
            dataType: "json"
        }).then((function(res) {
            !res.code && res.data.subtitle.subtitles[0] ? ajax({
                url: "".concat(res.data.subtitle.subtitles[0].subtitle_url),
                dataType: "json"
            }).then((function(res) {
                var _step, webvtt = "WEBVTT\n\n", _iterator = _createForOfIteratorHelper(res.body || [ {
                    from: 0,
                    to: 0,
                    content: ""
                } ]);
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var data = _step.value, a = new Date(1e3 * (parseInt(data.from) - 28800)).toTimeString().split(" ")[0] + "." + (data.from.toString().split(".")[1] || "000").padEnd(3, "0"), b = new Date(1e3 * (parseInt(data.to) - 28800)).toTimeString().split(" ")[0] + "." + (data.to.toString().split(".")[1] || "000").padEnd(3, "0");
                        webvtt += "".concat(a, " --\x3e ").concat(b, "\n").concat(data.content.trim(), "\n\n");
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
                callback(to_blob_url ? URL.createObjectURL(new Blob([ webvtt ], {
                    type: "text/vtt"
                })) : webvtt);
            })).catch(callback) : callback();
        })).catch(callback);
    }
    var api = {
        get_url: function get_url(success, error) {
            var request_type = config_config.request_type, format = config_config.format;
            get_url_base(0, parseInt(config_config.video_quality), format, success, error, request_type);
        },
        get_urls: function get_urls(page, quality, format, success, error) {
            get_url_base(page, quality, format, success, error, config_config.request_type);
        },
        get_subtitle_url: function get_subtitle_url(p, callback) {
            _get_subtitle(p, callback, !0);
        },
        get_subtitle_data: function get_subtitle_data(p, callback) {
            _get_subtitle(p, callback, !1);
        },
        get_season: function get_season(sid, epid) {
            sid || epid ? ajax({
                url: "https://api.bilibili.com/pugv/view/web/season?season_id=".concat(sid || "", "&ep_id=").concat(epid || ""),
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json"
            }).then((function(res) {
                res.code ? Message_warning("获取剧集信息失败") : window.bp_episodes = res.data.episodes || null;
            })) : console.log("get_season error");
        }
    };
    function _typeof(obj) {
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
    }
    function video_base_createForOfIteratorHelper(o, allowArrayLike) {
        var it = "undefined" != typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = function video_base_unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if ("string" == typeof o) return video_base_arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                "Object" === n && o.constructor && (n = o.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(o);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return video_base_arrayLikeToArray(o, minLen);
            }(o)) || allowArrayLike && o && "number" == typeof o.length) {
                it && (o = it);
                var i = 0, F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return i >= o.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var err, normalCompletion = !0, didErr = !1;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                return normalCompletion = step.done, step;
            },
            e: function e(_e2) {
                didErr = !0, err = _e2;
            },
            f: function f() {
                try {
                    normalCompletion || null == it.return || it.return();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function video_base_arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(subClass, "prototype", {
            writable: !1
        }), superClass && _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
        return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        }, _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
        var hasNativeReflectConstruct = function _isNativeReflectConstruct() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                !0;
            } catch (e) {
                return !1;
            }
        }();
        return function _createSuperInternal() {
            var result, Super = _getPrototypeOf(Derived);
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else result = Super.apply(this, arguments);
            return _possibleConstructorReturn(this, result);
        };
    }
    function _possibleConstructorReturn(self, call) {
        if (call && ("object" === _typeof(call) || "function" == typeof call)) return call;
        if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
        return function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }(self);
    }
    function _getPrototypeOf(o) {
        return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        }, _getPrototypeOf(o);
    }
    function video_base_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function video_base_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function video_base_createClass(Constructor, protoProps, staticProps) {
        return protoProps && video_base_defineProperties(Constructor.prototype, protoProps), 
        staticProps && video_base_defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
            writable: !1
        }), Constructor;
    }
    var clazzMap = {}, VideoBase = function() {
        function VideoBase(video_type, main_title, state) {
            video_base_classCallCheck(this, VideoBase), this.constructor.name in clazzMap || (clazzMap[this.constructor.name] = this.constructor), 
            this.video_type = video_type || "video", this.main_title = main_title || "", this.state = state, 
            this.page = state && parseInt(state.p) || 1;
        }
        return video_base_createClass(VideoBase, [ {
            key: "getVideo",
            value: function getVideo(p) {
                var _this = this, clazz = clazzMap[this.constructor.name];
                return Object.fromEntries(Object.getOwnPropertyNames(VideoBase.prototype).filter((function(name) {
                    return ![ "constructor", "getVideo" ].includes(name);
                })).map((function(key) {
                    return [ key, clazz.prototype[key].call(_this, p) ];
                })));
            }
        }, {
            key: "type",
            value: function type() {
                return this.video_type;
            }
        }, {
            key: "p",
            value: function p(_p) {
                return (_p = parseInt(_p) || 0) > 0 && _p <= this.total() ? _p : this.page;
            }
        }, {
            key: "id",
            value: function id(p) {
                return this.p(p) - 1;
            }
        }, {
            key: "total",
            value: function total() {
                return 0;
            }
        }, {
            key: "title",
            value: function title() {
                return "";
            }
        }, {
            key: "filename",
            value: function filename() {
                return "";
            }
        }, {
            key: "aid",
            value: function aid() {
                return 0;
            }
        }, {
            key: "bvid",
            value: function bvid() {
                return "";
            }
        }, {
            key: "cid",
            value: function cid() {
                return 0;
            }
        }, {
            key: "epid",
            value: function epid() {
                return "";
            }
        }, {
            key: "needVip",
            value: function needVip() {
                return !1;
            }
        }, {
            key: "vipNeedPay",
            value: function vipNeedPay() {
                return !1;
            }
        }, {
            key: "isLimited",
            value: function isLimited() {
                return !1;
            }
        } ]), VideoBase;
    }(), Video = function(_VideoBase) {
        _inherits(Video, _VideoBase);
        var _super = _createSuper(Video);
        function Video(main_title, state) {
            return video_base_classCallCheck(this, Video), _super.call(this, "video", main_title, state);
        }
        return video_base_createClass(Video, [ {
            key: "total",
            value: function total() {
                return this.state.videoData.pages.length;
            }
        }, {
            key: "title",
            value: function title(p) {
                var id = this.id(p);
                return this.state.videoData.pages[id].part;
            }
        }, {
            key: "filename",
            value: function filename(p) {
                var id = this.id(p);
                return (this.main_title + (this.total() > 1 ? " P".concat(id + 1, " ").concat(this.state.videoData.pages[id].part || "") : "")).replace(/[\/\\:*?"<>|]+/g, "");
            }
        }, {
            key: "aid",
            value: function aid(p) {
                return this.state.videoData.aid;
            }
        }, {
            key: "bvid",
            value: function bvid(p) {
                return this.state.videoData.bvid;
            }
        }, {
            key: "cid",
            value: function cid(p) {
                return this.state.videoData.pages[this.id(p)].cid;
            }
        } ]), Video;
    }(VideoBase), VideoList = function(_VideoBase2) {
        _inherits(VideoList, _VideoBase2);
        var _super2 = _createSuper(VideoList);
        function VideoList(main_title, state) {
            var _this2;
            video_base_classCallCheck(this, VideoList), (_this2 = _super2.call(this, "video", main_title, state)).video = new Video(state.videoData.title, state), 
            _this2.resourceList = state.resourceList || [];
            var _step, video_list = [], _iterator = video_base_createForOfIteratorHelper(_this2.resourceList);
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) for (var video = _step.value, i = 0, length = video.pages && video.pages.length || 0; i < length; ) {
                    var _video = Object.assign({}, video);
                    _video.title = video.title + (length > 1 ? " P".concat(i + 1, " ").concat(video.pages[i].title) : ""), 
                    _video.cid = video.pages[i].id, video_list.push(_video), i++;
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            return _this2.video_list = video_list, _this2;
        }
        return video_base_createClass(VideoList, [ {
            key: "total",
            value: function total() {
                return this.video_list.length;
            }
        }, {
            key: "title",
            value: function title(p) {
                return p ? this.video_list[this.id(p)].title : this.video.title();
            }
        }, {
            key: "filename",
            value: function filename(p) {
                if (!p) return this.video.filename();
                var id = this.id(p);
                return (this.main_title + (this.total() > 1 ? " P".concat(id + 1, " ").concat(this.video_list[id].title) : "")).replace(/[\/\\:*?"<>|]+/g, "");
            }
        }, {
            key: "aid",
            value: function aid(p) {
                return p ? this.video_list[this.id(p)].id : this.video.aid();
            }
        }, {
            key: "bvid",
            value: function bvid(p) {
                return p ? this.video_list[this.id(p)].bv_id : this.video.bvid();
            }
        }, {
            key: "cid",
            value: function cid(p) {
                return p ? this.video_list[this.id(p)].cid : this.video.cid();
            }
        } ]), VideoList;
    }(VideoBase), Bangumi = function(_VideoBase3) {
        _inherits(Bangumi, _VideoBase3);
        var _super3 = _createSuper(Bangumi);
        function Bangumi(main_title, state) {
            var _this3;
            return video_base_classCallCheck(this, Bangumi), (_this3 = _super3.call(this, "bangumi", main_title, state)).epInfo = state.epInfo, 
            _this3.epList = state.epList, _this3.epId = state.epId, _this3.epMap = state.epMap, 
            _this3.mediaInfo = state.mediaInfo, _this3;
        }
        return video_base_createClass(Bangumi, [ {
            key: "total",
            value: function total() {
                return this.epList.length;
            }
        }, {
            key: "title",
            value: function title(p) {
                var ep = p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo;
                return "".concat(ep.titleFormat, " ").concat(ep.long_title);
            }
        }, {
            key: "filename",
            value: function filename(p) {
                var ep = p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo;
                return "".concat(this.main_title, "：").concat(ep.titleFormat, " ").concat(ep.long_title).replace(/[\/\\:*?"<>|]+/g, "");
            }
        }, {
            key: "aid",
            value: function aid(p) {
                return (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).aid;
            }
        }, {
            key: "bvid",
            value: function bvid(p) {
                return (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).bvid;
            }
        }, {
            key: "cid",
            value: function cid(p) {
                return (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).cid;
            }
        }, {
            key: "epid",
            value: function epid(p) {
                return (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).id;
            }
        }, {
            key: "needVip",
            value: function needVip(p) {
                return "会员" === (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).badge;
            }
        }, {
            key: "vipNeedPay",
            value: function vipNeedPay(p) {
                return "付费" === (p ? this.epList[this.id(p)] : this.epMap && this.epId ? this.epMap[this.epId] : this.epInfo).badge;
            }
        }, {
            key: "isLimited",
            value: function isLimited() {
                return !!this.mediaInfo.user_status.area_limit;
            }
        } ]), Bangumi;
    }(VideoBase), Cheese = function(_VideoBase4) {
        _inherits(Cheese, _VideoBase4);
        var _super4 = _createSuper(Cheese);
        function Cheese(main_title, state) {
            var _this4;
            return video_base_classCallCheck(this, Cheese), (_this4 = _super4.call(this, "cheese", main_title, state)).episodes = state.episodes, 
            _this4;
        }
        return video_base_createClass(Cheese, [ {
            key: "total",
            value: function total() {
                return this.episodes.length;
            }
        }, {
            key: "title",
            value: function title(p) {
                return this.episodes[this.id(p)].title;
            }
        }, {
            key: "filename",
            value: function filename(p) {
                return "".concat(this.main_title, " P").concat(this.p(p), " ").concat(this.title(p)).replace(/[\/\\:*?"<>|]+/g, "");
            }
        }, {
            key: "aid",
            value: function aid(p) {
                return this.episodes[this.id(p)].aid;
            }
        }, {
            key: "cid",
            value: function cid(p) {
                return this.episodes[this.id(p)].cid;
            }
        }, {
            key: "epid",
            value: function epid(p) {
                return this.episodes[this.id(p)].id;
            }
        } ]), Cheese;
    }(VideoBase);
    function _slicedToArray(arr, i) {
        return function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }(arr) || function _iterableToArrayLimit(arr, i) {
            var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
            if (null == _i) return;
            var _s, _e, _arr = [], _n = !0, _d = !1;
            try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0) ;
            } catch (err) {
                _d = !0, _e = err;
            } finally {
                try {
                    _n || null == _i.return || _i.return();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }(arr, i) || function video_unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if ("string" == typeof o) return video_arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            "Object" === n && o.constructor && (n = o.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(o);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return video_arrayLikeToArray(o, minLen);
        }(arr, i) || function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function video_arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function type() {
        var routerMap = {
            video: "/video/",
            list: "/list/",
            bangumi: "/bangumi/play/",
            cheese: "/cheese/play/"
        };
        for (var key in routerMap) if (location.pathname.startsWith(routerMap[key])) return key;
        return "?";
    }
    var q_map = {
        "1080P 高码率": 112,
        "1080P 高清": 80,
        "720P 高清": 64,
        "480P 清晰": 32,
        "360P 流畅": 16,
        "自动": 32
    };
    var video = {
        type: type,
        base: function base() {
            var _type = type();
            if ("video" === _type) {
                var state = window.__INITIAL_STATE__, main_title = state.videoData && state.videoData.title;
                return new Video(main_title, state);
            }
            if ("list" === _type) {
                var _state = window.__INITIAL_STATE__, _main_title = _state.mediaListInfo && _state.mediaListInfo.upper.name + "-" + _state.mediaListInfo.title;
                return new VideoList(_main_title, _state);
            }
            if ("bangumi" === _type) {
                if (window.__INITIAL_STATE__) {
                    var _state3 = window.__INITIAL_STATE__, _main_title3 = _state3.mediaInfo.season_title;
                    return _state3.p = _state3.epInfo.i + 1, new Bangumi(_main_title3, _state3);
                }
                var epid, queries = window.__NEXT_DATA__.props.pageProps.dehydratedState.queries, _queries$0$state$data = queries[0].state.data.seasonInfo, mediaInfo = _queries$0$state$data.mediaInfo, sectionsMap = _queries$0$state$data.sectionsMap, historyEpId = queries[0].state.data.userInfo.userInfo.history.epId, _main_title2 = mediaInfo.season_title, episodes = mediaInfo.episodes, epMap = {};
                episodes.forEach((function(epInfo) {
                    epMap[epInfo.id] = epInfo;
                })), Object.entries(sectionsMap).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);
                    _ref2[0];
                    _ref2[1].epList.forEach((function(epInfo) {
                        epMap[epInfo.id] = epInfo;
                    }));
                })), location.pathname.startsWith("/bangumi/play/ss") ? (epid = parseInt(historyEpId)) < 0 && (epid = episodes[0].id) : epid = (epid = location.pathname.match(/ep(\d+)/)) ? parseInt(epid[1]) : 0;
                for (var _id = 0, i = 0; i < episodes.length; i++) if (episodes[i].id == epid) {
                    _id = i;
                    break;
                }
                return new Bangumi(_main_title2, {
                    p: _id + 1,
                    epId: epid,
                    epList: episodes,
                    mediaInfo: mediaInfo,
                    epMap: epMap
                });
            }
            if ("cheese" === _type) {
                var _epid, sid = (location.href.match(/\/cheese\/play\/ss(\d+)/i) || [ "", "" ])[1];
                sid || (_epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || [ "", "" ])[1]), 
                window.bp_episodes || (window.bp_episodes = [], api.get_season(sid, _epid));
                for (var _episodes = window.bp_episodes, _id2 = 0, _i2 = 0; _i2 < _episodes.length; _i2++) if (_episodes[_i2].id == _epid) {
                    _id2 = _i2;
                    break;
                }
                var _main_title4 = ($("div.archive-title-box").text() || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                return new Cheese(_main_title4, {
                    p: _id2 + 1,
                    episodes: _episodes
                });
            }
            return new VideoBase;
        },
        get_quality: function get_quality() {
            var _q = 0, _q_max = 0, _type = type();
            if ("cheese" === _type) {
                var q = $("div.edu-player-quality-item.active span").text(), q_max = $($("div.edu-player-quality-item span").get(0)).text();
                _q = q in q_map ? q_map[q] : 0, _q_max = q_max in q_map ? q_map[q_max] : 0;
            } else {
                var keys = Object.keys(videoQualityMap), _q2 = parseInt(("video" === _type ? $("li.bpx-player-ctrl-quality-menu-item.bpx-state-active") : $("li.squirtle-select-item.active")).attr("data-value")), _q_max2 = parseInt($(("video" === _type ? $("li.bpx-player-ctrl-quality-menu-item") : $("li.squirtle-select-item")).get(0)).attr("data-value"));
                _q = keys.indexOf("".concat(_q2)) > -1 ? _q2 : 0, _q_max = keys.indexOf("".concat(_q_max2)) > -1 ? _q_max2 : 0;
            }
            return !_q && (_q = 80), !_q_max && (_q_max = 80), user.isVIP() || (_q = _q > 80 ? 80 : _q), 
            {
                q: _q,
                q_max: _q_max
            };
        },
        get_quality_support: function get_quality_support() {
            var list, quality_list = [], _type = type();
            if ("cheese" === _type) (list = $("div.edu-player-quality-item span")).each((function() {
                var k = $(this).text();
                q_map[k] && quality_list.push(q_map[k]);
            })); else {
                var keys = Object.keys(videoQualityMap);
                (list = [ "video", "list" ].includes(_type) ? $("li.bpx-player-ctrl-quality-menu-item") : $("li.squirtle-select-item")) && list.length && list.each((function() {
                    var q = "".concat(parseInt($(this).attr("data-value")));
                    keys.indexOf(q) > -1 && quality_list.push(q);
                }));
            }
            return quality_list.length ? quality_list : [ "80", "64", "32", "16" ];
        }
    };
    function runtime_lib_typeof(obj) {
        return runtime_lib_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, runtime_lib_typeof(obj);
    }
    function _regeneratorRuntime() {
        _regeneratorRuntime = function _regeneratorRuntime() {
            return exports;
        };
        var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
            return Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), obj[key];
        }
        try {
            define({}, "");
        } catch (err) {
            define = function define(obj, key, value) {
                return obj[key] = value;
            };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
            return generator._invoke = function(innerFn, self, context) {
                var state = "suspendedStart";
                return function(method, arg) {
                    if ("executing" === state) throw new Error("Generator is already running");
                    if ("completed" === state) {
                        if ("throw" === method) throw arg;
                        return doneResult();
                    }
                    for (context.method = method, context.arg = arg; ;) {
                        var delegate = context.delegate;
                        if (delegate) {
                            var delegateResult = maybeInvokeDelegate(delegate, context);
                            if (delegateResult) {
                                if (delegateResult === ContinueSentinel) continue;
                                return delegateResult;
                            }
                        }
                        if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                            if ("suspendedStart" === state) throw state = "completed", context.arg;
                            context.dispatchException(context.arg);
                        } else "return" === context.method && context.abrupt("return", context.arg);
                        state = "executing";
                        var record = tryCatch(innerFn, self, context);
                        if ("normal" === record.type) {
                            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                            return {
                                value: record.arg,
                                done: context.done
                            };
                        }
                        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
                    }
                };
            }(innerFn, self, context), generator;
        }
        function tryCatch(fn, obj, arg) {
            try {
                return {
                    type: "normal",
                    arg: fn.call(obj, arg)
                };
            } catch (err) {
                return {
                    type: "throw",
                    arg: err
                };
            }
        }
        exports.wrap = wrap;
        var ContinueSentinel = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, (function() {
            return this;
        }));
        var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        function defineIteratorMethods(prototype) {
            [ "next", "throw", "return" ].forEach((function(method) {
                define(prototype, method, (function(arg) {
                    return this._invoke(method, arg);
                }));
            }));
        }
        function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if ("throw" !== record.type) {
                    var result = record.arg, value = result.value;
                    return value && "object" == runtime_lib_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then((function(value) {
                        invoke("next", value, resolve, reject);
                    }), (function(err) {
                        invoke("throw", err, resolve, reject);
                    })) : PromiseImpl.resolve(value).then((function(unwrapped) {
                        result.value = unwrapped, resolve(result);
                    }), (function(error) {
                        return invoke("throw", error, resolve, reject);
                    }));
                }
                reject(record.arg);
            }
            var previousPromise;
            this._invoke = function(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl((function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    }));
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            };
        }
        function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];
            if (void 0 === method) {
                if (context.delegate = null, "throw" === context.method) {
                    if (delegate.iterator.return && (context.method = "return", context.arg = void 0, 
                    maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
                    context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
                }
                return ContinueSentinel;
            }
            var record = tryCatch(method, delegate.iterator, context.arg);
            if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
            context.delegate = null, ContinueSentinel;
            var info = record.arg;
            return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
            "return" !== context.method && (context.method = "next", context.arg = void 0), 
            context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
            context.delegate = null, ContinueSentinel);
        }
        function pushTryEntry(locs) {
            var entry = {
                tryLoc: locs[0]
            };
            1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
            entry.afterLoc = locs[3]), this.tryEntries.push(entry);
        }
        function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal", delete record.arg, entry.completion = record;
        }
        function Context(tryLocsList) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(iterable) {
            if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) return iteratorMethod.call(iterable);
                if ("function" == typeof iterable.next) return iterable;
                if (!isNaN(iterable.length)) {
                    var i = -1, next = function next() {
                        for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
                        next.done = !1, next;
                        return next.value = void 0, next.done = !0, next;
                    };
                    return next.next = next;
                }
            }
            return {
                next: doneResult
            };
        }
        function doneResult() {
            return {
                value: void 0,
                done: !0
            };
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), 
        define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
        exports.isGeneratorFunction = function(genFun) {
            var ctor = "function" == typeof genFun && genFun.constructor;
            return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
        }, exports.mark = function(genFun) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
            define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
            genFun;
        }, exports.awrap = function(arg) {
            return {
                __await: arg
            };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, (function() {
            return this;
        })), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
            void 0 === PromiseImpl && (PromiseImpl = Promise);
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
            return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then((function(result) {
                return result.done ? result.value : iter.next();
            }));
        }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, (function() {
            return this;
        })), define(Gp, "toString", (function() {
            return "[object Generator]";
        })), exports.keys = function(object) {
            var keys = [];
            for (var key in object) keys.push(key);
            return keys.reverse(), function next() {
                for (;keys.length; ) {
                    var key = keys.pop();
                    if (key in object) return next.value = key, next.done = !1, next;
                }
                return next.done = !0, next;
            };
        }, exports.values = values, Context.prototype = {
            constructor: Context,
            reset: function reset(skipTempReset) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), 
                !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
            },
            stop: function stop() {
                this.done = !0;
                var rootRecord = this.tryEntries[0].completion;
                if ("throw" === rootRecord.type) throw rootRecord.arg;
                return this.rval;
            },
            dispatchException: function dispatchException(exception) {
                if (this.done) throw exception;
                var context = this;
                function handle(loc, caught) {
                    return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
                    context.arg = void 0), !!caught;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i], record = entry.completion;
                    if ("root" === entry.tryLoc) return handle("end");
                    if (entry.tryLoc <= this.prev) {
                        var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                        if (hasCatch && hasFinally) {
                            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                        } else if (hasCatch) {
                            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        } else {
                            if (!hasFinally) throw new Error("try statement without catch or finally");
                            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                        var finallyEntry = entry;
                        break;
                    }
                }
                finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
                var record = finallyEntry ? finallyEntry.completion : {};
                return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
                this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
            },
            complete: function complete(record, afterLoc) {
                if ("throw" === record.type) throw record.arg;
                return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
                this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
                ContinueSentinel;
            },
            finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
                    resetTryEntry(entry), ContinueSentinel;
                }
            },
            catch: function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc === tryLoc) {
                        var record = entry.completion;
                        if ("throw" === record.type) {
                            var thrown = record.arg;
                            resetTryEntry(entry);
                        }
                        return thrown;
                    }
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                return this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc
                }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
            }
        }, exports;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg), value = info.value;
        } catch (error) {
            return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise((function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(void 0);
            }));
        };
    }
    function runtime_lib_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var JSZip, DPlayer, QRCode, md5, RuntimeLib = function() {
        function RuntimeLib(config) {
            !function runtime_lib_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, RuntimeLib), this.config = config, this.moduleAsync, this.anyResolved = !1;
        }
        return function runtime_lib_createClass(Constructor, protoProps, staticProps) {
            return protoProps && runtime_lib_defineProperties(Constructor.prototype, protoProps), 
            staticProps && runtime_lib_defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(RuntimeLib, [ {
            key: "getModulePromise",
            value: function getModulePromise() {
                var _this = this, _this$config = this.config, urls = _this$config.urls, getModule = _this$config.getModule, errs = [];
                return new Promise((function(resolve, reject) {
                    var i = 0;
                    urls.forEach((function(url) {
                        setTimeout(_asyncToGenerator(_regeneratorRuntime().mark((function _callee() {
                            var code;
                            return _regeneratorRuntime().wrap((function _callee$(_context) {
                                for (;;) switch (_context.prev = _context.next) {
                                  case 0:
                                    if (_context.prev = 0, !_this.anyResolved) {
                                        _context.next = 3;
                                        break;
                                    }
                                    return _context.abrupt("return");

                                  case 3:
                                    return console.log("[Runtime Library] Start download from ".concat(url)), _context.next = 6, 
                                    _ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "text",
                                        cache: !0
                                    });

                                  case 6:
                                    if (code = _context.sent, !_this.anyResolved) {
                                        _context.next = 9;
                                        break;
                                    }
                                    return _context.abrupt("return");

                                  case 9:
                                    console.log("[Runtime Library] Downloaded from ".concat(url, " , length = ").concat(code.length));
                                    try {
                                        (function runEval() {
                                            return window.eval(code);
                                        }).bind(window)();
                                    } catch (error) {} finally {
                                        _this.anyResolved = !0, resolve(getModule(window));
                                    }
                                    _context.next = 19;
                                    break;

                                  case 13:
                                    if (_context.prev = 13, _context.t0 = _context.catch(0), !_this.anyResolved) {
                                        _context.next = 17;
                                        break;
                                    }
                                    return _context.abrupt("return");

                                  case 17:
                                    errs.push({
                                        url: url,
                                        err: _context.t0
                                    }), 0 == --i && (console.error(errs), reject(errs));

                                  case 19:
                                  case "end":
                                    return _context.stop();
                                }
                            }), _callee, null, [ [ 0, 13 ] ]);
                        }))), 1e3 * i++);
                    }));
                }));
            }
        } ]), RuntimeLib;
    }(), cdn_map = {
        cloudflare: function cloudflare(name, ver, filename) {
            return "https://cdnjs.cloudflare.com/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
        },
        bootcdn: function bootcdn(name, ver, filename) {
            return "https://cdn.bootcdn.net/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
        },
        jsdelivr: function jsdelivr(name, ver, filename) {
            return "https://cdn.jsdelivr.net/npm/".concat(name, "@").concat(ver, "/").concat(filename);
        },
        staticfile: function staticfile(name, ver, filename) {
            return "https://cdn.staticfile.org/".concat(name, "/").concat(ver, "/").concat(filename);
        }
    }, urls = function urls(_ref2) {
        var name = _ref2.name, ver = _ref2.ver, filename = _ref2.filename, cdn_keys = _ref2.cdn_keys;
        return (cdn_keys = cdn_keys ? cdn_keys.filter((function(key) {
            return key in cdn_map;
        })) : Object.keys(cdn_map)).map((function(k) {
            return cdn_map[k](name, ver, filename);
        }));
    }, init = function init(name, ver, filename, getModule) {
        new RuntimeLib({
            urls: urls({
                name: name,
                ver: ver,
                filename: filename
            }),
            getModule: getModule
        }).getModulePromise().then(null);
    };
    function get_bili_player_id() {
        return $("#bilibiliPlayer")[0] ? "#bilibiliPlayer" : $("#bilibili-player")[0] ? "#bilibili-player" : $("#edu-player")[0] ? "div.bpx-player-primary-area" : void 0;
    }
    function request_danmaku(options, cid) {
        cid ? ajax({
            url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
            dataType: "text"
        }).then((function(result) {
            var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ""));
            if (result_dom) if (result_dom.find("d")[0]) {
                var danmaku_data = result_dom.find("d").map((function(i, el) {
                    var item = $(el), p = item.attr("p").split(","), type = 0;
                    return "4" === p[1] ? type = 2 : "5" === p[1] && (type = 1), [ {
                        author: "",
                        time: parseFloat(p[0]),
                        type: type,
                        color: parseInt(p[3]),
                        id: "",
                        text: item.text()
                    } ];
                })).get();
                options.success(danmaku_data), setTimeout((function() {
                    danmaku_config();
                }), 100);
            } else options.error("未发现弹幕"); else options.error("弹幕获取失败");
        })).catch((function() {
            options.error("弹幕请求异常");
        })) : options.error("cid未知，无法获取弹幕");
    }
    function bili_video_tag() {
        return $("bwp-video")[0] ? "bwp-video" : $('video[class!="dplayer-video dplayer-video-current"]')[0] ? 'video[class!="dplayer-video dplayer-video-current"]' : void 0;
    }
    function bili_video_stop() {
        var bili_video = $(bili_video_tag())[0];
        bili_video && (bili_video.pause(), bili_video.currentTime = 0);
    }
    function recover_player() {
        if (window.bp_dplayer) {
            var bili_video = $(bili_video_tag())[0];
            bili_video && bili_video.removeEventListener("play", bili_video_stop, !1), window.bp_dplayer.destroy(), 
            window.bp_dplayer = null, $("#bp_dplayer").remove(), window.bp_dplayer_2 && (window.bp_dplayer_2.destroy(), 
            window.bp_dplayer_2 = null, $("#bp_dplayer_2").remove()), $(get_bili_player_id()).show();
        }
    }
    function danmaku_config() {
        var style = "" + '<style id="dplayer_danmaku_style">\n        .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {\n            animation-duration: '.concat(parseFloat(config_config.danmaku_speed), "s;\n            font-size: ").concat(parseInt(config_config.danmaku_fontsize), "px;\n        }\n        </style>");
        $("#dplayer_danmaku_style")[0] && $("#dplayer_danmaku_style").remove(), $("body").append(style);
    }
    init("jszip", "3.10.0", "jszip.min.js", (function(w) {
        return JSZip = w.JSZip;
    })), init("flv.js", "1.6.2", "flv.min.js", (function(w) {
        return w.flvjs;
    })), init("dplayer", "1.26.0", "DPlayer.min.js", (function(w) {
        return DPlayer = w.DPlayer;
    })), init("qrcodejs", "1.0.0", "qrcode.min.js", (function(w) {
        return QRCode = w.QRCode;
    })), init("blueimp-md5", "2.19.0", "js/md5.min.js", (function(w) {
        return md5 = w.md5;
    }));
    var player = {
        bili_video_tag: bili_video_tag,
        recover_player: recover_player,
        replace_player: function replace_player(url, url_2) {
            recover_player();
            var bili_video = $(bili_video_tag())[0];
            bili_video_stop(), bili_video && bili_video.addEventListener("play", bili_video_stop, !1);
            var bili_player_id = get_bili_player_id();
            $("#bilibiliPlayer")[0] ? ($(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor">'), 
            $(bili_player_id).hide()) : $("#bilibili-player")[0] ? ($(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor" style="width:100%;height:100%;z-index:1000;"></div>'), 
            $(bili_player_id).hide()) : $("#edu-player")[0] ? ($(bili_player_id).before('<div id="bp_dplayer" style="width:100%;height:100%;z-index:1000;"></div>'), 
            $(bili_player_id).hide()) : MessageBox_alert('<div id="bp_dplayer" style="width:100%;height:100%;"></div>', (function() {
                recover_player();
            })), api.get_subtitle_url(0, (function dplayer_init() {
                var subtitle_url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                if (window.bp_dplayer = new DPlayer({
                    container: $("#bp_dplayer")[0],
                    mutex: !1,
                    volume: 1,
                    autoplay: !0,
                    video: {
                        url: url,
                        type: "auto"
                    },
                    subtitle: {
                        url: subtitle_url,
                        type: "webvtt",
                        fontSize: "35px",
                        bottom: "5%",
                        color: "#fff"
                    },
                    danmaku: !0,
                    apiBackend: {
                        read: function read(options) {
                            request_danmaku(options, video.base().cid());
                        },
                        send: function send(options) {
                            options.error("此脚本无法将弹幕同步到云端");
                        }
                    },
                    contextmenu: [ {
                        text: "脚本信息",
                        link: "https://github.com/injahow/user.js"
                    }, {
                        text: "脚本作者",
                        link: "https://injahow.com"
                    } ]
                }), url_2 && "#" !== url_2) {
                    $("body").append('<div id="bp_dplayer_2" style="display:none;"></div>'), window.bp_dplayer_2 = new DPlayer({
                        container: $("#bp_dplayer_2")[0],
                        mutex: !1,
                        volume: 1,
                        autoplay: !1,
                        video: {
                            url: url_2,
                            type: "auto"
                        }
                    });
                    var _ref = [ window.bp_dplayer, window.bp_dplayer_2 ], bp_dplayer = _ref[0], bp_dplayer_2 = _ref[1];
                    bp_dplayer.on("play", (function() {
                        !bp_dplayer.paused && bp_dplayer_2.play();
                    })), bp_dplayer.on("playing", (function() {
                        !bp_dplayer.paused && bp_dplayer_2.play();
                    })), bp_dplayer.on("timeupdate", (function() {
                        Math.abs(bp_dplayer.video.currentTime - bp_dplayer_2.video.currentTime) > 1 && (bp_dplayer_2.pause(), 
                        bp_dplayer_2.seek(bp_dplayer.video.currentTime)), !bp_dplayer.paused && bp_dplayer_2.play();
                    })), bp_dplayer.on("seeking", (function() {
                        bp_dplayer_2.pause(), bp_dplayer_2.seek(bp_dplayer.video.currentTime);
                    })), bp_dplayer.on("waiting", (function() {
                        bp_dplayer_2.pause(), bp_dplayer_2.seek(bp_dplayer.video.currentTime);
                    })), bp_dplayer.on("pause", (function() {
                        bp_dplayer_2.pause(), bp_dplayer_2.seek(bp_dplayer.video.currentTime);
                    })), bp_dplayer.on("suspend", (function() {
                        bp_dplayer_2.speed(bp_dplayer.video.playbackRate);
                    })), bp_dplayer.on("volumechange", (function() {
                        bp_dplayer_2.volume(bp_dplayer.video.volume), bp_dplayer_2.video.muted = bp_dplayer.video.muted;
                    }));
                }
            }));
        },
        danmaku: {
            config: danmaku_config
        }
    };
    function check_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var check = new (function() {
        function Check() {
            !function check_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Check), this.aid = "", this.cid = "", this.q = "", this.epid = "";
        }
        return function check_createClass(Constructor, protoProps, staticProps) {
            return protoProps && check_defineProperties(Constructor.prototype, protoProps), 
            staticProps && check_defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(Check, [ {
            key: "refresh",
            value: function refresh() {
                console.log("refresh..."), $("#video_download").hide(), $("#video_download_2").hide(), 
                player.recover_player();
                try {
                    var vb = video.base();
                    this.aid = vb.aid(), this.cid = vb.cid(), this.epid = vb.epid(), this.q = video.get_quality().q, 
                    window.bp_episodes = null;
                } catch (err) {
                    console.log(err);
                }
            }
        } ]), Check;
    }());
    function download_createForOfIteratorHelper(o, allowArrayLike) {
        var it = "undefined" != typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = download_unsupportedIterableToArray(o)) || allowArrayLike && o && "number" == typeof o.length) {
                it && (o = it);
                var i = 0, F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return i >= o.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var err, normalCompletion = !0, didErr = !1;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                return normalCompletion = step.done, step;
            },
            e: function e(_e2) {
                didErr = !0, err = _e2;
            },
            f: function f() {
                try {
                    normalCompletion || null == it.return || it.return();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function _toConsumableArray(arr) {
        return function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return download_arrayLikeToArray(arr);
        }(arr) || function _iterableToArray(iter) {
            if ("undefined" != typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) return Array.from(iter);
        }(arr) || download_unsupportedIterableToArray(arr) || function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function download_unsupportedIterableToArray(o, minLen) {
        if (o) {
            if ("string" == typeof o) return download_arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            return "Object" === n && o.constructor && (n = o.constructor.name), "Map" === n || "Set" === n ? Array.from(o) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? download_arrayLikeToArray(o, minLen) : void 0;
        }
    }
    function download_arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function rpc_type() {
        return config_config.rpc_domain.match("https://") || config_config.rpc_domain.match(/localhost|127\.0\.0\.1/) ? "post" : "ariang";
    }
    var download_rpc_clicked = !1;
    function download_rpc_post(video) {
        download_rpc_post_all([ video ]);
    }
    function download_rpc_post_all(videos) {
        if (download_rpc_clicked) Message_miaow(); else {
            download_rpc_clicked = !0;
            var data = _toConsumableArray(videos);
            ajax(function get_rpc_post(data) {
                data instanceof Array || (data = data instanceof Object ? [ data ] : []);
                var rpc = {
                    domain: config_config.rpc_domain,
                    port: config_config.rpc_port,
                    token: config_config.rpc_token,
                    dir: config_config.rpc_dir
                };
                return {
                    url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(data.map((function(_ref4) {
                        var url = _ref4.url, filename = _ref4.filename, rpc_dir = _ref4.rpc_dir, param = {
                            out: filename,
                            header: [ "User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href) ]
                        };
                        return (rpc_dir || rpc.dir) && (param.dir = rpc_dir || rpc.dir), {
                            id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
                            jsonrpc: "2.0",
                            method: "aria2.addUri",
                            params: [ "token:".concat(rpc.token), [ url ], param ]
                        };
                    })))
                };
            }(data)).then((function(res) {
                res.length === data.length ? Message_success("RPC请求成功") : Message_warning("请检查RPC参数");
            })).catch((function() {
                Message_error("请检查RPC服务配置");
            })).finally((function() {
                return download_rpc_clicked = !1;
            })), Message_info("发送RPC下载请求");
        }
    }
    function open_ariang(rpc) {
        var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace("://", "/"), "/").concat(rpc.port, "/jsonrpc/").concat(window.btoa(rpc.token)) : "", url = config_config.ariang_host + hash_tag, a = document.createElement("a");
        a.setAttribute("target", "_blank"), a.setAttribute("onclick", "window.bp_aria2_window=window.open('".concat(url, "');")), 
        a.click();
    }
    function download_rpc_ariang_send(video) {
        var bp_aria2_window = window.bp_aria2_window, time = 100;
        bp_aria2_window && !bp_aria2_window.closed || (open_ariang(), time = 3e3), setTimeout((function() {
            var bp_aria2_window = window.bp_aria2_window, task_hash = "#!/new/task?" + [ "url=".concat(encodeURIComponent(window.btoa(video.url))), "out=".concat(encodeURIComponent(video.filename)), "header=User-Agent:".concat(window.navigator.userAgent), "header=Referer:".concat(window.location.href) ].join("&");
            bp_aria2_window && !bp_aria2_window.closed ? (bp_aria2_window.location.href = config_config.ariang_host + task_hash, 
            Message_success("发送RPC请求")) : Message_warning("AriaNG页面未打开");
        }), time);
    }
    function download_rpc_ariang() {
        for (var _len = arguments.length, videos = new Array(_len), _key = 0; _key < _len; _key++) videos[_key] = arguments[_key];
        0 != videos.length && (1 == videos.length && videos[0] instanceof Array ? download_rpc_ariang.apply(void 0, _toConsumableArray(videos[0])) : (download_rpc_ariang_send(videos.pop()), 
        setTimeout((function() {
            download_rpc_ariang.apply(void 0, videos);
        }), 100)));
    }
    var download_blob_clicked = !1, need_show_progress = !0;
    function download_blob(url, filename) {
        if (download_blob_clicked) return Message_miaow(), void (need_show_progress = !0);
        var xhr = new XMLHttpRequest;
        xhr.open("get", url), xhr.responseType = "blob", xhr.onload = function() {
            if (200 === this.status || 304 === this.status) {
                if ("msSaveOrOpenBlob" in navigator) return void navigator.msSaveOrOpenBlob(this.response, filename);
                var blob_url = URL.createObjectURL(this.response), a = document.createElement("a");
                a.style.display = "none", a.href = blob_url, a.download = filename, a.click(), URL.revokeObjectURL(blob_url);
            }
        }, need_show_progress = !0, xhr.onprogress = function(evt) {
            if (4 != this.state) {
                var loaded = evt.loaded, tot = evt.total;
                !function show_progress(_ref5) {
                    var total = _ref5.total, loaded = _ref5.loaded, percent = _ref5.percent;
                    need_show_progress && MessageBox_alert("文件大小：".concat(Math.floor(total / 1048576), "MB(").concat(total, "Byte)<br/>") + "已经下载：".concat(Math.floor(loaded / 1048576), "MB(").concat(loaded, "Byte)<br/>") + "当前进度：".concat(percent, "%<br/>下载中请勿操作浏览器，刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。"), (function() {
                        need_show_progress = !1;
                    })), total === loaded && (MessageBox_alert("下载完成，请等待浏览器保存！"), download_blob_clicked = !1);
                }({
                    total: tot,
                    loaded: loaded,
                    percent: Math.floor(100 * loaded / tot)
                });
            }
        }, xhr.send(), download_blob_clicked = !0, Message_info("准备开始下载");
    }
    function _download_danmaku_ass(cid, title) {
        var return_type = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, callback = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        ajax({
            url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
            dataType: "text"
        }).then((function(result) {
            var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ""));
            if (!result_dom || !result_dom.find("d")[0]) return "callback" === return_type && callback ? void callback() : void Message_warning("未发现弹幕");
            var _step2, danmaku_data = result_dom.find("d").map((function(i, el) {
                var item = $(el), p = item.attr("p").split(","), type = 0;
                return "4" === p[1] ? type = 2 : "5" === p[1] && (type = 1), [ {
                    time: parseFloat(p[0]),
                    type: type,
                    color: parseInt(p[3]),
                    text: item.text()
                } ];
            })).get().sort((function(a, b) {
                return a.time - b.time;
            })), dialogue = function dialogue(danmaku, scroll_id, fix_id) {
                var text = danmaku.text, time = danmaku.time, commands = [ 0 === danmaku.type ? function scrollCommand(top, left_a, left_b) {
                    return "\\move(".concat(left_a, ",").concat(top, ",").concat(left_b, ",").concat(top, ")");
                }(50 * (1 + Math.floor(15 * Math.random())), 1920 + 50 * danmaku.text.length / 2, 0 - 50 * danmaku.text.length / 2) : function fixCommand(top, left) {
                    return "\\pos(".concat(left, ",").concat(top, ")");
                }(50 * (1 + fix_id % 15), 960), function isWhite(color) {
                    return 16777215 === color;
                }(danmaku.color) ? "" : function colorCommand(color) {
                    return "\\c&H".concat(((255 & color) << 16 | (color >> 8 & 255) << 8 | color >> 16 & 255).toString(16), "&");
                }(danmaku.color) ], formatTime = function formatTime(seconds) {
                    var div = function div(i, j) {
                        return Math.floor(i / j);
                    }, pad = function pad(n) {
                        return n < 10 ? "0" + n : "" + n;
                    }, integer = Math.floor(seconds), hour = div(integer, 3600), minute = div(integer, 60) % 60, second = integer % 60, minorSecond = Math.floor(100 * (seconds - integer));
                    return "".concat(hour, ":").concat(pad(minute), ":").concat(pad(second), ".").concat(minorSecond);
                }, fields = [ 0, formatTime(time), formatTime(time + (0 === danmaku.type ? 8 : 4)), "Medium", "", "0", "0", "0", "", "{" + commands.join("") + "}" + function encode(text) {
                    return text.replace(/\{/g, "｛").replace(/\}/g, "｝").replace(/\r|\n/g, "");
                }(text) ];
                return "Dialogue: " + fields.join(",");
            }, content = [ "[Script Info]", "; Script generated by injahow/user.js", "; https://github.com/injahow/user.js", "Title: ".concat(title), "ScriptType: v4.00+", "PlayResX: ".concat(1920), "PlayResY: ".concat(1080), "Timer: 10.0000", "WrapStyle: 2", "ScaledBorderAndShadow: no", "", "[V4+ Styles]", "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding", "Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text" ], fix_id = 0, _iterator2 = download_createForOfIteratorHelper(danmaku_data);
            try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                    var danmaku = _step2.value;
                    0 === danmaku.type ? 0 : fix_id++, content.push(dialogue(danmaku, 0, fix_id));
                }
            } catch (err) {
                _iterator2.e(err);
            } finally {
                _iterator2.f();
            }
            var data = content.join("\n");
            if (null === return_type || "file" === return_type) {
                var blob_url = URL.createObjectURL(new Blob([ data ], {
                    type: "text/ass"
                })), a = document.createElement("a");
                a.style.display = "none", a.href = blob_url, a.download = title + ".ass", a.click(), 
                URL.revokeObjectURL(blob_url);
            } else "callback" === return_type && callback && callback(data);
        })).catch((function() {
            "callback" === return_type && callback && callback();
        }));
    }
    function download_danmaku_ass(cid, title) {
        _download_danmaku_ass(cid, title, "file");
    }
    function download_subtitle_vtt() {
        var p = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, file_name = arguments.length > 1 ? arguments[1] : void 0, download_subtitle = function download_subtitle(blob_url) {
            if (blob_url) {
                var a = document.createElement("a");
                a.setAttribute("target", "_blank"), a.setAttribute("href", blob_url), a.setAttribute("download", file_name + ".vtt"), 
                a.click(), URL.revokeObjectURL(blob_url);
            } else Message_warning("未发现字幕");
        };
        api.get_subtitle_url(p, download_subtitle);
    }
    function download_blob_zip(blob_data, filename) {
        if (blob_data) {
            var blob_url = URL.createObjectURL(blob_data), a = document.createElement("a");
            a.setAttribute("target", "_blank"), a.setAttribute("href", blob_url), a.setAttribute("download", filename + ".zip"), 
            a.click(), URL.revokeObjectURL(blob_url);
        }
    }
    function download_danmaku_ass_zip(videos, zip) {
        if (videos) {
            if (0 === videos.length) return 0 === Object.keys(zip.files).length ? void Message_warning("未发现弹幕") : void zip.generateAsync({
                type: "blob"
            }).then((function(data) {
                return download_blob_zip(data, video.base().filename() + "_ass");
            }));
            var _videos$pop = videos.pop(), cid = _videos$pop.cid, filename = _videos$pop.filename;
            _download_danmaku_ass(cid, filename, "callback", (function(data) {
                data && zip.file(filename + ".ass", data), setTimeout((function() {
                    download_danmaku_ass_zip(videos, zip);
                }), 1e3);
            }));
        }
    }
    function download_subtitle_vtt_zip(videos, zip) {
        if (videos) {
            if (0 === videos.length) return 0 === Object.keys(zip.files).length ? void Message_warning("未发现字幕") : void zip.generateAsync({
                type: "blob"
            }).then((function(data) {
                return download_blob_zip(data, video.base().filename() + "_vtt");
            }));
            var _videos$pop2 = videos.pop(), p = _videos$pop2.p, filename = _videos$pop2.filename;
            api.get_subtitle_data(p, (function(data) {
                data && zip.file(filename + ".vtt", data), setTimeout((function() {
                    download_subtitle_vtt_zip(videos, zip);
                }), 1e3);
            }));
        }
    }
    function format(url) {
        return url ? url.match(".mp4|.m4s") ? ".mp4" : url.match(".flv") ? ".flv" : ".mp4" : "";
    }
    var Download = {
        url_format: format,
        download: function download(url, filename, type) {
            filename = filename.replace(/[\/\\*|]+/g, "-").replace(/:/g, "：").replace(/\?/g, "？").replace(/"/g, "'").replace(/</g, "《").replace(/>/g, "》"), 
            "blob" === type ? download_blob(url, filename) : "rpc" === type && function download_rpc(url, filename) {
                var type = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "post";
                "post" === type ? download_rpc_post({
                    url: url,
                    filename: filename
                }) : "ariang" === type && download_rpc_ariang({
                    url: url,
                    filename: filename
                });
            }(url, filename, rpc_type());
        },
        download_all: function download_all() {
            var vb = video.base(), _ref = [ video.get_quality().q, vb.total() ], q = _ref[0], total = _ref[1];
            $("body").on("click", 'input[name="option_video"]', (function(event) {
                function get_option_index(element) {
                    return element && parseInt(element.id.split("_")[1]) || 0;
                }
                if ($(this).is(":checked") ? $(this).parent().css("color", "rgba(0,0,0,1)") : $(this).parent().css("color", "rgba(0,0,0,0.5)"), 
                event.ctrlKey || event.altKey) {
                    var current_select_option_index = get_option_index(event.target), option_videos = _toConsumableArray(document.getElementsByName("option_video"));
                    if (event.target.checked) for (var i = get_option_index(option_videos.filter((function(e) {
                        return e.checked && get_option_index(e) < current_select_option_index;
                    })).slice(-1)[0]); i < current_select_option_index; i++) option_videos[i].checked = !0, 
                    option_videos[i].parentNode.style.color = "rgba(0,0,0,1)"; else for (var _i = get_option_index(option_videos.filter((function(e) {
                        return !e.checked && get_option_index(e) < current_select_option_index;
                    })).slice(-1)[0]); _i < current_select_option_index; _i++) option_videos[_i].checked = !1, 
                    option_videos[_i].parentNode.style.color = "rgba(0,0,0,0.5)";
                }
            }));
            for (var video_html = "", i = 0; i < total; i++) video_html += "" + '<label for="option_'.concat(i, '"><div style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="option_').concat(i, '" name="option_video" value="').concat(i, '">\n                P').concat(i + 1, " ").concat(vb.title(i + 1), "\n            </div></label><hr>");
            var all_checked = !1;
            $("body").on("click", "button#checkbox_btn", (function() {
                all_checked ? (all_checked = !1, $('input[name="option_video"]').prop("checked", all_checked), 
                $('input[name="option_video"]').parent().css("color", "rgba(0,0,0,0.5)")) : (all_checked = !0, 
                $('input[name="option_video"]').prop("checked", all_checked), $('input[name="option_video"]').parent().css("color", "rgb(0,0,0)"));
            }));
            var _step, option_support_html = "", _iterator = download_createForOfIteratorHelper(video.get_quality_support());
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var item = _step.value;
                    option_support_html += '<option value="'.concat(item, '">').concat(videoQualityMap[item], "</option>");
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            var msg = "" + '<div style="margin:2% 0;">\n            <label>视频格式:</label>\n            <select id="dl_format">\n                <option value="mp4" selected>MP4</option>\n                <option value="flv">FLV</option>\n                <option value="dash">DASH</option>\n            </select>\n            &nbsp;&nbsp;无法设置MP4清晰度\n        </div>\n        <div style="margin:2% 0;">\n            <label>视频质量:</label>\n            <select id="dl_quality">\n                '.concat(option_support_html, '\n            </select>\n        </div>\n        <div style="margin:2% 0;">\n            <label>下载选择:</label>\n            <label style="color:rgba(0,0,0,1);">\n                <input type="checkbox" id="dl_video" name="dl_option" checked="checked">\n                <label for="dl_video">视频</label>\n            </label>\n            <label style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="dl_subtitle" name="dl_option">\n                <label for="dl_subtitle">字幕</label>\n            </label>\n            <label style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="dl_danmaku" name="dl_option">\n                <label for="dl_danmaku">弹幕</label>\n            </label>\n        </div>\n        <div style="margin:2% 0;">\n            <label>保存目录:</label>\n            <input id="dl_rpc_dir" placeholder="').concat(config_config.rpc_dir || "为空使用默认目录", '"/>\n        </div>\n        <b>\n            <span style="color:red;">为避免请求被拦截，设置了延时且不支持下载无法播放的视频；请勿频繁下载过多视频，可能触发风控导致不可再下载！</span>\n        </b><br />\n        <div style="height:240px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);">\n            ').concat(video_html, '\n        </div>\n        <div style="margin:2% 0;">\n            <button id="checkbox_btn">全选</button>\n        </div>');
            function download_videos(video_tasks, i, videos) {
                if (video_tasks.length) {
                    if (i >= video_tasks.length) return MessageBox_alert("视频地址请求完成！"), void ("post" === rpc_type() && videos.length > 0 && (download_rpc_post_all(videos), 
                    videos.length = 0));
                    var task = video_tasks[i], msg = "第".concat(i + 1, "（").concat(i + 1, "/").concat(video_tasks.length, "）个视频");
                    MessageBox_alert("".concat(msg, "：获取中..."));
                    api.get_urls(task.p, task.q, task.format, (function success(res) {
                        if (setTimeout((function() {
                            download_videos(video_tasks, ++i, videos);
                        }), 4e3), !res.code) {
                            Message_success("请求成功" + (res.times ? "<br/>今日剩余请求次数".concat(res.times) : "")), 
                            MessageBox_alert("".concat(msg, "：获取成功！"));
                            var _ref3 = [ res.url, rpc_type(), res.video, res.audio ], url = _ref3[0], type = _ref3[1], video_url = _ref3[2], audio_url = _ref3[3];
                            "post" === type ? ("dash" === task.format ? videos.push({
                                url: video_url,
                                filename: task.filename + format(video_url),
                                rpc_dir: task.rpc_dir
                            }, {
                                url: audio_url,
                                filename: task.filename + ".m4a",
                                rpc_dir: task.rpc_dir
                            }) : videos.push({
                                url: url,
                                filename: task.filename + format(url),
                                rpc_dir: task.rpc_dir
                            }), videos.length > 3 && (download_rpc_post_all(videos), videos.length = 0)) : "ariang" === type && ("dash" === task.format ? download_rpc_ariang({
                                url: video_url,
                                filename: task.filename + format(video_url)
                            }, {
                                url: audio_url,
                                filename: task.filename + ".m4a"
                            }) : download_rpc_ariang({
                                url: url,
                                filename: task.filename + format(url)
                            }));
                        }
                    }), (function error() {
                        download_videos(video_tasks, ++i, videos);
                    }));
                }
            }
            MessageBox_confirm(msg, (function() {
                for (var _ref2 = [ $("#dl_video").is(":checked"), $("#dl_subtitle").is(":checked"), $("#dl_danmaku").is(":checked"), $("#dl_format").val(), $("#dl_quality").val() || q, $("#dl_rpc_dir").val() ], dl_video = _ref2[0], dl_subtitle = _ref2[1], dl_danmaku = _ref2[2], dl_format = _ref2[3], dl_quality = _ref2[4], dl_rpc_dir = _ref2[5], videos = [], _i2 = 0; _i2 < total; _i2++) if ($("input#option_".concat(_i2)).is(":checked")) {
                    var p = _i2 + 1;
                    videos.push({
                        cid: vb.cid(p),
                        p: p,
                        q: dl_quality,
                        format: dl_format,
                        filename: vb.filename(p),
                        rpc_dir: dl_rpc_dir
                    });
                }
                dl_video && download_videos(videos, 0, []), dl_subtitle && (1 === videos.length ? download_subtitle_vtt(videos[0].p, videos[0].filename) : download_subtitle_vtt_zip([].concat(videos), new JSZip)), 
                dl_danmaku && (1 === videos.length ? download_danmaku_ass(videos[0].cid, videos[0].filename) : download_danmaku_ass_zip([].concat(videos), new JSZip));
            })), $("#dl_quality").val(q), $("body").on("click", 'input[name="dl_option"]', (function() {
                $(this).is(":checked") ? $(this).parent().css("color", "rgba(0,0,0,1)") : $(this).parent().css("color", "rgba(0,0,0,0.5)");
            }));
        },
        download_danmaku_ass: download_danmaku_ass,
        download_subtitle_vtt: download_subtitle_vtt,
        open_ariang: open_ariang
    }, config = '<div id="bp_config"> <div class="config-mark"></div> <div class="config-bg"> <span style="font-size:20px"> <b>bilibili视频下载 参数设置</b> <b> <a href="javascript:;" id="reset_config"> [重置] </a> <a style="text-decoration:underline" href="javascript:;" id="show_help">&lt;通知/帮助&gt;</a> </b> </span> <div style="margin:2% 0"> <label>请求地址：</label> <input id="base_api" style="width:30%"/>&nbsp;&nbsp;&nbsp;&nbsp; <label>请求方式：</label> <select id="request_type"> <option value="auto">自动判断</option> <option value="local">本地请求</option> <option value="remote">远程请求</option> </select><br/> <small>注意：普通使用请勿修改；默认使用混合请求</small> </div> <div style="margin:2% 0"> <label>视频格式：</label> <select id="format"> <option value="mp4">MP4</option> <option value="flv">FLV</option> <option value="dash">DASH</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>切换CDN：</label> <select id="host_key"> {{host_key_options}} </select><br/> <small>注意：无法选择MP4清晰度；建议特殊地区或播放异常时切换（自行选择合适线路）</small> </div> <div style="margin:2% 0"> <label>下载方式：</label> <select id="download_type"> <option value="a">URL链接</option> <option value="web">Web浏览器</option> <option value="blob">Blob请求</option> <option value="rpc">RPC接口</option> <option value="aria">Aria命令</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>AriaNg地址：</label> <input id="ariang_host" style="width:30%"/><br/> <small>提示：建议使用RPC请求下载；非HTTPS或非本地RPC域名使用AriaNg下载</small> </div> <div style="margin:2% 0"> <label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br/> <input id="rpc_domain" placeholder="ws://192.168.1.2" style="width:25%"/> : <input id="rpc_port" placeholder="6800" style="width:10%"/> | <input id="rpc_token" placeholder="未设置不填" style="width:15%"/> | <input id="rpc_dir" placeholder="留空使用默认目录" style="width:20%"/><br/> <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small> </div> <div style="margin:2% 0"> <label>Aria参数：</label> <label>最大连接数：</label> <select id="aria2c_connection_level"> <option value="min">1</option> <option value="mid">8</option> <option value="max">16</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>附加参数：</label> <input id="aria2c_addition_parameters" placeholder="见Aria2c文档" style="width:20%"/><br/> <small>说明：用于配置Aria命令下载方式的参数</small> </div> <div style="margin:2% 0"> <label>强制换源：</label> <select id="replace_force"> <option value="0">关闭</option> <option value="1">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕速度：</label> <input id="danmaku_speed" style="width:5%"/> s &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕字号：</label> <input id="danmaku_fontsize" style="width:5%"/> px<br/> <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small> </div> <div style="margin:2% 0"> <label>自动下载：</label> <select id="auto_download"> <option value="0">关闭</option> <option value="1">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>视频质量：</label> <select id="video_quality"> {{video_quality_options}} </select><br/> <small>说明：请求地址成功后将自动点击下载视频按钮</small> </div> <div style="margin:2% 0"> <label>授权状态：</label> <select id="auth" disabled="disabled"> <option value="0">未授权</option> <option value="1">已授权</option> </select> <a class="setting-context" href="javascript:;" id="show_login">扫码授权</a> <a class="setting-context" href="javascript:;" id="show_login_2">网页授权</a> <a class="setting-context" href="javascript:;" id="show_logout">取消授权</a> <a class="setting-context" href="javascript:;" id="show_login_help">这是什么？</a> </div> <br/> <div style="text-align:right"> <button class="setting-button" id="save_config">确定</button> </div> </div> <style>#bp_config{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:10000}#bp_config .config-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;z-index:10001}#bp_config .config-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:10000}#bp_config .setting-button{width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}#bp_config .setting-button:hover{background:#59f}#bp_config .setting-context{margin:0 1%;color:#00f}#bp_config .setting-context:hover{color:red}</style> </div> ', config_config = {
        base_api: "https://api.injahow.cn/bparse/",
        request_type: "auto",
        format: "mp4",
        host_key: "0",
        replace_force: "0",
        auth: "0",
        download_type: "web",
        rpc_domain: "http://localhost",
        rpc_port: "16800",
        rpc_token: "",
        rpc_dir: "",
        aria2c_connection_level: "min",
        aria2c_addition_parameters: "",
        ariang_host: "http://ariang.injahow.com/",
        auto_download: "0",
        video_quality: "0",
        danmaku_speed: "15",
        danmaku_fontsize: "22"
    }, default_config = Object.assign({}, config_config), hostMap = {
        ks3: "upos-sz-mirrorks3.bilivideo.com",
        ks3b: "upos-sz-mirrorks3b.bilivideo.com",
        ks3c: "upos-sz-mirrorks3c.bilivideo.com",
        ks32: "upos-sz-mirrorks32.bilivideo.com",
        kodo: "upos-sz-mirrorkodo.bilivideo.com",
        kodob: "upos-sz-mirrorkodob.bilivideo.com",
        cos: "upos-sz-mirrorcos.bilivideo.com",
        cosb: "upos-sz-mirrorcosb.bilivideo.com",
        bos: "upos-sz-mirrorbos.bilivideo.com",
        wcs: "upos-sz-mirrorwcs.bilivideo.com",
        wcsb: "upos-sz-mirrorwcsb.bilivideo.com",
        hw: "upos-sz-mirrorhw.bilivideo.com",
        hwb: "upos-sz-mirrorhwb.bilivideo.com",
        upbda2: "upos-sz-upcdnbda2.bilivideo.com",
        upws: "upos-sz-upcdnws.bilivideo.com",
        uptx: "upos-sz-upcdntx.bilivideo.com",
        uphw: "upos-sz-upcdnhw.bilivideo.com",
        js: "upos-tf-all-js.bilivideo.com",
        hk: "cn-hk-eq-bcache-01.bilivideo.com",
        akamai: "upos-hz-mirrorakam.akamaized.net"
    }, videoQualityMap = {
        127: "8K 超高清",
        120: "4K 超清",
        116: "1080P 60帧",
        112: "1080P 高码率",
        80: "1080P 高清",
        74: "720P 60帧",
        64: "720P 高清",
        48: "720P 高清(MP4)",
        32: "480P 清晰",
        16: "360P 流畅"
    }, help_clicked = !1, config_functions = {
        save_config: function save_config() {
            var old_config;
            try {
                old_config = JSON.parse(store.get("config_str")), store.set("config_str", JSON.stringify(config_config));
            } catch (err) {
                old_config = Object.assign({}, config_config);
            }
            for (var _i = 0, _arr = [ "base_api", "format", "auth", "video_quality" ]; _i < _arr.length; _i++) {
                var key = _arr[_i];
                if (config_config[key] !== old_config[key]) {
                    $("#video_download").hide(), $("#video_download_2").hide();
                    break;
                }
            }
            config_config.host_key !== old_config.host_key && (check.refresh(), $("#video_url").attr("href", "#"), 
            $("#video_url_2").attr("href", "#")), config_config.rpc_domain !== old_config.rpc_domain && (config_config.rpc_domain.match("https://") || config_config.rpc_domain.match(/(localhost|127\.0\.0\.1)/) || MessageBox_alert("检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；配置好后即可使用脚本进行远程下载，使用期间不用关闭AriaNg页面！", (function() {
                Download.open_ariang({
                    domain: config_config.rpc_domain,
                    port: config_config.rpc_port,
                    token: config_config.rpc_token
                });
            })));
            for (var _i2 = 0, _arr2 = [ "danmaku_speed", "danmaku_fontsize" ]; _i2 < _arr2.length; _i2++) {
                var _key = _arr2[_i2];
                if (config_config[_key] !== old_config[_key]) {
                    player.danmaku.config();
                    break;
                }
            }
            $("#bp_config").hide(), $("#bp_config").css("opacity", 0), scroll_scroll.show();
        },
        reset_config: function reset_config() {
            for (var key in default_config) "auth" !== key && (config_config[key] = default_config[key], 
            $("#".concat(key)).val(default_config[key]));
        },
        show_help: function show_help() {
            help_clicked ? Message_miaow() : (help_clicked = !0, ajax({
                url: "".concat(config_config.base_api, "/auth/v2/?act=help"),
                dataType: "text"
            }).then((function(res) {
                res ? MessageBox_alert(res) : Message_warning("获取失败");
            })).finally((function() {
                return help_clicked = !1;
            })));
        },
        show_login: function show_login() {
            auth.login("1");
        },
        show_login_2: function show_login_2() {
            auth.login("0");
        },
        show_logout: function show_logout() {
            auth.logout();
        },
        show_login_help: function show_login_help() {
            MessageBox_confirm("进行授权之后在远程请求时拥有用户账号原有的权限，例如能够获取用户已经付费或承包的番剧，是否需要授权？", (function() {
                auth.login();
            }));
        }
    };
    function getCookie(cookieName) {
        for (var cookieList = document.cookie.split(";"), i = 0; i < cookieList.length; ++i) {
            var arr = cookieList[i].split("=");
            if (cookieName === arr[0].trim()) return arr[1];
        }
        return null;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter((function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            }))), keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
                _defineProperty(target, key, source[key]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }));
        }
        return target;
    }
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    function auth_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var Auth = function() {
        function Auth() {
            !function auth_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Auth), this.auth_clicked = !1, this.auth_window = null, this.TV_KEY = "4409e2ce8ffd12b8", 
            this.TV_SEC = "59b43e04ad6965f34319062b478f83dd";
        }
        return function auth_createClass(Constructor, protoProps, staticProps) {
            return protoProps && auth_defineProperties(Constructor.prototype, protoProps), staticProps && auth_defineProperties(Constructor, staticProps), 
            Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(Auth, [ {
            key: "checkLoginStatus",
            value: function checkLoginStatus() {
                var _this = this, _ref = [ store.get("auth_id"), store.get("auth_sec"), store.get("access_key"), store.get("auth_time") || 0 ], auth_id = _ref[0], auth_sec = _ref[1], access_key = _ref[2], auth_time = _ref[3];
                access_key && (user.is_login && (config_config.base_api !== store.get("pre_base_api") || Date.now() - parseInt(auth_time) > 864e6) && ajax({
                    url: "https://passport.bilibili.com/api/oauth?access_key=".concat(access_key),
                    type: "GET",
                    dataType: "json"
                }).then((function(res) {
                    res.code ? (Message_info("授权已过期，准备重新授权"), _this.reLogin()) : (store.set("auth_time", Date.now()), 
                    ajax({
                        url: "".concat(config_config.base_api, "/auth/?act=check&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&access_key=").concat(access_key),
                        type: "GET",
                        dataType: "json"
                    }).then((function(res) {
                        res.code && (Message_info("检查失败，准备重新授权"), _this.reLogin());
                    })));
                })), store.set("pre_base_api", config_config.base_api));
            }
        }, {
            key: "makeAPIData",
            value: function makeAPIData(param, sec) {
                return _objectSpread(_objectSpread({}, param), {}, {
                    sign: md5("".concat(Object.entries(param).map((function(e) {
                        return "".concat(e[0], "=").concat(e[1] || "");
                    })).join("&")).concat(sec))
                });
            }
        }, {
            key: "_login",
            value: function _login(resolve) {
                var _this2 = this;
                this.auth_clicked ? Message_miaow() : (this.auth_clicked = !0, ajax({
                    url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code",
                    type: "POST",
                    data: this.makeAPIData({
                        appkey: this.TV_KEY,
                        csrf: getCookie("bili_jct"),
                        local_id: "0",
                        ts: Date.now()
                    }, this.TV_SEC)
                }).then(resolve).catch((function() {
                    return _this2.auth_clicked = !1;
                })));
            }
        }, {
            key: "login",
            value: function login() {
                var useApp = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "1", do_login = "1" === useApp ? this.loginApp.bind(this) : this.loginWeb.bind(this);
                store.get("auth_id") ? MessageBox_confirm("发现授权记录，是否重新授权？", do_login) : do_login();
            }
        }, {
            key: "reLogin",
            value: function reLogin() {
                this.logout(), store.set("auth_time", "0"), this.loginApp();
            }
        }, {
            key: "loginApp",
            value: function loginApp() {
                var _this3 = this;
                this._login((function(res) {
                    if (res && !res.code) {
                        var _res$data = res.data, url = _res$data.url, auth_code = _res$data.auth_code, is_login = 0, box = MessageBox_alert('<p>请使用<a href="https://app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>扫码登录</p><div id="login_qrcode"></div>', (function() {
                            is_login || Message_info("登陆失败！"), clearInterval(timer), _this3.auth_clicked = !1;
                        }));
                        new QRCode(document.getElementById("login_qrcode"), url);
                        var timer = setInterval((function() {
                            _ajax({
                                url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/poll",
                                type: "POST",
                                data: _this3.makeAPIData({
                                    appkey: _this3.TV_KEY,
                                    auth_code: auth_code,
                                    csrf: getCookie("bili_jct"),
                                    local_id: "0",
                                    ts: Date.now().toString()
                                }, _this3.TV_SEC)
                            }).then((function(res) {
                                !res.code && res.data ? (console.log("login success"), is_login = 1, _this3.doAuth(res.data.token_info), 
                                box.affirm()) : 86038 === res.code && box.affirm();
                            }));
                        }), 3e3);
                    }
                }));
            }
        }, {
            key: "loginWeb",
            value: function loginWeb() {
                var _this4 = this;
                this._login((function(res) {
                    if (res && !res.code) {
                        var _res$data2 = res.data, url = _res$data2.url, auth_code = _res$data2.auth_code;
                        _this4.auth_window = window.open(url);
                        var is_login = 0, timer = setInterval((function() {
                            if (!_this4.auth_window || _this4.auth_window.closed) return clearInterval(timer), 
                            _this4.auth_clicked = !1, void (is_login || Message_info("登陆失败！"));
                            _ajax({
                                url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/poll",
                                type: "POST",
                                data: _this4.makeAPIData({
                                    appkey: _this4.TV_KEY,
                                    auth_code: auth_code,
                                    csrf: getCookie("bili_jct"),
                                    local_id: "0",
                                    ts: Date.now().toString()
                                }, _this4.TV_SEC)
                            }).then((function(res) {
                                !res.code && res.data ? (console.log("login success"), _this4.doAuth(res.data.token_info), 
                                is_login = 1, _this4.auth_window.close()) : 86038 === res.code && _this4.auth_window.close();
                            }));
                        }), 3e3);
                    }
                }));
            }
        }, {
            key: "logout",
            value: function logout() {
                var _this5 = this;
                if (store.get("auth_id")) if (this.auth_clicked) Message_miaow(); else {
                    var _ref2 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref2[0], auth_sec = _ref2[1];
                    ajax({
                        url: "".concat(config_config.base_api, "/auth/?act=logout&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
                        type: "GET",
                        dataType: "json"
                    }).then((function(res) {
                        res.code ? Message_warning("注销失败") : (Message_success("注销成功"), store.set("auth_id", ""), 
                        store.set("auth_sec", ""), store.set("auth_time", "0"), store.set("access_key", ""), 
                        $("#auth").val("0"), config_config.auth = "0");
                    })).finally((function() {
                        return _this5.auth_clicked = !1;
                    }));
                } else MessageBox_alert("没有发现授权记录");
            }
        }, {
            key: "doAuth",
            value: function doAuth(param) {
                var _this6 = this;
                this.auth_window && !this.auth_window.closed && (this.auth_window.close(), this.auth_window = null);
                var _ref3 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref3[0], auth_sec = _ref3[1];
                ajax({
                    url: "".concat(config_config.base_api, "/auth/?act=login&").concat(Object.entries(_objectSpread({
                        auth_id: auth_id,
                        auth_sec: auth_sec
                    }, param)).map((function(e) {
                        return "".concat(e[0], "=").concat(e[1]);
                    })).join("&")),
                    type: "GET",
                    dataType: "json"
                }).then((function(res) {
                    res.code ? Message_warning("授权失败") : (Message_success("授权成功"), res.auth_id && res.auth_sec && (store.set("auth_id", res.auth_id), 
                    store.set("auth_sec", res.auth_sec)), store.set("access_key", param.access_token), 
                    store.set("auth_time", Date.now()), $("#auth").val("1"), config_config.auth = "1");
                })).finally((function() {
                    return _this6.auth_clicked = !1;
                }));
            }
        } ]), Auth;
    }(), auth = new Auth, more_style = "<style>.more{float:right;padding:1px;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.more:hover .more-ops-list{display:block}.more-ops-list{display:none;position:absolute;width:80px;left:-15px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> ", btn_list = {
        setting_btn: "脚本设置",
        bilibili_parse: "请求地址",
        video_download: "下载视频",
        video_download_2: "下载音频",
        video_download_all: "批量下载",
        more: {
            download_danmaku: "下载弹幕",
            download_subtitle: "下载字幕"
        }
    }, download_svg = '<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">\n        <path fill="#757575" d="M16.015,0C7.186,0,0.03,7.157,0.03,15.985 S7.186,31.97,16.015,31.97S32,24.814,32,15.985S24.843,0,16.015,0z"/>\n        <path style="fill:#FFFFFF;" d="M16.942,23.642H9.109C8.496,23.642,8,24.17,8,24.821v0C8,25.472,8.496,26,9.109,26h14.783 C24.504,26,25,25.472,25,24.821v0c0-0.651-0.496-1.179-1.109-1.179H16.942z"/>\n        <path style="fill:#FFFFFF;" d="M8.798,16.998l6.729,6.33c0.398,0.375,1.029,0.375,1.427,0l6.729-6.33 c0.666-0.627,0.212-1.726-0.714-1.726h-3.382c-0.568,0-1.028-0.449-1.028-1.003V8.003C18.56,7.449,18.099,7,17.532,7h-2.582 c-0.568,0-1.028,0.449-1.028,1.003v6.266c0,0.554-0.46,1.003-1.028,1.003H9.511C8.586,15.273,8.132,16.372,8.798,16.998z"/>\n    </svg>', svg_map = {
        setting_btn: '<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">\n        <path fill="#757575" style="stroke-miterlimit:10;" d="M16,29.5L16,29.5c-0.828,0-1.5-0.672-1.5-1.5V4c0-0.828,0.672-1.5,1.5-1.5h0 c0.828,0,1.5,0.672,1.5,1.5v24C17.5,28.828,16.828,29.5,16,29.5z"/>\n        <path fill="#757575" style="stroke-miterlimit:10;" d="M29.5,16L29.5,16c0,0.828-0.672,1.5-1.5,1.5H4c-0.828,0-1.5-0.672-1.5-1.5v0 c0-0.828,0.672-1.5,1.5-1.5h24C28.828,14.5,29.5,15.172,29.5,16z"/>\n    </svg>',
        bilibili_parse: '<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">\n        <path fill="#757575" d="M28.282,13.508c-0.623-6.932-6.627-12.036-13.41-11.399C8.947,2.665,4.254,7.465,3.716,13.521 c0.786,0.404,1.283,1.226,1.284,2.126v4.157c-0.023,0.565-0.49,1.004-1.043,0.98c-0.521-0.022-0.938-0.448-0.959-0.98v-4.157 c0-0.188-0.113-0.452-0.508-0.452s-0.492,0.275-0.492,0.452v8.176c0,2.446,1.94,4.428,4.333,4.428c0,0,0,0,0,0h7.191 c0.552-1.396,2.107-2.07,3.473-1.505s2.025,2.154,1.473,3.549c-0.552,1.396-2.107,2.07-3.473,1.505 c-0.67-0.277-1.202-0.82-1.473-1.505h-7.19c-3.497,0-6.332-2.897-6.333-6.471l0,0v-8.178c0-1.077,0.706-2.02,1.723-2.303C2.429,5.285,9.393-0.662,17.278,0.059c6.952,0.636,12.445,6.297,13.009,13.407c1.032,0.404,1.713,1.416,1.712,2.545v4.088 c-0.038,1.505-1.262,2.694-2.735,2.656c-1.42-0.037-2.562-1.205-2.599-2.656l0,0v-4.085C26.667,14.924,27.302,13.939,28.282,13.508zM11.334,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S12.439,14.653,11.334,14.653z M20.666,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S21.771,14.653,20.666,14.653z M13.629,21.805c-2.167,0-3.962-1.653-3.962-3.748c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022 c0,0.916,0.856,1.704,1.962,1.704c0.612,0.012,1.198-0.253,1.602-0.723c0.352-0.433,0.982-0.493,1.406-0.132 c0,0,0.001,0.001,0.001,0.001c0.047,0.039,0.09,0.083,0.128,0.131c0.404,0.47,0.99,0.734,1.602,0.723 c1.106,0,1.964-0.788,1.964-1.704c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022c0,2.095-1.797,3.748-3.964,3.748 c-0.844,0.003-1.67-0.256-2.368-0.742C15.302,21.55,14.475,21.809,13.629,21.805z M29.332,15.333c-0.368,0-0.666,0.305-0.666,0.68 v4.088c-0.001,0.376,0.297,0.681,0.665,0.681c0.368,0.001,0.666-0.304,0.666-0.679c0-0.001,0-0.001,0-0.002v-4.088 c0.002-0.374-0.293-0.678-0.659-0.68c-0.001,0-0.002,0-0.003,0H29.332z"/>\n    </svg>',
        video_download: download_svg,
        video_download_2: download_svg,
        video_download_all: download_svg
    };
    function make_toolbar_bangumi(main_class_name, sub_class_names) {
        var toolbar_elements = Object.keys(btn_list).map((function(key) {
            if ("more" === key) {
                var more_map = btn_list[key];
                return "" + '<div class="more">更多<div class="more-ops-list">\n                    <ul>'.concat(Object.keys(more_map).map((function(key) {
                    return function more_element(id, name) {
                        return '<li><span id="'.concat(id, '">').concat(name, "</span></li>");
                    }(key, more_map[key]);
                })).join(""), "</ul>\n                </div>");
            }
            return function list_element(id, class_names, svg, name) {
                return "" + '<div id="'.concat(id, '" mr-show="" class="').concat(class_names[0], '">\n                <span class="').concat(class_names[1], '">\n                    ').concat(svg, '\n                </span>\n                <span class="').concat(class_names[2], '">').concat(name, "</span>\n            </div>");
            }(key, sub_class_names, svg_map[key], btn_list[key]);
        })).join("");
        return "" + '<div class="'.concat(main_class_name, '">\n            ').concat(toolbar_elements, "\n            ").concat(more_style, "\n        </div>");
    }
    function main_slicedToArray(arr, i) {
        return function main_arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }(arr) || function main_iterableToArrayLimit(arr, i) {
            var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
            if (null == _i) return;
            var _s, _e, _arr = [], _n = !0, _d = !1;
            try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0) ;
            } catch (err) {
                _d = !0, _e = err;
            } finally {
                try {
                    _n || null == _i.return || _i.return();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }(arr, i) || function main_unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if ("string" == typeof o) return main_arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            "Object" === n && o.constructor && (n = o.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(o);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen);
        }(arr, i) || function main_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function main_arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function main_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var Main = function() {
        function Main() {
            !function main_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Main), console.log("\n".concat(" %c bilibili-parse-download.user.js v", "2.5.4", " ").concat("f05ab3a", " %c https://github.com/injahow/user.js ", "\n", "\n"), "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
        }
        return function main_createClass(Constructor, protoProps, staticProps) {
            return protoProps && main_defineProperties(Constructor.prototype, protoProps), staticProps && main_defineProperties(Constructor, staticProps), 
            Object.defineProperty(Constructor, "prototype", {
                writable: !1
            }), Constructor;
        }(Main, [ {
            key: "init",
            value: function init() {
                !function initToolbar() {
                    if ($("#arc_toolbar_report")[0]) $("#arc_toolbar_report").after('<div id="arc_toolbar_report_2" style="margin-top:16px" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true"> <div class="ops"> <span id="setting_btn"> <i class="van-icon-general_addto_s"></i>脚本设置 </span> <span id="bilibili_parse"> <i class="van-icon-floatwindow_custome"></i>请求地址 </span> <span id="video_download" style="display:none"> <i class="van-icon-download"></i>下载视频 </span> <span id="video_download_2" style="display:none"> <i class="van-icon-download"></i>下载音频 </span> <span id="video_download_all"> <i class="van-icon-download"></i>批量下载 </span> </div> <div class="more"> <i class="van-icon-general_moreactions"></i> <div class="more-ops-list"> <ul> <li><span id="download_danmaku">下载弹幕</span></li> <li><span id="download_subtitle">下载字幕</span></li> </ul> </div> </div> </div> '); else if ($("#toolbar_module")[0]) $("#toolbar_module").after('<div id="toolbar_module_2" class="tool-bar clearfix report-wrap-module report-scroll-module media-info" scrollshow="true"> <div id="setting_btn" class="like-info"> <i class="iconfont icon-add"></i><span>脚本设置</span> </div> <div id="bilibili_parse" class="like-info"> <i class="iconfont icon-customer-serv"></i><span>请求地址</span> </div> <div id="video_download" class="like-info" style="display:none"> <i class="iconfont icon-download"></i><span>下载视频</span> </div> <div id="video_download_2" class="like-info" style="display:none"> <i class="iconfont icon-download"></i><span>下载音频</span> </div> <div id="video_download_all" class="like-info"> <i class="iconfont icon-download"></i><span>批量下载</span> </div> <div class="more">更多<div class="more-ops-list"> <ul> <li><span id="download_danmaku">下载弹幕</span></li> <li><span id="download_subtitle">下载字幕</span></li> </ul> </div> </div> <style>.tool-bar .more{float:right;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.tool-bar .more:hover .more-ops-list{display:block}.tool-bar:after{display:block;content:"";clear:both}.more-ops-list{display:none;position:absolute;width:80px;left:-65px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> </div> '); else if ($("div.video-toolbar")[0]) $("div.video-toolbar").after('<div id="arc_toolbar_report_2" style="margin-top:16px" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true"> <div class="ops"> <span id="setting_btn"> <i class="van-icon-general_addto_s"></i>脚本设置 </span> <span id="bilibili_parse"> <i class="van-icon-floatwindow_custome"></i>请求地址 </span> <span id="video_download" style="display:none"> <i class="van-icon-download"></i>下载视频 </span> <span id="video_download_2" style="display:none"> <i class="van-icon-download"></i>下载音频 </span> <span id="video_download_all"> <i class="van-icon-download"></i>批量下载 </span> </div> <div class="more"> <i class="van-icon-general_moreactions"></i> <div class="more-ops-list"> <ul class="more-ops-list-box"> <li class="more-ops-list-box-li"> <span id="download_danmaku">下载弹幕</span> </li> <li class="more-ops-list-box-li"> <span id="download_subtitle">下载字幕</span> </li> </ul> </div> </div> </div> '); else if ($("#playlistToolbar")[0]) {
                        var toolbar_obj = $("#playlistToolbar"), toolbar_obj_2 = toolbar_obj.clone();
                        toolbar_obj_2.attr("id", "playlistToolbar_2");
                        var left = toolbar_obj_2.find(".video-toolbar-left"), right = toolbar_obj_2.find(".video-toolbar-right");
                        left.children().remove(), right.children().remove(), Object.keys(btn_list).map((function(key) {
                            if ("more" !== key) {
                                var item = toolbar_obj.find(".toolbar-left-item-wrap").eq(0).clone();
                                item.attr("id", key);
                                var svg = svg_map[key].replaceAll("#757575", "currentColor").replace("class", 'class="'.concat(item.find("svg").attr("class"), '"')), span = item.find("span").text(btn_list[key]), item_div = item.find("div").eq(0);
                                item_div.attr("title", btn_list[key]), item_div.removeClass("on"), item_div.children().remove(), 
                                item_div.append(svg).append(span), left.append(item);
                            } else {
                                var more_map = btn_list[key], el = "" + '<div class="more">更多<div class="more-ops-list">\n                        <ul>'.concat(Object.keys(more_map).map((function(key) {
                                    return '<li><span id="'.concat(key, '">').concat(more_map[key], "</span></li>");
                                })).join(""), "</ul>\n                    </div>");
                                right.append(el + more_style);
                            }
                        })), toolbar_obj.after(toolbar_obj_2);
                    } else if ($(".player-left-components")[0]) {
                        var _toolbar_obj = $(".player-left-components").children().eq(0), toolbar_class = _toolbar_obj.attr("class"), span_class = _toolbar_obj.children().eq(0).attr("class"), span_class_svg = _toolbar_obj.children().eq(0).children().eq(0).attr("class"), span_class_text = _toolbar_obj.children().eq(0).children().eq(1).attr("class");
                        _toolbar_obj.after(make_toolbar_bangumi(toolbar_class, [ span_class, span_class_svg, span_class_text ]));
                    } else if ($(".edu-play-left")[0]) {
                        var _toolbar_obj2 = $(".edu-play-left").children().eq(1), _toolbar_class = _toolbar_obj2.attr("class"), _span_class = _toolbar_obj2.children().eq(0).attr("class"), _span_class_svg = _toolbar_obj2.children().eq(0).children().eq(0).attr("class"), _span_class_text = _toolbar_obj2.children().eq(0).children().eq(1).attr("class");
                        _toolbar_obj2.after(make_toolbar_bangumi(_toolbar_class, [ _span_class, _span_class_svg, _span_class_text ]));
                    }
                }();
                var root_div = document.createElement("div");
                root_div.id = "bp_root", document.body.append(root_div), function initConfig(el) {
                    var options = '<option value="0">关闭</option>';
                    for (var k in hostMap) options += '<option value="'.concat(k, '">').concat(hostMap[k], "</option>");
                    for (var _k in config = config.replace("{{host_key_options}}", options), options = '<option value="0">与播放器相同</option>', 
                    videoQualityMap) options += '<option value="'.concat(_k, '">').concat(videoQualityMap[_k], "</option>");
                    config = config.replace("{{video_quality_options}}", options), el && $(el)[0] ? $(el).append(config) : $("body").append(config);
                    var config_str = store.get("config_str");
                    if (config_str) try {
                        var old_config = JSON.parse(config_str);
                        for (var key in old_config) Object.hasOwnProperty.call(config_config, key) && (config_config[key] = old_config[key]);
                    } catch (_unused) {
                        console.log("初始化脚本配置");
                    }
                    config_config.auth = store.get("auth_id") && store.get("auth_sec") ? "1" : "0", 
                    store.set("config_str", JSON.stringify(config_config));
                    var _loop = function _loop(_key2) {
                        if ("auth" === _key2) return "continue";
                        $("#".concat(_key2)).on("input", (function(e) {
                            config_config[_key2] = e.delegateTarget.value;
                        }));
                    };
                    for (var _key2 in config_config) _loop(_key2);
                    for (var _k2 in config_functions) {
                        var e = $("#".concat(_k2))[0];
                        e && (e.onclick = config_functions[_k2]);
                    }
                    for (var _key3 in config_config) $("#".concat(_key3)).val(config_config[_key3]);
                    window.onbeforeunload = function() {
                        var bp_aria2_window = window.bp_aria2_window;
                        bp_aria2_window && !bp_aria2_window.closed && bp_aria2_window.close();
                    };
                }("#".concat(root_div.id)), function initMessage(el) {
                    el && $(el)[0] ? $(el).append(message) : $("body").append(message);
                }("#".concat(root_div.id)), user.lazyInit(), auth.checkLoginStatus(), check.refresh(), 
                $("#".concat(root_div.id)).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">'), 
                $("#".concat(root_div.id)).append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>'), 
                $("#".concat(root_div.id)).append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
            }
        }, {
            key: "run",
            value: function run() {
                var api_url, api_url_temp;
                this.init();
                var evt = {
                    setting_btn: function setting_btn() {
                        for (var key in user.lazyInit(!0), config_config) $("#".concat(key)).val(config_config[key]);
                        $("#bp_config").show(), $("#bp_config").animate({
                            opacity: "1"
                        }, 300), scroll_scroll.hide();
                    },
                    bilibili_parse: function bilibili_parse() {
                        user.lazyInit(!0);
                        var vb = video.base(), _ref = [ vb.type(), vb.aid(), vb.p(), vb.cid(), vb.epid() ], type = _ref[0], aid = _ref[1], p = _ref[2], cid = _ref[3], epid = _ref[4], q = video.get_quality().q;
                        api_url = "".concat(config_config.base_api, "?av=").concat(aid, "&p=").concat(p, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(config_config.format, "&otype=json&_host=").concat(config_config.host_key, "&_req=").concat(config_config.request_type, "&_q=").concat(config_config.video_quality);
                        var _ref2 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref2[0], auth_sec = _ref2[1];
                        if ("1" === config_config.auth && auth_id && auth_sec && (api_url += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec)), 
                        api_url !== api_url_temp || "local" === config_config.request_type) $("#video_url").attr("href", "#"), 
                        $("#video_url_2").attr("href", "#"), api_url_temp = api_url, Message_info("开始请求"), 
                        api.get_url((function(res) {
                            if (res && !res.code) {
                                var _url, _url_;
                                if (Message_success("请求成功"), res.times && Message_info("剩余请求次数：".concat(res.times)), 
                                res.url) _url = res.url.replace("http://", "https://"), _url_ = "#"; else {
                                    if (!res.video || !res.audio) return void Message_warning("数据错误");
                                    _url = res.video.replace("http://", "https://"), _url_ = res.audio.replace("http://", "https://");
                                }
                                $("#video_url").attr("href", _url), $("#video_url").attr("download", vb.filename() + Download.url_format(_url)), 
                                $("#video_download").show(), "#" !== _url_ && ($("#video_url_2").attr("href", _url_), 
                                $("#video_url_2").attr("download", vb.filename() + "_audio.mp4"), $("#video_download_2").show()), 
                                (user.needReplace() || vb.isLimited() || "1" === config_config.replace_force) && player.replace_player(_url, _url_), 
                                "1" === config_config.auto_download && $("#video_download").click();
                            }
                        })); else {
                            Message_miaow();
                            var url = $("#video_url").attr("href"), url_2 = $("#video_url_2").attr("href");
                            url && "#" !== url && ($("#video_download").show(), "dash" === config_config.format && $("#video_download_2").show(), 
                            (user.needReplace() || vb.isLimited() || "1" === config_config.replace_force) && !$("#bp_dplayer")[0] && player.replace_player(url, url_2), 
                            "1" === config_config.auto_download && $("#video_download").click());
                        }
                    },
                    download_danmaku: function download_danmaku() {
                        var vb = video.base();
                        Download.download_danmaku_ass(vb.cid(), vb.filename());
                    },
                    download_subtitle: function download_subtitle() {
                        Download.download_subtitle_vtt(0, video.base().filename());
                    },
                    video_download_all: function video_download_all() {
                        user.lazyInit(!0), store.get("auth_id") && store.get("auth_sec") ? "rpc" === config_config.download_type ? Download.download_all() : MessageBox_confirm("仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？", (function() {
                            Download.download_all();
                        })) : MessageBox_confirm("批量下载仅支持授权用户使用RPC接口下载，是否进行授权？", (function() {
                            auth.login();
                        }));
                    },
                    video_download: function video_download() {
                        var type = config_config.download_type;
                        if ("web" === type) $("#video_url")[0].click(); else if ("a" === type) {
                            var _ref3 = [ $("#video_url").attr("href"), $("#video_url_2").attr("href"), $("#video_url").attr("download"), $("#video_url_2").attr("download") ], video_url_2 = _ref3[1], file_name = _ref3[2], file_name_2 = _ref3[3], msg = "建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>" + '<a href="'.concat(_ref3[0], '" download="').concat(file_name, '" target="_blank" style="text-decoration:underline;">&gt视频地址&lt</a><br/><br/>') + ("dash" === config_config.format ? '<a href="'.concat(video_url_2, '" download="').concat(file_name_2, '" target="_blank" style="text-decoration:underline;">&gt音频地址&lt</a>') : "");
                            MessageBox_alert(msg);
                        } else if ("aria" === type) {
                            var _ref4 = [ $("#video_url").attr("href"), $("#video_url_2").attr("href") ], _video_url = _ref4[0], _video_url_ = _ref4[1], video_title = video.base().filename(), _file_name = video_title + Download.url_format(_video_url), _file_name_ = video_title + ".m4a", aria2c_header = '--header "User-Agent: '.concat(window.navigator.userAgent, '" --header "Referer: ').concat(window.location.href, '"'), _ref6 = main_slicedToArray({
                                min: [ 1, 5 ],
                                mid: [ 16, 8 ],
                                max: [ 32, 16 ]
                            }[config_config.aria2c_connection_level] || [ 1, 5 ], 2), url_max_connection = _ref6[0], server_max_connection = _ref6[1], aria2c_max_connection_parameters = "--max-concurrent-downloads ".concat(url_max_connection, " --max-connection-per-server ").concat(server_max_connection), _map = [ 'aria2c "'.concat(_video_url, '" --out "').concat(_file_name, '"'), 'aria2c "'.concat(_video_url_, '" --out "').concat(_file_name_, '"') ].map((function(code) {
                                return "".concat(code, " ").concat(aria2c_header, " ").concat(aria2c_max_connection_parameters, " ").concat(config_config.aria2c_addition_parameters);
                            })), _map2 = main_slicedToArray(_map, 2), code = _map2[0], code_2 = _map2[1], _msg = "点击文本框即可复制下载命令！<br/><br/>" + '视频：<br/><input id="aria2_code" value=\''.concat(code, '\' onclick="bp_clip_btn(\'aria2_code\')" style="width:100%;"></br></br>') + ("dash" === config_config.format ? '音频：<br/><input id="aria2_code_2" value=\''.concat(code_2, '\' onclick="bp_clip_btn(\'aria2_code_2\')" style="width:100%;"><br/><br/>') + '全部：<br/><textarea id="aria2_code_all" onclick="bp_clip_btn(\'aria2_code_all\')" style="min-width:100%;max-width:100%;min-height:100px;max-height:100px;">'.concat(code, "\n").concat(code_2, "</textarea>") : "");
                            !window.bp_clip_btn && (window.bp_clip_btn = function(id) {
                                $("#".concat(id)).select(), document.execCommand("copy") ? Message_success("复制成功") : Message_warning("复制失败");
                            }), MessageBox_alert(_msg);
                        } else {
                            var url = $("#video_url").attr("href"), filename = video.base().filename() + Download.url_format(url);
                            Download.download(url, filename, type);
                        }
                    },
                    video_download_2: function video_download_2() {
                        var type = config_config.download_type;
                        if ("web" === type) $("#video_url_2")[0].click(); else if ("a" === type) $("#video_download").click(); else if ("aria" === type) $("#video_download").click(); else {
                            var url = $("#video_url_2").attr("href"), filename = video.base().filename() + ".m4a";
                            Download.download(url, filename, type);
                        }
                    }
                };
                window.bpd = evt, Object.entries(evt).forEach((function(_ref7) {
                    var _ref8 = main_slicedToArray(_ref7, 2), k = _ref8[0], v = _ref8[1];
                    return $("body").on("click", "#".concat(k), v);
                })), $("body").on("click", "a.router-link-active", (function() {
                    this !== $('li[class="on"]').find("a")[0] && check.refresh();
                })), $("body").on("click", "li.ep-item", (function() {
                    check.refresh();
                })), $("body").on("click", "button.bilibili-player-iconfont-next", (function() {
                    check.refresh();
                }));
                var bili_video_tag = player.bili_video_tag();
                $(bili_video_tag)[0] && ($(bili_video_tag)[0].onended = function() {
                    check.refresh();
                }), $("body").on("click", "li.bui-select-item", (function() {
                    check.refresh();
                })), setInterval((function() {
                    (check.q !== video.get_quality().q || "cheese" === video.type() && check.epid !== video.base().epid()) && check.refresh();
                }), 1e3), $("body").on("click", ".rec-list", (function() {
                    check.refresh();
                })), $("body").on("click", ".bilibili-player-ending-panel-box-videos", (function() {
                    check.refresh();
                })), setInterval((function() {
                    var vb = video.base();
                    check.aid === vb.aid() && check.cid === vb.cid() || check.refresh();
                }), 3e3);
            }
        } ]), Main;
    }(), main = Main;
    window.bp_fun_locked || (window.bp_fun_locked = !0, null == location.href.match(/^https:\/\/www\.mcbbs\.net\/template\/mcbbs\/image\/special_photo_bg\.png/) ? $(".error-text")[0] || setTimeout((function() {
        (new main).run();
    }), 3e3) : location.href.match("access_key") && window !== window.opener && (window.stop(), 
    window.opener.postMessage("bilibili-parse-login-credentials: " + location.href, "*")));
}();