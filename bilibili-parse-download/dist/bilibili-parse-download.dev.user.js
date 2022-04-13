// ==UserScript==
// @name          bilibili视频下载(development)
// @namespace     https://github.com/injahow
// @version       1.0.0
// @description   bilibili视频下载(development)
// @author        injahow
// @copyright     2021, injahow (https://github.com/injahow)
// @license       MIT
// @source        https://github.com/injahow/user.js
// @supportURL    https://github.com/injahow/user.js/issues
// @downloadURL   https://greasyfork.org/scripts/413228-bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD/code/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.user.js
// @updateURL     https://greasyfork.org/scripts/413228-bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD/code/bilibili%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD.user.js
// @match         *://www.bilibili.com/video/av*
// @match         *://www.bilibili.com/video/BV*
// @match         *://www.bilibili.com/medialist/play/*
// @match         *://www.bilibili.com/bangumi/play/ep*
// @match         *://www.bilibili.com/bangumi/play/ss*
// @match         *://www.bilibili.com/cheese/play/ep*
// @match         *://www.bilibili.com/cheese/play/ss*
// @match         https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png*
// @require       https://static.hdslb.com/js/jquery.min.js
// @require       https://cdn.jsdelivr.net/npm/flv.js@1.6.2/dist/flv.min.js
// @require       https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js
// @icon          https://static.hdslb.com/images/favicon.ico
// @grant         none
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ source codes in local repo ]
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/auth.js":
/*!************************!*\
  !*** ./src/js/auth.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auth": function() { return /* binding */ auth; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/config.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/js/store.js");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/message */ "./src/js/ui/message.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user */ "./src/js/user.js");
/* harmony import */ var _utils_ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/ajax */ "./src/js/utils/ajax.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }







var Auth = /*#__PURE__*/function () {
  function Auth() {
    _classCallCheck(this, Auth);

    this.auth_clicked = false;
  }

  _createClass(Auth, [{
    key: "reLogin",
    value: function reLogin() {
      _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_id', '');
      _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_sec', '');
      _store__WEBPACK_IMPORTED_MODULE_1__.store.set('access_key', '');
      _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_time', '0');
      this.login();
    }
  }, {
    key: "checkLoginStatus",
    value: function checkLoginStatus() {
      var _this = this;

      var _ref = [_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_sec'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('access_key'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_time') || '0'],
          auth_id = _ref[0],
          auth_sec = _ref[1],
          access_key = _ref[2],
          auth_time = _ref[3];
      if (!access_key) return;

      if (_user__WEBPACK_IMPORTED_MODULE_3__.user.is_login && (_config__WEBPACK_IMPORTED_MODULE_0__.config.base_api !== _store__WEBPACK_IMPORTED_MODULE_1__.store.get('pre_base_api') || Date.now() - parseInt(auth_time) > 24 * 60 * 60 * 1000)) {
        // check key
        (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
          url: "https://api.bilibili.com/x/space/myinfo?access_key=".concat(access_key),
          type: 'GET',
          dataType: 'json'
        }).then(function (res) {
          if (res.code) {
            _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert('授权已过期，准备重新授权', _this.reLogin);
          } else {
            _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_time', Date.now());
            return (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
              url: "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.config.base_api, "/auth/v2/?act=check&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&access_key=").concat(access_key),
              type: 'GET',
              dataType: 'json'
            });
          }
        }).then(function (res) {
          if (res.code) {
            _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert('授权检查失败，准备重新授权', _this.reLogin);
          }
        });
      }

      _store__WEBPACK_IMPORTED_MODULE_1__.store.set('pre_base_api', _config__WEBPACK_IMPORTED_MODULE_0__.config.base_api);
    }
  }, {
    key: "_login",
    value: function _login(resolve) {
      var _this2 = this;

      if (this.auth_clicked) {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.miaow();
        return;
      }

      this.auth_clicked = true;
      (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
        url: 'https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=https%3A%2F%2Fwww.mcbbs.net%2Ftemplate%2Fmcbbs%2Fimage%2Fspecial_photo_bg.png&sign=04224646d1fea004e79606d3b038c84a',
        xhrFields: {
          withCredentials: true
        },
        type: 'GET',
        dataType: 'json'
      }).then(resolve).finally(function (_) {
        return _this2.auth_clicked = false;
      });
    }
  }, {
    key: "login",
    value: function login() {
      this._login(function (res) {
        if (res.data.has_login) {
          $('body').append("<iframe id='auth_iframe' src='".concat(res.data.confirm_uri, "' style='display:none;'></iframe>"));
        } else {
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', function () {
            location.href = 'https://passport.bilibili.com/login';
          });
        }
      });
    }
  }, {
    key: "loginManual",
    value: function loginManual() {
      this._login(function (res) {
        if (res.data.has_login) {
          var msg = '' + "\u8BF7\u70B9\u51FB<b><a href='".concat(res.data.confirm_uri, "' target='_blank'>\u6388\u6743\u5730\u5740</a></b>\n                    \u6253\u5F00\u4E00\u4E2A\u65B0\u7A97\u53E3\uFF0C\u6B63\u5E38\u60C5\u51B5\u65B0\u7A97\u53E3\u5E94\u8BE5\u663E\u793A\u4E00\u4E2A\u56FE\u7247\uFF0C\u8BF7\u5C06\u8BE5\u7A97\u53E3\u5730\u5740\u680F\u7684URL\u94FE\u63A5\u590D\u5236\u5230\u5F53\u524D\u6587\u672C\u6846\u4E2D<br/>\n                    <input id='auth_url' style='width:100%;' type='text' autocomplete='off'><br>\u7136\u540E\u70B9\u51FB\u786E\u5B9A\u5373\u53EF");
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert(msg, function () {
            var auth_url = $('#auth_url').val();
            var auth_id = _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id') || '',
                auth_sec = _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_sec') || '';
            (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
              url: auth_url.replace('https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?', "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
              type: 'GET',
              dataType: 'json'
            }).then(function (res) {
              if (!res.code) {
                _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.success('授权成功');

                if (res.auth_id && res.auth_sec) {
                  _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_id', res.auth_id);
                  _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_sec', res.auth_sec);
                }

                _store__WEBPACK_IMPORTED_MODULE_1__.store.set('access_key', new URL(auth_url).searchParams.get('access_key'));
                _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_time', Date.now());
                $('#auth').val('1');
                _config__WEBPACK_IMPORTED_MODULE_0__.config.auth = '1';
              } else {
                _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.warning('授权失败');
              }
            });
          });
        } else {
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', function () {
            location.href = 'https://passport.bilibili.com/login';
          });
        }
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this3 = this;

      if (!_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id')) {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert('没有发现授权记录');
        return;
      }

      if (this.auth_clicked) {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.miaow();
        return;
      }

      var _ref2 = [_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_sec')],
          auth_id = _ref2[0],
          auth_sec = _ref2[1];
      (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
        url: "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.config.base_api, "/auth/v2/?act=logout&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
        type: 'GET',
        dataType: 'json'
      }).then(function (res) {
        if (!res.code) {
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.success('取消成功');
          _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_id', '');
          _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_sec', '');
          _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_time', '0');
          _store__WEBPACK_IMPORTED_MODULE_1__.store.set('access_key', '');
          $('#auth').val('0');
          _config__WEBPACK_IMPORTED_MODULE_0__.config.auth = '0';
        } else {
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.warning('取消失败');
        }
      }).finally(function (_) {
        return _this3.auth_clicked = false;
      });
    }
  }, {
    key: "initAuth",
    value: function initAuth() {
      var _this4 = this;

      window.bp_show_login = function () {
        var auto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';

        var show_login = function show_login() {
          if (auto === '1') {
            _this4.login();
          } else {
            _this4.loginManual();
          }
        };

        if (_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id')) {
          _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.confirm('发现授权记录，是否重新授权？', function () {
            show_login();
          });
        } else {
          show_login();
        }
      };

      window.bp_show_logout = function () {
        _this4.logout();
      };

      window.bp_show_login_help = function () {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.confirm('进行授权之后将能在远程请求时享有用户账号原有的权益，例如能够请求用户已经付费或承包的番剧，是否需要授权？', function () {
          _this4.login();
        });
      };

      window.addEventListener('message', function (e) {
        if (typeof e.data !== 'string') return;

        if (e.data.split(':')[0] === 'bilibili-parse-login-credentials') {
          $('iframe#auth_iframe').remove();
          var url = e.data.split(': ')[1];
          var _ref3 = [_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_sec')],
              auth_id = _ref3[0],
              auth_sec = _ref3[1];
          (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
            url: url.replace('https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?', "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
            type: 'GET',
            dataType: 'json'
          }).then(function (res) {
            if (!res.code) {
              _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.success('授权成功');

              if (res.auth_id && res.auth_sec) {
                _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_id', res.auth_id);
                _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_sec', res.auth_sec);
              }

              _store__WEBPACK_IMPORTED_MODULE_1__.store.set('access_key', new URL(url).searchParams.get('access_key'));
              _store__WEBPACK_IMPORTED_MODULE_1__.store.set('auth_time', Date.now());
              $('#auth').val('1');
              _config__WEBPACK_IMPORTED_MODULE_0__.config.auth = '1';
            } else {
              _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.warning('授权失败');
            }
          }).finally(function (_) {
            return _this4.auth_clicked = false;
          });
        }
      });
    }
  }]);

  return Auth;
}();

var auth = new Auth();

/***/ }),

/***/ "./src/js/check.js":
/*!*************************!*\
  !*** ./src/js/check.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "check": function() { return /* binding */ check; }
/* harmony export */ });
/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/video */ "./src/js/utils/video.js");
/* harmony import */ var _utils_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/player */ "./src/js/utils/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Check = /*#__PURE__*/function () {
  function Check() {
    _classCallCheck(this, Check);

    this.aid = '';
    this.cid = '';
    this.q = '';
    this.epid = '';
  }

  _createClass(Check, [{
    key: "refresh",
    value: function refresh() {
      console.log('refresh...');
      $('#video_download').hide();
      $('#video_download_2').hide();
      _utils_player__WEBPACK_IMPORTED_MODULE_1__.player.recover_player(); // 更新check

      var vb = _utils_video__WEBPACK_IMPORTED_MODULE_0__.video.base();
      this.aid = vb.aid();
      this.cid = vb.cid();
      this.epid = vb.epid();
      this.q = _utils_video__WEBPACK_IMPORTED_MODULE_0__.video.get_quality().q;
      window.bp_episodes = null; // todo
    }
  }]);

  return Check;
}();

var check = new Check();

/***/ }),

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": function() { return /* binding */ config; },
/* harmony export */   "hostKeyOption": function() { return /* binding */ hostKeyOption; },
/* harmony export */   "hostMap": function() { return /* binding */ hostMap; },
/* harmony export */   "initConfig": function() { return /* binding */ initConfig; }
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/js/store.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check */ "./src/js/check.js");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/message */ "./src/js/ui/message.js");
/* harmony import */ var _ui_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/scroll */ "./src/js/ui/scroll.js");
/* harmony import */ var _utils_ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/ajax */ "./src/js/utils/ajax.js");
/* harmony import */ var _utils_download__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/download */ "./src/js/utils/download.js");
/* harmony import */ var _utils_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/player */ "./src/js/utils/player.js");
/* harmony import */ var _css_config_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../css/config.css */ "./src/css/config.css");
/* harmony import */ var _html_config_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../html/config.html */ "./src/html/config.html");









var config = {
  base_api: 'https://api.injahow.cn/bparse/',
  request_type: 'auto',
  format: 'flv',
  host_key: '0',
  replace_force: '0',
  auth: '0',
  download_type: 'web',
  rpc_domain: 'http://localhost',
  rpc_port: '16800',
  rpc_token: '',
  rpc_dir: 'D:/',
  auto_download: '0',
  danmaku_speed: '15',
  danmaku_fontsize: '22'
};
var hostMap = {
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

function initConfig() {
  var default_config = Object.assign({}, config); // 浅拷贝

  var config_str = _store__WEBPACK_IMPORTED_MODULE_0__.store.get('config_str') || localStorage.getItem('my_config_str');

  if (!config_str) {
    _store__WEBPACK_IMPORTED_MODULE_0__.store.set('config_str', JSON.stringify(config));
    localStorage.setItem('my_config_str', JSON.stringify(config)); // wait to be deleted
  } else {
    // set config from cache
    var old_config = JSON.parse(config_str);

    for (var key in old_config) {
      if (Object.hasOwnProperty.call(config, key)) {
        config[key] = old_config[key];
      }
    }
  }

  window.bp_save_config = function () {
    // set config by form
    for (var _key in config) {
      config[_key] = $("#".concat(_key)).val();
    }

    var old_config = JSON.parse(_store__WEBPACK_IMPORTED_MODULE_0__.store.get('config_str') || localStorage.getItem('my_config_str'));
    _store__WEBPACK_IMPORTED_MODULE_0__.store.set('config_str', JSON.stringify(config));
    localStorage.setItem('my_config_str', JSON.stringify(config)); // wait to be deleted
    // hide

    $('#bp_config').hide();
    $('#bp_config').css('opacity', 0);
    _ui_scroll__WEBPACK_IMPORTED_MODULE_3__.scroll.show(); // 判断是否需要重新请求

    for (var _i = 0, _arr = ['base_api', 'format', 'auth']; _i < _arr.length; _i++) {
      var _key2 = _arr[_i];

      if (config[_key2] !== old_config[_key2]) {
        $('#video_download').hide();
        $('#video_download_2').hide();
        break;
      }
    }

    if (config.host_key !== old_config.host_key) {
      _check__WEBPACK_IMPORTED_MODULE_1__.check.refresh();
      $('#video_url').attr('href', '#');
      $('#video_url_2').attr('href', '#');
    } // 判断RPC配置情况


    if (config.rpc_domain !== old_config.rpc_domain) {
      if (!(config.rpc_domain.match('https://') || config.rpc_domain.match(/(localhost|127\.0\.0\.1)/))) {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert('' + '检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；' + '请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；' + '配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！', function () {
          _utils_download__WEBPACK_IMPORTED_MODULE_5__.Download.open_ariang({
            domain: config.rpc_domain,
            port: config.rpc_port,
            token: config.rpc_token
          });
        });
      }
    } // 判断弹幕设置情况


    for (var _i2 = 0, _arr2 = ['danmaku_speed', 'danmaku_fontsize']; _i2 < _arr2.length; _i2++) {
      var _key3 = _arr2[_i2];

      if (config[_key3] !== old_config[_key3]) {
        _utils_player__WEBPACK_IMPORTED_MODULE_6__.player.danmaku.config();
        break;
      }
    }
  };

  window.onbeforeunload = function () {
    window.bp_save_config();
    var bp_aria2_window = window.bp_aria2_window;

    if (bp_aria2_window && !bp_aria2_window.closed) {
      bp_aria2_window.close();
    }
  };

  var help_clicked = false;

  window.bp_show_help = function () {
    if (help_clicked) {
      _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.miaow();
      return;
    }

    help_clicked = true;
    (0,_utils_ajax__WEBPACK_IMPORTED_MODULE_4__.ajax)({
      url: "".concat(config.base_api, "/auth/v2/?act=help"),
      dataType: 'text'
    }).then(function (res) {
      if (res) {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.MessageBox.alert(res);
      } else {
        _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.warning('获取失败');
      }
    }).finally(function (_) {
      return help_clicked = false;
    });
  };

  !window.bp_reset_config && (window.bp_reset_config = function () {
    for (var _key4 in default_config) {
      if (_key4 === 'auth') {
        continue;
      }

      $("#".concat(_key4)).val(default_config[_key4]);
    }
  }); // 注入 html

  _html_config_html__WEBPACK_IMPORTED_MODULE_8__["default"] = _html_config_html__WEBPACK_IMPORTED_MODULE_8__["default"].replace('${host_key_option}', hostKeyOption());
  $('body').append(_html_config_html__WEBPACK_IMPORTED_MODULE_8__["default"] + _css_config_css__WEBPACK_IMPORTED_MODULE_7__["default"]); // 初始化配置页面

  for (var _key5 in config) {
    $("#".concat(_key5)).val(config[_key5]);
  }
}

function hostKeyOption() {
  var host_keys = Object.keys(hostMap);
  var host_key_option = '<option value="0">关闭</option>';

  for (var _i3 = 0, _host_keys = host_keys; _i3 < _host_keys.length; _i3++) {
    var key = _host_keys[_i3];
    host_key_option += "<option value=\"".concat(key, "\">").concat(hostMap[key], "</option>");
  }

  return host_key_option;
}



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/api */ "./src/js/utils/api.js");
/* harmony import */ var _utils_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/player */ "./src/js/utils/player.js");
/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/video */ "./src/js/utils/video.js");
/* harmony import */ var _utils_download__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/download */ "./src/js/utils/download.js");
/* harmony import */ var _ui_scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/scroll */ "./src/js/ui/scroll.js");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/message */ "./src/js/ui/message.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config */ "./src/js/config.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user */ "./src/js/user.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth */ "./src/js/auth.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./check */ "./src/js/check.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store */ "./src/js/store.js");
/* harmony import */ var _html_arc_toolbar_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../html/arc_toolbar.html */ "./src/html/arc_toolbar.html");
/* harmony import */ var _html_video_toolbar_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../html/video_toolbar.html */ "./src/html/video_toolbar.html");
/* harmony import */ var _html_toolbar_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../html/toolbar.html */ "./src/html/toolbar.html");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
















var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    (0,_config__WEBPACK_IMPORTED_MODULE_6__.initConfig)();
    (0,_ui_message__WEBPACK_IMPORTED_MODULE_5__.initMessage)();
    _auth__WEBPACK_IMPORTED_MODULE_8__.auth.initAuth();
  }

  _createClass(Main, [{
    key: "run",
    value: function run() {
      $('body').append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
      $('body').append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>'); // 延迟处理

      setTimeout(function () {
        var bp_toolbar;

        if (!!$('#arc_toolbar_report')[0]) {
          bp_toolbar = _html_arc_toolbar_html__WEBPACK_IMPORTED_MODULE_11__["default"];
          $('#arc_toolbar_report').after(bp_toolbar);
        } else if (!!$('#toolbar_module')[0]) {
          bp_toolbar = _html_toolbar_html__WEBPACK_IMPORTED_MODULE_13__["default"];
          $('#toolbar_module').after(bp_toolbar);
        } else if (!!$('div.video-toolbar')[0]) {
          bp_toolbar = _html_video_toolbar_html__WEBPACK_IMPORTED_MODULE_12__["default"];
          $('div.video-toolbar').after(bp_toolbar);
        }

        _user__WEBPACK_IMPORTED_MODULE_7__.user.lazyInit();
        _auth__WEBPACK_IMPORTED_MODULE_8__.auth.checkLoginStatus();
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      }, 3000);
      $('body').on('click', '#setting_btn', function () {
        _user__WEBPACK_IMPORTED_MODULE_7__.user.lazyInit(true); // init
        // set form by config

        for (var key in _config__WEBPACK_IMPORTED_MODULE_6__.config) {
          $("#".concat(key)).val(_config__WEBPACK_IMPORTED_MODULE_6__.config[key]);
        } //show setting


        $("#bp_config").show();
        $("#bp_config").animate({
          'opacity': '1'
        }, 300);
        _ui_scroll__WEBPACK_IMPORTED_MODULE_4__.scroll.hide();
      });
      $('body').on('click', '#download_danmaku', function () {
        var vb = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base();
        _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download_danmaku_ass(vb.cid(), vb.filename());
      });
      $('body').on('click', '#download_subtitle', function () {
        _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download_subtitle_vtt(0, _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base().filename());
      });
      $('body').on('click', '#video_download_all', function () {
        _user__WEBPACK_IMPORTED_MODULE_7__.user.lazyInit(true); // init

        if (_store__WEBPACK_IMPORTED_MODULE_10__.store.get('auth_id') && _store__WEBPACK_IMPORTED_MODULE_10__.store.get('auth_sec')) {
          if (_config__WEBPACK_IMPORTED_MODULE_6__.config.download_type === 'rpc') {
            _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download_all();
          } else {
            _ui_message__WEBPACK_IMPORTED_MODULE_5__.MessageBox.confirm('仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？', function () {
              _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download_all();
            });
          }
        } else {
          _ui_message__WEBPACK_IMPORTED_MODULE_5__.MessageBox.confirm('批量下载仅支持授权用户使用RPC接口下载，是否进行授权？', function () {
            window.bp_show_login();
          });
        }
      });
      $('body').on('click', '#video_download', function () {
        var type = _config__WEBPACK_IMPORTED_MODULE_6__.config.download_type;

        if (type === 'web') {
          $('#video_url')[0].click();
        } else if (type === 'a') {
          var _ref = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
              video_url = _ref[0],
              video_url_2 = _ref[1];
          var msg = '建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>' + "<a href=\"".concat(video_url, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u89C6\u9891\u5730\u5740&lt</a><br/><br/>") + (_config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash' ? "<a href=\"".concat(video_url_2, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u97F3\u9891\u5730\u5740&lt</a>") : '');
          _ui_message__WEBPACK_IMPORTED_MODULE_5__.MessageBox.alert(msg);
        } else if (type === 'aria') {
          var _ref2 = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
              _video_url = _ref2[0],
              _video_url_ = _ref2[1];
          var video_title = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base().filename();
          var file_name, file_name_2;
          file_name = video_title + _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.url_format(_video_url);
          file_name_2 = video_title + '_audio.mp4';
          var aria2_header = "--header \"User-Agent: ".concat(window.navigator.userAgent, "\" --header \"Referer: ").concat(window.location.href, "\"");
          var code = "aria2c \"".concat(_video_url, "\" --out \"").concat(file_name, "\" ").concat(aria2_header),
              code_2 = "aria2c \"".concat(_video_url_, "\" --out \"").concat(file_name_2, "\" ").concat(aria2_header);

          var _msg = '点击文本框即可复制下载命令！<br/><br/>' + "\u89C6\u9891\uFF1A<br/><input id=\"aria2_code\" value='".concat(code, "' onclick=\"bp_clip_btn('aria2_code')\" style=\"width:100%;\"></br></br>") + (_config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash' ? "\u97F3\u9891\uFF1A<br/><input id=\"aria2_code_2\" value='".concat(code_2, "' onclick=\"bp_clip_btn('aria2_code_2')\" style=\"width:100%;\"><br/><br/>") + "\u5168\u90E8\uFF1A<br/><textarea id=\"aria2_code_all\" onclick=\"bp_clip_btn('aria2_code_all')\" style=\"min-width:100%;max-width:100%;min-height:100px;max-height:100px;\">".concat(code, "\n").concat(code_2, "</textarea>") : '');

          !window.bp_clip_btn && (window.bp_clip_btn = function (id) {
            $("#".concat(id)).select();

            if (document.execCommand('copy')) {
              _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.success('复制成功');
            } else {
              _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.warning('复制失败');
            }
          });
          _ui_message__WEBPACK_IMPORTED_MODULE_5__.MessageBox.alert(_msg);
        } else {
          var url = $('#video_url').attr('href');
          var filename = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base().filename();
          _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download(url, filename, type);
        }
      });
      $('body').on('click', '#video_download_2', function () {
        var type = _config__WEBPACK_IMPORTED_MODULE_6__.config.download_type;

        if (type === 'web') {
          $('#video_url_2')[0].click();
        } else if (type === 'a') {
          $('#video_download').click();
        } else if (type === 'aria') {
          $('#video_download').click();
        } else {
          var url = $('#video_url_2').attr('href');
          var filename = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base().filename();
          _utils_download__WEBPACK_IMPORTED_MODULE_3__.Download.download(url, filename, type);
        }
      });
      var api_url, api_url_temp;
      $('body').on('click', '#bilibili_parse', function () {
        _user__WEBPACK_IMPORTED_MODULE_7__.user.lazyInit(true); // init

        var vb = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base();
        var _ref3 = [vb.type, vb.aid(), vb.p(), vb.cid(), vb.epid()],
            type = _ref3[0],
            aid = _ref3[1],
            p = _ref3[2],
            cid = _ref3[3],
            epid = _ref3[4];

        var _video$get_quality = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.get_quality(),
            q = _video$get_quality.q;

        api_url = "".concat(_config__WEBPACK_IMPORTED_MODULE_6__.config.base_api, "?av=").concat(aid, "&p=").concat(p, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(_config__WEBPACK_IMPORTED_MODULE_6__.config.format, "&otype=json&_host=").concat(_config__WEBPACK_IMPORTED_MODULE_6__.config.host_key, "&_req=").concat(_config__WEBPACK_IMPORTED_MODULE_6__.config.request_type);
        var _ref4 = [_store__WEBPACK_IMPORTED_MODULE_10__.store.get('auth_id'), _store__WEBPACK_IMPORTED_MODULE_10__.store.get('auth_sec')],
            auth_id = _ref4[0],
            auth_sec = _ref4[1];

        if (_config__WEBPACK_IMPORTED_MODULE_6__.config.auth === '1' && auth_id && auth_sec) {
          api_url += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
        }

        if (api_url === api_url_temp && _config__WEBPACK_IMPORTED_MODULE_6__.config.request_type !== 'local') {
          _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.miaow();
          var url = $('#video_url').attr('href');
          var url_2 = $('#video_url_2').attr('href');

          if (url && url !== '#') {
            $('#video_download').show();
            _config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash' && $('#video_download_2').show();

            if (_user__WEBPACK_IMPORTED_MODULE_7__.user.needReplace() || vb.is_limited() || _config__WEBPACK_IMPORTED_MODULE_6__.config.replace_force === '1') {
              !$('#bp_dplayer')[0] && _utils_player__WEBPACK_IMPORTED_MODULE_1__.player.replace_player(url, url_2);
            }

            if (_config__WEBPACK_IMPORTED_MODULE_6__.config.auto_download === '1') {
              $('#video_download').click();
            }
          }

          return;
        }

        $('#video_url').attr('href', '#');
        $('#video_url_2').attr('href', '#');
        api_url_temp = api_url;
        _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.info('开始请求');
        _utils_api__WEBPACK_IMPORTED_MODULE_0__.api.get_url(0, function (res) {
          if (res && !res.code) {
            _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.success('请求成功');
            res.times && _ui_message__WEBPACK_IMPORTED_MODULE_5__.Message.info("\u5269\u4F59\u8BF7\u6C42\u6B21\u6570\uFF1A".concat(res.times));

            var _url = _config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash' ? res.video.replace('http://', 'https://') : res.url.replace('http://', 'https://');

            var _url_ = _config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash' ? res.audio.replace('http://', 'https://') : '#';

            $('#video_url').attr('href', _url);
            $('#video_download').show();

            if (_config__WEBPACK_IMPORTED_MODULE_6__.config.format === 'dash') {
              $('#video_url_2').attr('href', _url_);
              $('#video_download_2').show();
            }

            if (_user__WEBPACK_IMPORTED_MODULE_7__.user.needReplace() || vb.is_limited() || _config__WEBPACK_IMPORTED_MODULE_6__.config.replace_force === '1') {
              _utils_player__WEBPACK_IMPORTED_MODULE_1__.player.replace_player(_url, _url_);
            }

            if (_config__WEBPACK_IMPORTED_MODULE_6__.config.auto_download === '1') {
              $('#video_download').click();
            }
          }
        });
      }); // part of check

      $('body').on('click', 'a.router-link-active', function () {
        if (this !== $('li[class="on"]').find('a')[0]) {
          _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
        }
      });
      $('body').on('click', 'li.ep-item', function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      });
      $('body').on('click', 'button.bilibili-player-iconfont-next', function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      });
      var bili_video_tag = _utils_player__WEBPACK_IMPORTED_MODULE_1__.player.bili_video_tag();
      !!$(bili_video_tag)[0] && ($(bili_video_tag)[0].onended = function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      }); // 监听q

      $('body').on('click', 'li.bui-select-item', function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      });
      setInterval(function () {
        if (_check__WEBPACK_IMPORTED_MODULE_9__.check.q !== _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.get_quality().q) {
          _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
        } else if (_utils_video__WEBPACK_IMPORTED_MODULE_2__.video.type() === 'cheese') {
          // epid for cheese
          if (_check__WEBPACK_IMPORTED_MODULE_9__.check.epid !== _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base().epid()) {
            _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
          }
        }
      }, 1000); // 监听aid

      $('body').on('click', '.rec-list', function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      });
      $('body').on('click', '.bilibili-player-ending-panel-box-videos', function () {
        _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
      }); // 定时检查 aid 和 cid

      setInterval(function () {
        var vb = _utils_video__WEBPACK_IMPORTED_MODULE_2__.video.base();

        if (_check__WEBPACK_IMPORTED_MODULE_9__.check.aid !== vb.aid() || _check__WEBPACK_IMPORTED_MODULE_9__.check.cid !== vb.cid()) {
          _check__WEBPACK_IMPORTED_MODULE_9__.check.refresh();
        }
      }, 3000);
    }
  }]);

  return Main;
}();

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/js/store.js":
/*!*************************!*\
  !*** ./src/js/store.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": function() { return /* binding */ store; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);

    this.prefix = 'bp_';
  }

  _createClass(Store, [{
    key: "get",
    value: function get(key) {
      return localStorage.getItem(this.prefix + (key || '')) || '';
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return localStorage.setItem(this.prefix + (key || ''), value);
    }
  }]);

  return Store;
}();

var store = new Store();

/***/ }),

/***/ "./src/js/ui/message.js":
/*!******************************!*\
  !*** ./src/js/ui/message.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Message": function() { return /* binding */ Message; },
/* harmony export */   "MessageBox": function() { return /* binding */ MessageBox; },
/* harmony export */   "initMessage": function() { return /* binding */ initMessage; }
/* harmony export */ });
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ "./src/js/ui/scroll.js");
/* harmony import */ var _css_message_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/message.css */ "./src/css/message.css");
/* harmony import */ var _html_message_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../html/message.html */ "./src/html/message.html");




function initMessage() {
  $('body').append(_html_message_html__WEBPACK_IMPORTED_MODULE_2__["default"] + _css_message_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
}

function messageBox(ctx, type) {
  if (type === 'confirm') {
    $('div.message_box_btn button[name="cancel"]').show();
  } else if (type === 'alert') {
    $('div.message_box_btn button[name="cancel"]').hide();
  }

  if (ctx.html) {
    $('div#message_box_context').html("<div style=\"font-size:18px\">".concat(ctx.html, "</div>"));
  } else {
    $('div#message_box_context').html('<div style="font-size:18px">╰(￣▽￣)╮</div>');
  }

  _scroll__WEBPACK_IMPORTED_MODULE_0__.scroll.hide();
  $('#message_box').show();
  $('div#message_box').animate({
    'opacity': '1'
  }, 300);

  $('div.message_box_btn button[name="affirm"]')[0].onclick = function () {
    $('div#message_box').hide();
    $('div#message_box').css('opacity', 0);
    _scroll__WEBPACK_IMPORTED_MODULE_0__.scroll.show();

    if (ctx.callback && ctx.callback.affirm) {
      ctx.callback.affirm();
    }
  };

  $('div.message_box_btn button[name="cancel"]')[0].onclick = function () {
    $('div#message_box').hide();
    $('div#message_box').css('opacity', 0);
    _scroll__WEBPACK_IMPORTED_MODULE_0__.scroll.show();

    if (ctx.callback && ctx.callback.cancel) {
      ctx.callback.cancel();
    }
  };
}

var id = 0;

function message(html, type) {
  id += 1;
  messageEnQueue("<div id=\"message-".concat(id, "\" class=\"message message-").concat(type, "\"><div class=\"message-context\"><p><strong>").concat(type, "\uFF1A</strong></p><p>").concat(html, "</p></div></div>"), id);
  messageDeQueue(id, 3);
}

function messageEnQueue(message, id) {
  $('div.message-bg').append(message);
  $("div#message-".concat(id)).animate({
    'margin-top': '+=70px',
    'opacity': '1'
  }, 300);
}

function messageDeQueue(id) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  setTimeout(function () {
    var e = "div#message-".concat(id);
    $(e).animate({
      'margin-top': '-=70px',
      'opacity': '0'
    }, 300, function () {
      $(e).remove();
    });
  }, time * 1000);
}

var Message = {
  success: function success(html) {
    return message(html, 'success');
  },
  warning: function warning(html) {
    return message(html, 'warning');
  },
  danger: function danger(html) {
    return message(html, 'danger');
  },
  info: function info(html) {
    return message(html, 'info');
  },
  miaow: function miaow(_) {
    return message('(^・ω・^)~喵喵喵~', 'info');
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


/***/ }),

/***/ "./src/js/ui/scroll.js":
/*!*****************************!*\
  !*** ./src/js/ui/scroll.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scroll": function() { return /* binding */ scroll; }
/* harmony export */ });
function show_scroll() {
  if ($('div#bp_config').is(':hidden') && $('div#message_box').is(':hidden')) {
    $('body').css('overflow', 'auto');
  }
}

function hide_scroll() {
  $('body').css('overflow', 'hidden');
}

var scroll = {
  show: show_scroll,
  hide: hide_scroll
};

/***/ }),

/***/ "./src/js/user.js":
/*!************************!*\
  !*** ./src/js/user.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "user": function() { return /* binding */ user; }
/* harmony export */ });
/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/video */ "./src/js/utils/video.js");
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
      return !this.is_login || !this.vip_status && _utils_video__WEBPACK_IMPORTED_MODULE_0__.video.base().need_vip();
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

/***/ }),

/***/ "./src/js/utils/ajax.js":
/*!******************************!*\
  !*** ./src/js/utils/ajax.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ajax": function() { return /* binding */ ajax; }
/* harmony export */ });
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/message */ "./src/js/ui/message.js");

function ajax(obj) {
  return new Promise(function (resolve, reject) {
    // set obj.success & obj.success
    obj.success = function (res) {
      if (res.code) {
        _ui_message__WEBPACK_IMPORTED_MODULE_0__.Message.warning("\u8BF7\u6C42\u5931\u8D25\uFF0C".concat(res.message || "CODE:".concat(res.code))); // todo
      }

      resolve(res);
    };

    obj.error = function (err) {
      _ui_message__WEBPACK_IMPORTED_MODULE_0__.Message.danger('网络异常');
      reject(err);
    };

    $.ajax(obj);
  });
}

/***/ }),

/***/ "./src/js/utils/api.js":
/*!*****************************!*\
  !*** ./src/js/utils/api.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": function() { return /* binding */ api; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/js/config.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store */ "./src/js/store.js");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/message */ "./src/js/ui/message.js");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ajax */ "./src/js/utils/ajax.js");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./video */ "./src/js/utils/video.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function get_url_base(page, quality, video_format, success, error, request_type) {
  'function' !== typeof success && (success = function success(res) {
    return console.log(res);
  });
  'function' !== typeof error && (error = function error(err) {
    return console.error(err);
  });
  var vb = _video__WEBPACK_IMPORTED_MODULE_4__.video.base();
  var _ref = [vb.aid(page), vb.cid(page), vb.epid(page), quality || _video__WEBPACK_IMPORTED_MODULE_4__.video.get_quality().q, vb.type],
      aid = _ref[0],
      cid = _ref[1],
      epid = _ref[2],
      q = _ref[3],
      type = _ref[4];
  var format = video_format || _config__WEBPACK_IMPORTED_MODULE_0__.config.format;
  if (format === 'mp4' && type !== 'video') format = 'flv';

  var url_replace_cdn = function url_replace_cdn(url) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.host_key !== '0' && request_type === 'online' && format !== 'mp4') {
      // 切换CDN
      var url_tmp = url.split('/');
      url_tmp[2] = _config__WEBPACK_IMPORTED_MODULE_0__.hostMap[_config__WEBPACK_IMPORTED_MODULE_0__.config.host_key];
      url = url_tmp.join('/');
    }

    return url;
  };

  var base_api;
  var ajax_obj = {
    type: 'GET',
    dataType: 'json'
  };

  if (request_type === 'auto' || request_type === 'local') {
    var fnver, fnval;

    if (type !== 'cheese') {
      base_api = 'https://api.bilibili.com/x/player/playurl';

      if (format === 'dash') {
        fnver = 0, fnval = 80;
      } else {
        fnver = 0, fnval = 0;
      }
    } else {
      base_api = 'https://api.bilibili.com/pugv/player/web/playurl';

      if (format === 'dash') {
        fnver = 0, fnval = 80;
      } else {
        fnver = 1, fnval = 80;
      }
    }

    base_api += "?avid=".concat(aid, "&cid=").concat(cid, "&qn=").concat(q, "&fnver=").concat(fnver, "&fnval=").concat(fnval, "&fourk=1&ep_id=").concat(epid, "&type=").concat(format, "&otype=json");
    base_api += format === 'mp4' ? '&platform=html5&high_quality=1' : '';
    ajax_obj.xhrFields = {
      withCredentials: true
    };
  } else {
    base_api = _config__WEBPACK_IMPORTED_MODULE_0__.config.base_api;
    base_api += "?av=".concat(aid, "&cid=").concat(cid, "&q=").concat(q, "&ep=").concat(epid, "&type=").concat(type, "&format=").concat(format, "&otype=json");
    var _ref2 = [_store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_id'), _store__WEBPACK_IMPORTED_MODULE_1__.store.get('auth_sec')],
        auth_id = _ref2[0],
        auth_sec = _ref2[1];

    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.auth === '1' && auth_id && auth_sec) {
      base_api += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
      !!page && (base_api += '&s');
    }
  }

  ajax_obj.url = base_api;
  (0,_ajax__WEBPACK_IMPORTED_MODULE_3__.ajax)(ajax_obj).then(function (res) {
    var data;

    if (!res.code) {
      data = res.result || res.data;
    }

    if (!data) {
      if (request_type === 'auto') {
        get_url_base(page, quality, video_format, success, error, 'online');
        return;
      } // online


      res.url && (res.url = url_replace_cdn(res.url));
      res.video && (res.video = url_replace_cdn(res.video));
      res.audio && (res.audio = url_replace_cdn(res.audio));
      success(res);
      return;
    }

    if (data.dash) {
      var result = {
        'code': 0,
        'quality': data.quality,
        'accept_quality': data.accept_quality,
        'video': '',
        'audio': ''
      };
      var videos = data.dash.video;

      for (var i = 0; i < videos.length; i++) {
        var _video = videos[i];

        if (_video.id <= q) {
          result.video = url_replace_cdn(_video.base_url);
          result.audio = url_replace_cdn(data.dash.audio[0].base_url);
          break;
        }
      }

      success(result);
      return;
    }

    success({
      'code': 0,
      'quality': data.quality,
      'accept_quality': data.accept_quality,
      'url': url_replace_cdn(data.durl[0].url)
    });
  }).catch(function (err) {
    return error(err);
  });
}

function get_subtitle_url(p, callback) {
  var video_base = _video__WEBPACK_IMPORTED_MODULE_4__.video.base();
  var _ref3 = [video_base.aid(p), video_base.cid(p), video_base.epid(p)],
      aid = _ref3[0],
      cid = _ref3[1],
      epid = _ref3[2];
  (0,_ajax__WEBPACK_IMPORTED_MODULE_3__.ajax)({
    url: "https://api.bilibili.com/x/player/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
    dataType: 'json'
  }).then(function (res) {
    // todo
    if (!res.code && res.data.subtitle.subtitles[0]) {
      (0,_ajax__WEBPACK_IMPORTED_MODULE_3__.ajax)({
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

        var _iterator = _createForOfIteratorHelper(datas),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var data = _step.value;
            var a = new Date((parseInt(data.from) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] + '.' + (data.from.toString().split('.')[1] || '000').padEnd(3, '0');
            var b = new Date((parseInt(data.to) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] + '.' + (data.to.toString().split('.')[1] || '000').padEnd(3, '0');
            webvtt += "".concat(a, " --> ").concat(b, "\n").concat(data.content.trim(), "\n\n");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        callback(URL.createObjectURL(new Blob([webvtt], {
          type: 'text/vtt'
        })));
      }).catch(callback);
    } else {
      callback();
    }
  }).catch(callback);
}

function get_season(epid) {
  (0,_ajax__WEBPACK_IMPORTED_MODULE_3__.ajax)({
    url: "https://api.bilibili.com/pugv/view/web/season?ep_id=".concat(epid),
    xhrFields: {
      withCredentials: true
    },
    dataType: 'json'
  }).then(function (res) {
    if (res.code) {
      _ui_message__WEBPACK_IMPORTED_MODULE_2__.Message.warning('获取剧集信息失败');
      return;
    }

    window.bp_episodes = res.data.episodes || null;
  });
}

var api = {
  get_url: function get_url() {
    var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var success = arguments.length > 1 ? arguments[1] : undefined;
    var error = arguments.length > 2 ? arguments[2] : undefined;
    var request_type = _config__WEBPACK_IMPORTED_MODULE_0__.config.request_type;
    var format = _config__WEBPACK_IMPORTED_MODULE_0__.config.format;
    get_url_base(0, quality, format, success, error, request_type);
  },
  get_urls: function get_urls() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var format = arguments.length > 2 ? arguments[2] : undefined;
    var success = arguments.length > 3 ? arguments[3] : undefined;
    var error = arguments.length > 4 ? arguments[4] : undefined;
    var request_type = _config__WEBPACK_IMPORTED_MODULE_0__.config.request_type;
    get_url_base(page, quality, format, success, error, request_type);
  },
  get_subtitle_url: get_subtitle_url,
  get_season: get_season
};

/***/ }),

/***/ "./src/js/utils/download.js":
/*!**********************************!*\
  !*** ./src/js/utils/download.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Download": function() { return /* binding */ Download; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/js/config.js");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/message */ "./src/js/ui/message.js");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax */ "./src/js/utils/ajax.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/js/utils/api.js");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./video */ "./src/js/utils/video.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function rpc_type() {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_domain.match('https://') || _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_domain.match(/localhost|127\.0\.0\.1/)) {
    return 'post';
  } else {
    return 'ariang';
  }
}

function download_all() {
  var vb = _video__WEBPACK_IMPORTED_MODULE_4__.video.base();
  var _ref = [_video__WEBPACK_IMPORTED_MODULE_4__.video.get_quality().q, vb.total()],
      q = _ref[0],
      total = _ref[1];
  $('body').on('click', 'input[name="dl_video"]', function () {
    if ($(this).is(':checked')) {
      $(this).parent().css('color', 'rgba(0,0,0,1)');
    } else {
      $(this).parent().css('color', 'rgba(0,0,0,0.5)');
    }
  });
  var video_html = '';

  for (var i = 0; i < total; i++) {
    video_html += '' + "<label for=\"option_".concat(i, "\"><div style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"option_").concat(i, "\" name=\"dl_video\" value=\"").concat(i, "\">\n                P").concat(i + 1, " ").concat(vb.title(i + 1), "\n            </div></label>");
  }

  var all_checked = false;
  $('body').on('click', 'button#checkbox_btn', function () {
    if (all_checked) {
      all_checked = false;
      $('input[name="dl_video"]').prop('checked', all_checked);
      $('input[name="dl_video"]').parent().css('color', 'rgba(0,0,0,0.5)');
    } else {
      all_checked = true;
      $('input[name="dl_video"]').prop('checked', all_checked);
      $('input[name="dl_video"]').parent().css('color', 'rgb(0,0,0)');
    }
  });
  var q_map = {
    '120': '4K 超清',
    '116': '1080P 60帧',
    '112': '1080P 高码率',
    '80': '1080P 高清',
    '74': '720P 60帧',
    '64': '720P 高清',
    '48': '720P 高清(MP4)',
    '32': '480P 清晰',
    '16': '360P 流畅'
  };
  var quality_support = _video__WEBPACK_IMPORTED_MODULE_4__.video.get_quality_support();
  var option_support_html = '';

  var _iterator = _createForOfIteratorHelper(quality_support),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      option_support_html += "<option value=\"".concat(item, "\">").concat(q_map[item], "</option>");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var msg = '' + "<div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u683C\u5F0F\uFF1A</label>\n            <select id=\"dl_format\">\n                <option value=\"flv\" selected>FLV</option>\n                <option value=\"mp4\">MP4</option>\n            </select>\n            &nbsp;&nbsp;\u4EC5video\u7C7B\u578B\u652F\u6301mp4\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u8D28\u91CF\uFF1A</label>\n            <select id=\"dl_quality\">\n                ".concat(option_support_html, "\n            </select>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4E0B\u8F7D\u5B57\u5E55\uFF1A</label>\n            <select id=\"dl_subtitle\">\n                <option value=\"0\" selected>\u5173\u95ED</option>\n                <option value=\"1\">VTT</option>\n            </select>\n            &nbsp;&nbsp\n            <label>\u4E0B\u8F7D\u5F39\u5E55\uFF1A</label>\n            <select id=\"dl_danmaku\">\n                <option value=\"0\" selected>\u5173\u95ED</option>\n                <option value=\"1\">ASS</option>\n            </select>\n        </div>\n        <b>\n            <span style=\"color:red;\">\u4E3A\u907F\u514D\u8BF7\u6C42\u88AB\u62E6\u622A\uFF0C\u8BBE\u7F6E\u4E86\u5EF6\u65F6\u4E14\u4E0D\u652F\u6301\u4E0B\u8F7D\u65E0\u6CD5\u64AD\u653E\u7684\u89C6\u9891\uFF1B\u8BF7\u52FF\u9891\u7E41\u4E0B\u8F7D\u8FC7\u591A\u89C6\u9891\uFF0C\u53EF\u80FD\u89E6\u53D1\u98CE\u63A7\u5BFC\u81F4\u4E0D\u53EF\u518D\u4E0B\u8F7D\uFF01</span>\n        </b><br />\n        <div style=\"height:220px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);\">\n            ").concat(video_html, "\n        </div>\n        <div>").concat(_video__WEBPACK_IMPORTED_MODULE_4__.video.type() === 'medialist' ? '不支持多页视频，若需要请到视频原播放页面下载' : '', "</div>\n        <div style=\"margin:2% 0;\">\n            <button id=\"checkbox_btn\">\u5168\u9009</button>\n        </div>");
  _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.confirm(msg, function () {
    // 获取参数
    var _q = $('#dl_quality').val() || q;

    var _dl_subtitle = $('#dl_subtitle').val();

    var _dl_danmaku = $('#dl_danmaku').val();

    var videos = [];

    for (var _i = 0; _i < total; _i++) {
      if (!$("input#option_".concat(_i)).is(':checked')) {
        continue;
      }

      var p = _i + 1;
      var _ref2 = [vb.cid(p), vb.filename(p)],
          cid = _ref2[0],
          filename = _ref2[1];

      var _format = $('#dl_format').val();

      videos.push({
        dl_subtitle: _dl_subtitle,
        dl_danmaku: _dl_danmaku,
        cid: cid,
        p: p,
        q: _q,
        format: _format,
        filename: filename
      });
    }

    get_url(videos, 0, []);
  }); // 初始化参数，去除8k及以上

  $('#dl_quality').val(q > 120 ? 80 : q);

  function get_url(videos, i, video_urls) {
    // 单线递归处理，请求下载同时进行
    if (videos.length) {
      if (i < videos.length) {
        var _video = videos[i];

        if (_video.dl_subtitle === '1') {
          // 下载字幕vtt
          Download.download_subtitle_vtt(_video.p, _video.filename);
        }

        if (_video.dl_danmaku === '1') {
          // 下载弹幕ass
          Download.download_danmaku_ass(_video.cid, _video.filename);
        }

        var _msg = "\u7B2C".concat(i + 1, "\uFF08").concat(i + 1, "/").concat(videos.length, "\uFF09\u4E2A\u89C6\u9891");

        _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert("".concat(_msg, "\uFF1A\u83B7\u53D6\u4E2D..."));
        setTimeout(function () {
          var success = function success(res) {
            if (!res.code) {
              _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.success('请求成功' + (res.times ? "<br/>\u4ECA\u65E5\u5269\u4F59\u8BF7\u6C42\u6B21\u6570".concat(res.times) : ''));
              _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert("".concat(_msg, "\uFF1A\u83B7\u53D6\u6210\u529F\uFF01"));
              var _ref3 = [res.url, format(res.url), rpc_type()],
                  url = _ref3[0],
                  video_format = _ref3[1],
                  type = _ref3[2];

              if (type === 'post') {
                video_urls.push({
                  url: url,
                  filename: _video.filename + video_format
                });

                if (video_urls.length > 3) {
                  download_rpc_all(video_urls);
                  video_urls.length = 0;
                }
              } else if (type === 'ariang') {
                download_rpc_ariang_one({
                  url: url,
                  filename: _video.filename + video_format
                });
              }
            }

            setTimeout(function () {
              get_url(videos, ++i, video_urls);
            }, 3000);
          };

          var error = function error() {
            get_url(videos, ++i, video_urls);
          };

          _api__WEBPACK_IMPORTED_MODULE_3__.api.get_urls(_video.p, _video.q, _video.format, success, error);
        }, 3000);
      } else {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert('视频地址请求完成！');

        if (rpc_type() === 'post') {
          if (video_urls.length > 0) {
            download_rpc_all(video_urls);
            video_urls.length = 0;
          }
        } // one by one -> null

      }
    }
  }

  function download_rpc_all(video_urls) {
    var rpc = {
      domain: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_domain,
      port: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_port,
      token: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_token,
      dir: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_dir
    };
    var json_rpc = [];

    var _iterator2 = _createForOfIteratorHelper(video_urls),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _video2 = _step2.value;
        json_rpc.push({
          id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
          jsonrpc: '2.0',
          method: 'aria2.addUri',
          params: ["token:".concat(rpc.token), [_video2.url], {
            dir: rpc.dir,
            out: _video2.filename,
            header: ["User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href)]
          }]
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.info('发送RPC下载请求');
    (0,_ajax__WEBPACK_IMPORTED_MODULE_2__.ajax)({
      url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(json_rpc)
    }).then(function (res) {
      if (res.length === json_rpc.length) {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.success('RPC请求成功');
      } else {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('请检查RPC参数');
      }
    }).catch(function (_) {
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.danger('请检查RPC服务配置');
    });
  }
}

function download_rpc_ariang_one(video) {
  var bp_aria2_window = window.bp_aria2_window;
  var time = 100;

  if (!bp_aria2_window || bp_aria2_window.closed) {
    open_ariang();
    time = 3000;
  }

  setTimeout(function () {
    var bp_aria2_window = window.bp_aria2_window;
    var aria2_header = "header=User-Agent:".concat(window.navigator.userAgent, "&header=Referer:").concat(window.location.href);

    if (bp_aria2_window && !bp_aria2_window.closed) {
      var task_hash = "#!/new/task?url=".concat(window.btoa(video.url), "&out=").concat(encodeURIComponent(video.filename), "&").concat(aria2_header);
      bp_aria2_window.location.href = "http://ariang.injahow.com/".concat(task_hash);
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.success('RPC请求成功');
    } else {
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('请检查RPC参数');
    }
  }, time);
}

var download_rpc_clicked = false;

function download_rpc(url, filename) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';

  if (download_rpc_clicked) {
    _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.miaow();
    return;
  }

  download_rpc_clicked = true;
  var rpc = {
    domain: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_domain,
    port: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_port,
    token: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_token,
    dir: _config__WEBPACK_IMPORTED_MODULE_0__.config.rpc_dir
  };
  var json_rpc = {
    id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
    jsonrpc: '2.0',
    method: 'aria2.addUri',
    params: ["token:".concat(rpc.token), [url], {
      dir: rpc.dir,
      out: filename,
      header: ["User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href)]
    }]
  };
  _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.info('发送RPC下载请求');

  if (type === 'post') {
    (0,_ajax__WEBPACK_IMPORTED_MODULE_2__.ajax)({
      url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(json_rpc)
    }).then(function (res) {
      if (res.result) {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.success('RPC请求成功');
      } else {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('请检查RPC参数');
      }
    }).catch(function (_) {
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.danger('请检查RPC服务配置');
    }).finally(function (_) {
      return download_rpc_clicked = false;
    });
  } else if (type === 'ariang') {
    var bp_aria2_window = window.bp_aria2_window;
    var time = 100;

    if (!bp_aria2_window || bp_aria2_window.closed) {
      open_ariang();
      time = 3000;
    }

    setTimeout(function () {
      var bp_aria2_window = window.bp_aria2_window;
      var aria2_header = "header=User-Agent:".concat(window.navigator.userAgent, "&header=Referer:").concat(window.location.href);
      var task_hash = "#!/new/task?url=".concat(window.btoa(url), "&out=").concat(encodeURIComponent(filename), "&").concat(aria2_header);

      if (bp_aria2_window && !bp_aria2_window.closed) {
        bp_aria2_window.location.href = "http://ariang.injahow.com/".concat(task_hash);
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.success('RPC请求发送成功');
      } else {
        _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('AriaNG页面未打开');
      }

      download_rpc_clicked = false;
    }, time);
  }
}

function open_ariang(rpc) {
  var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace('://', '/'), "/").concat(rpc.port, "/jsonrpc/").concat(window.btoa(rpc.token)) : '';
  var url = 'http://ariang.injahow.com/' + hash_tag;
  var a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('onclick', "window.bp_aria2_window=window.open('".concat(url, "');"));
  document.body.appendChild(a);
  a.click();
  a.remove();
}

var download_blob_clicked = false,
    need_show_progress = true;

function show_progress(_ref4) {
  var total = _ref4.total,
      loaded = _ref4.loaded,
      percent = _ref4.percent;

  if (need_show_progress) {
    _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert("\u6587\u4EF6\u5927\u5C0F\uFF1A".concat(Math.floor(total / (1024 * 1024)), "MB(").concat(total, "Byte)<br/>") + "\u5DF2\u7ECF\u4E0B\u8F7D\uFF1A".concat(Math.floor(loaded / (1024 * 1024)), "MB(").concat(loaded, "Byte)<br/>") + "\u5F53\u524D\u8FDB\u5EA6\uFF1A".concat(percent, "%<br/>\u4E0B\u8F7D\u4E2D\u8BF7\u52FF\u64CD\u4F5C\u6D4F\u89C8\u5668\uFF01"), function () {
      need_show_progress = false;
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert('注意：刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。');
    });
  }

  if (total === loaded) {
    _ui_message__WEBPACK_IMPORTED_MODULE_1__.MessageBox.alert('下载完成，请等待浏览器保存！');
    download_blob_clicked = false;
  }
}

function download_blob(url, filename) {
  if (download_blob_clicked) {
    _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.miaow();
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
      document.body.appendChild(a);
      a.click();
      a.remove();
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

  _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.info('准备开始下载');
}

function download_danmaku_ass(_cid, title) {
  // todo: 暂时使用随机弹幕
  (0,_ajax__WEBPACK_IMPORTED_MODULE_2__.ajax)({
    url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(_cid),
    dataType: 'text'
  }).then(function (result) {
    var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''));

    if (!result_dom || !result_dom.find('d')[0]) {
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('未发现弹幕');
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
      }).get();
      danmaku_data.sort(function (a, b) {
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
      }; // 3.for of


      var content = ['[Script Info]', '; Script generated by bilibili-parse', '; https://github.com/injahow/bilibili-parse', "Title: ".concat(title), 'ScriptType: v4.00+', "PlayResX: ".concat(1920), "PlayResY: ".concat(1080), 'Timer: 10.0000', 'WrapStyle: 2', 'ScaledBorderAndShadow: no', '', '[V4+ Styles]', 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding', 'Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', '', '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'];
      var scroll_id = 0,
          fix_id = 0;

      var _iterator3 = _createForOfIteratorHelper(danmaku_data),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var danmaku = _step3.value;

          if (danmaku.type === 0) {
            scroll_id++;
          } else {
            fix_id++;
          }

          content.push(dialogue(danmaku, scroll_id, fix_id));
        } // 4.ass->blob->url

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var blob_url = URL.createObjectURL(new Blob([content.join('\n')], {
        type: 'text/ass'
      }));
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = blob_url;
      a.download = title + '.ass';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blob_url);
    }
  }).catch(function (_) {
    _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('未发现字幕');
  });
}

function download_subtitle_vtt() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var file_name = arguments.length > 1 ? arguments[1] : undefined;

  var download_subtitle = function download_subtitle() {
    var blob_url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!blob_url) {
      _ui_message__WEBPACK_IMPORTED_MODULE_1__.Message.warning('未发现字幕');
      return;
    }

    var a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', blob_url);
    a.setAttribute('download', file_name + '.vtt');
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blob_url);
  };

  _api__WEBPACK_IMPORTED_MODULE_3__.api.get_subtitle_url(p, download_subtitle);
}

function format(url) {
  if (url.match('.flv')) {
    return '.flv';
  } else if (url.match('.m4s')) {
    return '_video.mp4';
  } else if (url.match('.mp4')) {
    return '.mp4';
  }

  return '.mp4';
}

var Download = {
  url_format: format,
  download: function download(url, name, type) {
    var filename = name.replace(/[\/\\:*?"<>|]+/g, '') + +format(url);

    if (type === 'blob') {
      download_blob(url, filename);
    } else if (type === 'rpc') {
      download_rpc(url, filename, rpc_type());
    }
  },
  download_all: download_all,
  download_danmaku_ass: download_danmaku_ass,
  download_subtitle_vtt: download_subtitle_vtt,
  open_ariang: open_ariang
};

/***/ }),

/***/ "./src/js/utils/player.js":
/*!********************************!*\
  !*** ./src/js/utils/player.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": function() { return /* binding */ player; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/js/config.js");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ajax */ "./src/js/utils/ajax.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ "./src/js/utils/api.js");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./video */ "./src/js/utils/video.js");





function get_bili_player_id() {
  if (!!$('#bilibiliPlayer')[0]) {
    return '#bilibiliPlayer';
  } else if (!!$('#bilibili-player')[0]) {
    return '#bilibili-player';
  } else if (_video__WEBPACK_IMPORTED_MODULE_3__.video.type() === 'cheese') {
    if (!!$('div.bpx-player[data-injector="nano"]')[0]) {
      return 'div.bpx-player[data-injector="nano"]';
    } else {
      // first
      return '#pay-mask';
    }
  }
}

function request_danmaku(options, _cid) {
  if (!_cid) {
    options.error('cid未知，无法获取弹幕');
    return;
  }

  (0,_ajax__WEBPACK_IMPORTED_MODULE_1__.ajax)({
    url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(_cid),
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
  }).catch(function (_) {
    options.error('弹幕请求异常');
  });
}

function replace_player(url, url_2) {
  // 恢复原视频
  recover_player(); // 暂停原视频

  var bili_video = $(bili_video_tag())[0];
  bili_video_stop();
  !!bili_video && bili_video.addEventListener('play', bili_video_stop, false);
  var bili_player_id;

  if (!!$('#bilibiliPlayer')[0]) {
    bili_player_id = '#bilibiliPlayer';
    $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor">');
    $(bili_player_id).hide();
  } else if (!!$('#bilibili-player')[0]) {
    bili_player_id = '#bilibili-player';
    $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor" style="width:100%;height:100%;"></div>');
    $(bili_player_id).hide();
  } else if (_video__WEBPACK_IMPORTED_MODULE_3__.video.type() === 'cheese') {
    if (!!$('div.bpx-player[data-injector="nano"]')[0]) {
      $('#pay-mask').hide();
      $('#bofqi').show();
      bili_player_id = 'div.bpx-player[data-injector="nano"]';
      $(bili_player_id).before('<div id="bp_dplayer" style="width:100%;height:100%;"></div>');
      $(bili_player_id).hide();
    } else {
      // 第一次
      bili_player_id = '#pay-mask';
      $(bili_player_id).html('<div id="bp_dplayer" style="width:100%;height:100%;"></div>');
    }
  }

  $('#player_mask_module').hide();

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
          request_danmaku(options, _video__WEBPACK_IMPORTED_MODULE_3__.video.base().cid());
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
      }]
    }); // subtitle_blob save

    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.format === 'dash' && url_2 && url_2 !== '#') {
      $('body').append('<div id="bp_dplayer_2" style="display:none;"></div>');
      window.bp_dplayer_2 = new DPlayer({
        container: $('#bp_dplayer_2')[0],
        mutex: false,
        volume: 1,
        autoplay: true,
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


  _api__WEBPACK_IMPORTED_MODULE_2__.api.get_subtitle_url(0, dplayer_init);
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

    $(get_bili_player_id()).show(); // $('#player_mask_module').show()
  }
} // DPlayer 弹幕设置


function danmaku_config() {
  var style = '' + "<style id=\"dplayer_danmaku_style\">\n        .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {\n            animation-duration: ".concat(parseFloat(_config__WEBPACK_IMPORTED_MODULE_0__.config.danmaku_speed), "s;\n            font-size: ").concat(parseInt(_config__WEBPACK_IMPORTED_MODULE_0__.config.danmaku_fontsize), "px;\n        }\n        </style>");

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

/***/ }),

/***/ "./src/js/utils/video.js":
/*!*******************************!*\
  !*** ./src/js/utils/video.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "video": function() { return /* binding */ video; }
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/js/utils/api.js");


function type() {
  if (location.pathname.match('/cheese/play/')) {
    return 'cheese';
  } else if (location.pathname.match('/medialist/play/')) {
    // -/ml*/* or -/watchlater/*
    return 'medialist';
  } else if (!window.__INITIAL_STATE__) {
    // todo
    return '?';
  } else if (!!window.__INITIAL_STATE__.epInfo) {
    return 'bangumi';
  } else if (!!window.__INITIAL_STATE__.videoData) {
    return 'video';
  }
}

function base() {
  var _type = type();

  if (_type === 'video') {
    var state = window.__INITIAL_STATE__;
    return {
      type: 'video',
      total: function total() {
        return state.videoData.pages.length || 1;
      },
      title: function title(_p) {
        var p = _p || state.p || 1;
        return (state.videoData.pages[p - 1].part || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        var p = _p || state.p || 1;
        var title = (state.videoData && state.videoData.title || 'unknown') + " P".concat(p, " \uFF08").concat(state.videoData.pages[p - 1].part || p, "\uFF09");
        return title.replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        return state.videoData.aid;
      },
      p: function p() {
        return state.p || 1;
      },
      cid: function cid(_p) {
        var p = _p || state.p || 1;
        return state.videoData.pages[p - 1].cid;
      },
      epid: function epid(_p) {
        return '';
      },
      need_vip: function need_vip() {
        return false;
      },
      vip_need_pay: function vip_need_pay() {
        return false;
      },
      is_limited: function is_limited() {
        return false;
      }
    };
  } else if (_type === 'medialist') {
    var medialist = $('div.player-auxiliary-playlist-item');

    var _id = $('div.player-auxiliary-playlist-item.player-auxiliary-playlist-item-active').index();

    var collect_name = $('.player-auxiliary-playlist-top .player-auxiliary-filter-title').html();
    return {
      type: 'video',
      total: function total() {
        return medialist.length;
      },
      title: function title(_p) {
        var id = _p ? _p - 1 : _id;
        var title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown';
        return title.replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        var id = _p ? _p - 1 : _id;
        var title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown';
        return "".concat(collect_name, " P").concat(id + 1, " \uFF08").concat(title, "\uFF09").replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        var id = _p ? _p - 1 : _id;
        return medialist.eq(id).attr('data-aid');
      },
      p: function p() {
        return _id + 1;
      },
      cid: function cid(_p) {
        var id = _p ? _p - 1 : _id;
        return medialist.eq(id).attr('data-cid');
      },
      epid: function epid(_p) {
        return '';
      },
      need_vip: function need_vip() {
        return false;
      },
      vip_need_pay: function vip_need_pay() {
        return false;
      },
      is_limited: function is_limited() {
        return false;
      }
    };
  } else if (_type === 'bangumi') {
    var _state = window.__INITIAL_STATE__;
    return {
      type: 'bangumi',
      total: function total() {
        return _state.epList.length;
      },
      title: function title(_p) {
        var ep = _p ? _state.epList[_p - 1] : _state.epInfo;
        return ("".concat(ep.titleFormat, " ").concat(ep.longTitle) || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        if (_p) {
          var ep = _state.epList[_p - 1];
          return ("".concat(_state.mediaInfo.season_title, "\uFF1A").concat(ep.titleFormat, " ").concat(ep.longTitle) || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
        }

        return (_state.h1Title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        return _p ? _state.epList[_p - 1].aid : _state.epInfo.aid;
      },
      p: function p() {
        return _state.epInfo.i || 1;
      },
      cid: function cid(_p) {
        return _p ? _state.epList[_p - 1].cid : _state.epInfo.cid;
      },
      epid: function epid(_p) {
        return _p ? _state.epList[_p - 1].id : _state.epInfo.id;
      },
      need_vip: function need_vip() {
        return _state.epInfo.badge === '会员';
      },
      vip_need_pay: function vip_need_pay() {
        return _state.epPayMent.vipNeedPay;
      },
      is_limited: function is_limited() {
        return _state.userState.areaLimit;
      }
    };
  } else if (_type === 'cheese') {
    var epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || ['', ''])[1];

    if (!window.bp_episodes) {
      // todo: 异步如何处理？
      window.bp_episodes = []; // ref check

      _api__WEBPACK_IMPORTED_MODULE_0__.api.get_season(epid);
    }

    var episodes = window.bp_episodes;

    var _id2 = $('li.on.list-box-li').index();

    return {
      type: 'cheese',
      total: function total() {
        return episodes.length;
      },
      title: function title(_p) {
        var id = _p ? _p - 1 : _id2;
        return (episodes[id].title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        var id = _p ? _p - 1 : _id2;
        return "".concat($('div.season-info h1').html(), " P").concat(id + 1, " \uFF08").concat(episodes[id].title || 'unknown', "\uFF09").replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        var id = _p ? _p - 1 : _id2;
        return episodes[id].aid;
      },
      p: function p() {
        return _id2 + 1;
      },
      cid: function cid(_p) {
        var id = _p ? _p - 1 : _id2;
        return episodes[id].cid;
      },
      epid: function epid(_p) {
        var id = _p ? _p - 1 : _id2;
        return episodes[id].id;
      },
      need_vip: function need_vip() {
        return false;
      },
      vip_need_pay: function vip_need_pay() {
        return false;
      },
      is_limited: function is_limited() {
        return false;
      }
    };
  } else {
    // error
    return {
      type: '?',
      total: function total() {
        return 0;
      },
      title: function title(_p) {
        return '';
      },
      filename: function filename(_p) {
        return '';
      },
      aid: function aid(_p) {
        return '';
      },
      p: function p() {
        return 1;
      },
      cid: function cid(_p) {
        return '';
      },
      epid: function epid(_p) {
        return '';
      },
      need_vip: function need_vip() {
        return false;
      },
      vip_need_pay: function vip_need_pay() {
        return false;
      },
      is_limited: function is_limited() {
        return false;
      }
    };
  }
}

var q_map = {
  '1080P 高码率': 112,
  '1080P 高清': 80,
  '720P 高清': 64,
  '480P 清晰': 32,
  '360P 流畅': 16,
  '自动': 64
};

function get_quality() {
  var _q = 0,
      _q_max = 0;

  if (!!$('li.bui-select-item')[0] && !!(_q_max = parseInt($('li.bui-select-item')[0].dataset.value))) {
    _q = parseInt($('li.bui-select-item.bui-select-item-active').attr('data-value')) || (_q_max > 80 ? 80 : _q_max);
  } else if (!!$('li.squirtle-select-item')[0] && !!(_q_max = parseInt($('li.squirtle-select-item')[0].dataset.value))) {
    _q = parseInt($('li.squirtle-select-item.active').attr('data-value')) || (_q_max > 80 ? 80 : _q_max);
  } else if (!!$('div.edu-player-quality-item')[0]) {
    _q = q_map[$('div.edu-player-quality-item.active span').text() || '自动'] || 80;
    _q_max = q_map[$('div.edu-player-quality-item span').text() || '自动'] || 80;
  } else {
    _q = _q_max = 80;
  }

  return {
    q: _q,
    q_max: _q_max
  };
}

function get_quality_support() {
  var list,
      quality_list = [];

  if (type() === 'cheese') {
    list = $('div.edu-player-quality-item span');
    list.each(function () {
      var k = $(this).text();

      if (k === '自动') {
        return false;
      }

      quality_list.push(q_map[$(this).text()]);
    });
    return quality_list.length ? quality_list : ['80', '64', '32', '16'];
  }

  if (!!$('ul.squirtle-select-list')[0]) {
    list = $('li.squirtle-select-item');
  } else if (!!$('ul.bui-select-list')[0]) {
    list = $('li.bui-select-item');
  }

  if (list && list.length) {
    list.each(function () {
      var q = "".concat($(this).attr('data-value'));

      if (q === '0') {
        return false;
      }

      quality_list.push(q);
    });
    return quality_list;
  }

  return ['80', '64', '32', '16'];
}

var video = {
  type: type,
  base: base,
  get_quality: get_quality,
  get_quality_support: get_quality_support
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/config.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/config.css ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#bp_config {\n  opacity: 0;\n  display: none;\n  position: fixed;\n  inset: 0px;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 10000;\n}\n.bp_config_bg {\n  position: absolute;\n  background: rgb(255, 255, 255);\n  border-radius: 10px;\n  padding: 20px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 600px;\n  box-shadow: rgb(0 0 0 / 70%) 0px 0px 0px 1000px;\n}\n.setting-button {\n  width: 120px;\n  height: 40px;\n  border-width: 0px;\n  border-radius: 3px;\n  background: #1e90ff;\n  cursor: pointer;\n  outline: none;\n  color: white;\n  font-size: 17px;\n}\n.setting-button:hover {\n  background: #5599ff;\n}\n.setting-context {\n  margin: 0 1%;\n  color: blue;\n}\n.setting-context:hover {\n  color: red;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/message.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/message.css ***!
  \*******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".message-bg {\n  position: fixed;\n  float: right;\n  right: 0;\n  top: 2%;\n  z-index: 30000;\n}\n.message {\n  margin-bottom: 15px;\n  padding: 2% 2%;\n  width: 300px;\n  display: flex;\n  margin-top: -70px;\n  opacity: 0;\n}\n.message-success {\n  background-color: #ddffdd;\n  border-left: 6px solid #4caf50;\n}\n.message-danger {\n  background-color: #ffdddd;\n  border-left: 6px solid #f44336;\n}\n.message-info {\n  background-color: #e7f3fe;\n  border-left: 6px solid #0c86de;\n}\n.message-warning {\n  background-color: #ffffcc;\n  border-left: 6px solid #ffeb3b;\n}\n.message-context {\n  font-size: 21px;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.message-context p {\n  margin: 0;\n}\n\n#message_box {\n  opacity: 0;\n  display: none;\n  position: fixed;\n  inset: 0px;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 20000;\n}\n.message_box_bg {\n  position: absolute;\n  background: rgb(255, 255, 255);\n  border-radius: 10px;\n  padding: 20px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 400px;\n  box-shadow: rgb(0 0 0 / 70%) 0px 0px 0px 1000px;\n}\n.message_box_btn {\n  text-align: right;\n}\n.message_box_btn button {\n  margin: 0 5px;\n  width: 120px;\n  height: 40px;\n  border-width: 0px;\n  border-radius: 3px;\n  background: #1e90ff;\n  cursor: pointer;\n  outline: none;\n  color: white;\n  font-size: 17px;\n}\n.message_box_btn button:hover {\n  background: #5599ff;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./src/html/arc_toolbar.html":
/*!***********************************!*\
  !*** ./src/html/arc_toolbar.html ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<div id=\"arc_toolbar_report_2\" style=\"margin-top:16px;\" class=\"video-toolbar report-wrap-module report-scroll-module\"\n  scrollshow=\"true\">\n  <div class=\"ops\">\n    <span id=\"setting_btn\"><i class=\"van-icon-general_addto_s\"></i>脚本设置</span>\n    <span id=\"bilibili_parse\"><i class=\"van-icon-floatwindow_custome\"></i>请求地址</span>\n    <span id=\"video_download\" style=\"display:none;\"><i class=\"van-icon-download\"></i>下载视频</span>\n    <span id=\"video_download_2\" style=\"display:none;\"><i class=\"van-icon-download\"></i>下载音频</span>\n    <span id=\"video_download_all\"><i class=\"van-icon-download\"></i>批量下载</span>\n  </div>\n  <div class=\"more\">\n    <i class=\"van-icon-general_moreactions\"></i>\n    <div class=\"more-ops-list\">\n      <ul>\n        <li><span id=\"download_danmaku\">下载弹幕</span></li>\n        <li><span id=\"download_subtitle\">下载字幕</span></li>\n      </ul>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/html/config.html":
/*!******************************!*\
  !*** ./src/html/config.html ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<div id=\"bp_config\">\n  <div class=\"bp_config_bg\">\n    <span style=\"font-size:20px;\">\n      <b>bilibili视频下载 参数设置</b>\n      <b>\n        <a href=\"javascript:;\" onclick=\"bp_reset_config()\"> [重置配置] </a>\n        <a style=\"text-decoration:underline;\" href=\"javascript:;\" onclick=\"bp_show_help()\">&lt;通知&帮助&gt;</a>\n      </b>\n    </span>\n    <div style=\"margin:2% 0;\"><label>请求地址：</label>\n      <input id=\"base_api\" value=\"...\" style=\"width:30%;\">&nbsp;&nbsp;&nbsp;&nbsp;\n      <label>请求方式：</label>\n      <select id=\"request_type\">\n        <option value=\"auto\">自动判断</option>\n        <option value=\"local\">本地请求</option>\n        <option value=\"online\">远程请求</option>\n      </select><br />\n      <small>注意：普通使用请勿修改；默认使用混合请求</small>\n    </div>\n    <div style=\"margin:2% 0;\"><label>视频格式：</label>\n      <select id=\"format\">\n        <option value=\"flv\">FLV</option>\n        <option value=\"dash\">DASH</option>\n        <option value=\"mp4\">MP4</option>\n      </select>&nbsp;&nbsp;&nbsp;&nbsp;\n      <label>切换CDN：</label>\n      <select id=\"host_key\">\n        ${host_key_option}\n      </select><br />\n      <small>注意：仅video支持MP4；建议特殊地区或网络受限时切换（自行选择合适线路）</small>\n    </div>\n    <div style=\"margin:2% 0;\"><label>下载方式：</label>\n      <select id=\"download_type\">\n        <option value=\"a\">URL链接</option>\n        <option value=\"web\">Web浏览器</option>\n        <option value=\"blob\">Blob请求</option>\n        <option value=\"rpc\">RPC接口</option>\n        <option value=\"aria\">Aria命令</option>\n      </select><br />\n      <small>提示：url和web方式下载不会设置文件名</small>\n    </div>\n    <div style=\"margin:2% 0;\"><label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br />\n      <input id=\"rpc_domain\" value=\"...\" style=\"width:25%;\"> :\n      <input id=\"rpc_port\" value=\"...\" style=\"width:10%;\"> |\n      <input id=\"rpc_token\" placeholder=\"没有密钥不用填\" value=\"...\" style=\"width:15%;\"> |\n      <input id=\"rpc_dir\" placeholder=\"留空使用默认目录\" value=\"...\" style=\"width:20%;\"><br />\n      <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small>\n    </div>\n    <div style=\"margin:2% 0;\">\n      <label>强制换源：</label>\n      <select id=\"replace_force\">\n        <option value=\"0\">关闭</option>\n        <option value=\"1\">开启</option>\n      </select>\n      &nbsp;&nbsp;&nbsp;&nbsp;<label>弹幕速度：</label>\n      <input id=\"danmaku_speed\" value=\"...\" style=\"width:5%;\"> s\n      &nbsp;&nbsp;&nbsp;&nbsp;<label>弹幕字号：</label>\n      <input id=\"danmaku_fontsize\" value=\"...\" style=\"width:5%;\"> px\n      <br />\n      <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small>\n    </div>\n    <div style=\"margin:2% 0;\"><label>自动下载：</label>\n      <select id=\"auto_download\">\n        <option value=\"0\">关闭</option>\n        <option value=\"1\">开启</option>\n      </select><br />\n      <small>说明：请求地址成功后将自动点击下载视频按钮</small>\n    </div>\n    <div style=\"margin:2% 0;\"><label>授权状态：</label>\n      <select id=\"auth\" disabled>\n        <option value=\"0\">未授权</option>\n        <option value=\"1\">已授权</option>\n      </select>\n      <a class=\"setting-context\" href=\"javascript:;\" onclick=\"bp_show_login()\">账号授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" onclick=\"bp_show_logout()\">取消授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" onclick=\"bp_show_login('0')\">手动授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" onclick=\"bp_show_login_help()\">这是什么？</a>\n    </div>\n    <div style=\"text-align:right\"><br />\n      <button class=\"setting-button\" onclick=\"bp_save_config()\">确定</button>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/html/message.html":
/*!*******************************!*\
  !*** ./src/html/message.html ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<div class=\"message-bg\"></div>\n<div id=\"message_box\">\n  <div class=\"message_box_bg\">\n    <span style=\"font-size:20px\"><b>提示：</b></span>\n    <div id=\"message_box_context\" style=\"margin:2% 0;\">...</div><br /><br />\n    <div class=\"message_box_btn\">\n      <button class=\"setting-button\" name=\"affirm\">确定</button>\n      <button class=\"setting-button\" name=\"cancel\">取消</button>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/html/toolbar.html":
/*!*******************************!*\
  !*** ./src/html/toolbar.html ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<div id=\"toolbar_module_2\" class=\"tool-bar clearfix report-wrap-module report-scroll-module media-info\"\n  scrollshow=\"true\">\n  <div id=\"setting_btn\" class=\"like-info\">\n    <i class=\"iconfont icon-add\"></i><span>脚本设置</span>\n  </div>\n  <div id=\"bilibili_parse\" class=\"like-info\">\n    <i class=\"iconfont icon-customer-serv\"></i><span>请求地址</span>\n  </div>\n  <div id=\"video_download\" class=\"like-info\" style=\"display:none;\">\n    <i class=\"iconfont icon-download\"></i><span>下载视频</span>\n  </div>\n  <div id=\"video_download_2\" class=\"like-info\" style=\"display:none;\">\n    <i class=\"iconfont icon-download\"></i><span>下载音频</span>\n  </div>\n  <div id=\"video_download_all\" class=\"like-info\">\n    <i class=\"iconfont icon-download\"></i><span>批量下载</span>\n  </div>\n  <div class=\"more\">更多<div class=\"more-ops-list\">\n      <ul>\n        <li><span id=\"download_danmaku\">下载弹幕</span></li>\n        <li><span id=\"download_subtitle\">下载字幕</span></li>\n      </ul>\n    </div>\n  </div>\n  <style>\n    .tool-bar .more {\n      float: right;\n      cursor: pointer;\n      color: #757575;\n      font-size: 16px;\n      display: inline-block;\n      transition: all .3s;\n      position: relative;\n      text-align: center\n    }\n\n    .tool-bar .more:hover .more-ops-list {\n      display: block\n    }\n\n    .tool-bar:after {\n      display: block;\n      content: \"\";\n      clear: both\n    }\n\n    .more-ops-list {\n      display: none;\n      position: absolute;\n      width: 80px;\n      left: -65px;\n      z-index: 30;\n      text-align: center;\n      padding: 10px 0;\n      background: #fff;\n      border: 1px solid #e5e9ef;\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .14);\n      border-radius: 2px;\n      font-size: 14px;\n      color: #222\n    }\n\n    .more-ops-list li {\n      position: relative;\n      height: 34px;\n      line-height: 34px;\n      cursor: pointer;\n      transition: all .3s\n    }\n\n    .more-ops-list li:hover {\n      color: #00a1d6;\n      background: #e7e7e7\n    }\n  </style>\n</div>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/html/video_toolbar.html":
/*!*************************************!*\
  !*** ./src/html/video_toolbar.html ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<div id=\"arc_toolbar_report_2\" style=\"margin-top:16px;\" class=\"video-toolbar report-wrap-module report-scroll-module\"\n  scrollshow=\"true\">\n  <div class=\"ops\">\n    <span id=\"setting_btn\"><i class=\"van-icon-general_addto_s\"></i>脚本设置</span>\n    <span id=\"bilibili_parse\"><i class=\"van-icon-floatwindow_custome\"></i>请求地址</span>\n    <span id=\"video_download\" style=\"display:none;\"><i class=\"van-icon-download\"></i>下载视频</span>\n    <span id=\"video_download_2\" style=\"display:none;\"><i class=\"van-icon-download\"></i>下载音频</span>\n    <span id=\"video_download_all\"><i class=\"van-icon-download\"></i>批量下载</span>\n  </div>\n  <div class=\"more\">\n    <i class=\"van-icon-general_moreactions\"></i>\n    <div class=\"more-ops-list\">\n      <ul class=\"more-ops-list-box\">\n        <li class=\"more-ops-list-box-li\"><span id=\"download_danmaku\">下载弹幕</span></li>\n        <li class=\"more-ops-list-box-li\"><span id=\"download_subtitle\">下载字幕</span></li>\n      </ul>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/config.css":
/*!****************************!*\
  !*** ./src/css/config.css ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_config_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./config.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/config.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_config_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_config_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_config_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_config_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/message.css":
/*!*****************************!*\
  !*** ./src/css/message.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./message.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/message.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/js/main.js");


(function () {
  'use strict';

  if (window.bp_fun_locked) return;
  window.bp_fun_locked = true;

  if (location.href.match(/^https:\/\/www\.mcbbs\.net\/template\/mcbbs\/image\/special_photo_bg\.png/) != null) {
    // https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6/code
    if (location.href.match('access_key') && window !== window.parent) {
      window.stop();
      window.parent.postMessage('bilibili-parse-login-credentials: ' + location.href, '*');
    }

    return;
  } // error page


  if ($('.error-text')[0]) {
    return;
  }
  /* global JS_VERSION GIT_HASH */


  console.log('\n'.concat(" %c bilibili-parse-download.user.js v", "2.0.0", " ").concat("71e7d96", " %c https://github.com/injahow/user.js ", '\n', '\n'), 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
  new _main__WEBPACK_IMPORTED_MODULE_0__["default"]().run();
})();
}();
/******/ })()
;