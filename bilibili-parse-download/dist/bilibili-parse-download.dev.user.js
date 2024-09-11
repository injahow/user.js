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
// @downloadURL   https://update.greasyfork.org/scripts/413228/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.user.js
// @updateURL     https://update.greasyfork.org/scripts/413228/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.meta.js
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
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/js/index.js + 22 modules ***!
  \**************************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/js/user.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



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
;// CONCATENATED MODULE: ./src/js/utils/cache.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function cache_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function cache_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cache_createClass(Constructor, protoProps, staticProps) { if (protoProps) cache_defineProperties(Constructor.prototype, protoProps); if (staticProps) cache_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CacheFactory = /*#__PURE__*/function () {
  function CacheFactory() {
    cache_classCallCheck(this, CacheFactory);
  }

  cache_createClass(CacheFactory, null, [{
    key: "get",
    value: function get() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var cache = CacheFactory.map[name];

      if (cache instanceof Cache) {
        return cache;
      }

      cache = new Cache();
      CacheFactory.map[name] = cache;
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
    key: "clear",
    value: function clear(name) {
      if (name) {
        CacheFactory.get(name).clear();
        return;
      }

      CacheFactory.map = {};
    }
  }]);

  return CacheFactory;
}();

_defineProperty(CacheFactory, "map", {});

var Cache = /*#__PURE__*/function () {
  function Cache() {
    cache_classCallCheck(this, Cache);

    this.value = {};
  }

  cache_createClass(Cache, [{
    key: "get",
    value: function get() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.value[key];
    }
  }, {
    key: "set",
    value: function set() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 ? arguments[1] : undefined;
      this.value[key] = value;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.value = {};
    }
  }]);

  return Cache;
}();

/* harmony default export */ var cache = (CacheFactory);
;// CONCATENATED MODULE: ./src/js/ui/scroll.js
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
;// CONCATENATED MODULE: ./src/html/message.html
// Module
var code = "<div class=\"message-bg\"></div> <div id=\"message_box\"> <div class=\"message-box-mark\"></div> <div class=\"message-box-bg\"> <span style=\"font-size:20px\"><b>提示：</b></span> <div id=\"message_box_context\" style=\"margin:2% 0\">...</div><br/><br/> <div class=\"message-box-btn\"> <button name=\"affirm\">确定</button> <button name=\"cancel\">取消</button> </div> </div> </div> <style>.message-bg{position:fixed;float:right;right:0;top:2%;z-index:30000}.message{margin-bottom:15px;padding:2% 2%;width:300px;display:flex;margin-top:-70px;opacity:0}.message-success{background-color:#dfd;border-left:6px solid #4caf50}.message-error{background-color:#fdd;border-left:6px solid #f44336}.message-info{background-color:#e7f3fe;border-left:6px solid #0c86de}.message-warning{background-color:#ffc;border-left:6px solid #ffeb3b}.message-context{font-size:21px;word-wrap:break-word;word-break:break-all}.message-context p{margin:0}#message_box{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:20000}.message-box-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;z-index:20001}.message-box-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:20000}.message-box-btn{text-align:right}.message-box-btn button{margin:0 5px;width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}.message-box-btn button:hover{background:#59f}</style> ";
// Exports
/* harmony default export */ var message = (code);
;// CONCATENATED MODULE: ./src/js/ui/message.js



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

;// CONCATENATED MODULE: ./src/js/utils/ajax.js


function ajax(obj) {
  return new Promise(function (resolve, reject) {
    // set obj.success & obj.error
    obj.success = function (res) {
      if (res && res.code) {
        message_Message.warning("".concat(res.message || "CODE:".concat(res.code))); // todo
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


;// CONCATENATED MODULE: ./src/js/utils/video-base.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || video_base_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return video_base_arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = video_base_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function video_base_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return video_base_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return video_base_arrayLikeToArray(o, minLen); }

function video_base_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { video_base_defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { video_base_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function video_base_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function video_base_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function video_base_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function video_base_createClass(Constructor, protoProps, staticProps) { if (protoProps) video_base_defineProperties(Constructor.prototype, protoProps); if (staticProps) video_base_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var clazzMap = {};

var VideoBase = /*#__PURE__*/function () {
  function VideoBase(video_type, main_title, state) {
    video_base_classCallCheck(this, VideoBase);

    if (!(this.constructor.name in clazzMap)) {
      clazzMap[this.constructor.name] = this.constructor;
    }

    this.video_type = video_type || 'video';
    this.main_title = main_title || '';
    this.state = state; // ! state.p

    this.page = state && parseInt(state.p) || 1;
  }

  video_base_createClass(VideoBase, [{
    key: "getVideo",
    value: function getVideo(p) {
      var _prop,
          _this = this;

      var prop = (_prop = {
        'p': p,
        'id': 0,
        'title': '',
        'filename': '',
        'aid': 0,
        'bvid': '',
        'cid': 0
      }, video_base_defineProperty(_prop, "bvid", ''), video_base_defineProperty(_prop, 'epid', 0), video_base_defineProperty(_prop, 'needVip', false), video_base_defineProperty(_prop, 'vipNeedPay', false), video_base_defineProperty(_prop, 'isLimited', false), _prop);
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
    value: function title() {
      return '';
    }
  }, {
    key: "filename",
    value: function filename() {
      return '';
    }
  }, {
    key: "aid",
    value: function aid() {
      return 0;
    }
  }, {
    key: "bvid",
    value: function bvid() {
      return '';
    }
  }, {
    key: "cid",
    value: function cid() {
      return 0;
    }
  }, {
    key: "epid",
    value: function epid() {
      return '';
    }
  }, {
    key: "needVip",
    value: function needVip() {
      return false;
    }
  }, {
    key: "vipNeedPay",
    value: function vipNeedPay() {
      return false;
    }
  }, {
    key: "isLimited",
    value: function isLimited() {
      return false;
    }
  }]);

  return VideoBase;
}();

var Video = /*#__PURE__*/function (_VideoBase) {
  _inherits(Video, _VideoBase);

  var _super = _createSuper(Video);

  function Video(main_title, state) {
    var _thisSuper, _this2;

    video_base_classCallCheck(this, Video);

    _this2 = _super.call(this, 'video', main_title, state);
    var sections = state.sections || [];
    _this2.video_list = []; // todo

    if (!sections.length > 0) {
      return _possibleConstructorReturn(_this2);
    } // ? 集合视频 pageSize = 1


    var new_page = 0,
        i = 1;

    var _iterator = _createForOfIteratorHelper(sections),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var section = _step.value;
        var eplist = section.episodes || [];

        var _iterator2 = _createForOfIteratorHelper(eplist),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var ep = _step2.value;

            _this2.video_list.push(ep);

            if (state.videoData.bvid == ep.bvid) {
              new_page = i;
            }

            i++;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } // 处理集合残留

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (new_page < 1) {
      _this2.video_list = [];
    } else {
      _set((_thisSuper = _assertThisInitialized(_this2), _getPrototypeOf(Video.prototype)), "page", new_page, _thisSuper, true);
    }

    return _this2;
  }

  video_base_createClass(Video, [{
    key: "total",
    value: function total() {
      if (this.video_list.length > 0) {
        return this.video_list.length;
      }

      return this.state.videoData.pages.length;
    }
  }, {
    key: "title",
    value: function title(p) {
      var id = this.id(p);

      if (this.video_list.length > 0) {
        return this.video_list[id].title;
      }

      return this.state.videoData.pages[id].part;
    }
  }, {
    key: "filename",
    value: function filename(p) {
      if (this.video_list.length > 0) {
        return this.title(p).replace(/[\/\\:*?"<>|]+/g, '');
      }

      var id = this.id(p);
      var title = this.main_title + (this.total() > 1 ? " P".concat(id + 1, " ").concat(this.state.videoData.pages[id].part || '') : '');
      return title.replace(/[\/\\:*?"<>|]+/g, '');
    }
  }, {
    key: "aid",
    value: function aid(p) {
      if (this.video_list.length > 0) {
        return this.video_list[this.id(p)].aid;
      }

      return this.state.videoData.aid;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      if (this.video_list.length > 0) {
        return this.video_list[this.id(p)].bvid;
      }

      return this.state.videoData.bvid;
    }
  }, {
    key: "cid",
    value: function cid(p) {
      if (this.video_list.length > 0) {
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
          _video.cid = video.pages[i].id;
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
      return !p ? this.video.aid() : this.video_list[this.id(p)].id;
    }
  }, {
    key: "bvid",
    value: function bvid(p) {
      return !p ? this.video.bvid() : this.video_list[this.id(p)].bv_id;
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
    _this5.isEpMap = state.isEpMap; // this.mediaInfo = state.mediaInfo

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
          title = ep.share_copy.split('》', 2);

          if (title.length > 1) {
            title = "".concat(this.main_title, " ").concat(title[1]);
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

      var episodes = bangumiCache.get('episodes') || []; // 预告移后

      episodes = [].concat(_toConsumableArray(episodes.filter(function (a) {
        return a.badge_type != 1;
      })), _toConsumableArray(episodes.filter(function (a) {
        return a.badge_type == 1;
      }))); // 标记正片

      var isEpMap = {};

      var _iterator4 = _createForOfIteratorHelper(episodes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var ep = _step4.value;

          if ([0, 2, 3].includes(ep.badge_type)) {
            isEpMap[ep.id] = true;
          }
        } // 追加 section

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


;// CONCATENATED MODULE: ./src/js/utils/video.js




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
  '4K 超清': 120,
  '1080P 60帧': 116,
  '1080P 高码率': 112,
  '1080P 高清': 80,
  '720P 高清': 64,
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

  !_q && (_q = 80);
  !_q_max && (_q_max = 80);

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
;// CONCATENATED MODULE: ./src/js/store.js
function store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function store_createClass(Constructor, protoProps, staticProps) { if (protoProps) store_defineProperties(Constructor.prototype, protoProps); if (staticProps) store_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
;// CONCATENATED MODULE: ./src/js/utils/api.js
function api_typeof(obj) { "@babel/helpers - typeof"; return api_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, api_typeof(obj); }

function api_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = api_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function api_toConsumableArray(arr) { return api_arrayWithoutHoles(arr) || api_iterableToArray(arr) || api_unsupportedIterableToArray(arr) || api_nonIterableSpread(); }

function api_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function api_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return api_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return api_arrayLikeToArray(o, minLen); }

function api_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function api_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return api_arrayLikeToArray(arr); }

function api_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == api_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








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
      type = _ref[5]; // 参数预处理

  var format = video_format || config_config.format;
  if (request_type === 'auto' && user.needReplace()) request_type = 'remote';

  var url_replace_cdn = function url_replace_cdn(url) {
    if (config_config.host_key === '0') {
      return url;
    } // 全部切换CDN


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
      promiseList.forEach( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(promise) {
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
      } // remote


      res.url && (res.url = url_replace_cdn(res.url));
      res.video && (res.video = url_replace_cdn(res.video));
      res.audio && (res.audio = url_replace_cdn(res.audio)); // _success(res)

      resultConvertor(res, _success);
      return;
    } // local


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
    } // durl


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
    url: "https://api.bilibili.com/x/player/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
    dataType: 'json'
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
;// CONCATENATED MODULE: ./src/js/utils/runtime-lib.js
function runtime_lib_typeof(obj) { "@babel/helpers - typeof"; return runtime_lib_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, runtime_lib_typeof(obj); }

function runtime_lib_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ runtime_lib_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == runtime_lib_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function runtime_lib_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function runtime_lib_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { runtime_lib_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { runtime_lib_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function runtime_lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function runtime_lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function runtime_lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) runtime_lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) runtime_lib_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



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
      return new Promise(function (resolve, reject) {
        var i = 0;
        urls.forEach(function (url) {
          // 延时并发
          setTimeout( /*#__PURE__*/runtime_lib_asyncToGenerator( /*#__PURE__*/runtime_lib_regeneratorRuntime().mark(function _callee() {
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

                    try {
                      (function runEval() {
                        return window.eval(code);
                      }).bind(window)();
                    } catch (error) {// ignore js error
                    } finally {
                      _this.anyResolved = true;
                      resolve(getModule(window));
                    }

                    _context.next = 19;
                    break;

                  case 13:
                    _context.prev = 13;
                    _context.t0 = _context["catch"](0);

                    if (!_this.anyResolved) {
                      _context.next = 17;
                      break;
                    }

                    return _context.abrupt("return");

                  case 17:
                    errs.push({
                      url: url,
                      err: _context.t0
                    });

                    if (--i === 0) {
                      console.error(errs);
                      reject(errs);
                    }

                  case 19:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 13]]);
          })), i++ * 1000);
        });
      });
    }
  }]);

  return RuntimeLib;
}();

var cdn_map = {
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
};

var urls = function urls(_ref2) {
  var name = _ref2.name,
      ver = _ref2.ver,
      filename = _ref2.filename,
      cdn_keys = _ref2.cdn_keys;
  cdn_keys = cdn_keys ? cdn_keys.filter(function (key) {
    return key in cdn_map;
  }) : Object.keys(cdn_map);
  return cdn_keys.map(function (k) {
    return cdn_map[k](name, ver, filename);
  });
};

var init = function init(name, ver, filename, getModule) {
  new RuntimeLib({
    urls: urls({
      name: name,
      ver: ver,
      filename: filename
    }),
    getModule: getModule
  }).getModulePromise().then(null);
}; // 伪同步


var JSZip;
init('jszip', '3.10.0', 'jszip.min.js', function (w) {
  return JSZip = w.JSZip;
});
var flvjs;
init('flv.js', '1.6.2', 'flv.min.js', function (w) {
  return flvjs = w.flvjs;
});
var DPlayer;
init('dplayer', '1.26.0', 'DPlayer.min.js', function (w) {
  return DPlayer = w.DPlayer;
});
var QRCode;
init('qrcodejs', '1.0.0', 'qrcode.min.js', function (w) {
  return QRCode = w.QRCode;
});
var md5;
init('blueimp-md5', '2.19.0', 'js/md5.min.js', function (w) {
  return md5 = w.md5;
});
;// CONCATENATED MODULE: ./src/js/utils/player.js







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
      options.success(danmaku_data); // 加载弹幕设置

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
  recover_player(); // 暂停原视频

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
          $('#video_download').hide();
          $('#video_download_2').hide();
          recover_player();
        }
      }]
    }); // subtitle_blob save

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
  }; // 默认请求字幕


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
} // DPlayer 弹幕设置


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
;// CONCATENATED MODULE: ./src/js/check.js
function check_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function check_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function check_createClass(Constructor, protoProps, staticProps) { if (protoProps) check_defineProperties(Constructor.prototype, protoProps); if (staticProps) check_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





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

      this.lock = true;
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
        this.lock = false;
      }
    }
  }]);

  return Check;
}();

var check = new Check();
;// CONCATENATED MODULE: ./src/js/utils/download.js
function download_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = download_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function download_toConsumableArray(arr) { return download_arrayWithoutHoles(arr) || download_iterableToArray(arr) || download_unsupportedIterableToArray(arr) || download_nonIterableSpread(); }

function download_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function download_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return download_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return download_arrayLikeToArray(o, minLen); }

function download_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function download_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return download_arrayLikeToArray(arr); }

function download_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








function rpc_type() {
  if (config_config.rpc_domain.match('https://') || config_config.rpc_domain.match(/localhost|127\.0\.0\.1/)) {
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
      var current_select_option_index = get_option_index(event.target); // 获取所有复选框

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

  var msg = '' + "<div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u683C\u5F0F:</label>\n            <select id=\"dl_format\">\n                <option value=\"mp4\" selected>MP4</option>\n                <option value=\"flv\">FLV</option>\n                <option value=\"dash\">DASH</option>\n            </select>\n            &nbsp;&nbsp;\u65E0\u6CD5\u8BBE\u7F6EMP4\u6E05\u6670\u5EA6\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u8D28\u91CF:</label>\n            <select id=\"dl_quality\">\n                ".concat(option_support_html, "\n            </select>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4E0B\u8F7D\u9009\u62E9:</label>\n            <label style=\"color:rgba(0,0,0,1);\">\n                <input type=\"checkbox\" id=\"dl_video\" name=\"dl_option\" checked=\"checked\">\n                <label for=\"dl_video\">\u89C6\u9891</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_subtitle\" name=\"dl_option\">\n                <label for=\"dl_subtitle\">\u5B57\u5E55</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_danmaku\" name=\"dl_option\">\n                <label for=\"dl_danmaku\">\u5F39\u5E55</label>\n            </label>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4FDD\u5B58\u76EE\u5F55:</label>\n            <input id=\"dl_rpc_dir\" placeholder=\"").concat(config_config.rpc_dir || '为空使用默认目录', "\"/>\n        </div>\n        <b>\n            <span style=\"color:red;\">\u4E3A\u907F\u514D\u8BF7\u6C42\u88AB\u62E6\u622A\uFF0C\u8BBE\u7F6E\u4E86\u5EF6\u65F6\u4E14\u4E0D\u652F\u6301\u4E0B\u8F7D\u65E0\u6CD5\u64AD\u653E\u7684\u89C6\u9891\uFF1B\u8BF7\u52FF\u9891\u7E41\u4E0B\u8F7D\u8FC7\u591A\u89C6\u9891\uFF0C\u53EF\u80FD\u89E6\u53D1\u98CE\u63A7\u5BFC\u81F4\u4E0D\u53EF\u518D\u4E0B\u8F7D\uFF01</span>\n        </b><br />\n        <div style=\"height:240px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);\">\n            ").concat(video_html, "\n        </div>\n        <div style=\"margin:2% 0;\">\n            <button id=\"checkbox_btn\">\u5168\u9009</button>\n        </div>");
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
  $('#dl_quality').val(q); // 处理input颜色

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
      } // one by one -> null


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
            filename: task.filename + format(video_url)
          }, {
            url: audio_url,
            filename: task.filename + '.m4a'
          });
        } else {
          download_rpc_ariang({
            url: url,
            filename: task.filename + format(url)
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
    token: config_config.rpc_token,
    dir: config_config.rpc_dir
  };
  return {
    url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
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
  var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace('://', '/'), "/").concat(rpc.port, "/jsonrpc/").concat(window.btoa(rpc.token)) : '';
  var url = config_config.ariang_host + hash_tag;
  var a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('onclick', "window.bp_aria2_window=window.open('".concat(url, "');"));
  a.click();
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
    var task_hash = '#!/new/task?' + ["url=".concat(encodeURIComponent(window.btoa(video.url))), "out=".concat(encodeURIComponent(video.filename)), "header=User-Agent:".concat(window.navigator.userAgent), "header=Referer:".concat(window.location.href)].join('&');

    if (bp_aria2_window && !bp_aria2_window.closed) {
      bp_aria2_window.location.href = config_config.ariang_host + task_hash;
      message_Message.success('发送RPC请求');
    } else {
      message_Message.warning('AriaNG页面未打开');
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
    MessageBox.alert("\u6587\u4EF6\u5927\u5C0F\uFF1A".concat(Math.floor(total / (1024 * 1024)), "MB(").concat(total, "Byte)<br/>") + "\u5DF2\u7ECF\u4E0B\u8F7D\uFF1A".concat(Math.floor(loaded / (1024 * 1024)), "MB(").concat(loaded, "Byte)<br/>") + "\u5F53\u524D\u8FDB\u5EA6\uFF1A".concat(percent, "%<br/>\u4E0B\u8F7D\u4E2D\u8BF7\u52FF\u64CD\u4F5C\u6D4F\u89C8\u5668\uFF0C\u5237\u65B0\u6216\u79BB\u5F00\u9875\u9762\u4F1A\u5BFC\u81F4\u4E0B\u8F7D\u53D6\u6D88\uFF01<br/>\u518D\u6B21\u70B9\u51FB\u4E0B\u8F7D\u6309\u94AE\u53EF\u67E5\u770B\u4E0B\u8F7D\u8FDB\u5EA6\u3002"), function () {
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
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = blob_url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(blob_url);
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

  xhr.send();
  download_blob_clicked = true; // locked

  message_Message.info('准备开始下载');
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
      }); // 2.dialogue

      var dialogue = function dialogue(danmaku, scroll_id, fix_id) {
        var encode = function encode(text) {
          return text.replace(/\{/g, '｛').replace(/\}/g, '｝').replace(/\r|\n/g, '');
        };

        var colorCommand = function colorCommand(color) {
          var r = color >> 16 & 0xff,
              g = color >> 8 & 0xff,
              b = color & 0xff;
          return "\\c&H".concat((b << 16 | g << 8 | r).toString(16), "&");
        }; //const borderColorCommand = color => `\\3c&H${color.toString(16)}&`


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
        var commands = [danmaku.type === 0 ? scrollCommand(50 * (1 + Math.floor(Math.random() * 15)), 1920 + 50 * danmaku.text.length / 2, 0 - 50 * danmaku.text.length / 2) : fixCommand(50 * (1 + fix_id % 15), 960), isWhite(danmaku.color) ? '' : colorCommand(danmaku.color) //isWhite(danmaku.color) ? '' : borderColorCommand(danmaku.color)
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

        var fields = [0, // Layer,
        formatTime(time), // Start
        formatTime(time + (danmaku.type === 0 ? scrollTime : fixTime)), // End
        'Medium', // Style
        '', // Name
        '0', // MarginL
        '0', // MarginR
        '0', // MarginV
        '', // Effect
        '{' + commands.join('') + '}' + encode(text) // Text
        ];
        return 'Dialogue: ' + fields.join(',');
      }; // todo 3. make


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
        } // 4.ass & return

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var data = content.join('\n');

      if (return_type === null || return_type === 'file') {
        var blob_url = URL.createObjectURL(new Blob([data], {
          type: 'text/ass'
        }));
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = blob_url;
        a.download = title + '.ass';
        a.click();
        URL.revokeObjectURL(blob_url);
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
  var file_name = arguments.length > 1 ? arguments[1] : undefined;

  var download_subtitle = function download_subtitle(blob_url) {
    if (!blob_url) {
      message_Message.warning('未发现字幕');
      return;
    }

    var a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', blob_url);
    a.setAttribute('download', file_name + '.vtt');
    a.click();
    URL.revokeObjectURL(blob_url);
  };

  api.get_subtitle_url(p, download_subtitle);
}

function download_blob_zip(blob_data, filename) {
  if (!blob_data) return;
  var blob_url = URL.createObjectURL(blob_data);
  var a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', blob_url);
  a.setAttribute('download', filename + '.zip');
  a.click();
  URL.revokeObjectURL(blob_url);
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
  download_all: download_all,
  download_danmaku_ass: download_danmaku_ass,
  download_subtitle_vtt: download_subtitle_vtt,
  open_ariang: open_ariang
};
;// CONCATENATED MODULE: ./src/html/config.html
// Module
var config_code = "<div id=\"bp_config\"> <div class=\"config-mark\"></div> <div class=\"config-bg\"> <span style=\"font-size:20px\"> <b>bilibili视频下载 参数设置</b> <b> <a href=\"javascript:;\" id=\"reset_config\"> [重置] </a> <a style=\"text-decoration:underline\" href=\"javascript:;\" id=\"show_help\">&lt;通知/帮助&gt;</a> </b> </span> <div style=\"margin:2% 0\"> <label>请求地址：</label> <input id=\"base_api\" style=\"width:30%\"/>&nbsp;&nbsp;&nbsp;&nbsp; <label>请求方式：</label> <select id=\"request_type\"> <option value=\"auto\">自动判断</option> <option value=\"local\">本地请求</option> <option value=\"remote\">远程请求</option> </select><br/> <small>注意：普通使用请勿修改；默认使用混合请求</small> </div> <div style=\"margin:2% 0\"> <label>视频格式：</label> <select id=\"format\"> <option value=\"mp4\">MP4</option> <option value=\"flv\">FLV</option> <option value=\"dash\">DASH</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>切换CDN：</label> <select id=\"host_key\"> {{host_key_options}} </select><br/> <small>注意：无法选择MP4清晰度；建议特殊地区或播放异常时切换（自行选择合适线路）</small> </div> <div style=\"margin:2% 0\"> <label>下载方式：</label> <select id=\"download_type\"> <option value=\"a\">URL链接</option> <option value=\"web\">Web浏览器</option> <option value=\"blob\">Blob请求</option> <option value=\"rpc\">RPC接口</option> <option value=\"aria\">Aria命令</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>AriaNg地址：</label> <input id=\"ariang_host\" style=\"width:30%\"/><br/> <small>提示：建议使用RPC请求下载；非HTTPS或非本地RPC域名使用AriaNg下载</small> </div> <div style=\"margin:2% 0\"> <label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br/> <input id=\"rpc_domain\" placeholder=\"ws://192.168.1.2\" style=\"width:25%\"/> : <input id=\"rpc_port\" placeholder=\"6800\" style=\"width:10%\"/> | <input id=\"rpc_token\" placeholder=\"未设置不填\" style=\"width:15%\"/> | <input id=\"rpc_dir\" placeholder=\"留空使用默认目录\" style=\"width:20%\"/><br/> <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small> </div> <div style=\"margin:2% 0\"> <label>Aria参数：</label> <label>最大连接数：</label> <select id=\"aria2c_connection_level\"> <option value=\"min\">1</option> <option value=\"mid\">8</option> <option value=\"max\">16</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>附加参数：</label> <input id=\"aria2c_addition_parameters\" placeholder=\"见Aria2c文档\" style=\"width:20%\"/><br/> <small>说明：用于配置Aria命令下载方式的参数</small> </div> <div style=\"margin:2% 0\"> <label>强制换源：</label> <select id=\"replace_force\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕速度：</label> <input id=\"danmaku_speed\" style=\"width:5%\"/> s &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕字号：</label> <input id=\"danmaku_fontsize\" style=\"width:5%\"/> px<br/> <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small> </div> <div style=\"margin:2% 0\"> <label>自动下载：</label> <select id=\"auto_download\"> <option value=\"0\">关闭</option> <option value=\"1\">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>视频质量：</label> <select id=\"video_quality\"> {{video_quality_options}} </select><br/> <small>说明：请求地址成功后将自动点击下载视频按钮</small> </div> <div style=\"margin:2% 0\"> <label>授权状态：</label> <select id=\"auth\" disabled=\"disabled\"> <option value=\"0\">未授权</option> <option value=\"1\">已授权</option> </select> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login\">扫码授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_2\">网页授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_logout\">取消授权</a> <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_help\">这是什么？</a> </div> <br/> <div style=\"text-align:right\"> <button class=\"setting-button\" id=\"save_config\">确定</button> </div> </div> <style>#bp_config{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:10000}#bp_config .config-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;z-index:10001}#bp_config .config-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:10000}#bp_config .setting-button{width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}#bp_config .setting-button:hover{background:#59f}#bp_config .setting-context{margin:0 1%;color:#00f}#bp_config .setting-context:hover{color:red}</style> </div> ";
// Exports
/* harmony default export */ var config = (config_code);
;// CONCATENATED MODULE: ./src/js/ui/config.js
var _document$head$innerH;










var config_config = {
  base_api: 'https://api.injahow.cn/bparse/',
  request_type: 'auto',
  format: 'mp4',
  host_key: '0',
  replace_force: '0',
  auth: '0',
  download_type: 'web',
  rpc_domain: 'http://localhost',
  rpc_port: '16800',
  rpc_token: '',
  rpc_dir: '',
  aria2c_connection_level: 'min',
  aria2c_addition_parameters: '',
  ariang_host: 'http://ariang.injahow.com/',
  auto_download: '0',
  video_quality: '0',
  danmaku_speed: '15',
  danmaku_fontsize: '22'
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
  120: '4K 超清',
  116: '1080P 60帧',
  112: '1080P 高码率',
  80: '1080P 高清',
  74: '720P 60帧',
  64: '720P 高清',
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
      store.set('config_str', JSON.stringify(config_config));
    } catch (err) {
      old_config = Object.assign({}, config_config);
    } // 判断重新请求


    for (var _i = 0, _arr = ['base_api', 'format', 'auth', 'video_quality']; _i < _arr.length; _i++) {
      var key = _arr[_i];

      if (config_config[key] !== old_config[key]) {
        $('#video_download').hide();
        $('#video_download_2').hide();
        break;
      }
    }

    if (config_config.host_key !== old_config.host_key) {
      check.refresh();
      $('#video_url').attr('href', '#');
      $('#video_url_2').attr('href', '#');
    } // 判断RPC配置情况


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
    } // 更新弹幕设置


    for (var _i2 = 0, _arr2 = ['danmaku_speed', 'danmaku_fontsize']; _i2 < _arr2.length; _i2++) {
      var _key = _arr2[_i2];

      if (config_config[_key] !== old_config[_key]) {
        player.danmaku.config();
        break;
      }
    } // todo
    // 关闭


    $('#bp_config').hide();
    $('#bp_config').css('opacity', 0);
    scroll_scroll.show();
  },
  reset_config: function reset_config() {
    for (var key in default_config) {
      if (key === 'auth') {
        continue;
      }

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

  config = config.replace('{{host_key_options}}', options); // 注入 video_quality_options

  options = '<option value="0">与播放器相同</option>';

  for (var _k in videoQualityMap) {
    options += "<option value=\"".concat(_k, "\">").concat(videoQualityMap[_k], "</option>");
  }

  config = config.replace('{{video_quality_options}}', options);

  if (el && !!$(el)[0]) {
    $(el).append(config);
  } else {
    $('body').append(config);
  } // 同步数据


  var config_str = store.get('config_str');

  if (config_str) {
    // set config from cache
    try {
      var old_config = JSON.parse(config_str);

      for (var key in old_config) {
        if (Object.hasOwnProperty.call(config_config, key)) {
          config_config[key] = old_config[key];
        }
      }
    } catch (_unused) {
      console.log('初始化脚本配置');
    }
  }

  config_config.auth = store.get('auth_id') && store.get('auth_sec') ? '1' : '0';
  store.set('config_str', JSON.stringify(config_config)); // 函数绑定

  var _loop = function _loop(_key2) {
    if (_key2 === 'auth') {
      return "continue";
    }

    $("#".concat(_key2)).on('input', function (e) {
      config_config[_key2] = e.delegateTarget.value;
    });
  };

  for (var _key2 in config_config) {
    var _ret = _loop(_key2);

    if (_ret === "continue") continue;
  }

  for (var _k2 in config_functions) {
    var e = $("#".concat(_k2))[0]; // a && button

    !!e && (e.onclick = config_functions[_k2]);
  } // 渲染数据


  for (var _key3 in config_config) {
    $("#".concat(_key3)).val(config_config[_key3]);
  }

  window.onbeforeunload = function () {
    // todo
    var bp_aria2_window = window.bp_aria2_window;

    if (bp_aria2_window && !bp_aria2_window.closed) {
      bp_aria2_window.close();
    }
  };
}


;// CONCATENATED MODULE: ./src/js/utils/cookie.js
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


;// CONCATENATED MODULE: ./src/js/auth.js
function auth_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function auth_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? auth_ownKeys(Object(source), !0).forEach(function (key) { auth_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : auth_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function auth_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function auth_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function auth_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function auth_createClass(Constructor, protoProps, staticProps) { if (protoProps) auth_defineProperties(Constructor.prototype, protoProps); if (staticProps) auth_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var Auth = /*#__PURE__*/function () {
  function Auth() {
    auth_classCallCheck(this, Auth);

    this.auth_clicked = false;
    this.auth_window = null;
    this.TV_KEY = '4409e2ce8ffd12b8';
    this.TV_SEC = '59b43e04ad6965f34319062b478f83dd';
  }

  auth_createClass(Auth, [{
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
          config_config.auth = '0';
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
          config_config.auth = '1';
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
;// CONCATENATED MODULE: ./src/html/toolbar.html
// Module
var toolbar_code = "<div id=\"toolbar_module_2\" class=\"tool-bar clearfix report-wrap-module report-scroll-module media-info\" scrollshow=\"true\"> <div id=\"setting_btn\" class=\"like-info\"> <i class=\"iconfont icon-add\"></i><span>脚本设置</span> </div> <div id=\"bilibili_parse\" class=\"like-info\"> <i class=\"iconfont icon-customer-serv\"></i><span>请求地址</span> </div> <div id=\"video_download\" class=\"like-info\" style=\"display:none\"> <i class=\"iconfont icon-download\"></i><span>下载视频</span> </div> <div id=\"video_download_2\" class=\"like-info\" style=\"display:none\"> <i class=\"iconfont icon-download\"></i><span>下载音频</span> </div> <div id=\"video_download_all\" class=\"like-info\"> <i class=\"iconfont icon-download\"></i><span>批量下载</span> </div> <div class=\"more\">更多<div class=\"more-ops-list\"> <ul> <li><span id=\"download_danmaku\">下载弹幕</span></li> <li><span id=\"download_subtitle\">下载字幕</span></li> </ul> </div> </div> <style>.tool-bar .more{float:right;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.tool-bar .more:hover .more-ops-list{display:block}.tool-bar:after{display:block;content:\"\";clear:both}.more-ops-list{display:none;position:absolute;width:80px;left:-65px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> </div> ";
// Exports
/* harmony default export */ var toolbar = (toolbar_code);
;// CONCATENATED MODULE: ./src/html/more_style.html
// Module
var more_style_code = "<style>.more{float:right;padding:1px;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.more:hover .more-ops-list{display:block}.more-ops-list{display:none;position:absolute;width:80px;left:-15px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> ";
// Exports
/* harmony default export */ var more_style = (more_style_code);
;// CONCATENATED MODULE: ./src/js/ui/toolbar.js


var btn_list = {
  setting_btn: '脚本设置',
  bilibili_parse: '请求地址',
  video_download: '下载视频',
  video_download_2: '下载音频',
  video_download_all: '批量下载',
  more: {
    download_danmaku: '下载弹幕',
    download_subtitle: '下载字幕'
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

function showVideoToolbar(toolbar_id) {
  var toolbar_obj = $("#".concat(toolbar_id));
  var toolbar_obj_2 = toolbar_obj.clone();
  toolbar_obj_2.attr('id', "".concat(toolbar_id, "_2"));
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
  toolbar_obj_2.attr('id', "".concat(toolbar_id, "_2"));
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
  } // 处理遮挡


  !!$('#limit-mask-wall')[0] && $('#limit-mask-wall').remove();
}


;// CONCATENATED MODULE: ./src/js/main.js
function main_slicedToArray(arr, i) { return main_arrayWithHoles(arr) || main_iterableToArrayLimit(arr, i) || main_unsupportedIterableToArray(arr, i) || main_nonIterableRest(); }

function main_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function main_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function main_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function main_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function main_createClass(Constructor, protoProps, staticProps) { if (protoProps) main_defineProperties(Constructor.prototype, protoProps); if (staticProps) main_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }














var Main = /*#__PURE__*/function () {
  function Main() {
    main_classCallCheck(this, Main);

    /* global JS_VERSION GIT_HASH */
    console.log('\n'.concat(" %c bilibili-parse-download.user.js v", "2.6.1", " ").concat("713ece0", " %c https://github.com/injahow/user.js ", '\n', '\n'), 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
  }

  main_createClass(Main, [{
    key: "init",
    value: function init() {
      initToolbar();
      var root_div = document.createElement('div');
      root_div.id = 'bp_root';
      document.body.append(root_div); // initConfig

      initConfig("#".concat(root_div.id));
      initMessage("#".concat(root_div.id));
      user.lazyInit();
      auth.checkLoginStatus();
      check.refresh();
      $("#".concat(root_div.id)).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">'); // for dom changed

      $("#".concat(root_div.id)).append('<a id="video_url" style="display:none;" target="_blank" href="#"></a>');
      $("#".concat(root_div.id)).append('<a id="video_url_2" style="display:none;" target="_blank" href="#"></a>');
    }
  }, {
    key: "run",
    value: function run() {
      this.init();
      var api_url, api_url_temp;
      var evt = {
        setting_btn: function setting_btn() {
          user.lazyInit(true); // init
          // set form by config

          for (var key in config_config) {
            $("#".concat(key)).val(config_config[key]);
          } //show setting


          $("#bp_config").show();
          $("#bp_config").animate({
            'opacity': '1'
          }, 300);
          scroll_scroll.hide();
        },
        bilibili_parse: function bilibili_parse() {
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

          if (config_config.auth === '1' && auth_id && auth_sec) {
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
        },
        download_danmaku: function download_danmaku() {
          var vb = video.base();
          Download.download_danmaku_ass(vb.cid(), vb.filename());
        },
        download_subtitle: function download_subtitle() {
          Download.download_subtitle_vtt(0, video.base().filename());
        },
        video_download_all: function video_download_all() {
          user.lazyInit(true); // init

          if (store.get('auth_id') && store.get('auth_sec')) {
            if (config_config.download_type === 'rpc') {
              Download.download_all();
            } else {
              MessageBox.confirm('仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？', function () {
                Download.download_all();
              });
            }
          } else {
            MessageBox.confirm('批量下载仅支持授权用户使用RPC接口下载，是否进行授权？', function () {
              auth.login();
            });
          }
        },
        video_download: function video_download() {
          var type = config_config.download_type;

          if (type === 'web') {
            $('#video_url')[0].click();
          } else if (type === 'a') {
            var _ref3 = [$('#video_url').attr('href'), $('#video_url_2').attr('href'), $('#video_url').attr('download'), $('#video_url_2').attr('download')],
                video_url = _ref3[0],
                video_url_2 = _ref3[1],
                file_name = _ref3[2],
                file_name_2 = _ref3[3];
            var msg = '建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>' + "<a href=\"".concat(video_url, "\" download=\"").concat(file_name, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u89C6\u9891\u5730\u5740&lt</a><br/><br/>") + (config_config.format === 'dash' ? "<a href=\"".concat(video_url_2, "\" download=\"").concat(file_name_2, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u97F3\u9891\u5730\u5740&lt</a>") : '');
            MessageBox.alert(msg);
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
                _ref6 = main_slicedToArray(_ref5, 2),
                url_max_connection = _ref6[0],
                server_max_connection = _ref6[1];

            var aria2c_max_connection_parameters = "--max-concurrent-downloads ".concat(url_max_connection, " --max-connection-per-server ").concat(server_max_connection);

            var _map = ["aria2c \"".concat(_video_url, "\" --out \"").concat(_file_name, "\""), "aria2c \"".concat(_video_url_, "\" --out \"").concat(_file_name_, "\"")].map(function (code) {
              return "".concat(code, " ").concat(aria2c_header, " ").concat(aria2c_max_connection_parameters, " ").concat(config_config.aria2c_addition_parameters);
            }),
                _map2 = main_slicedToArray(_map, 2),
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
          } else {
            var url = $('#video_url').attr('href');
            var filename = video.base().filename() + Download.url_format(url);
            Download.download(url, filename, type);
          }
        },
        video_download_2: function video_download_2() {
          var type = config_config.download_type;

          if (type === 'web') {
            $('#video_url_2')[0].click();
          } else if (type === 'a') {
            $('#video_download').click();
          } else if (type === 'aria') {
            $('#video_download').click();
          } else {
            var url = $('#video_url_2').attr('href');
            var filename = video.base().filename() + '.m4a';
            Download.download(url, filename, type);
          }
        }
      }; // api & click

      window.bpd = evt;
      Object.entries(evt).forEach(function (_ref7) {
        var _ref8 = main_slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return $('body').on('click', "#".concat(k), v);
      }); // part of check

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
      }); // 监听q

      $('body').on('click', 'li.bui-select-item', function () {
        check.refresh();
      }); // 监听aid

      $('body').on('click', '.rec-list', function () {
        check.refresh();
      });
      $('body').on('click', '.bilibili-player-ending-panel-box-videos', function () {
        check.refresh();
      }); // 定时检查

      setInterval(function () {
        if (check.href !== location.href) {
          check.refresh();
        }
      }, 500);
      setInterval(function () {
        var vb = video.base();

        if (check.aid !== vb.aid() || check.cid !== vb.cid()) {
          check.refresh();
        }
      }, 1500);
    }
  }]);

  return Main;
}();

/* harmony default export */ var main = (Main);
;// CONCATENATED MODULE: ./src/js/index.js


(function () {
  'use strict';

  if (window.bp_fun_locked) return;
  window.bp_fun_locked = true; // error page

  if ($('.error-text')[0]) {
    return;
  }

  setTimeout(function () {
    new main().run();
  }, 5000);
})();
/******/ })()
;