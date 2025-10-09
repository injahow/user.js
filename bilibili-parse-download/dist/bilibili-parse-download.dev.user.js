// ==UserScript==
// @name          bilibili视频下载(dev)
// @namespace     https://github.com/injahow
// @version       0.0.1
// @description   bilibili视频下载(dev)
// @author        injahow
// @copyright     2021, injahow (https://github.com/injahow)
// @license       MIT
// @source        https://github.com/injahow/user.js
// @supportURL    https://github.com/injahow/user.js/issues
// @downloadURL   https://unpkg.com/bpd-user-js
// @updateURL     https://unpkg.com/bpd-user-js
// @match         *://www.bilibili.com/video/av*
// @match         *://www.bilibili.com/video/BV*
// @match         *://www.bilibili.com/list/*
// @match         *://www.bilibili.com/festival/*
// @match         *://www.bilibili.com/bangumi/play/ep*
// @match         *://www.bilibili.com/bangumi/play/ss*
// @match         *://www.bilibili.com/cheese/play/ep*
// @match         *://www.bilibili.com/cheese/play/ss*
// @require       https://static.hdslb.com/js/jquery.min.js
// @icon          https://static.hdslb.com/images/favicon.ico
// @grant         none
// ==/UserScript==
// @[ source codes in local repo ]
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/*!**************************************!*\
  !*** ./src/js/index.js + 25 modules ***!
  \**************************************/

;// ./src/js/user.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var User = /*#__PURE__*/function () {
  function User() {
    _classCallCheck(this, User);
    this.is_login = false;
    this.vip_status = 0;
    this.mid = '';
    this.uname = '';
    this.has_init = false;
    this.lazyInit();
  }
  _createClass(User, [{
    key: "needReplace",
    value: function needReplace() {
      return !this.is_login || !this.vip_status && video.base().needVip();
    }
  }, {
    key: "isVIP",
    value: function isVIP() {
      return this.vip_status === 1;
    }
  }, {
    key: "lazyInit",
    value: function lazyInit(last_init) {
      if (!this.has_init) {
        if (window.__BILI_USER_INFO__) {
          this.is_login = window.__BILI_USER_INFO__.isLogin;
          this.vip_status = window.__BILI_USER_INFO__.vipStatus;
          this.mid = window.__BILI_USER_INFO__.mid || '';
          this.uname = window.__BILI_USER_INFO__.uname || '';
        } else if (window.__BiliUser__) {
          this.is_login = window.__BiliUser__.isLogin;
          if (window.__BiliUser__.cache) {
            this.vip_status = window.__BiliUser__.cache.data.vipStatus;
            this.mid = window.__BiliUser__.cache.data.mid || '';
            this.uname = window.__BiliUser__.cache.data.uname || '';
          } else {
            this.vip_status = 0;
            this.mid = '';
            this.uname = '';
          }
        }
        this.has_init = last_init;
      }
    }
  }]);
  return User;
}();
var user = new User();
;// ./src/js/utils/cache.js
function cache_typeof(o) { "@babel/helpers - typeof"; return cache_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, cache_typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function cache_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function cache_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, cache_toPropertyKey(o.key), o); } }
function cache_createClass(e, r, t) { return r && cache_defineProperties(e.prototype, r), t && cache_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = cache_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function cache_toPropertyKey(t) { var i = cache_toPrimitive(t, "string"); return "symbol" == cache_typeof(i) ? i : i + ""; }
function cache_toPrimitive(t, r) { if ("object" != cache_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != cache_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CacheFactory = /*#__PURE__*/function () {
  function CacheFactory() {
    cache_classCallCheck(this, CacheFactory);
  }
  cache_createClass(CacheFactory, null, [{
    key: "get",
    value: function get() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var cache = new Cache(); // for code
      if (CacheFactory.map[name] instanceof Cache) {
        cache = CacheFactory.map[name];
      } else {
        CacheFactory.map[name] = cache;
      }
      return cache;
    }
  }, {
    key: "setValue",
    value: function setValue() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 ? arguments[1] : undefined;
      var _key$split = key.split('.', 2),
        _key$split2 = _slicedToArray(_key$split, 2),
        cacheName = _key$split2[0],
        cacheKey = _key$split2[1];
      if (!cacheName || !cacheKey) {
        return;
      }
      var cache = CacheFactory.get(cacheName);
      if (cache instanceof Cache) {
        cache.set(cacheKey, value);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _key$split3 = key.split('.', 2),
        _key$split4 = _slicedToArray(_key$split3, 2),
        cacheName = _key$split4[0],
        cacheKey = _key$split4[1];
      if (!cacheName || !cacheKey) {
        return null;
      }
      var cache = CacheFactory.get(cacheName);
      if (cache instanceof Cache) {
        return cache.get(cacheKey);
      }
    }
  }, {
    key: "clear",
    value: function clear(name) {
      if (name) {
        var cache = CacheFactory.map[name];
        if (cache) {
          cache.clear();
        }
      } else {
        CacheFactory.map = {};
      }
    }
  }]);
  return CacheFactory;
}();
_defineProperty(CacheFactory, "map", {});
var Cache = /*#__PURE__*/function () {
  function Cache() {
    cache_classCallCheck(this, Cache);
    this.data = {};
  }
  cache_createClass(Cache, [{
    key: "get",
    value: function get() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.data[key];
    }
  }, {
    key: "set",
    value: function set() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 ? arguments[1] : undefined;
      this.data[key] = value;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.data = {};
    }
  }]);
  return Cache;
}();
/* harmony default export */ var cache = (CacheFactory);
;// ./src/js/ui/scroll.js
function show_scroll() {
  if ($('div#bp_config').is(':hidden') && $('div#message_box').is(':hidden')) {
    $('body').css('overflow', 'auto');
  }
}
function hide_scroll() {
  $('body').css('overflow', 'hidden');
}
var scroll_scroll = {
  show: show_scroll,
  hide: hide_scroll
};
;// ./src/html/message.html
// Module
var code = "<div class=\"message-bg\"></div> <div id=\"message_box\"> <div class=\"message-box-mark\"></div> <div class=\"message-box-bg\"> <span style=\"font-size:20px\"><b>提示：</b></span> <div id=\"message_box_context\" style=\"margin:2% 0\">...</div><br/><br/> <div class=\"message-box-btn\"> <button name=\"affirm\">确定</button> <button name=\"cancel\">取消</button> </div> </div> </div> <style>.message-bg{position:fixed;float:right;right:0;top:2%;z-index:30000}.message{margin-bottom:15px;padding:2% 2%;width:300px;display:flex;margin-top:-70px;opacity:0}.message-success{background-color:#dfd;border-left:6px solid #4caf50}.message-error{background-color:#fdd;border-left:6px solid #f44336}.message-info{background-color:#e7f3fe;border-left:6px solid #0c86de}.message-warning{background-color:#ffc;border-left:6px solid #ffeb3b}.message-context{font-size:21px;word-wrap:break-word;word-break:break-all}.message-context p{margin:0}#message_box{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:20000}.message-box-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;z-index:20001}.message-box-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:20000}.message-box-btn{text-align:right}.message-box-btn button{margin:0 5px;width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}.message-box-btn button:hover{background:#59f}</style> ";
// Exports
/* harmony default export */ var message = (code);
;// ./src/js/ui/message.js


function initMessage(el) {
  if (el && !!$(el)[0]) {
    $(el).append(message);
    return;
  }
  $('body').append(message);
}
function messageBox(ctx, type) {
  if (type === 'confirm') {
    $('.message-box-btn button[name="cancel"]').show();
  } else if (type === 'alert') {
    $('.message-box-btn button[name="cancel"]').hide();
  }
  if (ctx.html) {
    $('#message_box_context').html("<div style=\"font-size:18px\">".concat(ctx.html, "</div>"));
  } else {
    $('#message_box_context').html('<div style="font-size:18px">╰(￣▽￣)╮</div>');
  }
  scroll_scroll.hide();
  $('#message_box').show();
  $('#message_box').animate({
    'opacity': '1'
  }, 300);
  var option = {
    affirm: function affirm() {
      $('#message_box').hide();
      $('#message_box').css('opacity', 0);
      scroll_scroll.show();
      if (ctx.callback && ctx.callback.affirm) {
        ctx.callback.affirm();
      }
    },
    cancel: function cancel() {
      $('#message_box').hide();
      $('#message_box').css('opacity', 0);
      scroll_scroll.show();
      if (ctx.callback && ctx.callback.cancel) {
        ctx.callback.cancel();
      }
    }
  };
  $('.message-box-btn button[name="affirm"]')[0].onclick = option.affirm;
  $('.message-box-btn button[name="cancel"]')[0].onclick = option.cancel;
  return option;
}
var id = 0;
function message_message(html, type) {
  console.info("[Message] ".concat(type, " : ").concat(html));
  id += 1;
  messageEnQueue("<div id=\"message_".concat(id, "\" class=\"message message-").concat(type, "\"><div class=\"message-context\"><p><strong>").concat(type, "\uFF1A</strong></p><p>").concat(html, "</p></div></div>"), id);
  messageDeQueue(id, 3);
}
function messageEnQueue(message, id) {
  $('.message-bg').append(message);
  $("#message_".concat(id)).animate({
    'margin-top': '+=70px',
    'opacity': '1'
  }, 300);
}
function messageDeQueue(id) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  setTimeout(function () {
    var e = "div#message_".concat(id);
    $(e).animate({
      'margin-top': '-=70px',
      'opacity': '0'
    }, 300, function () {
      $(e).remove();
    });
  }, time * 1000);
}
var message_Message = {
  success: function success(html) {
    return message_message(html, 'success');
  },
  warning: function warning(html) {
    return message_message(html, 'warning');
  },
  error: function error(html) {
    return message_message(html, 'error');
  },
  info: function info(html) {
    return message_message(html, 'info');
  },
  miaow: function miaow() {
    return message_message('(^・ω・^)~喵喵喵~', 'info');
  }
};
var MessageBox = {
  alert: function alert(html, affirm) {
    return messageBox({
      html: html,
      callback: {
        affirm: affirm
      }
    }, 'alert');
  },
  confirm: function confirm(html, affirm, cancel) {
    return messageBox({
      html: html,
      callback: {
        affirm: affirm,
        cancel: cancel
      }
    }, 'confirm');
  }
};

;// ./src/js/utils/ajax.js

function ajax(obj) {
  return new Promise(function (resolve, reject) {
    // set obj.success & obj.error
    obj.success = function (res) {
      if (res && res.code) {
        message_Message.warning("".concat(res.message || "CODE:".concat(res.code)));
        // todo
      }
      resolve(res);
    };
    obj.error = function (err) {
      message_Message.error('网络异常');
      reject(err);
    };
    $.ajax(obj);
  });
}
function _ajax(obj) {
  return new Promise(function (resolve, reject) {
    var _success = obj.success;
    obj.success = function (res) {
      resolve(_success ? _success(res) : res);
    };
    var _error = obj.error;
    obj.error = function (res) {
      reject(_error ? _error(res) : res);
    };
    $.ajax(obj);
  });
}

;// ./src/js/utils/video-base.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || video_base_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return video_base_arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = video_base_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function video_base_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return video_base_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? video_base_arrayLikeToArray(r, a) : void 0; } }
function video_base_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == video_base_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function video_base_typeof(o) { "@babel/helpers - typeof"; return video_base_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, video_base_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { video_base_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function video_base_defineProperty(e, r, t) { return (r = video_base_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function video_base_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function video_base_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, video_base_toPropertyKey(o.key), o); } }
function video_base_createClass(e, r, t) { return r && video_base_defineProperties(e.prototype, r), t && video_base_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function video_base_toPropertyKey(t) { var i = video_base_toPrimitive(t, "string"); return "symbol" == video_base_typeof(i) ? i : i + ""; }
function video_base_toPrimitive(t, r) { if ("object" != video_base_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != video_base_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var clazzMap = {};
var VideoBase = /*#__PURE__*/function () {
  function VideoBase(video_type, main_title, state) {
    video_base_classCallCheck(this, VideoBase);
    if (!(this.constructor.name in clazzMap)) {
      clazzMap[this.constructor.name] = this.constructor;
    }
    this.video_type = video_type || 'video';
    this.main_title = main_title || '';
    this.state = state;
    // ! state.p
    this.page = state && parseInt(state.p) || 1;
  }
  video_base_createClass(VideoBase, [{
    key: "getVideo",
    value: function getVideo(p) {
      var _this = this;
      var prop = {
        p: p,
        id: 0,
        title: '',
        filename: '',
        aid: 0,
        bvid: '',
        cid: 0,
        epid: 0,
        needVip: false,
        vipNeedPay: false,
        isLimited: false
      };
      var clazz = clazzMap[this.constructor.name];
      prop = _objectSpread(_objectSpread({}, prop), Object.fromEntries(Object.getOwnPropertyNames(VideoBase.prototype).filter(function (key) {
        return key in prop;
      }).map(function (key) {
        return [key, clazz.prototype[key].call(_this, p)];
      })));
      return prop;
    }
  }, {
    key: "type",
    value: function type() {
      return this.video_type;
    }

    // 总体标题
  }, {
    key: "getName",
    value: function getName() {
      return this.main_title || '';
    }
  }, {
    key: "getFilename",
    value: function getFilename() {
      return this.getName().replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "p",
    value: function p(_p) {
      _p = parseInt(_p) || 0;
      return _p > 0 && _p <= this.total() ? _p : this.page;
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
    value: function title(p) {
      return '';
    }
  }, {
    key: "filename",
    value: function filename(p) {
      return '';
    }
  }, {
    key: "aid",
    value: function aid(p) {
      return 0;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      return '';
    }
  }, {
    key: "cid",
    value: function cid(p) {
      return 0;
    }
  }, {
    key: "epid",
    value: function epid(p) {
      return '';
    }
  }, {
    key: "needVip",
    value: function needVip(p) {
      return false;
    }
  }, {
    key: "vipNeedPay",
    value: function vipNeedPay(p) {
      return false;
    }
  }, {
    key: "isLimited",
    value: function isLimited(p) {
      return false;
    }
  }]);
  return VideoBase;
}();
var Video = /*#__PURE__*/function (_VideoBase) {
  _inherits(Video, _VideoBase);
  var _super = _createSuper(Video);
  function Video(main_title, state) {
    var _state$sectionsInfo;
    var _this2;
    video_base_classCallCheck(this, Video);
    _this2 = _super.call(this, 'video', main_title, state);
    _this2.video_list = [];
    _this2.epList = [];
    var sections = state.sections || ((_state$sectionsInfo = state.sectionsInfo) === null || _state$sectionsInfo === void 0 ? void 0 : _state$sectionsInfo.sections) || [];
    if (!sections.length) {
      return _possibleConstructorReturn(_this2);
    }
    var new_page = 0;
    // 集合视频
    var _iterator = _createForOfIteratorHelper(sections),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var section = _step.value;
        // 多节
        var eplist = section.episodes || [];
        var _iterator2 = _createForOfIteratorHelper(eplist),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var video = _step2.value;
            // 剧集
            var i = 0,
              length = video.pages && video.pages.length || 0;
            while (i < length) {
              // 最小单元 - pages >= 1
              var _video = Object.assign({}, video);
              _video.title = video.title + (length > 1 ? " P".concat(i + 1, " ").concat(video.pages[i].part) : '');
              _video.cid = video.pages[i].cid || 0;
              _this2.video_list.push(_video);
              i++;
            }
            _this2.epList.push(video);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      // todo
      // 集合视频残留
      // if (new_page < 1) {
      //     this.video_list = []
      // }
      // 单剧集 this.epList.length = 1 , page = state.p
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _this2;
  }
  video_base_createClass(Video, [{
    key: "total",
    value: function total() {
      if (this.epList.length > 1) {
        return this.video_list.length;
      }
      return this.state.videoData.pages.length;
    }
  }, {
    key: "title",
    value: function title(p) {
      if (this.epList.length > 1 && p) {
        return this.video_list[this.id(p)].title;
      }
      return this.state.videoData.pages[this.id(p)].part;
    }
  }, {
    key: "filename",
    value: function filename(p) {
      if (this.epList.length > 1 && p) {
        return this.title(p).replace(/[\/\\:*?"<>|]+/g, '');
      }
      var id = this.id(p);
      var pages = this.state.videoData.pages;
      var title = this.main_title + (pages && pages.length > 1 ? " P".concat(id + 1, " ").concat(pages[id].part || '') : '');
      return title.replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "getName",
    value: function getName() {
      if (this.epList.length > 1) {
        // 集合视频
        return this.state.sectionsInfo.title;
      }
      return _get(_getPrototypeOf(Video.prototype), "getName", this).call(this);
    }
  }, {
    key: "aid",
    value: function aid(p) {
      if (this.epList.length > 1 && p) {
        return this.video_list[this.id(p)].aid;
      }
      return this.state.videoData.aid;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      if (this.epList.length > 1 && p) {
        return this.video_list[this.id(p)].bvid;
      }
      return this.state.videoData.bvid;
    }
  }, {
    key: "cid",
    value: function cid(p) {
      if (this.epList.length > 1 && p) {
        return this.video_list[this.id(p)].cid;
      }
      return this.state.videoData.pages[this.id(p)].cid;
    }
  }]);
  return Video;
}(VideoBase);
var VideoList = /*#__PURE__*/function (_VideoBase2) {
  _inherits(VideoList, _VideoBase2);
  var _super2 = _createSuper(VideoList);
  function VideoList(main_title, state) {
    var _this3;
    video_base_classCallCheck(this, VideoList);
    _this3 = _super2.call(this, 'video', main_title, state);
    _this3.video = new Video(state.videoData.title, state);
    var resourceList = state.resourceList || [];
    var video_list = [];
    var _iterator3 = _createForOfIteratorHelper(resourceList),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var video = _step3.value;
        var i = 0,
          length = video.pages && video.pages.length || 0;
        while (i < length) {
          var _video = Object.assign({}, video);
          _video.title = video.title + (length > 1 ? " P".concat(i + 1, " ").concat(video.pages[i].title) : '');
          _video.cid = video.pages[i].cid || 0;
          video_list.push(_video);
          i++;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    _this3.video_list = video_list;
    return _this3;
  }
  video_base_createClass(VideoList, [{
    key: "total",
    value: function total() {
      return this.video_list.length;
    }
  }, {
    key: "title",
    value: function title(p) {
      return !p ? this.video.title() : this.video_list[this.id(p)].title;
    }
  }, {
    key: "filename",
    value: function filename(p) {
      if (!p) {
        return this.video.filename();
      }
      var id = this.id(p);
      var title = this.main_title + (this.total() > 1 ? " P".concat(id + 1, " ").concat(this.video_list[id].title) : '');
      return title.replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "aid",
    value: function aid(p) {
      return !p ? this.video.aid() : this.video_list[this.id(p)].aid;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      return !p ? this.video.bvid() : this.video_list[this.id(p)].bvid;
    }
  }, {
    key: "cid",
    value: function cid(p) {
      return !p ? this.video.cid() : this.video_list[this.id(p)].cid;
    }
  }]);
  return VideoList;
}(VideoBase);
var VideoFestival = /*#__PURE__*/function (_VideoBase3) {
  _inherits(VideoFestival, _VideoBase3);
  var _super3 = _createSuper(VideoFestival);
  function VideoFestival(main_title, state) {
    var _this4;
    video_base_classCallCheck(this, VideoFestival);
    _this4 = _super3.call(this, 'video', main_title, state);
    _this4.video_info = state.videoInfo;
    _this4.video_list = state.sectionEpisodes || [];
    return _this4;
  }
  video_base_createClass(VideoFestival, [{
    key: "total",
    value: function total() {
      return this.video_list.length;
    }
  }, {
    key: "title",
    value: function title(p) {
      return !p ? this.video_info.title : this.video_list[this.id(p)].title;
    }
  }, {
    key: "filename",
    value: function filename(p) {
      var title;
      if (!p) {
        title = this.video_info.title;
      } else {
        var id = this.id(p);
        title = this.main_title + (this.total() > 1 ? " P".concat(id + 1, " ").concat(this.video_list[id].title) : '');
      }
      return title.replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "aid",
    value: function aid(p) {
      return !p ? this.video_info.aid : this.video_list[this.id(p)].id;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      return !p ? this.video_info.bvid : this.video_list[this.id(p)].bvid;
    }
  }, {
    key: "cid",
    value: function cid(p) {
      return !p ? this.video_info.cid : this.video_list[this.id(p)].cid;
    }
  }]);
  return VideoFestival;
}(VideoBase);
var Bangumi = /*#__PURE__*/function (_VideoBase4) {
  _inherits(Bangumi, _VideoBase4);
  var _super4 = _createSuper(Bangumi);
  function Bangumi(main_title, state) {
    var _this5;
    video_base_classCallCheck(this, Bangumi);
    _this5 = _super4.call(this, 'bangumi', main_title, state);
    _this5.epInfo = state.epInfo;
    _this5.epList = state.epList;
    _this5.epId = state.epId;
    _this5.epMap = state.epMap;
    _this5.isEpMap = state.isEpMap;
    // this.mediaInfo = state.mediaInfo
    return _this5;
  }
  video_base_createClass(Bangumi, [{
    key: "total",
    value: function total() {
      return this.epList.length;
    }
  }, {
    key: "getEpisode",
    value: function getEpisode(p) {
      return p ? this.epList[this.id(p)] : this.epMap[this.epId] || this.epInfo || {};
    }
  }, {
    key: "getEpPadLen",
    value: function getEpPadLen() {
      var n = Object.keys(this.isEpMap).length,
        len = n < 10 ? 1 : 0;
      while (n >= 1) {
        n = n / 10;
        len++;
      }
      return len;
    }
  }, {
    key: "title",
    value: function title(p) {
      var ep = this.getEpisode(p);
      var title = '';
      if (this.isEpMap[ep.id]) {
        var epNum = Object.keys(this.isEpMap).length > 1 ? "EP".concat(('' + this.p(p)).padStart(this.getEpPadLen(), '0')) : '';
        title = "".concat(this.main_title, " ").concat(epNum, " ").concat(ep.long_title);
      } else {
        // title long_title 可能不准确
        if (ep.share_copy) {
          var index = ep.share_copy.indexOf('》');
          if (index > 0) {
            title = ep.share_copy.substring(index + 1);
            title = "".concat(this.main_title, " ").concat(title);
          } else {
            title = "".concat(this.main_title, " ").concat(ep.title, " ").concat(ep.long_title);
          }
        } else {
          title = "".concat(ep.title, " ").concat(ep.long_title);
        }
      }
      return title.replaceAll('undefined', '').replaceAll('  ', ' ').trim();
    }
  }, {
    key: "filename",
    value: function filename(p) {
      return this.title(p).replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "aid",
    value: function aid(p) {
      var ep = this.getEpisode(p);
      return ep.aid;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      var ep = this.getEpisode(p);
      return ep.bvid;
    }
  }, {
    key: "cid",
    value: function cid(p) {
      var ep = this.getEpisode(p);
      return ep.cid;
    }
  }, {
    key: "epid",
    value: function epid(p) {
      var ep = this.getEpisode(p);
      return ep.id;
    }
  }, {
    key: "needVip",
    value: function needVip(p) {
      var ep = this.getEpisode(p);
      return ep.badge === '会员';
    }
  }, {
    key: "vipNeedPay",
    value: function vipNeedPay(p) {
      var ep = this.getEpisode(p);
      return ep.badge === '付费';
    }
  }, {
    key: "isLimited",
    value: function isLimited() {
      // todo
      return false;
    }
  }], [{
    key: "build",
    value: function build() {
      // ! state: {p, mediaInfo, epList, epId, epMap, epInfo}
      var bangumiCache = cache.get('Bangumi');
      if (location.href == bangumiCache.get('href') && !!bangumiCache.get('build')) {
        return bangumiCache.get('build');
      }
      bangumiCache.set('build', null);
      var main_title,
        sid,
        epid,
        epMap = {};
      var pathname = location.pathname.toLowerCase();
      if (pathname.startsWith('/bangumi/play/ss')) {
        sid = pathname.match(/ss(\d+)/);
        sid = parseInt(sid[1]);
      } else if (pathname.startsWith('/bangumi/play/ep')) {
        epid = pathname.match(/ep(\d+)/);
        epid = parseInt(epid[1]);
      }
      try {
        console.log('location sid:', sid, 'epid:', epid);
        var page_data = JSON.parse($('.toolbar').attr('mr-show'));
        main_title = page_data.msg.title;
        sid = sid || page_data.msg.season_id;
        epid = epid || page_data.msg.ep_id;
        console.log('mr-show get sid:', sid, 'epid:', epid);
      } catch (_unused) {
        console.warn('mr-show get err');
      }
      if (sid != bangumiCache.get('sid')) {
        bangumiCache.set('sid', sid);
        bangumiCache.set('epid', '');
        bangumiCache.set('hasData', false);
      }
      if (!!sid && !epid) {
        _ajax({
          type: 'GET',
          url: "https://api.bilibili.com/pgc/player/web/v2/playurl?support_multi_audio=true&qn=80&fnver=0&fnval=4048&fourk=1&gaia_source=&from_client=BROWSER&is_main_page=true&need_fragment=true&season_id=".concat(sid, "&isGaiaAvoided=false&voice_balance=1&drm_tech_type=2"),
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          }
        }).then(function (res) {
          if (res && !res.code) {
            bangumiCache.set('epid', res.result.view_info.report.ep_id);
          }
        });
      }
      if (bangumiCache.get('lock')) {
        throw 'bangumiCache request waiting !';
      }
      bangumiCache.set('lock', true);
      sid = sid || '';
      epid = epid || '';
      _ajax({
        type: 'GET',
        url: "https://api.bilibili.com/pgc/view/web/ep/list?season_id=".concat(sid, "&ep_id=").concat(epid),
        dataType: 'json',
        cache: true
      }).then(function (res) {
        if (res && !res.code) {
          bangumiCache.set('hasData', true);
          bangumiCache.set('episodes', res.result.episodes || []);
          bangumiCache.set('section', res.result.section || []);
        }
      }).finally(function () {
        bangumiCache.set('lock', false);
      });
      bangumiCache.set('href', location.href);
      if (!epid && !bangumiCache.get('epid')) {
        throw 'epid not found !';
      }
      if (!bangumiCache.get('hasData')) {
        throw 'bangumiCache no data !';
      }
      var episodes = bangumiCache.get('episodes') || [];
      // 预告移后
      episodes = [].concat(_toConsumableArray(episodes.filter(function (a) {
        return a.badge_type != 1;
      })), _toConsumableArray(episodes.filter(function (a) {
        return a.badge_type == 1;
      })));
      // 标记正片
      var isEpMap = {};
      var _iterator4 = _createForOfIteratorHelper(episodes),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var ep = _step4.value;
          if ([0, 2, 3].includes(ep.badge_type)) {
            isEpMap[ep.id] = true;
          }
        }
        // 追加 section
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var section = bangumiCache.get('section') || [];
      var _iterator5 = _createForOfIteratorHelper(section),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var item = _step5.value;
          if (!item.episodes) {
            continue;
          }
          var _iterator6 = _createForOfIteratorHelper(item.episodes),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _ep = _step6.value;
              episodes.push(_ep);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      epid = epid || bangumiCache.get('epid');
      var _id = 0;
      for (var i = 0; i < episodes.length; i++) {
        epMap[episodes[i].id] = episodes[i];
        if (episodes[i].id == epid) {
          _id = i;
        }
      }
      var state = {
        p: _id + 1,
        epId: epid,
        epList: episodes,
        isEpMap: isEpMap,
        epMap: epMap,
        epInfo: epMap[epid]
      };
      var bangumi = new Bangumi(main_title, state);
      bangumiCache.set('build', bangumi);
      return bangumi;
    }
  }]);
  return Bangumi;
}(VideoBase);
var Cheese = /*#__PURE__*/function (_VideoBase5) {
  _inherits(Cheese, _VideoBase5);
  var _super5 = _createSuper(Cheese);
  function Cheese(main_title, state) {
    var _this6;
    video_base_classCallCheck(this, Cheese);
    _this6 = _super5.call(this, 'cheese', main_title, state);
    _this6.episodes = state.episodes;
    return _this6;
  }
  video_base_createClass(Cheese, [{
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
      return "".concat(this.main_title, " EP").concat(this.p(p), " ").concat(this.title(p)).replace(/[\/\\:*?"<>|]+/g, '');
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
  }], [{
    key: "build",
    value: function build() {
      var cheeseCache = cache.get('Cheese');
      var sid = (location.href.match(/\/cheese\/play\/ss(\d+)/i) || ['', ''])[1];
      var epid;
      if (!sid) {
        epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || ['', ''])[1];
      }
      if (!epid) {
        epid = parseInt($('.bpx-state-active').eq(0).attr('data-episodeid'));
      }
      if (!!sid && sid != cheeseCache.get('sid')) {
        cheeseCache.set('sid', sid);
        cheeseCache.set('episodes', null);
      }
      if (!cheeseCache.get('episodes')) {
        if (cheeseCache.get('lock')) {
          throw 'cheese request waiting !';
        }
        cheeseCache.set('lock', true);
        if (!sid && !epid) {
          console.log('get_season error');
          return;
        }
        _ajax({
          url: "https://api.bilibili.com/pugv/view/web/season?season_id=".concat(sid || '', "&ep_id=").concat(epid || ''),
          xhrFields: {
            withCredentials: true
          },
          dataType: 'json'
        }).then(function (res) {
          if (res.code) {
            Message.warning('获取剧集信息失败');
            return;
          }
          cheeseCache.set('episodes', res.data.episodes);
        }).finally(function () {
          cheeseCache.set('lock', false);
        });
      }
      var episodes = cheeseCache.get('episodes');
      if (!episodes) {
        throw 'cheese has not data !';
      }
      var _id = -1;
      for (var i = 0; i < episodes.length; i++) {
        if (!epid) {
          epid = episodes[i].id;
          _id = 0;
          break;
        }
        if (episodes[i].id == epid) {
          _id = i;
          break;
        }
      }
      if (_id < 0) {
        cheeseCache.set('episodes', null);
        throw 'episodes need reload !';
      }
      var main_title = ($('div.archive-title-box').text() || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      var state = {
        p: _id + 1,
        episodes: episodes
      };
      return new Cheese(main_title, state);
    }
  }]);
  return Cheese;
}(VideoBase);

;// ./src/js/utils/video.js



function type() {
  var routerMap = {
    video: '/video/',
    list: '/list/',
    festival: '/festival/',
    bangumi: '/bangumi/play/',
    // ss / ep
    cheese: '/cheese/play/'
  };
  for (var key in routerMap) {
    if (location.pathname.startsWith(routerMap[key])) {
      return key;
    }
  }
  return '?';
}
function base() {
  var _type = type();
  var vb = new VideoBase();
  if (_type === 'video') {
    var state = window.__INITIAL_STATE__;
    var main_title = state.videoData && state.videoData.title;
    vb = new Video(main_title, state);
  } else if (_type === 'list') {
    var _state = window.__INITIAL_STATE__;
    var _main_title = _state.mediaListInfo && _state.mediaListInfo.upper.name + '-' + _state.mediaListInfo.title;
    vb = new VideoList(_main_title, _state);
  } else if (_type === 'festival') {
    var _state2 = window.__INITIAL_STATE__;
    var _main_title2 = _state2.title;
    vb = new VideoFestival(_main_title2, _state2);
  } else if (_type === 'bangumi') {
    vb = Bangumi.build();
  } else if (_type === 'cheese') {
    // todo

    vb = Cheese.build();
  }
  return vb;
}
var q_map = {
  '8K 超高清': 127,
  '4K 超高清': 120,
  '1080P 60帧': 116,
  '1080P 高码率': 112,
  '1080P 高清': 80,
  '720P 准高清': 64,
  '480P 清晰': 32,
  '360P 流畅': 16,
  '自动': 32
};
function get_quality() {
  var _q = 0,
    _q_max = 0;
  var _type = type();
  if (_type === 'cheese') {
    var q = $('div.edu-player-quality-item.active span').text();
    var q_max = $($('div.edu-player-quality-item span').get(0)).text();
    _q = q in q_map ? q_map[q] : 0;
    _q_max = q_max in q_map ? q_map[q_max] : 0;
  } else {
    var keys = Object.keys(videoQualityMap);
    var _q2 = parseInt((_type === 'video' ? $('li.bpx-player-ctrl-quality-menu-item.bpx-state-active') : $('li.squirtle-select-item.active')).attr('data-value'));
    var _q_max2 = parseInt($((_type === 'video' ? $('li.bpx-player-ctrl-quality-menu-item') : $('li.squirtle-select-item')).get(0)).attr('data-value'));
    _q = keys.indexOf("".concat(_q2)) > -1 ? _q2 : 0;
    _q_max = keys.indexOf("".concat(_q_max2)) > -1 ? _q_max2 : 0;
  }
  if (!_q) {
    _q = parseInt($('li.bpx-player-ctrl-quality-menu-item.bpx-state-active').attr('data-value') || _q);
  }
  if (!_q_max) {
    _q_max = parseInt($('li.bpx-player-ctrl-quality-menu-item').attr('data-value') || _q_max);
  }
  !_q_max && (_q_max = 80) && console.error('video get quality max error');
  !_q && (_q = _q_max < 80 ? _q_max : 80);
  if (!user.isVIP()) {
    _q = _q > 80 ? 80 : _q;
  }
  return {
    q: _q,
    q_max: _q_max
  };
}
function get_quality_support() {
  var list,
    quality_list = [];
  var _type = type();
  if (_type === 'cheese') {
    list = $('div.edu-player-quality-item span');
    list.each(function () {
      var k = $(this).text();
      if (q_map[k]) {
        quality_list.push(q_map[k]);
      }
    });
  } else {
    var keys = Object.keys(videoQualityMap);
    list = ['video', 'list'].includes(_type) ? $('li.bpx-player-ctrl-quality-menu-item') : $('li.squirtle-select-item');
    if (!list[0]) {
      list = $('li.bpx-player-ctrl-quality-menu-item');
    }
    if (list && list.length) {
      list.each(function () {
        var q = "".concat(parseInt($(this).attr('data-value')));
        if (keys.indexOf(q) > -1) {
          quality_list.push(q);
        }
      });
    }
  }
  return quality_list.length ? quality_list : ['80', '64', '32', '16'];
}
var video = {
  type: type,
  base: base,
  get_quality: get_quality,
  get_quality_support: get_quality_support
};
;// ./src/js/store.js
function store_typeof(o) { "@babel/helpers - typeof"; return store_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, store_typeof(o); }
function store_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function store_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, store_toPropertyKey(o.key), o); } }
function store_createClass(e, r, t) { return r && store_defineProperties(e.prototype, r), t && store_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function store_toPropertyKey(t) { var i = store_toPrimitive(t, "string"); return "symbol" == store_typeof(i) ? i : i + ""; }
function store_toPrimitive(t, r) { if ("object" != store_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != store_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Store = /*#__PURE__*/function () {
  function Store() {
    store_classCallCheck(this, Store);
    this.prefix = 'bp_';
  }
  store_createClass(Store, [{
    key: "get",
    value: function get() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return localStorage.getItem(this.prefix + key) || '';
    }
  }, {
    key: "set",
    value: function set() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 ? arguments[1] : undefined;
      localStorage.setItem(this.prefix + key, value);
    }
  }]);
  return Store;
}();
var store = new Store();
;// ./src/js/utils/api.js
function api_typeof(o) { "@babel/helpers - typeof"; return api_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, api_typeof(o); }
function api_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = api_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function api_toConsumableArray(r) { return api_arrayWithoutHoles(r) || api_iterableToArray(r) || api_unsupportedIterableToArray(r) || api_nonIterableSpread(); }
function api_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function api_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return api_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? api_arrayLikeToArray(r, a) : void 0; } }
function api_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function api_arrayWithoutHoles(r) { if (Array.isArray(r)) return api_arrayLikeToArray(r); }
function api_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { throw: 1, return: 2, break: 3, continue: 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, catch: function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(api_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






function get_url_base(page, quality, video_format, success, error, request_type) {
  var _success, _error;
  if ('function' === typeof success) {
    _success = function _success(e) {
      // todo
      success(e);
    };
  } else {
    _success = function _success(res) {
      return console.log(res);
    };
  }
  if ('function' === typeof error) {
    _error = function _error(e) {
      message_Message.error('请求失败');
      error(e);
    };
  } else {
    _error = function _error(err) {
      return console.error(err);
    };
  }
  var vb = video.base();
  var _ref = [vb.aid(page), vb.bvid(page), vb.cid(page), vb.epid(page), quality || video.get_quality().q, vb.type()],
    aid = _ref[0],
    bvid = _ref[1],
    cid = _ref[2],
    epid = _ref[3],
    q = _ref[4],
    type = _ref[5];

  // 参数预处理
  var format = video_format || config_config.format;
  if (request_type === 'auto' && user.needReplace()) request_type = 'remote';
  var url_replace_cdn = function url_replace_cdn(url) {
    if (config_config.host_key === '0') {
      return url;
    }
    // 全部切换CDN
    var url_tmp = url.split('/');
    var mapping = hostMap[config_config.host_key];
    if ('string' === typeof mapping && mapping.length) {
      if (mapping.at(0).match(/[a-z]/)) {
        url_tmp[2] = mapping;
      }
    } else if ('function' === typeof mapping) {
      url_tmp[2] = mapping();
    }
    url = url_tmp.join('/');
    return url;
  };
  var base_api;
  var ajax_obj = {
    type: 'GET',
    dataType: 'json'
  };
  if (request_type === 'auto' || request_type === 'local') {
    var fnver, fnval;
    if (type === 'cheese') {
      base_api = 'https://api.bilibili.com/pugv/player/web/playurl';
      fnver = format === 'mp4' ? 1 : 0;
      fnval = 80;
    } else {
      base_api = type === 'video' ? 'https://api.bilibili.com/x/player/playurl' : 'https://api.bilibili.com/pgc/player/web/playurl';
      fnver = 0;
      fnval = {
        dash: 4048,
        flv: 4049,
        mp4: 0
      }[format] || 0;
    }
    base_api += "?avid=".concat(aid, "&bvid=").concat(bvid, "&cid=").concat(cid, "&qn=").concat(q, "&fnver=").concat(fnver, "&fnval=").concat(fnval, "&fourk=1&ep_id=").concat(epid, "&type=").concat(format, "&otype=json");
    base_api += format === 'mp4' ? '&platform=html5&high_quality=1' : '';
    ajax_obj.xhrFields = {
      withCredentials: true
    };
  } else {
    base_api = config_config.base_api;
    base_api += "?av=".concat(aid, "&bv=").concat(bvid, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(format, "&otype=json");
    !!page && (base_api += '&s');
    var _ref2 = [store.get('auth_id'), store.get('auth_sec')],
      auth_id = _ref2[0],
      auth_sec = _ref2[1];
    if (auth_id && auth_sec) {
      base_api += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
    }
  }
  var resultConvertor = function resultConvertor(data, _success) {
    // 判断地址有效性
    var checkTask = function checkTask(key, backup_key) {
      if (!data[backup_key]) {
        return Promise.resolve(key);
      }
      return _ajax({
        type: 'GET',
        url: data[key],
        cache: false,
        timeout: 1000,
        success: function success(res) {
          return key;
        },
        error: function error(res) {
          if (res.statusText == 'timeout') {
            return key;
          } else {
            // back_url
            return backup_key;
          }
        }
      });
    };
    new Promise(function (resolve, reject) {
      var promiseList = [];
      var valueList = [];
      if (data.url) {
        promiseList.push(checkTask('url', 'backup_url'));
      } else {
        promiseList.push(checkTask('video', 'backup_video'));
        promiseList.push(checkTask('audio', 'backup_audio'));
      }
      var timer = setTimeout(function () {
        resolve(valueList);
      }, 1500);
      var index = 0;
      promiseList.forEach(/*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(promise) {
          var result;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return promise;
                case 3:
                  result = _context.sent;
                  _context.next = 9;
                  break;
                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  result = _context.t0;
                case 9:
                  console.log('use ' + result);
                  valueList[index++] = result;
                  if (index == promiseList.length) {
                    clearInterval(timer);
                    resolve(valueList);
                  }
                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 6]]);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    }).then(function (resList) {
      console.log('use data key: ', resList);
      if (!resList) {
        return;
      }
      resList = api_toConsumableArray(resList);
      var _iterator = api_createForOfIteratorHelper(resList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          if (!data[key]) continue;
          if (['url', 'backup_url'].includes(key)) {
            data.url = data[key];
          } else if (['video', 'backup_video'].includes(key)) {
            data.video = data[key];
          } else if (['audio', 'backup_audio'].includes(key)) {
            data.audio = data[key];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }).finally(function () {
      _success(data);
    });
  };
  ajax_obj.url = base_api;
  ajax(ajax_obj).then(function (res) {
    var data;
    if (!res.code) {
      data = res.result || res.data;
    }
    if (!data) {
      if (request_type === 'auto') {
        get_url_base(page, quality, video_format, success, error, 'remote');
        return;
      }
      // remote
      res.url && (res.url = url_replace_cdn(res.url));
      res.video && (res.video = url_replace_cdn(res.video));
      res.audio && (res.audio = url_replace_cdn(res.audio));
      // _success(res)
      resultConvertor(res, _success);
      return;
    }

    // local
    if (data.dash) {
      var result = {
        code: 0,
        quality: data.quality,
        accept_quality: data.accept_quality,
        video: '',
        audio: ''
      };
      var videos = data.dash.video;
      for (var i = 0; i < videos.length; i++) {
        var _video = videos[i];
        if (_video.id <= q) {
          result.video = url_replace_cdn(_video.base_url);
          result.audio = url_replace_cdn(data.dash.audio[0].base_url);
          result.backup_video = _video.backup_url && url_replace_cdn(_video.backup_url[0]);
          result.backup_audio = data.dash.audio[0].backup_url && url_replace_cdn(data.dash.audio[0].backup_url[0]);
          break;
        }
      }
      resultConvertor(result, _success);
      return;
    }

    // durl
    resultConvertor({
      code: 0,
      quality: data.quality,
      accept_quality: data.accept_quality,
      url: url_replace_cdn(data.durl[0].url),
      backup_url: data.durl[0].backup_url && url_replace_cdn(data.durl[0].backup_url[0])
    }, _success);
  }).catch(function (err) {
    return _error(err);
  });
}
function _get_subtitle(p, callback) {
  var to_blob_url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var vb = video.base();
  var _ref4 = [vb.aid(p), vb.cid(p), vb.epid(p)],
    aid = _ref4[0],
    cid = _ref4[1],
    epid = _ref4[2];
  ajax({
    url: "https://api.bilibili.com/x/player/wbi/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  }).then(function (res) {
    // todo
    if (!res.code && res.data.subtitle.subtitles[0]) {
      ajax({
        url: "".concat(res.data.subtitle.subtitles[0].subtitle_url),
        dataType: 'json'
      }).then(function (res) {
        // json -> webvtt -> blob_url
        var datas = res.body || [{
          from: 0,
          to: 0,
          content: ''
        }];
        var webvtt = 'WEBVTT\n\n';
        var _iterator2 = api_createForOfIteratorHelper(datas),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var data = _step2.value;
            var a = new Date((parseInt(data.from) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] + '.' + (data.from.toString().split('.')[1] || '000').padEnd(3, '0');
            var b = new Date((parseInt(data.to) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] + '.' + (data.to.toString().split('.')[1] || '000').padEnd(3, '0');
            webvtt += "".concat(a, " --> ").concat(b, "\n").concat(data.content.trim(), "\n\n");
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (to_blob_url) {
          callback(URL.createObjectURL(new Blob([webvtt], {
            type: 'text/vtt'
          })));
        } else {
          callback(webvtt);
        }
      }).catch(callback);
    } else {
      callback();
    }
  }).catch(callback);
}
function get_subtitle_data(p, callback) {
  _get_subtitle(p, callback, false);
}
function get_subtitle_url(p, callback) {
  _get_subtitle(p, callback, true);
}
var api = {
  get_url: function get_url(success, error) {
    var request_type = config_config.request_type;
    var format = config_config.format;
    var quality = parseInt(config_config.video_quality);
    get_url_base(0, quality, format, success, error, request_type);
  },
  get_urls: function get_urls(page, quality, format, success, error) {
    var request_type = config_config.request_type;
    get_url_base(page, quality, format, success, error, request_type);
  },
  get_subtitle_url: get_subtitle_url,
  get_subtitle_data: get_subtitle_data
};
;// ./src/js/utils/runtime-lib.js
function runtime_lib_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = runtime_lib_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function runtime_lib_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return runtime_lib_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? runtime_lib_arrayLikeToArray(r, a) : void 0; } }
function runtime_lib_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function runtime_lib_typeof(o) { "@babel/helpers - typeof"; return runtime_lib_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, runtime_lib_typeof(o); }
function runtime_lib_regeneratorRuntime() { "use strict"; var r = runtime_lib_regenerator(), e = r.m(runtime_lib_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { throw: 1, return: 2, break: 3, continue: 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, catch: function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, runtime_lib_regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (runtime_lib_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new runtime_lib_OverloadYield(r, e); }, AsyncIterator: runtime_lib_regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? runtime_lib_regeneratorAsyncGen : runtime_lib_regeneratorAsync)(a(r), e, t, o, u); }, keys: runtime_lib_regeneratorKeys, values: runtime_lib_regeneratorValues }; })(); }
function runtime_lib_regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(runtime_lib_typeof(e) + " is not iterable"); }
function runtime_lib_regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function runtime_lib_regeneratorAsync(n, e, r, t, o) { var a = runtime_lib_regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function runtime_lib_regeneratorAsyncGen(r, e, t, o, n) { return new runtime_lib_regeneratorAsyncIterator(runtime_lib_regenerator().w(r, e, t, o), n || Promise); }
function runtime_lib_regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof runtime_lib_OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (runtime_lib_regeneratorDefine2(runtime_lib_regeneratorAsyncIterator.prototype), runtime_lib_regeneratorDefine2(runtime_lib_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), runtime_lib_regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function runtime_lib_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return runtime_lib_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (runtime_lib_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, runtime_lib_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, runtime_lib_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), runtime_lib_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", runtime_lib_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), runtime_lib_regeneratorDefine2(u), runtime_lib_regeneratorDefine2(u, o, "Generator"), runtime_lib_regeneratorDefine2(u, n, function () { return this; }), runtime_lib_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (runtime_lib_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function runtime_lib_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } runtime_lib_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { runtime_lib_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, runtime_lib_regeneratorDefine2(e, r, n, t); }
function runtime_lib_OverloadYield(e, d) { this.v = e, this.k = d; }
function runtime_lib_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function runtime_lib_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { runtime_lib_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { runtime_lib_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function runtime_lib_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function runtime_lib_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, runtime_lib_toPropertyKey(o.key), o); } }
function runtime_lib_createClass(e, r, t) { return r && runtime_lib_defineProperties(e.prototype, r), t && runtime_lib_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function runtime_lib_toPropertyKey(t) { var i = runtime_lib_toPrimitive(t, "string"); return "symbol" == runtime_lib_typeof(i) ? i : i + ""; }
function runtime_lib_toPrimitive(t, r) { if ("object" != runtime_lib_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != runtime_lib_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var RuntimeLib = /*#__PURE__*/function () {
  function RuntimeLib(config) {
    runtime_lib_classCallCheck(this, RuntimeLib);
    this.config = config;
    this.moduleAsync;
    this.anyResolved = false;
  }
  runtime_lib_createClass(RuntimeLib, [{
    key: "getModulePromise",
    value: function getModulePromise() {
      var _this = this;
      var _this$config = this.config,
        urls = _this$config.urls,
        getModule = _this$config.getModule;
      var errs = [];
      if (!urls || !urls.length) {
        return Promise.reject(new Error('No urls provided'));
      }
      return new Promise(function (resolve, reject) {
        var i = 0;
        urls.forEach(function (url) {
          // 延时并发
          setTimeout(/*#__PURE__*/runtime_lib_asyncToGenerator(/*#__PURE__*/runtime_lib_regeneratorRuntime().mark(function _callee() {
            var code;
            return runtime_lib_regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    if (!_this.anyResolved) {
                      _context.next = 3;
                      break;
                    }
                    return _context.abrupt("return");
                  case 3:
                    console.log("[Runtime Library] Start download from ".concat(url));
                    _context.next = 6;
                    return _ajax({
                      url: url,
                      type: 'GET',
                      dataType: 'text',
                      cache: true
                    });
                  case 6:
                    code = _context.sent;
                    if (!_this.anyResolved) {
                      _context.next = 9;
                      break;
                    }
                    return _context.abrupt("return");
                  case 9:
                    console.log("[Runtime Library] Downloaded from ".concat(url, " , length = ").concat(code.length));
                    _this.anyResolved = true;
                    resolve(code);
                    _context.next = 20;
                    break;
                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](0);
                    if (!_this.anyResolved) {
                      _context.next = 18;
                      break;
                    }
                    return _context.abrupt("return");
                  case 18:
                    errs.push({
                      url: url,
                      err: _context.t0
                    });
                    if (--i === 0) {
                      console.error(errs);
                      reject(errs);
                    }
                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 14]]);
          })), i++ * 1000);
        });
      });
    }
  }]);
  return RuntimeLib;
}(); // for unpkg & jsdelivr
var filename_npm_mapping = {
  'jszip.min.js': 'dist/jszip.min.js',
  'flv.min.js': 'dist/flv.min.js',
  'DPlayer.min.js': 'dist/DPlayer.min.js'
};
var cdn_supports_mapping = {
  '@ffmpeg/ffmpeg': ['unpkg', 'jsdelivr']
};
var cdn_map = {
  cloudflare: function cloudflare(name, ver, filename) {
    return "https://cdnjs.cloudflare.com/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
  },
  unpkg: function unpkg(name, ver, filename) {
    filename = filename_npm_mapping[filename] || filename;
    return "https://unpkg.com/".concat(name, "@").concat(ver, "/").concat(filename);
  },
  jsdelivr: function jsdelivr(name, ver, filename) {
    filename = filename_npm_mapping[filename] || filename;
    return "https://cdn.jsdelivr.net/npm/".concat(name, "@").concat(ver, "/").concat(filename);
  },
  staticfile: function staticfile(name, ver, filename) {
    return "https://cdn.staticfile.org/".concat(name, "/").concat(ver, "/").concat(filename);
  },
  bootcdn: function bootcdn(name, ver, filename) {
    return "https://cdn.bootcdn.net/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
  }
};
var urls = function urls(_ref2) {
  var name = _ref2.name,
    ver = _ref2.ver,
    filename = _ref2.filename,
    cdn_keys = _ref2.cdn_keys;
  var supports = cdn_supports_mapping[name];
  if (supports) {
    cdn_keys = cdn_keys ? cdn_keys.filter(function (key) {
      return key in cdn_map && supports.includes(key);
    }) : supports.filter(function (key) {
      return key in cdn_map;
    });
  } else {
    cdn_keys = cdn_keys ? cdn_keys.filter(function (key) {
      return key in cdn_map;
    }) : Object.keys(cdn_map);
  }
  return cdn_keys.map(function (k) {
    return cdn_map[k](name, ver, filename);
  });
};

// iframe隔离加载（部分不兼容）
var runtime_div = document.createElement('div');
runtime_div.id = 'bp_runtime_div';
runtime_div.style.display = 'none';
if (!document.getElementById(runtime_div.id)) {
  document.body.appendChild(runtime_div);
}
var iframeInvoke = function iframeInvoke(scripts, getModules) {
  console.log('[Runtime Library] iframe invoke scripts, size =', scripts.length);
  // ! html
  var scriptTags = scripts.map(function (code) {
    return "<script>".concat(code, "</script>");
  }).join('');
  var html = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Runtime Library</title></head><body>".concat(scriptTags, "</body></html>");
  var blobUrl = URL.createObjectURL(new Blob([html], {
    type: 'text/html'
  }));
  var iframe = document.createElement('iframe');
  var clearIframe = function clearIframe() {
    clearTimeout(timeoutId);
    URL.revokeObjectURL(blobUrl);
    // iframe.remove()
  };
  var timeoutId = setTimeout(function () {
    // 超时处理
    console.error('[Runtime Library] Script loading timed out');
    clearIframe();
  }, 10000);
  iframe.src = blobUrl;
  iframe.onload = function () {
    console.log('[Runtime Library] Script loaded in iframe');
    var _iterator = runtime_lib_createForOfIteratorHelper(getModules),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var getModule = _step.value;
        try {
          getModule(iframe.contentWindow);
        } catch (err) {
          console.error('[Runtime Library] Error in getModule:', err);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    clearIframe();
  };
  iframe.onerror = function () {
    console.error('[Runtime Library] Failed to load script in iframe');
    clearIframe();
  };
  runtime_div.appendChild(iframe);
};
var count = 0;
var scripts = [],
  getModules = [];
var initIframe = function initIframe(name, ver, filename, getModule) {
  count++;
  new RuntimeLib({
    urls: urls({
      name: name,
      ver: ver,
      filename: filename
    }),
    getModule: getModule
  }).getModulePromise().then(function (script) {
    scripts.push(script);
    getModules.push(getModule);
  }).catch(function (err) {
    console.error("[Runtime Library] Failed to load ".concat(name, " from CDN"), err);
  }).finally(function () {
    if (--count === 0) {
      iframeInvoke(scripts, getModules);
      console.log('[Runtime Library] iframe invoke complete');
    }
  });
};
var initLocal = function initLocal(name, ver, filename, getModule, handleScript) {
  handleScript = handleScript || function (script) {
    return script;
  };
  try {
    runtime_lib_asyncToGenerator(/*#__PURE__*/runtime_lib_regeneratorRuntime().mark(function _callee2() {
      var script, blob, blob_url, script_tag;
      return runtime_lib_regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new RuntimeLib({
                urls: urls({
                  name: name,
                  ver: ver,
                  filename: filename
                }),
                getModule: getModule
              }).getModulePromise();
            case 2:
              script = _context2.sent;
              _context2.t0 = Blob;
              _context2.next = 6;
              return handleScript(script);
            case 6:
              _context2.t1 = _context2.sent;
              _context2.t2 = [_context2.t1];
              _context2.t3 = {
                type: 'text/javascript'
              };
              blob = new _context2.t0(_context2.t2, _context2.t3);
              blob_url = URL.createObjectURL(blob);
              script_tag = document.createElement('script');
              script_tag.src = blob_url;
              script_tag.onload = function () {
                console.log("[Runtime Library] Loaded ".concat(name, " from local"));
                getModule(window);
                URL.revokeObjectURL(blob_url);
              };
              script_tag.onerror = function () {
                console.error("[Runtime Library] Failed to load ".concat(name, " from local"));
                URL.revokeObjectURL(blob_url);
              };
              runtime_div.appendChild(script_tag);
            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  } catch (err) {
    console.error("[Runtime Library] Failed to load ".concat(name, " from local"), err);
  }
};
var JSZip;
initLocal('jszip', '3.10.0', 'jszip.min.js', function (w) {
  return JSZip = w.JSZip;
});
var flvjs;
initLocal('flv.js', '1.6.2', 'flv.min.js', function (w) {
  return flvjs = w.flvjs;
});
var DPlayer;
initLocal('dplayer', '1.26.0', 'DPlayer.min.js', function (w) {
  return DPlayer = w.DPlayer;
}, function (script) {
  return script.replace('"About author"', '"About DIYgod"');
});
var QRCode;
initLocal('qrcodejs', '1.0.0', 'qrcode.min.js', function (w) {
  return QRCode = w.QRCode;
});
var md5;
initLocal('blueimp-md5', '2.19.0', 'js/md5.min.js', function (w) {
  return md5 = w.md5;
});
var FFmpegWASM;
initLocal('@ffmpeg/ffmpeg', '0.12.15', 'dist/umd/ffmpeg.js', function (w) {
  return FFmpegWASM = w.FFmpegWASM;
}, function (script) {
  return script.replace('new URL(e.p+e.u(814),e.b)', "r.workerLoadURL");
});
;// ./src/js/utils/player.js






function get_bili_player_id() {
  if (!!$('#bilibiliPlayer')[0]) {
    return '#bilibiliPlayer';
  } else if (!!$('#bilibili-player')[0]) {
    return '#bilibili-player';
  } else if (!!$('#edu-player')[0]) {
    return 'div.bpx-player-primary-area';
  }
}
function request_danmaku(options, cid) {
  if (!cid) {
    options.error('cid未知，无法获取弹幕');
    return;
  }
  ajax({
    url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
    dataType: 'text'
  }).then(function (result) {
    var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''));
    if (!result_dom) {
      options.error('弹幕获取失败');
      return;
    }
    if (!result_dom.find('d')[0]) {
      options.error('未发现弹幕');
    } else {
      var danmaku_data = result_dom.find('d').map(function (i, el) {
        var item = $(el);
        var p = item.attr('p').split(',');
        var type = 0;
        if (p[1] === '4') {
          type = 2;
        } else if (p[1] === '5') {
          type = 1;
        }
        return [{
          author: '',
          time: parseFloat(p[0]),
          type: type,
          color: parseInt(p[3]),
          id: '',
          text: item.text()
        }];
      }).get();
      options.success(danmaku_data);
      // 加载弹幕设置
      setTimeout(function () {
        danmaku_config();
      }, 100);
    }
  }).catch(function () {
    options.error('弹幕请求异常');
  });
}
function replace_player(url, url_2) {
  // 恢复原视频
  recover_player();
  // 暂停原视频
  var bili_video = $(bili_video_tag())[0];
  bili_video_stop();
  !!bili_video && bili_video.addEventListener('play', bili_video_stop, false);
  var bili_player_id = get_bili_player_id();
  if (!!$('#bilibiliPlayer')[0]) {
    $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor">');
    $(bili_player_id).hide();
  } else if (!!$('#bilibili-player')[0]) {
    $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor" style="width:100%;height:100%;z-index:1000;"></div>');
    $(bili_player_id).hide();
  } else if (!!$('#edu-player')[0]) {
    $(bili_player_id).before('<div id="bp_dplayer" style="width:100%;height:100%;z-index:1000;"></div>');
    $(bili_player_id).hide();
  } else {
    MessageBox.alert('<div id="bp_dplayer" style="width:100%;height:100%;"></div>', function () {
      recover_player();
    });
  }
  var dplayer_init = function dplayer_init() {
    var subtitle_url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    window.bp_dplayer = new DPlayer({
      container: $('#bp_dplayer')[0],
      mutex: false,
      volume: 1,
      autoplay: true,
      video: {
        url: url,
        type: 'auto'
      },
      subtitle: {
        url: subtitle_url,
        type: 'webvtt',
        fontSize: '35px',
        bottom: '5%',
        color: '#fff'
      },
      danmaku: true,
      apiBackend: {
        read: function read(options) {
          request_danmaku(options, video.base().cid());
        },
        send: function send(options) {
          // ?
          options.error('此脚本无法将弹幕同步到云端');
        }
      },
      contextmenu: [{
        text: '脚本信息',
        link: 'https://github.com/injahow/user.js'
      }, {
        text: '脚本作者',
        link: 'https://injahow.com'
      }, {
        text: '恢复播放器',
        click: function click() {
          recover_player();
        }
      }]
    });
    // subtitle_blob save
    if (url_2 && url_2 !== '#') {
      $('body').append('<div id="bp_dplayer_2" style="display:none;"></div>');
      window.bp_dplayer_2 = new DPlayer({
        container: $('#bp_dplayer_2')[0],
        mutex: false,
        volume: 1,
        autoplay: false,
        video: {
          url: url_2,
          type: 'auto'
        }
      });
      var _ref = [window.bp_dplayer, window.bp_dplayer_2],
        bp_dplayer = _ref[0],
        bp_dplayer_2 = _ref[1];
      bp_dplayer.on('play', function () {
        !bp_dplayer.paused && bp_dplayer_2.play();
      });
      bp_dplayer.on('playing', function () {
        !bp_dplayer.paused && bp_dplayer_2.play();
      });
      bp_dplayer.on('timeupdate', function () {
        if (Math.abs(bp_dplayer.video.currentTime - bp_dplayer_2.video.currentTime) > 1) {
          bp_dplayer_2.pause();
          bp_dplayer_2.seek(bp_dplayer.video.currentTime);
        }
        !bp_dplayer.paused && bp_dplayer_2.play();
      });
      bp_dplayer.on('seeking', function () {
        bp_dplayer_2.pause();
        bp_dplayer_2.seek(bp_dplayer.video.currentTime);
      });
      bp_dplayer.on('waiting', function () {
        bp_dplayer_2.pause();
        bp_dplayer_2.seek(bp_dplayer.video.currentTime);
      });
      bp_dplayer.on('pause', function () {
        bp_dplayer_2.pause();
        bp_dplayer_2.seek(bp_dplayer.video.currentTime);
      });
      bp_dplayer.on('suspend', function () {
        bp_dplayer_2.speed(bp_dplayer.video.playbackRate);
      });
      bp_dplayer.on('volumechange', function () {
        bp_dplayer_2.volume(bp_dplayer.video.volume);
        bp_dplayer_2.video.muted = bp_dplayer.video.muted;
      });
    }
  };
  // 默认请求字幕
  api.get_subtitle_url(0, dplayer_init);
}
function bili_video_tag() {
  if (!!$('bwp-video')[0]) {
    return 'bwp-video';
  } else if (!!$('video[class!="dplayer-video dplayer-video-current"]')[0]) {
    return 'video[class!="dplayer-video dplayer-video-current"]';
  }
}
function bili_video_stop() {
  // listener
  var bili_video = $(bili_video_tag())[0];
  if (bili_video) {
    bili_video.pause();
    bili_video.currentTime = 0;
  }
}
function recover_player() {
  if (window.bp_dplayer) {
    var bili_video = $(bili_video_tag())[0];
    !!bili_video && bili_video.removeEventListener('play', bili_video_stop, false);
    window.bp_dplayer.destroy();
    window.bp_dplayer = null;
    $('#bp_dplayer').remove();
    if (window.bp_dplayer_2) {
      window.bp_dplayer_2.destroy();
      window.bp_dplayer_2 = null;
      $('#bp_dplayer_2').remove();
    }
    $(get_bili_player_id()).show();
  }
}

// DPlayer 弹幕设置
function danmaku_config() {
  var style = '' + "<style id=\"dplayer_danmaku_style\">\n        .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {\n            animation-duration: ".concat(parseFloat(config_config.danmaku_speed), "s;\n            font-size: ").concat(parseInt(config_config.danmaku_fontsize), "px;\n        }\n        </style>");
  if (!!$('#dplayer_danmaku_style')[0]) {
    $('#dplayer_danmaku_style').remove();
  }
  $('body').append(style);
}
var player = {
  bili_video_tag: bili_video_tag,
  recover_player: recover_player,
  replace_player: replace_player,
  danmaku: {
    config: danmaku_config
  }
};
;// ./src/js/check.js
function check_typeof(o) { "@babel/helpers - typeof"; return check_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, check_typeof(o); }
function check_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function check_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, check_toPropertyKey(o.key), o); } }
function check_createClass(e, r, t) { return r && check_defineProperties(e.prototype, r), t && check_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function check_toPropertyKey(t) { var i = check_toPrimitive(t, "string"); return "symbol" == check_typeof(i) ? i : i + ""; }
function check_toPrimitive(t, r) { if ("object" != check_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != check_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Check = /*#__PURE__*/function () {
  function Check() {
    check_classCallCheck(this, Check);
    this.href = '';
    this.aid = '';
    this.cid = '';
    this.q = '';
    this.epid = '';
    this.locked = false;
  }
  check_createClass(Check, [{
    key: "refresh",
    value: function refresh() {
      if (this.locked) {
        return;
      }
      this.locked = true;
      console.log('refresh...');
      $('#video_download').hide();
      $('#video_download_2').hide();
      player.recover_player();
      try {
        // 更新check
        this.href = location.href;
        var vb = video.base();
        this.aid = vb.aid();
        this.cid = vb.cid();
        this.epid = vb.epid();
        this.q = video.get_quality().q;
      } catch (err) {
        console.log(err);
      } finally {
        this.locked = false;
      }
    }
  }]);
  return Check;
}();
var check = new Check();
;// ./src/js/utils/common.js
function common_typeof(o) { "@babel/helpers - typeof"; return common_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, common_typeof(o); }
function common_regeneratorRuntime() { "use strict"; var r = common_regenerator(), e = r.m(common_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { throw: 1, return: 2, break: 3, continue: 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, catch: function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, common_regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (common_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new common_OverloadYield(r, e); }, AsyncIterator: common_regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? common_regeneratorAsyncGen : common_regeneratorAsync)(a(r), e, t, o, u); }, keys: common_regeneratorKeys, values: common_regeneratorValues }; })(); }
function common_regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(common_typeof(e) + " is not iterable"); }
function common_regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function common_regeneratorAsync(n, e, r, t, o) { var a = common_regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function common_regeneratorAsyncGen(r, e, t, o, n) { return new common_regeneratorAsyncIterator(common_regenerator().w(r, e, t, o), n || Promise); }
function common_regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof common_OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (common_regeneratorDefine2(common_regeneratorAsyncIterator.prototype), common_regeneratorDefine2(common_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), common_regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function common_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return common_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (common_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, common_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, common_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), common_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", common_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), common_regeneratorDefine2(u), common_regeneratorDefine2(u, o, "Generator"), common_regeneratorDefine2(u, n, function () { return this; }), common_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (common_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function common_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } common_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { common_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, common_regeneratorDefine2(e, r, n, t); }
function common_OverloadYield(e, d) { this.v = e, this.k = d; }
function common_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function common_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { common_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { common_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * 获取文件并返回 Blob URL
 * @param {string} url - 文件 URL
 * @param {string} mimeType - 文件的 MIME 类型
 * @returns {Promise<string>} - BlobURL
 */
function toBlobURL(_x, _x2) {
  return _toBlobURL.apply(this, arguments);
}
/**
 * 使用浏览器a标签下载 Blob URL
 * @param {string} blobUrl - Blob URL
 * @param {string} downloadname - 含后缀的文件名
 */
function _toBlobURL() {
  _toBlobURL = common_asyncToGenerator(/*#__PURE__*/common_regeneratorRuntime().mark(function _callee(url, mimeType) {
    var response, errorMsg, buffer, blob, blobUrl;
    return common_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("toBlobURL: Fetching ".concat(url));
            _context.next = 3;
            return fetch(url);
          case 3:
            response = _context.sent;
            if (response.ok) {
              _context.next = 8;
              break;
            }
            errorMsg = "toBlobURL: Failed to fetch ".concat(url, ": ").concat(response.status, " ").concat(response.statusText);
            console.error(errorMsg);
            throw new Error(errorMsg);
          case 8:
            _context.next = 10;
            return response.arrayBuffer();
          case 10:
            buffer = _context.sent;
            blob = new Blob([buffer], {
              type: mimeType
            });
            blobUrl = URL.createObjectURL(blob);
            console.log("toBlobURL: Created Blob URL for ".concat(url));
            return _context.abrupt("return", blobUrl);
          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toBlobURL.apply(this, arguments);
}
function downloadBlobURL(blobUrl, downloadname) {
  var a = document.createElement('a');
  a.href = blobUrl;
  a.download = downloadname;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    return URL.revokeObjectURL(blobUrl);
  }, 100);
}

/**
 * 使用浏览器a标签下载 Blob 对象
 * @param {Blob} blob - Blob 对象
 * @param {string} downloadname - 含后缀的文件名
 */
function downloadBlob(blob, downloadname) {
  var blobUrl = URL.createObjectURL(blob);
  downloadBlobURL(blobUrl, downloadname);
}

/**
 * 下载文件
 * @param {string} url - 文件 URL
 * @returns {Promise<Uint8Array>} - 获取的文件数据
 */
function fetchFile(_x3) {
  return _fetchFile.apply(this, arguments);
}
/**
 * 带进度下载文件
 * @param {string} url - 文件 URL
 * @param {Object} options - 配置选项
 * @param {Function} [options.onProgress] - 进度回调函数，接收 (loaded: number, total: number) 两个参数
 * @param {AbortSignal} [options.signal] - 可选的 AbortSignal，用于取消请求（来自 AbortController.signal）
 * @returns {Promise<Uint8Array>} 下载的数据
 */
function _fetchFile() {
  _fetchFile = common_asyncToGenerator(/*#__PURE__*/common_regeneratorRuntime().mark(function _callee2(url) {
    var resp, buffer;
    return common_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(url);
          case 2:
            resp = _context2.sent;
            _context2.next = 5;
            return resp.arrayBuffer();
          case 5:
            buffer = _context2.sent;
            return _context2.abrupt("return", new Uint8Array(buffer));
          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchFile.apply(this, arguments);
}
function fetchFileWithProgress(_x4, _x5) {
  return _fetchFileWithProgress.apply(this, arguments);
}
/**
 * 将字节大小格式化为可读的字符串（自动选择单位）
 * @param {number} bytes - 字节数
 * @param {number} [decimalPlaces=2] - 小数位数
 * @returns {string} 格式化后的大小，如 "1.23 GB"
 */
function _fetchFileWithProgress() {
  _fetchFileWithProgress = common_asyncToGenerator(/*#__PURE__*/common_regeneratorRuntime().mark(function _callee3(url, _ref) {
    var onProgress, signal, res, contentLength, total, reader, loaded, chunks, _yield$reader$read, done, value, dataArray, pos, _i, _chunks, chunk;
    return common_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            onProgress = _ref.onProgress, signal = _ref.signal;
            _context3.next = 3;
            return fetch(url, {
              signal: signal
            });
          case 3:
            res = _context3.sent;
            if (res.body) {
              _context3.next = 6;
              break;
            }
            throw new Error('URL下载失败: ' + url);
          case 6:
            contentLength = res.headers.get('content-length');
            total = contentLength ? parseInt(contentLength, 10) : 0;
            reader = res.body.getReader();
            loaded = 0;
            chunks = [];
          case 11:
            if (false) // removed by dead control flow
{}
            _context3.next = 14;
            return reader.read();
          case 14:
            _yield$reader$read = _context3.sent;
            done = _yield$reader$read.done;
            value = _yield$reader$read.value;
            if (value) {
              chunks.push(value);
              loaded += value.length;
              // 调用进度回调
              if (onProgress) {
                onProgress(loaded, total);
              }
            }
            if (!done) {
              _context3.next = 20;
              break;
            }
            return _context3.abrupt("break", 22);
          case 20:
            _context3.next = 11;
            break;
          case 22:
            // 合并 chunk
            dataArray = new Uint8Array(loaded);
            pos = 0;
            for (_i = 0, _chunks = chunks; _i < _chunks.length; _i++) {
              chunk = _chunks[_i];
              dataArray.set(chunk, pos);
              pos += chunk.length;
            }
            return _context3.abrupt("return", dataArray);
          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchFileWithProgress.apply(this, arguments);
}
function prettyBytes(bytes) {
  var decimalPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return '0 B';
  var units = ['B', 'KB', 'MB', 'GB', 'TB'];
  var size = bytes;
  var unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  // 保留指定小数位
  var formatted = size.toFixed(decimalPlaces);
  return "".concat(formatted, " ").concat(units[unitIndex]);
}

;// ./src/js/utils/ffmpeg.js
function ffmpeg_typeof(o) { "@babel/helpers - typeof"; return ffmpeg_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ffmpeg_typeof(o); }
function ffmpeg_slicedToArray(r, e) { return ffmpeg_arrayWithHoles(r) || ffmpeg_iterableToArrayLimit(r, e) || ffmpeg_unsupportedIterableToArray(r, e) || ffmpeg_nonIterableRest(); }
function ffmpeg_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ffmpeg_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ffmpeg_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ffmpeg_arrayLikeToArray(r, a) : void 0; } }
function ffmpeg_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ffmpeg_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ffmpeg_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ffmpeg_regeneratorRuntime() { "use strict"; var r = ffmpeg_regenerator(), e = r.m(ffmpeg_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { throw: 1, return: 2, break: 3, continue: 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, catch: function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, ffmpeg_regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (ffmpeg_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new ffmpeg_OverloadYield(r, e); }, AsyncIterator: ffmpeg_regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? ffmpeg_regeneratorAsyncGen : ffmpeg_regeneratorAsync)(a(r), e, t, o, u); }, keys: ffmpeg_regeneratorKeys, values: ffmpeg_regeneratorValues }; })(); }
function ffmpeg_regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(ffmpeg_typeof(e) + " is not iterable"); }
function ffmpeg_regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function ffmpeg_regeneratorAsync(n, e, r, t, o) { var a = ffmpeg_regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function ffmpeg_regeneratorAsyncGen(r, e, t, o, n) { return new ffmpeg_regeneratorAsyncIterator(ffmpeg_regenerator().w(r, e, t, o), n || Promise); }
function ffmpeg_regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof ffmpeg_OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (ffmpeg_regeneratorDefine2(ffmpeg_regeneratorAsyncIterator.prototype), ffmpeg_regeneratorDefine2(ffmpeg_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), ffmpeg_regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function ffmpeg_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return ffmpeg_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (ffmpeg_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, ffmpeg_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, ffmpeg_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), ffmpeg_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", ffmpeg_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), ffmpeg_regeneratorDefine2(u), ffmpeg_regeneratorDefine2(u, o, "Generator"), ffmpeg_regeneratorDefine2(u, n, function () { return this; }), ffmpeg_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (ffmpeg_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function ffmpeg_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } ffmpeg_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { ffmpeg_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, ffmpeg_regeneratorDefine2(e, r, n, t); }
function ffmpeg_OverloadYield(e, d) { this.v = e, this.k = d; }
function ffmpeg_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function ffmpeg_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { ffmpeg_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { ffmpeg_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




/**
 * 使用 ffmpeg.wasm 合成视频
 * @param {string} videoUrl - 视频 URL
 * @param {string} audioUrl - 音频 URL
 * @param {Object} options - 配置选项
 * @param {Function} options.showProgress - 更新进度回调函数
 * @param {AbortController|null} [options.controller] - 可选的 AbortController，用于取消请求
 */
function mergeVideoAndAudio(_x, _x2, _x3) {
  return _mergeVideoAndAudio.apply(this, arguments);
}
function _mergeVideoAndAudio() {
  _mergeVideoAndAudio = ffmpeg_asyncToGenerator(/*#__PURE__*/ffmpeg_regeneratorRuntime().mark(function _callee2(videoUrl, audioUrl, _ref) {
    var showProgress, controller, ffmpeg, load, videoLoaded, audioLoaded, videoTotal, audioTotal, updateProgress, _yield$Promise$all, _yield$Promise$all2, videoData, audioData, mergedData;
    return ffmpeg_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            showProgress = _ref.showProgress, controller = _ref.controller;
            if (!(!videoUrl || videoUrl === '#')) {
              _context2.next = 4;
              break;
            }
            message_Message.warning('视频地址为空');
            throw new Error('videoUrl not found');
          case 4:
            if (!(!audioUrl || audioUrl === '#')) {
              _context2.next = 7;
              break;
            }
            message_Message.warning('音频地址为空');
            throw new Error('audioUrl not found');
          case 7:
            showProgress = showProgress || function (data) {
              console.log('[ffmpeg] Progress: ', data);
            };
            showProgress({
              message: '正在初始化FFmpeg'
            });
            ffmpeg = new FFmpegWASM.FFmpeg();
            load = /*#__PURE__*/function () {
              var _ref2 = ffmpeg_asyncToGenerator(/*#__PURE__*/ffmpeg_regeneratorRuntime().mark(function _callee() {
                var tryMultiThread, baseFFmpegUrl, baseCoreUrl, baseCoreMTUrl;
                return ffmpeg_regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        tryMultiThread = true; // const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
                        baseFFmpegUrl = 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd';
                        baseCoreUrl = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd';
                        baseCoreMTUrl = 'https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/umd';
                        ffmpeg.on('log', function (_ref3) {
                          var message = _ref3.message;
                          console.log('[ffmpeg]', message);
                        });
                        if (!(tryMultiThread && window.crossOriginIsolated)) {
                          _context.next = 25;
                          break;
                        }
                        console.log('[ffmpeg] 多线程模式');
                        _context.t0 = ffmpeg;
                        _context.next = 10;
                        return toBlobURL("".concat(baseCoreMTUrl, "/ffmpeg-core.js"), 'text/javascript');
                      case 10:
                        _context.t1 = _context.sent;
                        _context.next = 13;
                        return toBlobURL("".concat(baseCoreMTUrl, "/ffmpeg-core.wasm"), 'application/wasm');
                      case 13:
                        _context.t2 = _context.sent;
                        _context.next = 16;
                        return toBlobURL("".concat(baseCoreMTUrl, "/ffmpeg-core.worker.js"), 'application/javascript');
                      case 16:
                        _context.t3 = _context.sent;
                        _context.next = 19;
                        return toBlobURL("".concat(baseFFmpegUrl, "/814.ffmpeg.js"), 'text/javascript');
                      case 19:
                        _context.t4 = _context.sent;
                        _context.t5 = {
                          coreURL: _context.t1,
                          wasmURL: _context.t2,
                          workerURL: _context.t3,
                          workerLoadURL: _context.t4
                        };
                        _context.next = 23;
                        return _context.t0.load.call(_context.t0, _context.t5);
                      case 23:
                        _context.next = 39;
                        break;
                      case 25:
                        console.log('[ffmpeg] 单线程模式');
                        _context.t6 = ffmpeg;
                        _context.next = 29;
                        return toBlobURL("".concat(baseCoreUrl, "/ffmpeg-core.js"), 'text/javascript');
                      case 29:
                        _context.t7 = _context.sent;
                        _context.next = 32;
                        return toBlobURL("".concat(baseCoreUrl, "/ffmpeg-core.wasm"), 'application/wasm');
                      case 32:
                        _context.t8 = _context.sent;
                        _context.next = 35;
                        return toBlobURL("".concat(baseFFmpegUrl, "/814.ffmpeg.js"), 'text/javascript');
                      case 35:
                        _context.t9 = _context.sent;
                        _context.t10 = {
                          coreURL: _context.t7,
                          wasmURL: _context.t8,
                          workerLoadURL: _context.t9
                        };
                        _context.next = 39;
                        return _context.t6.load.call(_context.t6, _context.t10);
                      case 39:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function load() {
                return _ref2.apply(this, arguments);
              };
            }();
            _context2.prev = 11;
            _context2.next = 14;
            return load();
          case 14:
            showProgress({
              message: '准备下载视频和音频'
            });
            videoLoaded = 0, audioLoaded = 0, videoTotal = 0, audioTotal = 0; // 显示总进度
            updateProgress = function updateProgress() {
              var totalBytes = videoTotal + audioTotal;
              var loadedBytes = videoLoaded + audioLoaded;
              var overallPercent = totalBytes > 0 ? Math.floor(loadedBytes / totalBytes * 100) : 0;
              var msg = "\n                \u4E0B\u8F7D\u8FDB\u5EA6: ".concat(overallPercent, "% </br>\n                \u89C6\u9891: ").concat(prettyBytes(videoLoaded), " / ").concat(prettyBytes(videoTotal), " </br>\n                \u97F3\u9891: ").concat(prettyBytes(audioLoaded), " / ").concat(prettyBytes(audioTotal), " </br>\n            ").trim().replace(/\n\s*/g, '\n');
              showProgress({
                message: msg
              });
            }; // 无外部信号使用内部信号
            controller = controller || new AbortController();

            // 并行发起下载任务
            _context2.next = 20;
            return Promise.all([fetchFileWithProgress(videoUrl, {
              onProgress: function onProgress(loaded, total) {
                videoLoaded = loaded;
                videoTotal = total;
                updateProgress();
              },
              signal: controller.signal
            }), fetchFileWithProgress(audioUrl, {
              onProgress: function onProgress(loaded, total) {
                audioLoaded = loaded;
                audioTotal = total;
                updateProgress();
              },
              signal: controller.signal
            })]);
          case 20:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = ffmpeg_slicedToArray(_yield$Promise$all, 2);
            videoData = _yield$Promise$all2[0];
            audioData = _yield$Promise$all2[1];
            _context2.next = 26;
            return ffmpeg.writeFile('video.m4s', videoData);
          case 26:
            _context2.next = 28;
            return ffmpeg.writeFile('audio.m4s', audioData);
          case 28:
            showProgress({
              message: '正在合并视频和音频'
            });
            _context2.next = 31;
            return ffmpeg.exec(['-i', 'video.m4s', '-i', 'audio.m4s', '-c', 'copy', 'output.mp4']);
          case 31:
            showProgress({
              message: '合并成功，正在读取文件'
            });
            _context2.next = 34;
            return ffmpeg.readFile('output.mp4');
          case 34:
            mergedData = _context2.sent;
            return _context2.abrupt("return", Promise.resolve(new Blob([mergedData.buffer], {
              type: 'video/mp4'
            })));
          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](11);
            if (controller && controller.signal && !controller.signal.aborted) {
              controller.abort();
              message_Message.error('任务被迫中止');
            }
            console.error('Error merging streams:', _context2.t0);
            return _context2.abrupt("return", Promise.reject(_context2.t0));
          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[11, 38]]);
  }));
  return _mergeVideoAndAudio.apply(this, arguments);
}
var ffmpeg = {
  mergeVideoAndAudio: mergeVideoAndAudio
};
;// ./src/js/utils/download.js
function download_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = download_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function download_toConsumableArray(r) { return download_arrayWithoutHoles(r) || download_iterableToArray(r) || download_unsupportedIterableToArray(r) || download_nonIterableSpread(); }
function download_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function download_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return download_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? download_arrayLikeToArray(r, a) : void 0; } }
function download_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function download_arrayWithoutHoles(r) { if (Array.isArray(r)) return download_arrayLikeToArray(r); }
function download_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }








function rpc_type() {
  if (config_config.rpc_domain.startsWith('https://') || config_config.rpc_domain.match(/localhost|127\.0\.0\.1/)) {
    return 'post';
  } else {
    return 'ariang';
  }
}
function download_all() {
  var vb = video.base();
  var _ref = [video.get_quality().q, vb.total()],
    q = _ref[0],
    total = _ref[1];
  $('body').on('click', 'input[name="option_video"]', function (event) {
    if ($(this).is(':checked')) {
      $(this).parent().css('color', 'rgba(0,0,0,1)');
    } else {
      $(this).parent().css('color', 'rgba(0,0,0,0.5)');
    }
    function get_option_index(element) {
      return element && parseInt(element.id.split('_')[1]) || 0;
    }
    if (event.ctrlKey || event.altKey) {
      // 记录当前点击option的index
      var current_select_option_index = get_option_index(event.target);
      // 获取所有复选框
      var option_videos = download_toConsumableArray(document.getElementsByName('option_video'));
      if (event.target.checked) {
        // checked = true: 选中`上一个被选中`到`这次被选中`的所有option
        var previous_selected_option_index = get_option_index(option_videos.filter(function (e) {
          return e.checked && get_option_index(e) < current_select_option_index;
        }).slice(-1)[0]);
        for (var i = previous_selected_option_index; i < current_select_option_index; i++) {
          option_videos[i].checked = true;
          option_videos[i].parentNode.style.color = 'rgba(0,0,0,1)';
        }
      } else {
        //checked = false，取消选中`上一个未被选中`到`这次被取消选中`的所有option
        var previous_not_selected_option_index = get_option_index(option_videos.filter(function (e) {
          return !e.checked && get_option_index(e) < current_select_option_index;
        }).slice(-1)[0]);
        for (var _i = previous_not_selected_option_index; _i < current_select_option_index; _i++) {
          option_videos[_i].checked = false;
          option_videos[_i].parentNode.style.color = 'rgba(0,0,0,0.5)';
        }
      }
    }
  });
  var video_html = '';
  for (var i = 0; i < total; i++) {
    video_html += '' + "<label for=\"option_".concat(i, "\"><div style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"option_").concat(i, "\" name=\"option_video\" value=\"").concat(i, "\">\n                P").concat(i + 1, " ").concat(vb.title(i + 1), "\n            </div></label><hr>");
  }
  var all_checked = false;
  $('body').on('click', 'button#checkbox_btn', function () {
    if (all_checked) {
      all_checked = false;
      $('input[name="option_video"]').prop('checked', all_checked);
      $('input[name="option_video"]').parent().css('color', 'rgba(0,0,0,0.5)');
    } else {
      all_checked = true;
      $('input[name="option_video"]').prop('checked', all_checked);
      $('input[name="option_video"]').parent().css('color', 'rgb(0,0,0)');
    }
  });
  var quality_support = video.get_quality_support();
  var option_support_html = '';
  var _iterator = download_createForOfIteratorHelper(quality_support),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      option_support_html += "<option value=\"".concat(item, "\">").concat(videoQualityMap[item], "</option>");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var msg = '' + "<div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u683C\u5F0F:</label>\n            <select id=\"dl_format\">\n                <option value=\"mp4\" selected>MP4</option>\n                <option value=\"flv\">FLV</option>\n                <option value=\"dash\">DASH</option>\n            </select>\n            &nbsp;&nbsp;\u65E0\u6CD5\u8BBE\u7F6EMP4\u6E05\u6670\u5EA6\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u8D28\u91CF:</label>\n            <select id=\"dl_quality\">\n                ".concat(option_support_html, "\n            </select>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4E0B\u8F7D\u9009\u62E9:</label>\n            <label style=\"color:rgba(0,0,0,1);\">\n                <input type=\"checkbox\" id=\"dl_video\" name=\"dl_option\" checked=\"checked\">\n                <label for=\"dl_video\">\u89C6\u9891</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_subtitle\" name=\"dl_option\">\n                <label for=\"dl_subtitle\">\u5B57\u5E55</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_danmaku\" name=\"dl_option\">\n                <label for=\"dl_danmaku\">\u5F39\u5E55</label>\n            </label>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4FDD\u5B58\u76EE\u5F55:</label>\n            <input id=\"dl_rpc_dir\" placeholder=\"").concat(rpc_type() === 'post' ? config_config.rpc_dir : config_config.ariang_dir || '为空使用默认目录', "\" style=\"width:80%;\"/>\n        </div>\n        <b>\n            <span style=\"color:red;\">\u4E3A\u907F\u514D\u8BF7\u6C42\u88AB\u62E6\u622A\uFF0C\u8BBE\u7F6E\u4E86\u5EF6\u65F6\u4E14\u4E0D\u652F\u6301\u4E0B\u8F7D\u65E0\u6CD5\u64AD\u653E\u7684\u89C6\u9891\uFF1B\u8BF7\u52FF\u9891\u7E41\u4E0B\u8F7D\u8FC7\u591A\u89C6\u9891\uFF0C\u53EF\u80FD\u89E6\u53D1\u98CE\u63A7\u5BFC\u81F4\u4E0D\u53EF\u518D\u4E0B\u8F7D\uFF01</span>\n        </b><br />\n        <div style=\"height:240px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);\">\n            ").concat(video_html, "\n        </div>\n        <div style=\"margin:2% 0;\">\n            <button id=\"checkbox_btn\">\u5168\u9009</button>\n        </div>");
  MessageBox.confirm(msg, function () {
    // 获取参数
    var _ref2 = [$('#dl_video').is(':checked'), $('#dl_subtitle').is(':checked'), $('#dl_danmaku').is(':checked'), $('#dl_format').val(), $('#dl_quality').val() || q, $('#dl_rpc_dir').val()],
      dl_video = _ref2[0],
      dl_subtitle = _ref2[1],
      dl_danmaku = _ref2[2],
      dl_format = _ref2[3],
      dl_quality = _ref2[4],
      dl_rpc_dir = _ref2[5];
    var videos = [];
    for (var _i2 = 0; _i2 < total; _i2++) {
      if (!$("input#option_".concat(_i2)).is(':checked')) {
        continue;
      }
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
    if (dl_video) {
      // 下载视频
      download_videos(videos, 0, []);
    }
    if (dl_subtitle) {
      // 下载字幕
      if (videos.length === 1) {
        download_subtitle_vtt(videos[0].p, videos[0].filename);
      } else {
        download_subtitle_vtt_zip([].concat(videos), new JSZip());
      }
    }
    if (dl_danmaku) {
      // 下载弹幕
      if (videos.length === 1) {
        download_danmaku_ass(videos[0].cid, videos[0].filename);
      } else {
        download_danmaku_ass_zip([].concat(videos), new JSZip());
      }
    }
  });
  $('#dl_quality').val(q);

  // 处理input颜色
  $('body').on('click', 'input[name="dl_option"]', function () {
    if ($(this).is(':checked')) {
      $(this).parent().css('color', 'rgba(0,0,0,1)');
    } else {
      $(this).parent().css('color', 'rgba(0,0,0,0.5)');
    }
  });
  function download_videos(video_tasks, i, videos) {
    // 递归请求下载

    if (!video_tasks.length) {
      return;
    }
    if (i >= video_tasks.length) {
      MessageBox.alert('视频地址请求完成！');
      if (rpc_type() === 'post') {
        if (videos.length > 0) {
          download_rpc_post_all(videos);
          videos.length = 0;
        }
      }
      // one by one -> null
      return;
    }
    var task = video_tasks[i];
    var msg = "\u7B2C".concat(i + 1, "\uFF08").concat(i + 1, "/").concat(video_tasks.length, "\uFF09\u4E2A\u89C6\u9891");
    MessageBox.alert("".concat(msg, "\uFF1A\u83B7\u53D6\u4E2D..."));
    var success = function success(res) {
      setTimeout(function () {
        download_videos(video_tasks, ++i, videos);
      }, 4000);
      if (res.code) {
        return;
      }
      message_Message.success('请求成功' + (res.times ? "<br/>\u4ECA\u65E5\u5269\u4F59\u8BF7\u6C42\u6B21\u6570".concat(res.times) : ''));
      MessageBox.alert("".concat(msg, "\uFF1A\u83B7\u53D6\u6210\u529F\uFF01"));
      var _ref3 = [res.url, rpc_type(), res.video, res.audio],
        url = _ref3[0],
        type = _ref3[1],
        video_url = _ref3[2],
        audio_url = _ref3[3];
      if (type === 'post') {
        if (task.format === 'dash') {
          // 处理dash
          videos.push({
            url: video_url,
            filename: task.filename + format(video_url),
            rpc_dir: task.rpc_dir
          }, {
            url: audio_url,
            filename: task.filename + '.m4a',
            rpc_dir: task.rpc_dir
          });
        } else {
          videos.push({
            url: url,
            filename: task.filename + format(url),
            rpc_dir: task.rpc_dir
          });
        }
        if (videos.length > 3) {
          download_rpc_post_all(videos);
          videos.length = 0;
        }
      } else if (type === 'ariang') {
        if (task.format === 'dash') {
          // 处理dash
          download_rpc_ariang({
            url: video_url,
            filename: task.filename + format(video_url),
            rpc_dir: task.rpc_dir
          }, {
            url: audio_url,
            filename: task.filename + '.m4a',
            rpc_dir: task.rpc_dir
          });
        } else {
          download_rpc_ariang({
            url: url,
            filename: task.filename + format(url),
            rpc_dir: task.rpc_dir
          });
        }
      }
    };
    var error = function error() {
      download_videos(video_tasks, ++i, videos);
    };
    api.get_urls(task.p, task.q, task.format, success, error);
  }
}

/**
 * rpc
 */
function get_rpc_post(data) {
  // [...{ url, filename, rpc_dir }]
  if (!(data instanceof Array)) {
    data = data instanceof Object ? [data] : [];
  }
  var rpc = {
    domain: config_config.rpc_domain,
    port: config_config.rpc_port,
    path: config_config.rpc_path || '/jsonrpc',
    token: config_config.rpc_token,
    dir: config_config.rpc_dir
  };
  return {
    url: "".concat(rpc.domain, ":").concat(rpc.port).concat(rpc.path),
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data.map(function (_ref4) {
      var url = _ref4.url,
        filename = _ref4.filename,
        rpc_dir = _ref4.rpc_dir;
      var param = {
        out: filename,
        header: ["User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href)]
      };
      if (rpc_dir || rpc.dir) {
        param.dir = rpc_dir || rpc.dir;
      }
      return {
        id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
        jsonrpc: '2.0',
        method: 'aria2.addUri',
        params: ["token:".concat(rpc.token), [url], param]
      };
    }))
  };
}
function download_rpc(url, filename) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';
  if (type === 'post') {
    download_rpc_post({
      url: url,
      filename: filename
    });
  } else if (type === 'ariang') {
    download_rpc_ariang({
      url: url,
      filename: filename
    });
  }
}
var download_rpc_clicked = false;
function download_rpc_post(video) {
  download_rpc_post_all([video]);
}
function download_rpc_post_all(videos) {
  if (download_rpc_clicked) {
    message_Message.miaow();
    return;
  }
  download_rpc_clicked = true;
  var data = download_toConsumableArray(videos);
  ajax(get_rpc_post(data)).then(function (res) {
    if (res.length === data.length) {
      message_Message.success('RPC请求成功');
    } else {
      message_Message.warning('请检查RPC参数');
    }
  }).catch(function () {
    message_Message.error('请检查RPC服务配置');
  }).finally(function () {
    return download_rpc_clicked = false;
  });
  message_Message.info('发送RPC下载请求');
}
function open_ariang(rpc) {
  var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace('://', '/'), "/").concat(rpc.port).concat(rpc.path).concat(window.btoa(rpc.token)) : '';
  var url = config_config.ariang_host + hash_tag;
  var a = document.createElement('a');
  a.style.display = 'none';
  a.onclick = function () {
    window.bp_aria2_window = window.open(url);
  };
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function download_rpc_ariang_send(video) {
  var bp_aria2_window = window.bp_aria2_window;
  var time = 100;
  if (!bp_aria2_window || bp_aria2_window.closed) {
    open_ariang();
    time = 3000;
  }
  setTimeout(function () {
    var bp_aria2_window = window.bp_aria2_window;
    var cmd = ["url=".concat(encodeURIComponent(window.btoa(video.url))), "out=".concat(encodeURIComponent(video.filename)), "header=User-Agent:".concat(window.navigator.userAgent), "header=Referer:".concat(window.location.origin)];
    // issues#94
    if (video.rpc_dir || config_config.ariang_dir) {
      cmd.push("dir=".concat(encodeURIComponent(video.rpc_dir || config_config.ariang_dir)));
    }
    var task_hash = '#!/new/task?' + cmd.join('&');
    if (bp_aria2_window && !bp_aria2_window.closed) {
      bp_aria2_window.location.href = config_config.ariang_host + task_hash;
      message_Message.success('发送RPC请求');
    } else {
      message_Message.warning('AriaNg页面未打开');
    }
  }, time);
}
function download_rpc_ariang() {
  for (var _len = arguments.length, videos = new Array(_len), _key = 0; _key < _len; _key++) {
    videos[_key] = arguments[_key];
  }
  if (videos.length == 0) {
    return;
  }
  if (videos.length == 1 && videos[0] instanceof Array) {
    download_rpc_ariang.apply(void 0, download_toConsumableArray(videos[0]));
    return;
  }
  download_rpc_ariang_send(videos.pop());
  setTimeout(function () {
    download_rpc_ariang.apply(void 0, videos);
  }, 100);
}

/**
 * blob
 */
var download_blob_clicked = false,
  need_show_progress = true;
function show_progress(_ref5) {
  var total = _ref5.total,
    loaded = _ref5.loaded,
    percent = _ref5.percent;
  if (need_show_progress) {
    MessageBox.alert("\u6587\u4EF6\u5927\u5C0F\uFF1A".concat(prettyBytes(total), "(").concat(total, "Byte)<br/>") + "\u5DF2\u7ECF\u4E0B\u8F7D\uFF1A".concat(prettyBytes(loaded), "(").concat(loaded, "Byte)<br/>") + "\u5F53\u524D\u8FDB\u5EA6\uFF1A".concat(percent, "%<br/>\u4E0B\u8F7D\u4E2D\u8BF7\u52FF\u64CD\u4F5C\u6D4F\u89C8\u5668\uFF0C\u5237\u65B0\u6216\u79BB\u5F00\u9875\u9762\u4F1A\u5BFC\u81F4\u4E0B\u8F7D\u53D6\u6D88\uFF01<br/>\u518D\u6B21\u70B9\u51FB\u4E0B\u8F7D\u6309\u94AE\u53EF\u67E5\u770B\u4E0B\u8F7D\u8FDB\u5EA6\u3002"), function () {
      need_show_progress = false;
    });
  }
  if (total === loaded) {
    MessageBox.alert('下载完成，请等待浏览器保存！');
    download_blob_clicked = false;
  }
}
function download_blob(url, filename) {
  if (download_blob_clicked) {
    message_Message.miaow();
    need_show_progress = true;
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(this.response, filename);
        return;
      }
      var blob_url = URL.createObjectURL(this.response);
      downloadBlobURL(blob_url, filename);
    }
  };
  need_show_progress = true;
  xhr.onprogress = function (evt) {
    if (this.state != 4) {
      var loaded = evt.loaded;
      var tot = evt.total;
      show_progress({
        total: tot,
        loaded: loaded,
        percent: Math.floor(100 * loaded / tot)
      });
    }
  };
  xhr.onerror = function () {
    message_Message.error('下载失败');
    download_blob_clicked = false;
  };
  xhr.send();
  download_blob_clicked = true; // locked
  message_Message.info('准备开始下载');
}

/**
 * blob_merge
 */
var download_blob_merge_clicked = false,
  need_show_merge_progress = true;
function download_blob_merge(video_url, audio_url, filename) {
  if (download_blob_merge_clicked) {
    message_Message.miaow();
    need_show_merge_progress = true;
    return;
  }
  download_blob_merge_clicked = true;
  need_show_merge_progress = true;
  var controller = new AbortController();
  function show_merge_progress(_ref6) {
    var message = _ref6.message,
      loaded = _ref6.loaded,
      total = _ref6.total,
      isFinished = _ref6.isFinished;
    if (need_show_merge_progress) {
      var content = "\n                ".concat(message, "</br>\n                ").concat(loaded && total && "\n                \u4E0B\u8F7D\u8FDB\u5EA6: ".concat(Math.round(loaded / total * 100), "% </br>\n                \u6587\u4EF6\u5927\u5C0F\uFF1A").concat(prettyBytes(total), " <br/>\n                \u5DF2\u7ECF\u4E0B\u8F7D\uFF1A").concat(prettyBytes(loaded)) || '', "\n                \u8BF7\u52FF\u64CD\u4F5C\u6D4F\u89C8\u5668\uFF0C\u5237\u65B0\u6216\u79BB\u5F00\u9875\u9762\u4F1A\u5BFC\u81F4\u4E0B\u8F7D\u53D6\u6D88\uFF01\n            ");
      MessageBox.confirm(content, function () {
        need_show_merge_progress = false;
      }, function () {
        controller.abort();
      });
    }
    if (isFinished) {
      MessageBox.alert('下载完成，请等待浏览器保存！');
      download_blob_merge_clicked = false;
    }
  }
  message_Message.info('准备开始下载');
  ffmpeg.mergeVideoAndAudio(video_url, audio_url, {
    showProgress: show_merge_progress,
    controller: controller
  }).then(function (mergedBlob) {
    if (!mergedBlob || mergedBlob.size === 0) {
      message_Message.error('合并视频失败');
      return;
    }
    show_merge_progress({
      isFinished: true
    });
    downloadBlob(mergedBlob, filename);
  }).catch(function (error) {
    console.error(error);
    if (error.name === 'AbortError') {
      message_Message.warning('已取消下载');
      return;
    }
    if (!controller.signal.aborted) {
      controller.abort();
    }
    message_Message.error('合并下载失败');
  }).finally(function () {
    download_blob_merge_clicked = false;
  });
}

/**
 * danmaku & subtitle
 */
function _download_danmaku_ass(cid, title) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // todo: 暂时使用随机弹幕
  ajax({
    url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
    dataType: 'text'
  }).then(function (result) {
    var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''));
    if (!result_dom || !result_dom.find('d')[0]) {
      if (return_type === 'callback' && callback) {
        callback();
        return;
      }
      message_Message.warning('未发现弹幕');
      return;
    } else {
      // 1.json
      var danmaku_data = result_dom.find('d').map(function (i, el) {
        var item = $(el);
        var p = item.attr('p').split(',');
        var type = 0;
        if (p[1] === '4') {
          type = 2;
        } else if (p[1] === '5') {
          type = 1;
        }
        return [{
          time: parseFloat(p[0]),
          type: type,
          color: parseInt(p[3]),
          text: item.text()
        }];
      }).get().sort(function (a, b) {
        return a.time - b.time;
      });
      // 2.dialogue
      var dialogue = function dialogue(danmaku, scroll_id, fix_id) {
        var encode = function encode(text) {
          return text.replace(/\{/g, '｛').replace(/\}/g, '｝').replace(/\r|\n/g, '');
        };
        var colorCommand = function colorCommand(color) {
          var r = color >> 16 & 0xff,
            g = color >> 8 & 0xff,
            b = color & 0xff;
          return "\\c&H".concat((b << 16 | g << 8 | r).toString(16), "&");
        };
        //const borderColorCommand = color => `\\3c&H${color.toString(16)}&`
        var isWhite = function isWhite(color) {
          return color === 16777215;
        };
        var scrollCommand = function scrollCommand(top, left_a, left_b) {
          return "\\move(".concat(left_a, ",").concat(top, ",").concat(left_b, ",").concat(top, ")");
        };
        var fixCommand = function fixCommand(top, left) {
          return "\\pos(".concat(left, ",").concat(top, ")");
        };
        var scrollTime = 8,
          fixTime = 4;
        var text = danmaku.text,
          time = danmaku.time;
        var commands = [danmaku.type === 0 ? scrollCommand(50 * (1 + Math.floor(Math.random() * 15)), 1920 + 50 * danmaku.text.length / 2, 0 - 50 * danmaku.text.length / 2) : fixCommand(50 * (1 + fix_id % 15), 960), isWhite(danmaku.color) ? '' : colorCommand(danmaku.color)
        //isWhite(danmaku.color) ? '' : borderColorCommand(danmaku.color)
        ];
        var formatTime = function formatTime(seconds) {
          var div = function div(i, j) {
            return Math.floor(i / j);
          };
          var pad = function pad(n) {
            return n < 10 ? '0' + n : '' + n;
          };
          var integer = Math.floor(seconds);
          var hour = div(integer, 60 * 60);
          var minute = div(integer, 60) % 60;
          var second = integer % 60;
          var minorSecond = Math.floor((seconds - integer) * 100); // 取小数部分2位
          return "".concat(hour, ":").concat(pad(minute), ":").concat(pad(second), ".").concat(minorSecond);
        };
        var fields = [0,
        // Layer,
        formatTime(time),
        // Start
        formatTime(time + (danmaku.type === 0 ? scrollTime : fixTime)),
        // End
        'Medium',
        // Style
        '',
        // Name
        '0',
        // MarginL
        '0',
        // MarginR
        '0',
        // MarginV
        '',
        // Effect
        '{' + commands.join('') + '}' + encode(text) // Text
        ];
        return 'Dialogue: ' + fields.join(',');
      };
      // todo 3. make
      var content = ['[Script Info]', '; Script generated by injahow/user.js', '; https://github.com/injahow/user.js', "Title: ".concat(title), 'ScriptType: v4.00+', "PlayResX: ".concat(1920), "PlayResY: ".concat(1080), 'Timer: 10.0000', 'WrapStyle: 2', 'ScaledBorderAndShadow: no', '', '[V4+ Styles]', 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding', 'Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', '', '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'];
      var scroll_id = 0,
        fix_id = 0;
      var _iterator2 = download_createForOfIteratorHelper(danmaku_data),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var danmaku = _step2.value;
          if (danmaku.type === 0) {
            scroll_id++;
          } else {
            fix_id++;
          }
          content.push(dialogue(danmaku, scroll_id, fix_id));
        }
        // 4.ass & return
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var data = content.join('\n');
      if (return_type === null || return_type === 'file') {
        downloadBlob(new Blob([data], {
          type: 'text/ass'
        }), title + '.ass');
      } else if (return_type === 'callback' && callback) {
        callback(data);
      }
    }
  }).catch(function () {
    if (return_type === 'callback' && callback) {
      callback();
    }
  });
}
function download_danmaku_ass(cid, title) {
  _download_danmaku_ass(cid, title, 'file');
}
function download_subtitle_vtt() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var filename = arguments.length > 1 ? arguments[1] : undefined;
  var download_subtitle = function download_subtitle(blob_url) {
    if (!blob_url) {
      message_Message.warning('未发现字幕');
      return;
    }
    downloadBlobURL(blob_url, filename + '.vtt');
  };
  api.get_subtitle_url(p, download_subtitle);
}
function download_blob_zip(blob_data, filename) {
  if (!blob_data) return;
  downloadBlob(blob_data, filename + '.zip');
}

/**
 * 批量下载弹幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_danmaku_ass_zip(videos, zip) {
  if (!videos) return;
  if (videos.length === 0) {
    if (Object.keys(zip.files).length === 0) {
      message_Message.warning('未发现弹幕');
      return;
    }
    zip.generateAsync({
      type: 'blob'
    }).then(function (data) {
      return download_blob_zip(data, video.base().getFilename() + '_ass');
    });
    return;
  }
  var _videos$pop = videos.pop(),
    cid = _videos$pop.cid,
    filename = _videos$pop.filename;
  _download_danmaku_ass(cid, filename, 'callback', function (data) {
    if (data) {
      zip.file(filename + '.ass', data);
    }
    setTimeout(function () {
      download_danmaku_ass_zip(videos, zip);
    }, 1000);
  });
}

/**
 * 批量下载字幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_subtitle_vtt_zip(videos, zip) {
  if (!videos) return;
  if (videos.length === 0) {
    if (Object.keys(zip.files).length === 0) {
      message_Message.warning('未发现字幕');
      return;
    }
    zip.generateAsync({
      type: 'blob'
    }).then(function (data) {
      return download_blob_zip(data, video.base().getFilename() + '_vtt');
    });
    return;
  }
  var _videos$pop2 = videos.pop(),
    p = _videos$pop2.p,
    filename = _videos$pop2.filename;
  api.get_subtitle_data(p, function (data) {
    if (data) {
      zip.file(filename + '.vtt', data);
    }
    setTimeout(function () {
      download_subtitle_vtt_zip(videos, zip);
    }, 1000);
  });
}
function format(url) {
  if (!url) return '';
  if (url.match('.mp4|.m4s')) {
    return '.mp4';
  } else if (url.match('.flv')) {
    return '.flv';
  }
  return '.mp4';
}
function download(url, filename, type) {
  filename = filename.replace(/[\/\\*|]+/g, '-').replace(/:/g, '：').replace(/\?/g, '？').replace(/"/g, '\'').replace(/</g, '《').replace(/>/g, '》');
  if (type === 'blob') {
    download_blob(url, filename);
  } else if (type === 'rpc') {
    download_rpc(url, filename, rpc_type());
  }
}
var Download = {
  url_format: format,
  download: download,
  download_blob_merge: download_blob_merge,
  download_all: download_all,
  download_danmaku_ass: download_danmaku_ass,
  download_subtitle_vtt: download_subtitle_vtt,
  open_ariang: open_ariang
};
;// ./src/html/config.html
// Module
var config_code = "<div id=\"bp_config\"> <div class=\"config-mark\"></div> <div class=\"config-bg\"> <span style=\"font-size:20px;display:block;margin-bottom:15px\"> <b>bilibili视频下载 参数设置</b> <b> <a href=\"javascript:;\" id=\"reset_config\"> [重置] </a> <a style=\"text-decoration:underline\" href=\"javascript:;\" id=\"show_help\">&lt;通知/帮助&gt;</a> </b> </span> <div style=\"display:flex;gap:10px;height:460px\"> <div style=\"flex-shrink:0;border-right:1px solid #ddd;padding-right:10px;overflow-y:auto\"> <ul style=\"list-style:none;padding:0;margin:0;font-size:14px\"> <li><a href=\"javascript:;\" data-tab=\"basic\" class=\"tab-link active\">基本设置</a></li> <li><a href=\"javascript:;\" data-tab=\"other\" class=\"tab-link\">其他设置</a></li> </ul> </div> <div id=\"tab-content\" style=\"flex:1;overflow-y:auto;padding-left:10px;font-size:14px\"> <div class=\"tab-panel\" data-id=\"basic\"> <div style=\"margin:2% 0\"> <label>请求地址：</label> <input id=\"base_api\" style=\"width:40%\"/>&nbsp;&nbsp;&nbsp;&nbsp; <label>请求方式：</label> <select id=\"request_type\"> <option value=\"auto\">自动判断</option> <option value=\"local\">本地请求</option> <option value=\"remote\">远程请求</option> </select><br/> <small>注意：普通使用请勿修改；默认使用混合请求</small> </div> <div style=\"margin:2% 0\"> <label>视频格式：</label> <select id=\"format\"> <option value=\"mp4\">MP4</option> <option value=\"flv\">FLV</option> <option value=\"dash\">DASH</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>切换CDN：</label> <select id=\"host_key\"> {{host_key_options}} </select><br/> <small>注意：无法选择MP4清晰度；建议特殊地区或播放异常时切换（自行选择合适线路）</small> </div> <div style=\"margin:2% 0\"> <label>视频质量：</label> <select id=\"video_quality\"> {{video_quality_options}} </select><br/> <small>提示：脚本识别错误时可手动设置请求的视频质量参数</small> </div> <div style=\"margin:2% 0\"> <label>下载方式：</label> <select id=\"download_type\"> <option value=\"a\">URL链接</option> <option value=\"web\">Web请求</option> <option value=\"aria\">Aria2命令</option> <option value=\"blob\">Blob请求</option> <option value=\"blob_merge\">Blob合并</option> <option value=\"rpc\">RPC接口</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>AriaNg地址：</label> <input id=\"ariang_host\" style=\"width:40%\"/><br/> <small>提示：建议使用RPC请求下载；非HTTPS或非本地RPC域名使用AriaNg下载</small> </div> <div style=\"margin:2% 0\"> <label>RPC配置：[ 域名 : 端口 | 路径 | 密钥 ]</label><br/> <input id=\"rpc_domain\" placeholder=\"ws://192.168.1.1\" style=\"width:25%\"/> : <input id=\"rpc_port\" placeholder=\"6800\" style=\"width:10%\"/> | <input id=\"rpc_path\" placeholder=\"/jsonrpc\" style=\"width:20%\"/> | <input id=\"rpc_token\" placeholder=\"未设置不填\" style=\"width:15%;color:transparent\" onFocus=\"this.style.color='black';\" onBlur=\"this.style.color='transparent';\"/><br/> <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small> </div> <div style=\"margin:2% 0\"> <label>自动下载：</label> <select id=\"auto_download\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select><br/> <small>说明：请求地址成功后将自动点击下载视频按钮</small> </div> <div style=\"margin:2% 0\"> <label>授权状态：</label> <select id=\"auth\" disabled=\"disabled\"> <option value=\"0\">未授权</option> <option value=\"1\">已授权</option> </select> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login\">扫码授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_2\">网页授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_logout\">取消授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_help\">授权说明</a> </div> </div> <div class=\"tab-panel\" data-id=\"other\" style=\"display:none\"> <div style=\"margin:2% 0\"> <label>RPC下载目录：</label> <input id=\"rpc_dir\" placeholder=\"留空使用默认目录\" style=\"width:70%\"/> </div> <div style=\"margin:2% 0\"> <label>AriaNg下载目录：</label> <input id=\"ariang_dir\" placeholder=\"留空使用默认目录\" style=\"width:70%\"/> </div> <div style=\"margin:2% 0\"> <span>[Aria2参数]</span><br/> <label>最大连接：</label> <select id=\"aria2c_connection_level\"> <option value=\"min\">1</option> <option value=\"mid\">8</option> <option value=\"max\">16</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>附加参数：</label> <input id=\"aria2c_addition_parameters\" placeholder=\"见Aria2c文档\" style=\"width:40%\"/><br/> <small>说明：用于配置Aria2命令下载方式的参数</small> </div> <div style=\"margin:2% 0\"> <label>强制换源：</label> <select id=\"replace_force\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕速度：</label> <input id=\"danmaku_speed\" style=\"width:10%\"/> s&nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕字号：</label> <input id=\"danmaku_fontsize\" style=\"width:10%\"/> px&nbsp;&nbsp;&nbsp;&nbsp; <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small> </div> <div style=\"margin:2% 0\"> <label>UI超时时间：</label> <input id=\"show_ui_timeout\" style=\"width:10%\"> s <small>说明：脚本初始化时，超时没有正常显示UI的检查时间，数值填写正整数</small> </div> <div style=\"margin:2% 0\"> <label>UI加载提示：</label> <select id=\"show_ui_confirm\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select> <small>说明：脚本初始化UI时，如果检测到页面异常会进行弹窗提示是否手动加载</small> </div> <div style=\"margin:2% 0\"> <label>UI强制加载：</label> <select id=\"show_ui_confirm_load_force\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select> <small>说明：启用UI加载超时弹窗时，自动确认强制加载UI，可能导致页面异常</small> </div> </div> </div> </div> <div style=\"text-align:right;margin-top:20px\"> <button class=\"setting-button\" id=\"save_config\">确定</button> </div> </div> <style>#bp_config{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:10000}#bp_config .config-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;max-width:90vw;max-height:90vh;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:10001}#bp_config .config-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:10000}#bp_config .setting-button{width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}#bp_config .setting-button:hover{background:#59f}#bp_config .setting-context{margin:0 1%;color:#00f}#bp_config .setting-context:hover{color:red}#bp_config .tab-link{display:block;padding:8px 10px;margin:4px 0;border-radius:4px;color:#333;text-decoration:none;font-weight:500;transition:all .2s}#bp_config .tab-link:hover{background:#eef5ff}#bp_config .tab-link.active{background:#1e90ff;color:#fff}#bp_config small{color:#666;font-size:12px;margin-top:4px;display:block}#bp_config label{font-weight:500;min-width:60px;display:inline-block}#bp_config input,#bp_config select{padding:4px 6px;border:1px solid #ccc;border-radius:3px}#bp_config input:focus,#bp_config select:focus{border-color:#1e90ff;outline:0}</style> </div>";
// Exports
/* harmony default export */ var config = (config_code);
;// ./src/js/ui/config.js
function config_typeof(o) { "@babel/helpers - typeof"; return config_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, config_typeof(o); }
var _document$head$innerH;
function config_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function config_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? config_ownKeys(Object(t), !0).forEach(function (r) { config_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : config_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function config_defineProperty(e, r, t) { return (r = config_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function config_toPropertyKey(t) { var i = config_toPrimitive(t, "string"); return "symbol" == config_typeof(i) ? i : i + ""; }
function config_toPrimitive(t, r) { if ("object" != config_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != config_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var config_config = {
  base_api: 'https://api.injahow.cn/bparse/',
  request_type: 'auto',
  format: 'mp4',
  host_key: '0',
  replace_force: '0',
  download_type: 'web',
  // rpc
  rpc_domain: 'http://localhost',
  rpc_port: '16800',
  rpc_token: '',
  rpc_path: '/jsonrpc',
  rpc_dir: '',
  ariang_dir: '',
  // aria2
  aria2c_connection_level: 'min',
  aria2c_addition_parameters: '',
  ariang_host: 'http://ariang.injahow.com/',
  auto_download: '0',
  video_quality: '0',
  danmaku_speed: '15',
  danmaku_fontsize: '22',
  show_ui_timeout: '6',
  show_ui_confirm: '0',
  show_ui_confirm_load_force: '0'
};
var default_config = Object.assign({}, config_config); // 浅拷贝

var hostMap = {
  local: ((_document$head$innerH = document.head.innerHTML.match(/up[\w-]+\.bilivideo\.com/)) === null || _document$head$innerH === void 0 ? void 0 : _document$head$innerH[0]) || '未发现本地CDN',
  bd: 'upos-sz-mirrorbd.bilivideo.com',
  ks3: 'upos-sz-mirrorks3.bilivideo.com',
  ks3b: 'upos-sz-mirrorks3b.bilivideo.com',
  ks3c: 'upos-sz-mirrorks3c.bilivideo.com',
  ks32: 'upos-sz-mirrorks32.bilivideo.com',
  kodo: 'upos-sz-mirrorkodo.bilivideo.com',
  kodob: 'upos-sz-mirrorkodob.bilivideo.com',
  cos: 'upos-sz-mirrorcos.bilivideo.com',
  cosb: 'upos-sz-mirrorcosb.bilivideo.com',
  bos: 'upos-sz-mirrorbos.bilivideo.com',
  wcs: 'upos-sz-mirrorwcs.bilivideo.com',
  wcsb: 'upos-sz-mirrorwcsb.bilivideo.com',
  /* 不限CROS, 限制UA */
  hw: 'upos-sz-mirrorhw.bilivideo.com',
  hwb: 'upos-sz-mirrorhwb.bilivideo.com',
  upbda2: 'upos-sz-upcdnbda2.bilivideo.com',
  upws: 'upos-sz-upcdnws.bilivideo.com',
  uptx: 'upos-sz-upcdntx.bilivideo.com',
  uphw: 'upos-sz-upcdnhw.bilivideo.com',
  js: 'upos-tf-all-js.bilivideo.com',
  hk: 'cn-hk-eq-bcache-01.bilivideo.com',
  akamai: 'upos-hz-mirrorakam.akamaized.net'
};
var videoQualityMap = {
  127: '8K 超高清',
  120: '4K 超高清',
  116: '1080P 60帧',
  112: '1080P 高码率',
  80: '1080P 高清',
  74: '720P 60帧',
  64: '720P 准高清',
  48: '720P 高清(MP4)',
  32: '480P 清晰',
  16: '360P 流畅'
};
var help_clicked = false;
var config_functions = {
  save_config: function save_config() {
    var old_config;
    try {
      old_config = JSON.parse(store.get('config_str'));
    } catch (err) {
      old_config = {};
    } finally {
      old_config = config_objectSpread(config_objectSpread({}, default_config), old_config);
    }
    // 差量保存
    var config_str = {};
    for (var key in default_config) {
      if (config_config[key] !== default_config[key]) {
        config_str[key] = config_config[key];
      }
    }
    store.set('config_str', JSON.stringify(config_str));

    // 判断重新请求 todo: auth
    for (var _i = 0, _arr = ['base_api', 'format', 'video_quality']; _i < _arr.length; _i++) {
      var _key = _arr[_i];
      if (config_config[_key] !== old_config[_key]) {
        $('#video_download').hide();
        $('#video_download_2').hide();
        break;
      }
    }
    if (config_config.host_key !== old_config.host_key) {
      check.refresh();
      $('#video_url').attr('href', '#');
      $('#video_url_2').attr('href', '#');
    }
    // 判断RPC配置情况
    if (config_config.rpc_domain !== old_config.rpc_domain) {
      if (!(config_config.rpc_domain.match('https://') || config_config.rpc_domain.match(/(localhost|127\.0\.0\.1)/))) {
        MessageBox.alert('检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；' + '请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；' + '配置好后即可使用脚本进行远程下载，使用期间不用关闭AriaNg页面！', function () {
          Download.open_ariang({
            domain: config_config.rpc_domain,
            port: config_config.rpc_port,
            token: config_config.rpc_token
          });
        });
      }
    }
    // 更新弹幕设置
    for (var _i2 = 0, _arr2 = ['danmaku_speed', 'danmaku_fontsize']; _i2 < _arr2.length; _i2++) {
      var _key2 = _arr2[_i2];
      if (config_config[_key2] !== old_config[_key2]) {
        player.danmaku.config();
        break;
      }
    }
    // todo

    // 关闭
    $('#bp_config').hide();
    $('#bp_config').css('opacity', 0);
    scroll_scroll.show();
  },
  reset_config: function reset_config() {
    for (var key in default_config) {
      config_config[key] = default_config[key];
      $("#".concat(key)).val(default_config[key]);
    }
  },
  show_help: function show_help() {
    if (help_clicked) {
      message_Message.miaow();
      return;
    }
    help_clicked = true;
    ajax({
      url: "".concat(config_config.base_api).concat(config_config.base_api.endsWith('/') ? '' : '/', "auth/?act=help"),
      dataType: 'text'
    }).then(function (res) {
      if (res) {
        MessageBox.alert(res);
      } else {
        message_Message.warning('获取失败');
      }
    }).finally(function () {
      help_clicked = false;
    });
  },
  show_login: function show_login() {
    auth.login('1');
  },
  show_login_2: function show_login_2() {
    auth.login('0');
  },
  show_logout: function show_logout() {
    auth.logout();
  },
  show_login_help: function show_login_help() {
    MessageBox.confirm('进行授权之后在远程请求时拥有用户账号原有的权限，例如能够获取用户已经付费或承包的番剧，是否需要授权？', function () {
      auth.login();
    });
  }
};
function initConfig(el) {
  // 注入 host_key_options
  var options = '<option value="0">关闭</option>';
  for (var k in hostMap) {
    options += "<option value=\"".concat(k, "\">").concat(hostMap[k], "</option>");
  }
  config = config.replace('{{host_key_options}}', options);
  // 注入 video_quality_options
  options = '<option value="0">与播放器相同</option>';
  for (var _k in videoQualityMap) {
    options += "<option value=\"".concat(_k, "\">").concat(videoQualityMap[_k], "</option>");
  }
  config = config.replace('{{video_quality_options}}', options);
  if (el && !!$(el)[0]) {
    $(el).append(config);
  } else {
    $('body').append(config);
  }
  // ui事件
  var tabLinks = document.querySelectorAll('#bp_config .tab-link');
  var panels = document.querySelectorAll('#bp_config .tab-panel');
  var showTab = function showTab(id) {
    panels.forEach(function (p) {
      return p.style.display = 'none';
    });
    document.querySelectorAll('#bp_config .tab-link').forEach(function (t) {
      return t.classList.remove('active');
    });
    var panel = document.querySelector("#bp_config .tab-panel[data-id=\"".concat(id, "\"]"));
    if (panel) panel.style.display = 'block';
    var link = document.querySelector("#bp_config .tab-link[data-tab=\"".concat(id, "\"]"));
    if (link) link.classList.add('active');
  };
  tabLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var tabId = link.getAttribute('data-tab');
      showTab(tabId);
    });
  });
  // 默认显示基础设置
  showTab('basic');

  // 同步数据
  var config_str = store.get('config_str');
  try {
    var old_config = JSON.parse(config_str);
    for (var key in old_config) {
      if (Object.hasOwnProperty.call(config_config, key)) {
        config_config[key] = old_config[key];
      }
    }
  } catch (_unused) {
    console.log('初始化脚本配置');
    store.set('config_str', '{}');
  }
  // 函数绑定
  var _loop = function _loop(_key3) {
    $("#".concat(_key3)).on('input', function (e) {
      config_config[_key3] = e.delegateTarget.value;
    });
  };
  for (var _key3 in config_config) {
    _loop(_key3);
  }
  for (var _k2 in config_functions) {
    var e = $("#".concat(_k2))[0]; // a | button
    !!e && (e.onclick = config_functions[_k2]);
  }
  // 渲染数据
  for (var _key4 in config_config) {
    $("#".concat(_key4)).val(config_config[_key4]);
  }
  window.onbeforeunload = function () {
    // todo
    var bp_aria2_window = window.bp_aria2_window;
    if (bp_aria2_window && !bp_aria2_window.closed) {
      bp_aria2_window.close();
    }
  };
}

;// ./src/js/utils/cookie.js
function getCookie(cookieName) {
  var cookieList = document.cookie.split(';');
  for (var i = 0; i < cookieList.length; ++i) {
    var arr = cookieList[i].split('=');
    if (cookieName === arr[0].trim()) {
      return arr[1];
    }
  }
  return null;
}

;// ./src/js/auth.js
function auth_typeof(o) { "@babel/helpers - typeof"; return auth_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, auth_typeof(o); }
function auth_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function auth_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? auth_ownKeys(Object(t), !0).forEach(function (r) { auth_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : auth_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function auth_defineProperty(e, r, t) { return (r = auth_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function auth_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function auth_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, auth_toPropertyKey(o.key), o); } }
function auth_createClass(e, r, t) { return r && auth_defineProperties(e.prototype, r), t && auth_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function auth_toPropertyKey(t) { var i = auth_toPrimitive(t, "string"); return "symbol" == auth_typeof(i) ? i : i + ""; }
function auth_toPrimitive(t, r) { if ("object" != auth_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != auth_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var Auth = /*#__PURE__*/function () {
  function Auth() {
    auth_classCallCheck(this, Auth);
    this.auth_clicked = false;
    this.auth_window = null;
    this.TV_KEY = '4409e2ce8ffd12b8';
    this.TV_SEC = '59b43e04ad6965f34319062b478f83dd';
  }
  auth_createClass(Auth, [{
    key: "hasAuth",
    value: function hasAuth() {
      return store.get('auth_id') && store.get('auth_sec');
    }
  }, {
    key: "checkLoginStatus",
    value: function checkLoginStatus() {
      var _this = this;
      var _ref = [store.get('auth_id'), store.get('auth_sec'), store.get('access_key'), store.get('auth_time') || 0],
        auth_id = _ref[0],
        auth_sec = _ref[1],
        access_key = _ref[2],
        auth_time = _ref[3];
      if (!auth_id && !auth_sec) return;
      if (config_config.base_api !== store.get('pre_base_api') || Date.now() - parseInt(auth_time) > 24 * 3600 * 1e3) {
        if (!access_key) {
          message_Message.info('授权已失效');
          this.reLogin();
          return;
        }
        ajax({
          url: "https://passport.bilibili.com/api/oauth?access_key=".concat(access_key),
          type: 'GET',
          dataType: 'json'
        }).then(function (res) {
          if (res.code) {
            message_Message.info('授权已过期，准备重新授权');
            _this.reLogin();
            return;
          }
          store.set('auth_time', Date.now());
          ajax({
            url: "".concat(config_config.base_api).concat(config_config.base_api.endsWith('/') ? '' : '/', "auth/?act=check&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
            type: 'GET',
            dataType: 'json'
          }).then(function (res) {
            if (res.code) {
              message_Message.info('检查失败，准备重新授权');
              _this.reLogin();
            }
          });
        });
      }
      store.set('pre_base_api', config_config.base_api);
    }
  }, {
    key: "makeAPIData",
    value: function makeAPIData(param, sec) {
      return auth_objectSpread(auth_objectSpread({}, param), {}, {
        sign: md5("".concat(Object.entries(param).map(function (e) {
          return "".concat(e[0], "=").concat(e[1]);
        }).join('&')).concat(sec))
      });
    }
  }, {
    key: "_login",
    value: function _login(resolve) {
      var _this2 = this;
      if (this.auth_clicked) {
        message_Message.miaow();
        return;
      }
      this.auth_clicked = true;
      ajax({
        url: 'https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code',
        type: 'POST',
        data: this.makeAPIData({
          appkey: this.TV_KEY,
          csrf: getCookie('bili_jct') || '',
          local_id: '0',
          ts: Date.now()
        }, this.TV_SEC)
      }).then(resolve).catch(function () {
        return _this2.auth_clicked = false;
      });
    }
  }, {
    key: "login",
    value: function login() {
      var useApp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';
      var do_login = useApp === '1' // 绑定 this
      ? this.loginApp.bind(this) : this.loginWeb.bind(this);
      if (store.get('auth_id')) {
        MessageBox.confirm('发现授权记录，是否重新授权？', do_login);
        return;
      }
      do_login();
    }
  }, {
    key: "reLogin",
    value: function reLogin() {
      this.logout();
      store.set('auth_time', '0');
      this.loginApp();
    }
  }, {
    key: "loginApp",
    value: function loginApp() {
      var _this3 = this;
      this._login(function (res) {
        if (!res || res.code) {
          return;
        }
        var _res$data = res.data,
          url = _res$data.url,
          auth_code = _res$data.auth_code;
        var is_login = 0;
        var box = MessageBox.alert('<p>请使用<a href="https://app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>扫码登录</p><div id="login_qrcode"></div>', function () {
          if (!is_login) {
            message_Message.info('登陆失败！');
          }
          clearInterval(timer);
          _this3.auth_clicked = false;
        });
        new QRCode(document.getElementById('login_qrcode'), url);
        var timer = setInterval(function () {
          _ajax({
            url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/poll",
            type: 'POST',
            data: _this3.makeAPIData({
              appkey: _this3.TV_KEY,
              auth_code: auth_code,
              csrf: getCookie('bili_jct') || '',
              local_id: '0',
              ts: Date.now().toString()
            }, _this3.TV_SEC)
          }).then(function (res) {
            if (!res.code && res.data) {
              console.log('login success');
              is_login = 1;
              _this3.doAuth(res.data);
              box.affirm();
            } else if (res.code === 86038) {
              box.affirm();
            }
          });
        }, 3000);
      });
    }
  }, {
    key: "loginWeb",
    value: function loginWeb() {
      var _this4 = this;
      this._login(function (res) {
        if (!res || res.code) {
          return;
        }
        var _res$data2 = res.data,
          url = _res$data2.url,
          auth_code = _res$data2.auth_code;
        _this4.auth_window = window.open(url);
        var is_login = 0;
        var timer = setInterval(function () {
          if (!_this4.auth_window || _this4.auth_window.closed) {
            clearInterval(timer);
            _this4.auth_clicked = false;
            if (!is_login) {
              message_Message.info('登陆失败！');
            }
            return;
          }
          _ajax({
            url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/poll",
            type: 'POST',
            data: _this4.makeAPIData({
              appkey: _this4.TV_KEY,
              auth_code: auth_code,
              csrf: getCookie('bili_jct') || '',
              local_id: '0',
              ts: Date.now().toString()
            }, _this4.TV_SEC)
          }).then(function (res) {
            if (!res.code && res.data) {
              console.log('login success');
              _this4.doAuth(res.data);
              is_login = 1;
              _this4.auth_window.close();
            } else if (res.code === 86038) {
              _this4.auth_window.close();
            }
          }).catch(function () {
            return _this4.auth_window.close();
          });
        }, 3000);
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this5 = this;
      if (!store.get('auth_id')) {
        MessageBox.alert('没有发现授权记录');
        return;
      }
      if (this.auth_clicked) {
        message_Message.miaow();
        return;
      }
      var _ref2 = [store.get('auth_id'), store.get('auth_sec')],
        auth_id = _ref2[0],
        auth_sec = _ref2[1];
      ajax({
        url: "".concat(config_config.base_api).concat(config_config.base_api.endsWith('/') ? '' : '/', "auth/?act=logout&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
        type: 'GET',
        dataType: 'json'
      }).then(function (res) {
        if (!res.code) {
          message_Message.success('注销成功');
          store.set('auth_id', '');
          store.set('auth_sec', '');
          store.set('auth_time', '0');
          store.set('access_key', '');
          $('#auth').val('0');
        } else {
          message_Message.warning('注销失败');
        }
      }).finally(function () {
        return _this5.auth_clicked = false;
      });
    }
  }, {
    key: "doAuth",
    value: function doAuth(param) {
      var _this6 = this;
      if (this.auth_window && !this.auth_window.closed) {
        this.auth_window.close();
        this.auth_window = null;
      }
      ajax({
        url: "".concat(config_config.base_api).concat(config_config.base_api.endsWith('/') ? '' : '/', "auth/?act=login&").concat(Object.entries({
          auth_id: store.get('auth_id'),
          auth_sec: store.get('auth_sec')
        }).map(function (e) {
          return "".concat(e[0], "=").concat(e[1]);
        }).join('&')),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(auth_objectSpread({}, param))
      }).then(function (res) {
        if (!res.code) {
          message_Message.success('授权成功');
          if (res.auth_id && res.auth_sec) {
            store.set('auth_id', res.auth_id);
            store.set('auth_sec', res.auth_sec);
          }
          store.set('access_key', param.access_token);
          store.set('auth_time', Date.now());
          $('#auth').val('1');
        } else {
          message_Message.warning('授权失败');
        }
      }).finally(function () {
        return _this6.auth_clicked = false;
      });
    }
  }]);
  return Auth;
}();
var auth = new Auth();
;// ./src/js/ui/event.js
function event_slicedToArray(r, e) { return event_arrayWithHoles(r) || event_iterableToArrayLimit(r, e) || event_unsupportedIterableToArray(r, e) || event_nonIterableRest(); }
function event_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function event_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return event_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? event_arrayLikeToArray(r, a) : void 0; } }
function event_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function event_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function event_arrayWithHoles(r) { if (Array.isArray(r)) return r; }










var api_url, api_url_temp;
function setting_btn() {
  user.lazyInit(true); // init
  // set form by config
  for (var key in config_config) {
    $("#".concat(key)).val(config_config[key]);
  }
  $('#auth').val(auth.hasAuth() ? '1' : '0');
  //show setting
  $('#bp_config').show();
  $('#bp_config').animate({
    'opacity': '1'
  }, 300);
  scroll_scroll.hide();
}
function bilibili_parse() {
  user.lazyInit(true); // init
  var vb = video.base();
  var _ref = [vb.type(), vb.aid(), vb.p(), vb.cid(), vb.epid()],
    type = _ref[0],
    aid = _ref[1],
    p = _ref[2],
    cid = _ref[3],
    epid = _ref[4];
  var _video$get_quality = video.get_quality(),
    q = _video$get_quality.q;
  api_url = "".concat(config_config.base_api, "?av=").concat(aid, "&p=").concat(p, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(config_config.format, "&otype=json&_host=").concat(config_config.host_key, "&_req=").concat(config_config.request_type, "&_q=").concat(config_config.video_quality);
  var _ref2 = [store.get('auth_id'), store.get('auth_sec')],
    auth_id = _ref2[0],
    auth_sec = _ref2[1];
  if (auth_id && auth_sec) {
    api_url += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
  }
  if (api_url === api_url_temp && config_config.request_type !== 'local') {
    message_Message.miaow();
    var url = $('#video_url').attr('href');
    var url_2 = $('#video_url_2').attr('href');
    if (url && url !== '#') {
      $('#video_download').show();
      config_config.format === 'dash' && $('#video_download_2').show();
      if (user.needReplace() || vb.isLimited() || config_config.replace_force === '1') {
        !$('#bp_dplayer')[0] && player.replace_player(url, url_2);
      }
      if (config_config.auto_download === '1') {
        $('#video_download').click();
      }
    }
    return;
  }
  $('#video_url').attr('href', '#');
  $('#video_url_2').attr('href', '#');
  api_url_temp = api_url;
  message_Message.info('开始请求');
  api.get_url(function (res) {
    if (res && !res.code) {
      message_Message.success('请求成功');
      res.times && message_Message.info("\u5269\u4F59\u8BF7\u6C42\u6B21\u6570\uFF1A".concat(res.times));
      var _url, _url_;
      if (res.url) {
        _url = res.url.replace('http://', 'https://');
        _url_ = '#';
      } else if (res.video && res.audio) {
        _url = res.video.replace('http://', 'https://');
        _url_ = res.audio.replace('http://', 'https://');
      } else {
        message_Message.warning('数据错误');
        return;
      }
      $('#video_url').attr('href', _url);
      $('#video_url').attr('download', vb.filename() + Download.url_format(_url));
      $('#video_download').show();
      if (_url_ !== '#') {
        $('#video_url_2').attr('href', _url_);
        $('#video_url_2').attr('download', vb.filename() + '_audio.mp4');
        $('#video_download_2').show();
      }
      if (user.needReplace() || vb.isLimited() || config_config.replace_force === '1') {
        player.replace_player(_url, _url_);
      }
      if (config_config.auto_download === '1') {
        $('#video_download').click();
      }
    }
  });
}
function video_download() {
  var type = config_config.download_type;
  if (type === 'a') {
    var _ref3 = [$('#video_url').attr('href'), $('#video_url_2').attr('href'), $('#video_url').attr('download'), $('#video_url_2').attr('download')],
      video_url = _ref3[0],
      video_url_2 = _ref3[1],
      file_name = _ref3[2],
      file_name_2 = _ref3[3];
    var msg = '建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>' + "<a href=\"".concat(video_url, "\" download=\"").concat(file_name, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u89C6\u9891\u5730\u5740&lt</a><br/><br/>") + (config_config.format === 'dash' ? "<a href=\"".concat(video_url_2, "\" download=\"").concat(file_name_2, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u97F3\u9891\u5730\u5740&lt</a>") : '');
    MessageBox.alert(msg);
  } else if (type === 'web') {
    $('#video_url')[0].click();
  } else if (type === 'aria') {
    var _ref4 = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
      _video_url = _ref4[0],
      _video_url_ = _ref4[1];
    var video_title = video.base().filename();
    var _file_name = video_title + Download.url_format(_video_url),
      _file_name_ = video_title + '.m4a';
    var aria2c_header = "--header \"User-Agent: ".concat(window.navigator.userAgent, "\" --header \"Referer: ").concat(window.location.href, "\"");
    var _ref5 = {
        min: [1, 5],
        mid: [16, 8],
        max: [32, 16]
      }[config_config.aria2c_connection_level] || [1, 5],
      _ref6 = event_slicedToArray(_ref5, 2),
      url_max_connection = _ref6[0],
      server_max_connection = _ref6[1];
    var aria2c_max_connection_parameters = "--max-concurrent-downloads ".concat(url_max_connection, " --max-connection-per-server ").concat(server_max_connection);
    var _map = ["aria2c \"".concat(_video_url, "\" --out \"").concat(_file_name, "\""), "aria2c \"".concat(_video_url_, "\" --out \"").concat(_file_name_, "\"")].map(function (code) {
        return "".concat(code, " ").concat(aria2c_header, " ").concat(aria2c_max_connection_parameters, " ").concat(config_config.aria2c_addition_parameters);
      }),
      _map2 = event_slicedToArray(_map, 2),
      code = _map2[0],
      code_2 = _map2[1];
    var _msg = '点击文本框即可复制下载命令！<br/><br/>' + "\u89C6\u9891\uFF1A<br/><input id=\"aria2_code\" value='".concat(code, "' onclick=\"bp_clip_btn('aria2_code')\" style=\"width:100%;\"></br></br>") + (config_config.format === 'dash' ? "\u97F3\u9891\uFF1A<br/><input id=\"aria2_code_2\" value='".concat(code_2, "' onclick=\"bp_clip_btn('aria2_code_2')\" style=\"width:100%;\"><br/><br/>") + "\u5168\u90E8\uFF1A<br/><textarea id=\"aria2_code_all\" onclick=\"bp_clip_btn('aria2_code_all')\" style=\"min-width:100%;max-width:100%;min-height:100px;max-height:100px;\">".concat(code, "\n").concat(code_2, "</textarea>") : '');
    !window.bp_clip_btn && (window.bp_clip_btn = function (id) {
      $("#".concat(id)).select();
      if (document.execCommand('copy')) {
        message_Message.success('复制成功');
      } else {
        message_Message.warning('复制失败');
      }
    });
    MessageBox.alert(_msg);
  } else if (type === 'blob_merge') {
    var _ref7 = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
      _video_url2 = _ref7[0],
      _video_url_2 = _ref7[1];
    var filename = video.base().filename() + Download.url_format(_video_url2);
    console.log('blob_merge', _video_url2, _video_url_2, filename);
    if (config_config.format === 'dash') {
      Download.download_blob_merge(_video_url2, _video_url_2, filename);
      return;
    }
    Download.download(_video_url2, filename, 'blob');
  } else {
    // blob, rpc
    var url = $('#video_url').attr('href');
    var _filename = video.base().filename() + Download.url_format(url);
    Download.download(url, _filename, type);
  }
}
function video_download_2() {
  var type = config_config.download_type;
  if (type === 'a') {
    $('#video_download').click();
  } else if (type === 'web') {
    $('#video_url_2')[0].click();
  } else if (type === 'aria') {
    $('#video_download').click();
  } else if (type === 'blob_merge') {
    var url = $('#video_url_2').attr('href');
    var filename = video.base().filename() + '.m4a';
    Download.download(url, filename, 'blob');
  } else {
    // blob, rpc
    var _url2 = $('#video_url_2').attr('href');
    var _filename2 = video.base().filename() + '.m4a';
    Download.download(_url2, _filename2, type);
  }
}
var video_download_all_rpc_confirm = true;
function video_download_all() {
  user.lazyInit(true); // init

  if (config_config.request_type !== 'local' && !auth.hasAuth()) {
    MessageBox.confirm('批量下载仅支持本地请求或授权用户使用RPC接口下载，是否进行授权？', function () {
      auth.login();
    });
    return;
  }
  if (config_config.download_type === 'rpc' || !video_download_all_rpc_confirm) {
    Download.download_all();
  } else {
    MessageBox.confirm('仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？', function () {
      Download.download_all();
      video_download_all_rpc_confirm = false;
    });
  }
}
function download_danmaku() {
  var vb = video.base();
  Download.download_danmaku_ass(vb.cid(), vb.filename());
}
function download_subtitle() {
  Download.download_subtitle_vtt(0, video.base().filename());
}
function test() {
  MessageBox.alert();
}
var event_event = {
  setting_btn: setting_btn,
  bilibili_parse: bilibili_parse,
  video_download: video_download,
  video_download_2: video_download_2,
  video_download_all: video_download_all,
  download_danmaku: download_danmaku,
  download_subtitle: download_subtitle,
  test: test
};
;// ./src/html/toolbar.html
// Module
var toolbar_code = "<div id=\"bp_toolbar\" class=\"tool-bar clearfix report-wrap-module report-scroll-module media-info\" scrollshow=\"true\"> <div id=\"setting_btn\" class=\"like-info\"> <i class=\"iconfont icon-add\"></i><span>脚本设置</span> </div> <div id=\"bilibili_parse\" class=\"like-info\"> <i class=\"iconfont icon-customer-serv\"></i><span>请求地址</span> </div> <div id=\"video_download\" class=\"like-info\" style=\"display:none\"> <i class=\"iconfont icon-download\"></i><span>下载视频</span> </div> <div id=\"video_download_2\" class=\"like-info\" style=\"display:none\"> <i class=\"iconfont icon-download\"></i><span>下载音频</span> </div> <div id=\"video_download_all\" class=\"like-info\"> <i class=\"iconfont icon-download\"></i><span>批量下载</span> </div> <div class=\"more\">更多<div class=\"more-ops-list\"> <ul> <li><span id=\"download_danmaku\">下载弹幕</span></li> <li><span id=\"download_subtitle\">下载字幕</span></li> </ul> </div> </div> <style>.tool-bar .more{float:right;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.tool-bar .more:hover .more-ops-list{display:block}.tool-bar:after{display:block;content:\"\";clear:both}.more-ops-list{display:none;position:absolute;width:80px;left:-65px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> </div> ";
// Exports
/* harmony default export */ var toolbar = (toolbar_code);
;// ./src/html/more_style.html
// Module
var more_style_code = "<style>.more{float:right;padding:1px;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.more:hover .more-ops-list{display:block}.more-ops-list{display:none;position:absolute;width:80px;left:-15px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> ";
// Exports
/* harmony default export */ var more_style = (more_style_code);
;// ./src/js/ui/toolbar.js


var btn_list = {
  setting_btn: '脚本设置',
  bilibili_parse: '请求地址',
  video_download: '下载视频',
  video_download_2: '下载音频',
  video_download_all: '批量下载',
  more: {
    download_danmaku: '下载弹幕',
    download_subtitle: '下载字幕',
    test: '测试功能'
  }
};
var setting_svg = '' + "<svg class width=\"28\" height=\"28\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" xml:space=\"preserve\">\n        <path fill=\"#757575\" style=\"stroke-miterlimit:10;\" d=\"M16,29.5L16,29.5c-0.828,0-1.5-0.672-1.5-1.5V4c0-0.828,0.672-1.5,1.5-1.5h0 c0.828,0,1.5,0.672,1.5,1.5v24C17.5,28.828,16.828,29.5,16,29.5z\"/>\n        <path fill=\"#757575\" style=\"stroke-miterlimit:10;\" d=\"M29.5,16L29.5,16c0,0.828-0.672,1.5-1.5,1.5H4c-0.828,0-1.5-0.672-1.5-1.5v0 c0-0.828,0.672-1.5,1.5-1.5h24C28.828,14.5,29.5,15.172,29.5,16z\"/>\n    </svg>";
var request_svg = '' + "<svg class width=\"28\" height=\"28\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" xml:space=\"preserve\">\n        <path fill=\"#757575\" d=\"M28.282,13.508c-0.623-6.932-6.627-12.036-13.41-11.399C8.947,2.665,4.254,7.465,3.716,13.521 c0.786,0.404,1.283,1.226,1.284,2.126v4.157c-0.023,0.565-0.49,1.004-1.043,0.98c-0.521-0.022-0.938-0.448-0.959-0.98v-4.157 c0-0.188-0.113-0.452-0.508-0.452s-0.492,0.275-0.492,0.452v8.176c0,2.446,1.94,4.428,4.333,4.428c0,0,0,0,0,0h7.191 c0.552-1.396,2.107-2.07,3.473-1.505s2.025,2.154,1.473,3.549c-0.552,1.396-2.107,2.07-3.473,1.505 c-0.67-0.277-1.202-0.82-1.473-1.505h-7.19c-3.497,0-6.332-2.897-6.333-6.471l0,0v-8.178c0-1.077,0.706-2.02,1.723-2.303C2.429,5.285,9.393-0.662,17.278,0.059c6.952,0.636,12.445,6.297,13.009,13.407c1.032,0.404,1.713,1.416,1.712,2.545v4.088 c-0.038,1.505-1.262,2.694-2.735,2.656c-1.42-0.037-2.562-1.205-2.599-2.656l0,0v-4.085C26.667,14.924,27.302,13.939,28.282,13.508zM11.334,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S12.439,14.653,11.334,14.653z M20.666,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S21.771,14.653,20.666,14.653z M13.629,21.805c-2.167,0-3.962-1.653-3.962-3.748c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022 c0,0.916,0.856,1.704,1.962,1.704c0.612,0.012,1.198-0.253,1.602-0.723c0.352-0.433,0.982-0.493,1.406-0.132 c0,0,0.001,0.001,0.001,0.001c0.047,0.039,0.09,0.083,0.128,0.131c0.404,0.47,0.99,0.734,1.602,0.723 c1.106,0,1.964-0.788,1.964-1.704c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022c0,2.095-1.797,3.748-3.964,3.748 c-0.844,0.003-1.67-0.256-2.368-0.742C15.302,21.55,14.475,21.809,13.629,21.805z M29.332,15.333c-0.368,0-0.666,0.305-0.666,0.68 v4.088c-0.001,0.376,0.297,0.681,0.665,0.681c0.368,0.001,0.666-0.304,0.666-0.679c0-0.001,0-0.001,0-0.002v-4.088 c0.002-0.374-0.293-0.678-0.659-0.68c-0.001,0-0.002,0-0.003,0H29.332z\"/>\n    </svg>";
var download_svg = '' + "<svg class width=\"28\" height=\"28\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" xml:space=\"preserve\">\n        <path fill=\"#757575\" d=\"M16.015,0C7.186,0,0.03,7.157,0.03,15.985 S7.186,31.97,16.015,31.97S32,24.814,32,15.985S24.843,0,16.015,0z\"/>\n        <path style=\"fill:#FFFFFF;\" d=\"M16.942,23.642H9.109C8.496,23.642,8,24.17,8,24.821v0C8,25.472,8.496,26,9.109,26h14.783 C24.504,26,25,25.472,25,24.821v0c0-0.651-0.496-1.179-1.109-1.179H16.942z\"/>\n        <path style=\"fill:#FFFFFF;\" d=\"M8.798,16.998l6.729,6.33c0.398,0.375,1.029,0.375,1.427,0l6.729-6.33 c0.666-0.627,0.212-1.726-0.714-1.726h-3.382c-0.568,0-1.028-0.449-1.028-1.003V8.003C18.56,7.449,18.099,7,17.532,7h-2.582 c-0.568,0-1.028,0.449-1.028,1.003v6.266c0,0.554-0.46,1.003-1.028,1.003H9.511C8.586,15.273,8.132,16.372,8.798,16.998z\"/>\n    </svg>";
var svg_map = {
  setting_btn: setting_svg,
  bilibili_parse: request_svg,
  video_download: download_svg,
  video_download_2: download_svg,
  video_download_all: download_svg
};
function make_toolbar_bangumi(main_class_name, sub_class_names) {
  // class-3

  var list_element = function list_element(id, class_names, svg, name) {
    return '' + "<div id=\"".concat(id, "\" mr-show=\"\" class=\"").concat(class_names[0], "\">\n                <span class=\"").concat(class_names[1], "\">\n                    ").concat(svg, "\n                </span>\n                <span class=\"").concat(class_names[2], "\">").concat(name, "</span>\n            </div>");
  };
  var more_element = function more_element(id, name) {
    return "<li><span id=\"".concat(id, "\">").concat(name, "</span></li>");
  };
  var toolbar_elements = Object.keys(btn_list).map(function (key) {
    if (key === 'more') {
      var more_map = btn_list[key];
      return '' + "<div class=\"more\">\u66F4\u591A<div class=\"more-ops-list\">\n                    <ul>".concat(Object.keys(more_map).map(function (key) {
        return more_element(key, more_map[key]);
      }).join(''), "</ul>\n                </div>");
    }
    return list_element(key, sub_class_names, svg_map[key], btn_list[key]);
  }).join('');
  return '' + "<div class=\"".concat(main_class_name, "\">\n            ").concat(toolbar_elements, "\n            ").concat(more_style, "\n        </div>");
}
var bp_toolbar_id = 'bp_toolbar';
function showVideoToolbar(toolbar_id) {
  var toolbar_obj = $("#".concat(toolbar_id));
  var toolbar_obj_2 = toolbar_obj.clone();
  toolbar_obj_2.attr('id', bp_toolbar_id);
  var left = toolbar_obj_2.find('.video-toolbar-left');
  var right = toolbar_obj_2.find('.video-toolbar-right');
  left.children().remove();
  right.children().remove();
  Object.keys(btn_list).map(function (key) {
    if (key === 'more') {
      var more_map = btn_list[key];
      var el = '' + "<div class=\"more\">\u66F4\u591A<div class=\"more-ops-list\">\n                    <ul>".concat(Object.keys(more_map).map(function (key) {
        return "<li><span id=\"".concat(key, "\">").concat(more_map[key], "</span></li>");
      }).join(''), "</ul>\n                </div>");
      right.append(el + more_style);
      return;
    }
    var item = toolbar_obj.find('.toolbar-left-item-wrap').eq(0).clone();
    item.attr('id', key);
    var svg = svg_map[key].replaceAll('#757575', 'currentColor').replace('class', "class=\"".concat(item.find('svg').attr('class'), "\""));
    var span = item.find('span').text(btn_list[key]);
    var item_div = item.find('div').eq(0);
    item_div.attr('title', btn_list[key]);
    item_div.removeClass('on');
    item_div.children().remove();
    item_div.append(svg).append(span);
    left.append(item);
    return;
  });
  toolbar_obj.after(toolbar_obj_2);
}
function showFestivalToolbar(toolbar_id) {
  var toolbar_obj = $("#".concat(toolbar_id));
  var toolbar_obj_2 = toolbar_obj.clone();
  toolbar_obj_2.attr('id', bp_toolbar_id);
  var left = toolbar_obj_2.find('.video-toolbar-content_left');
  var right = toolbar_obj_2.find('.video-toolbar-content_right');
  toolbar_obj_2.find('.video-toobar_title').remove();
  left.children().remove();
  var watchlater = right.find('.watchlater').clone();
  right.children().remove();
  right.append(watchlater);
  toolbar_obj_2.find('.video-desc-wrapper').remove();
  Object.keys(btn_list).map(function (key) {
    if (key === 'more') {
      var list = watchlater.find('.more-list');
      var list_li = list.children().eq(0);
      list.children().remove();
      var more_map = btn_list[key];
      Object.keys(more_map).map(function (key) {
        var li = list_li.clone();
        li.html("<span id=\"".concat(key, "\">").concat(more_map[key], "</span>"));
        list.append(li);
      });
      return;
    }
    var item = toolbar_obj.find('.video-toolbar-content_item').eq(0).clone();
    item.attr('id', key);
    item.attr('title', btn_list[key]);
    var svg = svg_map[key].replaceAll('#757575', 'currentColor');
    var item_icon = item.find('.content-item_icon').eq(0);
    item_icon.removeClass('ic_like');
    item_icon.html(svg);
    item.html('');
    item.append(item_icon);
    item.append(btn_list[key]);
    left.append(item);
    return;
  });
  toolbar_obj.after(toolbar_obj_2);
}
function showBangumiToolbar(toolbar_class) {
  var toolbar_obj = $(".".concat(toolbar_class)).eq(0);
  var toolbar_obj_2 = toolbar_obj.clone();
  toolbar_obj_2.attr('id', bp_toolbar_id);
  var left = toolbar_obj_2.find('.toolbar-left');
  var right = toolbar_obj_2.find('.toolbar-right');
  left.children().remove();
  right.children().remove();
  Object.keys(btn_list).map(function (key) {
    if (key === 'more') {
      var more_map = btn_list[key];
      var el = '' + "<div class=\"more\">\u66F4\u591A<div class=\"more-ops-list\">\n                    <ul>".concat(Object.keys(more_map).map(function (key) {
        return "<li><span id=\"".concat(key, "\">").concat(more_map[key], "</span></li>");
      }).join(''), "</ul>\n                </div>");
      right.append(el + more_style);
      return;
    }
    var item = toolbar_obj.find('.toolbar-left').children().eq(0).clone();
    item.attr('id', key);
    item.attr('title', btn_list[key]);
    var svg = svg_map[key].replaceAll('#757575', 'currentColor').replace('class', "class=\"".concat(item.find('svg').attr('class'), "\""));
    var span = item.find('span').text(btn_list[key]);
    item.children().remove();
    item.append(svg).append(span);
    left.append(item);
    return;
  });
  toolbar_obj.after(toolbar_obj_2);
}
function initToolbar() {
  if (!!$('#arc_toolbar_report')[0]) {
    // video
    showVideoToolbar('arc_toolbar_report');
  } else if (!!$('#playlistToolbar')[0]) {
    // list
    showVideoToolbar('playlistToolbar');
  } else if (!!$('#videoToolbar')[0]) {
    // festival
    showFestivalToolbar('videoToolbar');
  } else if (!!$('.toolbar')[0]) {
    // bungumi
    showBangumiToolbar('toolbar');
  } else if (!!$('.edu-play-left')[0]) {
    // cheese test
    // todo
    var toolbar_obj = $('.edu-play-left').children().eq(1);
    var toolbar_class = toolbar_obj.attr('class');
    var span_class = toolbar_obj.children().eq(0).attr('class');
    var span_class_svg = toolbar_obj.children().eq(0).children().eq(0).attr('class');
    var span_class_text = toolbar_obj.children().eq(0).children().eq(1).attr('class');
    toolbar_obj.after(make_toolbar_bangumi(toolbar_class, [span_class, span_class_svg, span_class_text]));
  } else if (!!$('#toolbar_module')[0]) {
    // ! fix
    $('#toolbar_module').after(toolbar);
  }

  // 处理遮挡
  !!$('#limit-mask-wall')[0] && $('#limit-mask-wall').remove();

  // 默认隐藏
  $('#video_download').hide();
  $('#video_download_2').hide();
}

;// ./src/js/main.js
function main_typeof(o) { "@babel/helpers - typeof"; return main_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, main_typeof(o); }
function main_slicedToArray(r, e) { return main_arrayWithHoles(r) || main_iterableToArrayLimit(r, e) || main_unsupportedIterableToArray(r, e) || main_nonIterableRest(); }
function main_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function main_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return main_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? main_arrayLikeToArray(r, a) : void 0; } }
function main_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function main_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function main_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function main_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function main_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, main_toPropertyKey(o.key), o); } }
function main_createClass(e, r, t) { return r && main_defineProperties(e.prototype, r), t && main_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function main_toPropertyKey(t) { var i = main_toPrimitive(t, "string"); return "symbol" == main_typeof(i) ? i : i + ""; }
function main_toPrimitive(t, r) { if ("object" != main_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != main_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








var Main = /*#__PURE__*/function () {
  function Main() {
    main_classCallCheck(this, Main);
    /* global JS_VERSION GIT_HASH */
    console.log('\n'.concat(" %c bilibili-parse-download.user.js v", "2.7.7", " ").concat("ed8e9a7", " %c https://github.com/injahow/user.js ", '\n', '\n'), 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
  }
  main_createClass(Main, [{
    key: "loadToolbar",
    value: function loadToolbar() {
      // 处理 initToolbar 白屏问题，渲染后执行
      var loading = false;
      var timer;
      var load = function load(timeout) {
        setTimeout(function () {
          if (loading) {
            return;
          }
          loading = true;
          if (timeout === 0) {
            clearInterval(timer);
            initToolbar();
            return;
          }
          console.warn('waiting timeout...');
          if (config_config.show_ui_confirm === '1') {
            if (config_config.show_ui_confirm_load_force === '1') {
              initToolbar();
              return;
            }
            MessageBox.confirm('加载脚本UI超时，建议刷新页面重新加载，是否强制加载工具栏？', initToolbar, null);
            return;
          }
          message_Message.warning('脚本UI加载异常，已自动延迟加载');
          setTimeout(function () {
            initToolbar();
            message_Message.info('脚本UI已重新加载，如有问题可刷新页面');
          }, 5000);
        }, timeout * 1000);
      };
      timer = setInterval(function () {
        var search_form = document.getElementById('nav-searchform');
        if (search_form && !loading) {
          load(0);
        }
      }, 500);
      var timeout;
      try {
        timeout = config_config.show_ui_timeout ? parseInt(config_config.show_ui_timeout) : 6;
        timeout = timeout > 0 ? timeout : 6;
      } catch (err) {
        console.error('show_ui_timeout err:', err);
      }
      load(timeout);
    }
  }, {
    key: "init",
    value: function init() {
      var root_div = document.createElement('div');
      root_div.id = 'bp_root';
      document.body.append(root_div);
      initConfig("#".concat(root_div.id));
      initMessage("#".concat(root_div.id));
      // 必须在 initConfig 和 initMessage 后
      this.loadToolbar();
      user.lazyInit();
      auth.checkLoginStatus();
      check.refresh();
      $("#".concat(root_div.id)).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">'); // for dom changed
      $("#".concat(root_div.id)).append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
      $("#".concat(root_div.id)).append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
    }
  }, {
    key: "run",
    value: function run() {
      this.init();

      // api & click
      window.bpd = event_event;
      Object.entries(event_event).forEach(function (_ref) {
        var _ref2 = main_slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];
        return $('body').on('click', "#".concat(k), v);
      });

      // part of check
      $('body').on('click', 'a.router-link-active', function () {
        if (this !== $('li[class="on"]').find('a')[0]) {
          check.refresh();
        }
      });
      $('body').on('click', 'li.ep-item', function () {
        check.refresh();
      });
      $('body').on('click', 'button.bilibili-player-iconfont-next', function () {
        check.refresh();
      });
      // 监听q
      $('body').on('click', 'li.bui-select-item', function () {
        check.refresh();
      });
      // 监听aid
      $('body').on('click', '.rec-list', function () {
        check.refresh();
      });
      $('body').on('click', '.bilibili-player-ending-panel-box-videos', function () {
        check.refresh();
      });
      // 定时检查
      setInterval(function () {
        if (check.href !== location.href) {
          check.refresh();
        }
      }, 500);
      setInterval(function () {
        var vb = video.base();
        if (check.aid !== vb.aid() || check.cid !== vb.cid() || check.q !== video.get_quality().q) {
          check.refresh();
        }
      }, 1500);
    }
  }]);
  return Main;
}();
/* harmony default export */ var main = (Main);
;// ./src/js/index.js

(function () {
  'use strict';

  if (window.bp_fun_locked) return;
  window.bp_fun_locked = true;

  // error page
  if (document.getElementsByClassName('error-text')[0]) {
    return;
  }
  setTimeout(function () {
    new main().run();
  }, 0);
})();
/******/ })()
;