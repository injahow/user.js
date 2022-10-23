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
// @icon          https://static.hdslb.com/images/favicon.ico
// @grant         none
// ==/UserScript==
// @[ source codes in local repo ]
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/ui/message.js":
/*!******************************************!*\
  !*** ./src/js/ui/message.js + 1 modules ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Message": function() { return /* binding */ Message; },
  "MessageBox": function() { return /* binding */ MessageBox; },
  "initMessage": function() { return /* binding */ initMessage; }
});

// EXTERNAL MODULE: ./src/js/ui/scroll.js
var ui_scroll = __webpack_require__("./src/js/ui/scroll.js");
;// CONCATENATED MODULE: ./src/html/message.html
// Module
var code = "<div class=\"message-bg\"></div>\n<div id=\"message_box\">\n  <div class=\"message-box-mark\"></div>\n  <div class=\"message-box-bg\">\n    <span style=\"font-size:20px\"><b>提示：</b></span>\n    <div id=\"message_box_context\" style=\"margin:2% 0;\">...</div><br /><br />\n    <div class=\"message-box-btn\">\n      <button name=\"affirm\">确定</button>\n      <button name=\"cancel\">取消</button>\n    </div>\n  </div>\n</div>\n<style>\n  .message-bg {\n    position: fixed;\n    float: right;\n    right: 0;\n    top: 2%;\n    z-index: 30000;\n  }\n\n  .message {\n    margin-bottom: 15px;\n    padding: 2% 2%;\n    width: 300px;\n    display: flex;\n    margin-top: -70px;\n    opacity: 0;\n  }\n\n  .message-success {\n    background-color: #ddffdd;\n    border-left: 6px solid #4caf50;\n  }\n\n  .message-error {\n    background-color: #ffdddd;\n    border-left: 6px solid #f44336;\n  }\n\n  .message-info {\n    background-color: #e7f3fe;\n    border-left: 6px solid #0c86de;\n  }\n\n  .message-warning {\n    background-color: #ffffcc;\n    border-left: 6px solid #ffeb3b;\n  }\n\n  .message-context {\n    font-size: 21px;\n    word-wrap: break-word;\n    word-break: break-all;\n  }\n\n  .message-context p {\n    margin: 0;\n  }\n\n  #message_box {\n    opacity: 0;\n    display: none;\n    position: fixed;\n    inset: 0px;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 100%;\n    z-index: 20000;\n  }\n\n  .message-box-bg {\n    position: absolute;\n    background: rgb(255, 255, 255);\n    border-radius: 10px;\n    padding: 20px;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 420px;\n    z-index: 20001;\n  }\n\n  .message-box-mark {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 20000;\n  }\n\n  .message-box-btn {\n    text-align: right;\n  }\n\n  .message-box-btn button {\n    margin: 0 5px;\n    width: 120px;\n    height: 40px;\n    border-width: 0px;\n    border-radius: 3px;\n    background: #1e90ff;\n    cursor: pointer;\n    outline: none;\n    color: white;\n    font-size: 17px;\n  }\n\n  .message-box-btn button:hover {\n    background: #5599ff;\n  }\n</style>\n";
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
    $('div.message-box-btn button[name="cancel"]').show();
  } else if (type === 'alert') {
    $('div.message-box-btn button[name="cancel"]').hide();
  }

  if (ctx.html) {
    $('div#message_box_context').html("<div style=\"font-size:18px\">".concat(ctx.html, "</div>"));
  } else {
    $('div#message_box_context').html('<div style="font-size:18px">╰(￣▽￣)╮</div>');
  }

  ui_scroll.scroll.hide();
  $('#message_box').show();
  $('div#message_box').animate({
    'opacity': '1'
  }, 300);

  $('div.message-box-btn button[name="affirm"]')[0].onclick = function () {
    $('div#message_box').hide();
    $('div#message_box').css('opacity', 0);
    ui_scroll.scroll.show();

    if (ctx.callback && ctx.callback.affirm) {
      ctx.callback.affirm();
    }
  };

  $('div.message-box-btn button[name="cancel"]')[0].onclick = function () {
    $('div#message_box').hide();
    $('div#message_box').css('opacity', 0);
    ui_scroll.scroll.show();

    if (ctx.callback && ctx.callback.cancel) {
      ctx.callback.cancel();
    }
  };
}

var id = 0;

function message_message(html, type) {
  id += 1;
  messageEnQueue("<div id=\"message_".concat(id, "\" class=\"message message-").concat(type, "\"><div class=\"message-context\"><p><strong>").concat(type, "\uFF1A</strong></p><p>").concat(html, "</p></div></div>"), id);
  messageDeQueue(id, 3);
}

function messageEnQueue(message, id) {
  $('div.message-bg').append(message);
  $("div#message_".concat(id)).animate({
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

var Message = {
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
  miaow: function miaow(_) {
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

/***/ "./src/js/utils/ajax.js":
/*!******************************!*\
  !*** ./src/js/utils/ajax.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_ajax": function() { return /* binding */ _ajax; },
/* harmony export */   "ajax": function() { return /* binding */ ajax; }
/* harmony export */ });
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/message */ "./src/js/ui/message.js");

function ajax(obj) {
  return new Promise(function (resolve, reject) {
    // set obj.success & obj.success
    obj.success = function (res) {
      if (res && res.code) {
        _ui_message__WEBPACK_IMPORTED_MODULE_0__.Message.warning("".concat(res.message || "CODE:".concat(res.code))); // todo
      }

      resolve(res);
    };

    obj.error = function (err) {
      _ui_message__WEBPACK_IMPORTED_MODULE_0__.Message.error('网络异常');
      reject(err);
    };

    $.ajax(obj);
  });
}
function _ajax(obj) {
  return new Promise(function (resolve, reject) {
    // set obj.success & obj.success
    obj.success || (obj.success = function (res) {
      resolve(res);
    });
    obj.error || (obj.error = function (err) {
      reject(err);
    });
    $.ajax(obj);
  });
}

/***/ }),

/***/ "./src/js/utils/runtime-lib.js":
/*!*************************************!*\
  !*** ./src/js/utils/runtime-lib.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DPlayer": function() { return /* binding */ DPlayer; },
/* harmony export */   "JSZip": function() { return /* binding */ JSZip; },
/* harmony export */   "flvjs": function() { return /* binding */ flvjs; }
/* harmony export */ });
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax */ "./src/js/utils/ajax.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var RuntimeLib = /*#__PURE__*/function () {
  function RuntimeLib(config) {
    _classCallCheck(this, RuntimeLib);

    this.config = config;
    this.moduleAsync;
    this.anyResolved = false;
  }

  _createClass(RuntimeLib, [{
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
          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var code;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
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
                    return (0,_ajax__WEBPACK_IMPORTED_MODULE_0__._ajax)({
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
                    _this.anyResolved = true;
                    console.log("[Runtime Library] Downloaded from ".concat(url, " , length = ").concat(code.length));
                    (function runEval() {
                      return eval(code);
                    }).bind(window)();
                    resolve(getModule(window));
                    _context.next = 21;
                    break;

                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](0);

                    if (!_this.anyResolved) {
                      _context.next = 19;
                      break;
                    }

                    return _context.abrupt("return");

                  case 19:
                    errs.push({
                      url: url,
                      err: _context.t0
                    });

                    if (--i === 0) {
                      console.error(errs);
                      reject(errs);
                    }

                  case 21:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 15]]);
          })), i++ * 1000);
        });
      });
    }
  }]);

  return RuntimeLib;
}();

var cdn_map = {
  jsdelivr: function jsdelivr(name, ver, filename) {
    return "https://cdn.jsdelivr.net/npm/".concat(name, "@").concat(ver, "/dist/").concat(filename);
  },
  cloudflare: function cloudflare(name, ver, filename) {
    return "https://cdnjs.cloudflare.com/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
  },
  bootcdn: function bootcdn(name, ver, filename) {
    return "https://cdn.bootcdn.net/ajax/libs/".concat(name, "/").concat(ver, "/").concat(filename);
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
}; // 伪同步


var JSZip;
new RuntimeLib({
  urls: urls({
    name: 'jszip',
    ver: '3.10.0',
    filename: 'jszip.min.js'
  }),
  getModule: function getModule(window) {
    return window.JSZip;
  }
}).getModulePromise().then(function (module) {
  return JSZip = module;
});
var flvjs;
new RuntimeLib({
  urls: urls({
    name: 'flv.js',
    ver: '1.6.2',
    filename: 'flv.min.js'
  }),
  getModule: function getModule(window) {
    return window.flvjs;
  }
}).getModulePromise().then(function (module) {
  return flvjs = module;
});
var DPlayer;
new RuntimeLib({
  urls: urls({
    name: 'dplayer',
    ver: '1.26.0',
    filename: 'DPlayer.min.js'
  }),
  getModule: function getModule(window) {
    return window.DPlayer;
  }
}).getModulePromise().then(function (module) {
  return DPlayer = module;
});

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
/******/ 			// no module.id needed
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
/*!**************************************!*\
  !*** ./src/js/index.js + 14 modules ***!
  \**************************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/html/arc_toolbar.html
// Module
var code = "<div id=\"arc_toolbar_report_2\" style=\"margin-top:16px;\" class=\"video-toolbar report-wrap-module report-scroll-module\"\n  scrollshow=\"true\">\n  <div class=\"ops\">\n    <span id=\"setting_btn\">\n      <i class=\"van-icon-general_addto_s\"></i>脚本设置\n    </span>\n    <span id=\"bilibili_parse\">\n      <i class=\"van-icon-floatwindow_custome\"></i>请求地址\n    </span>\n    <span id=\"video_download\" style=\"display:none;\">\n      <i class=\"van-icon-download\"></i>下载视频\n    </span>\n    <span id=\"video_download_2\" style=\"display:none;\">\n      <i class=\"van-icon-download\"></i>下载音频\n    </span>\n    <span id=\"video_download_all\">\n      <i class=\"van-icon-download\"></i>批量下载\n    </span>\n  </div>\n  <div class=\"more\">\n    <i class=\"van-icon-general_moreactions\"></i>\n    <div class=\"more-ops-list\">\n      <ul>\n        <li><span id=\"download_danmaku\">下载弹幕</span></li>\n        <li><span id=\"download_subtitle\">下载字幕</span></li>\n      </ul>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ var arc_toolbar = (code);
;// CONCATENATED MODULE: ./src/html/toolbar.html
// Module
var toolbar_code = "<div id=\"toolbar_module_2\" class=\"tool-bar clearfix report-wrap-module report-scroll-module media-info\"\n  scrollshow=\"true\">\n  <div id=\"setting_btn\" class=\"like-info\">\n    <i class=\"iconfont icon-add\"></i><span>脚本设置</span>\n  </div>\n  <div id=\"bilibili_parse\" class=\"like-info\">\n    <i class=\"iconfont icon-customer-serv\"></i><span>请求地址</span>\n  </div>\n  <div id=\"video_download\" class=\"like-info\" style=\"display:none;\">\n    <i class=\"iconfont icon-download\"></i><span>下载视频</span>\n  </div>\n  <div id=\"video_download_2\" class=\"like-info\" style=\"display:none;\">\n    <i class=\"iconfont icon-download\"></i><span>下载音频</span>\n  </div>\n  <div id=\"video_download_all\" class=\"like-info\">\n    <i class=\"iconfont icon-download\"></i><span>批量下载</span>\n  </div>\n  <div class=\"more\">更多<div class=\"more-ops-list\">\n      <ul>\n        <li><span id=\"download_danmaku\">下载弹幕</span></li>\n        <li><span id=\"download_subtitle\">下载字幕</span></li>\n      </ul>\n    </div>\n  </div>\n  <style>\n    .tool-bar .more {\n      float: right;\n      cursor: pointer;\n      color: #757575;\n      font-size: 16px;\n      transition: all .3s;\n      position: relative;\n      text-align: center\n    }\n\n    .tool-bar .more:hover .more-ops-list {\n      display: block\n    }\n\n    .tool-bar:after {\n      display: block;\n      content: \"\";\n      clear: both\n    }\n\n    .more-ops-list {\n      display: none;\n      position: absolute;\n      width: 80px;\n      left: -65px;\n      z-index: 30;\n      text-align: center;\n      padding: 10px 0;\n      background: #fff;\n      border: 1px solid #e5e9ef;\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .14);\n      border-radius: 2px;\n      font-size: 14px;\n      color: #222\n    }\n\n    .more-ops-list li {\n      position: relative;\n      height: 34px;\n      line-height: 34px;\n      cursor: pointer;\n      transition: all .3s\n    }\n\n    .more-ops-list li:hover {\n      color: #00a1d6;\n      background: #e7e7e7\n    }\n  </style>\n</div>\n";
// Exports
/* harmony default export */ var toolbar = (toolbar_code);
;// CONCATENATED MODULE: ./src/html/video_toolbar.html
// Module
var video_toolbar_code = "<div id=\"arc_toolbar_report_2\" style=\"margin-top:16px;\" class=\"video-toolbar report-wrap-module report-scroll-module\"\n  scrollshow=\"true\">\n  <div class=\"ops\">\n    <span id=\"setting_btn\">\n      <i class=\"van-icon-general_addto_s\"></i>脚本设置\n    </span>\n    <span id=\"bilibili_parse\">\n      <i class=\"van-icon-floatwindow_custome\"></i>请求地址\n    </span>\n    <span id=\"video_download\" style=\"display:none;\">\n      <i class=\"van-icon-download\"></i>下载视频\n    </span>\n    <span id=\"video_download_2\" style=\"display:none;\">\n      <i class=\"van-icon-download\"></i>下载音频\n    </span>\n    <span id=\"video_download_all\">\n      <i class=\"van-icon-download\"></i>批量下载\n    </span>\n  </div>\n  <div class=\"more\">\n    <i class=\"van-icon-general_moreactions\"></i>\n    <div class=\"more-ops-list\">\n      <ul class=\"more-ops-list-box\">\n        <li class=\"more-ops-list-box-li\">\n          <span id=\"download_danmaku\">下载弹幕</span>\n        </li>\n        <li class=\"more-ops-list-box-li\">\n          <span id=\"download_subtitle\">下载字幕</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n";
// Exports
/* harmony default export */ var video_toolbar = (video_toolbar_code);
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
      return !this.is_login || !this.vip_status && video.base().need_vip();
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
// EXTERNAL MODULE: ./src/js/ui/message.js + 1 modules
var message = __webpack_require__("./src/js/ui/message.js");
// EXTERNAL MODULE: ./src/js/utils/ajax.js
var ajax = __webpack_require__("./src/js/utils/ajax.js");
;// CONCATENATED MODULE: ./src/js/utils/api.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








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
      message.Message.error('请求失败');
      error(e);
    };
  } else {
    _error = function _error(err) {
      return console.error(err);
    };
  }

  var vb = video.base();
  var _ref = [vb.aid(page), vb.bvid(page), vb.cid(page), vb.epid(page), quality || video.get_quality().q, vb.type],
      aid = _ref[0],
      bvid = _ref[1],
      cid = _ref[2],
      epid = _ref[3],
      q = _ref[4],
      type = _ref[5]; // 参数预处理

  var format = video_format || config_config.format;
  if (request_type === 'auto' && user.needReplace()) request_type = 'online';

  var url_replace_cdn = function url_replace_cdn(url) {
    if (config_config.host_key !== '0' && request_type === 'online' && format !== 'mp4') {
      // 切换CDN
      var url_tmp = url.split('/');
      url_tmp[2] = hostMap[config_config.host_key];
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
    var fnver,
        fnval = {
      dash: 4048,
      flv: 4049,
      mp4: 80
    }[format] || 0;

    if (type === 'cheese') {
      base_api = 'https://api.bilibili.com/pugv/player/web/playurl';
      fnver = format === 'mp4' ? 1 : 0;
    } else {
      base_api = type === 'video' ? 'https://api.bilibili.com/x/player/playurl' : 'https://api.bilibili.com/pgc/player/web/playurl';
      fnver = 0;
    }

    base_api += "?avid=".concat(aid, "&bvid=").concat(bvid, "&cid=").concat(cid, "&qn=").concat(q, "&fnver=").concat(fnver, "&fnval=").concat(fnval, "&fourk=1&ep_id=").concat(epid, "&type=").concat(format, "&otype=json");
    base_api += format === 'mp4' ? '&platform=html5&high_quality=1' : '';
    ajax_obj.xhrFields = {
      withCredentials: true
    };
  } else {
    base_api = config_config.base_api;
    base_api += "?av=".concat(aid, "&bv=").concat(bvid, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(format, "&otype=json");
    var _ref2 = [store.get('auth_id'), store.get('auth_sec')],
        auth_id = _ref2[0],
        auth_sec = _ref2[1];

    if (config_config.auth === '1' && auth_id && auth_sec) {
      base_api += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
      !!page && (base_api += '&s');
    }
  }

  ajax_obj.url = base_api;
  (0,ajax.ajax)(ajax_obj).then(function (res) {
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

      _success(res);

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

      _success(result);

      return;
    }

    _success({
      'code': 0,
      'quality': data.quality,
      'accept_quality': data.accept_quality,
      'url': url_replace_cdn(data.durl[0].url)
    });
  }).catch(function (err) {
    return _error(err);
  });
}

function _get_subtitle(p, callback) {
  var to_blob_url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var video_base = video.base();
  var _ref3 = [video_base.aid(p), video_base.cid(p), video_base.epid(p)],
      aid = _ref3[0],
      cid = _ref3[1],
      epid = _ref3[2];
  (0,ajax.ajax)({
    url: "https://api.bilibili.com/x/player/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
    dataType: 'json'
  }).then(function (res) {
    // todo
    if (!res.code && res.data.subtitle.subtitles[0]) {
      (0,ajax.ajax)({
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

function get_season(epid) {
  (0,ajax.ajax)({
    url: "https://api.bilibili.com/pugv/view/web/season?ep_id=".concat(epid),
    xhrFields: {
      withCredentials: true
    },
    dataType: 'json'
  }).then(function (res) {
    if (res.code) {
      message.Message.warning('获取剧集信息失败');
      return;
    }

    window.bp_episodes = res.data.episodes || null;
  });
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
  get_subtitle_data: get_subtitle_data,
  get_season: get_season
};
;// CONCATENATED MODULE: ./src/js/utils/video.js




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
    var main_title = (state.videoData && state.videoData.title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
    return {
      type: 'video',
      name: main_title,
      total: function total() {
        return state.videoData.pages.length || 1;
      },
      title: function title(_p) {
        var p = _p || state.p || 1;
        return (state.videoData.pages[p - 1].part || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        var p = _p || state.p || 1;
        var title = main_title + " P".concat(p, " \uFF08").concat(state.videoData.pages[p - 1].part || p, "\uFF09");
        return title.replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid() {
        return state.videoData.aid;
      },
      bvid: function bvid() {
        return state.videoData.bvid;
      },
      p: function p() {
        return state.p || 1;
      },
      cid: function cid(_p) {
        var p = _p || state.p || 1;
        return state.videoData.pages[p - 1].cid;
      },
      epid: function epid() {
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

    var _main_title = (collect_name || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');

    return {
      type: 'video',
      name: _main_title,
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
        return "".concat(_main_title, " P").concat(id + 1, " \uFF08").concat(title, "\uFF09").replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        var id = _p ? _p - 1 : _id;
        return medialist.eq(id).attr('data-aid');
      },
      bvid: function bvid(_p) {
        var id = _p ? _p - 1 : _id;
        return medialist.eq(id).attr('data-bvid');
      },
      p: function p() {
        return _id + 1;
      },
      cid: function cid(_p) {
        var id = _p ? _p - 1 : _id;
        return medialist.eq(id).attr('data-cid');
      },
      epid: function epid() {
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

    var _main_title2 = (_state.mediaInfo.season_title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');

    return {
      type: 'bangumi',
      name: _main_title2,
      total: function total() {
        return _state.epList.length;
      },
      title: function title(_p) {
        var ep = _p ? _state.epList[_p - 1] : _state.epInfo;
        return "".concat(ep.titleFormat, " ").concat(ep.longTitle).replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        if (_p) {
          var ep = _state.epList[_p - 1];
          return "".concat(_main_title2, "\uFF1A").concat(ep.titleFormat, " ").concat(ep.longTitle).replace(/[\/\\:*?"<>|]+/g, '');
        }

        return (_state.h1Title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        return _p ? _state.epList[_p - 1].aid : _state.epInfo.aid;
      },
      bvid: function bvid() {
        return _p ? _state.epList[_p - 1].bvid : _state.epInfo.bvid;
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

      api.get_season(epid);
    }

    var episodes = window.bp_episodes;
    var _id2 = 0;

    for (var i = 0; i < episodes.length; i++) {
      if (episodes[i].id == epid) {
        _id2 = i;
        break;
      }
    }

    var _main_title3 = ($('div.archive-title-box').text() || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');

    return {
      type: 'cheese',
      name: _main_title3,
      total: function total() {
        return episodes.length;
      },
      title: function title(_p) {
        var id = _p ? _p - 1 : _id2;
        return (episodes[id].title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '');
      },
      filename: function filename(_p) {
        var id = _p ? _p - 1 : _id2;
        return "".concat(_main_title3, " P").concat(id + 1, " \uFF08").concat(episodes[id].title || 'unknown', "\uFF09").replace(/[\/\\:*?"<>|]+/g, '');
      },
      aid: function aid(_p) {
        var id = _p ? _p - 1 : _id2;
        return episodes[id].aid;
      },
      bvid: function bvid() {
        return '';
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
      name: 'none',
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
  '自动': 32
};

function get_quality() {
  var _q = 0,
      _q_max = 0;
  var vb = video.base();

  if (vb.type === 'cheese') {
    var q = $('div.edu-player-quality-item.active span').text();
    var q_max = $($('div.edu-player-quality-item span').get(0)).text();
    _q = q in q_map ? q_map[q] : 0;
    _q_max = q_max in q_map ? q_map[q_max] : 0;
  } else {
    var keys = Object.keys(videoQualityMap);

    var _q2 = parseInt((vb.type === 'video' ? $('li.bpx-player-ctrl-quality-menu-item.bpx-state-active') : $('li.squirtle-select-item.active')).attr('data-value'));

    var _q_max2 = parseInt($((vb.type === 'video' ? $('li.bpx-player-ctrl-quality-menu-item') : $('li.squirtle-select-item')).get(0)).attr('data-value'));

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
  var vb = video.base();

  if (vb.type === 'cheese') {
    list = $('div.edu-player-quality-item span');
    list.each(function () {
      var k = $(this).text();

      if (q_map[k]) {
        quality_list.push(q_map[k]);
      }
    });
  } else {
    var keys = Object.keys(videoQualityMap);
    list = vb.type === 'video' ? $('li.bpx-player-ctrl-quality-menu-item') : $('li.squirtle-select-item');

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
// EXTERNAL MODULE: ./src/js/utils/runtime-lib.js
var runtime_lib = __webpack_require__("./src/js/utils/runtime-lib.js");
;// CONCATENATED MODULE: ./src/js/utils/player.js






function get_bili_player_id() {
  if (!!$('#bilibiliPlayer')[0]) {
    return '#bilibiliPlayer';
  } else if (!!$('#bilibili-player')[0]) {
    return '#bilibili-player';
  } else if (video.type() === 'cheese') {
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

  (0,ajax.ajax)({
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
  } else if (video.type() === 'cheese') {
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
    window.bp_dplayer = new runtime_lib.DPlayer({
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
      }]
    }); // subtitle_blob save

    if (url_2 && url_2 !== '#') {
      $('body').append('<div id="bp_dplayer_2" style="display:none;"></div>');
      window.bp_dplayer_2 = new runtime_lib.DPlayer({
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

    $(get_bili_player_id()).show(); // $('#player_mask_module').show()
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

    this.aid = '';
    this.cid = '';
    this.q = '';
    this.epid = '';
  }

  check_createClass(Check, [{
    key: "refresh",
    value: function refresh() {
      console.log('refresh...');
      $('#video_download').hide();
      $('#video_download_2').hide();
      player.recover_player(); // 更新check

      try {
        var vb = video.base();
        this.aid = vb.aid();
        this.cid = vb.cid();
        this.epid = vb.epid();
        this.q = video.get_quality().q;
        window.bp_episodes = null; // todo
      } catch (err) {
        console.log(err);
      }
    }
  }]);

  return Check;
}();

var check = new Check();
// EXTERNAL MODULE: ./src/js/ui/scroll.js
var ui_scroll = __webpack_require__("./src/js/ui/scroll.js");
;// CONCATENATED MODULE: ./src/js/utils/download.js
function download_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = download_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function download_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return download_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return download_arrayLikeToArray(o, minLen); }

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
  $('body').on('click', 'input[name="option_video"]', function () {
    if ($(this).is(':checked')) {
      $(this).parent().css('color', 'rgba(0,0,0,1)');
    } else {
      $(this).parent().css('color', 'rgba(0,0,0,0.5)');
    }
  });
  var video_html = '';

  for (var i = 0; i < total; i++) {
    video_html += '' + "<label for=\"option_".concat(i, "\"><div style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"option_").concat(i, "\" name=\"option_video\" value=\"").concat(i, "\">\n                P").concat(i + 1, " ").concat(vb.title(i + 1), "\n            </div></label>");
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

  var msg = '' + "<div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u683C\u5F0F:</label>\n            <select id=\"dl_format\">\n                <option value=\"flv\" selected>FLV</option>\n                <option value=\"mp4\">MP4</option>\n            </select>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u89C6\u9891\u8D28\u91CF:</label>\n            <select id=\"dl_quality\">\n                ".concat(option_support_html, "\n            </select>\n        </div>\n        <div style=\"margin:2% 0;\">\n            <label>\u4E0B\u8F7D\u9009\u62E9:</label>\n            <label style=\"color:rgba(0,0,0,1);\">\n                <input type=\"checkbox\" id=\"dl_video\" name=\"dl_option\" checked=\"checked\">\n                <label for=\"dl_video\" >\u89C6\u9891</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_subtitle\" name=\"dl_option\">\n                <label for=\"dl_subtitle\">\u5B57\u5E55</label>\n            </label>\n            <label style=\"color:rgba(0,0,0,0.5);\">\n                <input type=\"checkbox\" id=\"dl_danmaku\" name=\"dl_option\">\n                <label for=\"dl_danmaku\">\u5F39\u5E55</label>\n            </label>\n        </div>\n        <b>\n            <span style=\"color:red;\">\u4E3A\u907F\u514D\u8BF7\u6C42\u88AB\u62E6\u622A\uFF0C\u8BBE\u7F6E\u4E86\u5EF6\u65F6\u4E14\u4E0D\u652F\u6301\u4E0B\u8F7D\u65E0\u6CD5\u64AD\u653E\u7684\u89C6\u9891\uFF1B\u8BF7\u52FF\u9891\u7E41\u4E0B\u8F7D\u8FC7\u591A\u89C6\u9891\uFF0C\u53EF\u80FD\u89E6\u53D1\u98CE\u63A7\u5BFC\u81F4\u4E0D\u53EF\u518D\u4E0B\u8F7D\uFF01</span>\n        </b><br />\n        <div style=\"height:220px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);\">\n            ").concat(video_html, "\n        </div>\n        <div>").concat(video.type() === 'medialist' ? '不支持多页视频，若需要请到视频原播放页面下载' : '', "</div>\n        <div style=\"margin:2% 0;\">\n            <button id=\"checkbox_btn\">\u5168\u9009</button>\n        </div>");
  message.MessageBox.confirm(msg, function () {
    // 获取参数
    var dl_quality = $('#dl_quality').val() || q;
    var _ref2 = [$('#dl_video').is(':checked'), $('#dl_subtitle').is(':checked'), $('#dl_danmaku').is(':checked')],
        dl_video = _ref2[0],
        dl_subtitle = _ref2[1],
        dl_danmaku = _ref2[2];
    var videos = [];

    for (var _i = 0; _i < total; _i++) {
      if (!$("input#option_".concat(_i)).is(':checked')) {
        continue;
      }

      var p = _i + 1;
      var _ref3 = [vb.cid(p), vb.filename(p)],
          cid = _ref3[0],
          filename = _ref3[1];

      var _format = $('#dl_format').val();

      videos.push({
        cid: cid,
        p: p,
        q: dl_quality,
        format: _format,
        filename: filename
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
        download_subtitle_vtt_zip([].concat(videos), new runtime_lib.JSZip());
      }
    }

    if (dl_danmaku) {
      // 下载弹幕
      if (videos.length === 1) {
        download_danmaku_ass(videos[0].cid, videos[0].filename);
      } else {
        download_danmaku_ass_zip([].concat(videos), new runtime_lib.JSZip());
      }
    }
  }); // 处理被隐藏的input

  $('body').on('click', 'input[name="dl_option"]', function () {
    if ($(this).is(':checked')) {
      $(this).parent().css('color', 'rgba(0,0,0,1)');
    } else {
      $(this).parent().css('color', 'rgba(0,0,0,0.5)');
    }
  }); // 初始化参数，去除8k及以上

  $('#dl_quality').val(q > 120 ? 80 : q);

  function download_videos(videos, i, video_urls) {
    // 单线递归处理，请求下载同时进行
    if (videos.length) {
      if (i < videos.length) {
        var _video = videos[i];

        var _msg = "\u7B2C".concat(i + 1, "\uFF08").concat(i + 1, "/").concat(videos.length, "\uFF09\u4E2A\u89C6\u9891");

        message.MessageBox.alert("".concat(_msg, "\uFF1A\u83B7\u53D6\u4E2D..."));
        setTimeout(function () {
          var success = function success(res) {
            if (!res.code) {
              message.Message.success('请求成功' + (res.times ? "<br/>\u4ECA\u65E5\u5269\u4F59\u8BF7\u6C42\u6B21\u6570".concat(res.times) : ''));
              message.MessageBox.alert("".concat(_msg, "\uFF1A\u83B7\u53D6\u6210\u529F\uFF01"));
              var _ref4 = [res.url, format(res.url), rpc_type()],
                  url = _ref4[0],
                  video_format = _ref4[1],
                  type = _ref4[2];

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
              download_videos(videos, ++i, video_urls);
            }, 3000);
          };

          var error = function error() {
            download_videos(videos, ++i, video_urls);
          };

          api.get_urls(_video.p, _video.q, _video.format, success, error);
        }, 3000);
      } else {
        message.MessageBox.alert('视频地址请求完成！');

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
      domain: config_config.rpc_domain,
      port: config_config.rpc_port,
      token: config_config.rpc_token,
      dir: config_config.rpc_dir
    };
    var json_rpc = [];

    var _iterator2 = download_createForOfIteratorHelper(video_urls),
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

    message.Message.info('发送RPC下载请求');
    (0,ajax.ajax)({
      url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(json_rpc)
    }).then(function (res) {
      if (res.length === json_rpc.length) {
        message.Message.success('RPC请求成功');
      } else {
        message.Message.warning('请检查RPC参数');
      }
    }).catch(function (_) {
      message.Message.error('请检查RPC服务配置');
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
      bp_aria2_window.location.href = config_config.ariang_host + task_hash;
      message.Message.success('RPC请求成功');
    } else {
      message.Message.warning('请检查RPC参数');
    }
  }, time);
}

var download_rpc_clicked = false;

function download_rpc(url, filename) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';

  if (download_rpc_clicked) {
    message.Message.miaow();
    return;
  }

  download_rpc_clicked = true;
  var rpc = {
    domain: config_config.rpc_domain,
    port: config_config.rpc_port,
    token: config_config.rpc_token,
    dir: config_config.rpc_dir
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
  message.Message.info('发送RPC下载请求');

  if (type === 'post') {
    (0,ajax.ajax)({
      url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(json_rpc)
    }).then(function (res) {
      if (res.result) {
        message.Message.success('RPC请求成功');
      } else {
        message.Message.warning('请检查RPC参数');
      }
    }).catch(function (_) {
      message.Message.error('请检查RPC服务配置');
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
        bp_aria2_window.location.href = config_config.ariang_host + task_hash;
        message.Message.success('RPC请求发送成功');
      } else {
        message.Message.warning('AriaNG页面未打开');
      }

      download_rpc_clicked = false;
    }, time);
  }
}

function open_ariang(rpc) {
  var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace('://', '/'), "/").concat(rpc.port, "/jsonrpc/").concat(window.btoa(rpc.token)) : '';
  var url = config_config.ariang_host + hash_tag;
  var a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('onclick', "window.bp_aria2_window=window.open('".concat(url, "');"));
  a.click();
}

var download_blob_clicked = false,
    need_show_progress = true;

function show_progress(_ref5) {
  var total = _ref5.total,
      loaded = _ref5.loaded,
      percent = _ref5.percent;

  if (need_show_progress) {
    message.MessageBox.alert("\u6587\u4EF6\u5927\u5C0F\uFF1A".concat(Math.floor(total / (1024 * 1024)), "MB(").concat(total, "Byte)<br/>") + "\u5DF2\u7ECF\u4E0B\u8F7D\uFF1A".concat(Math.floor(loaded / (1024 * 1024)), "MB(").concat(loaded, "Byte)<br/>") + "\u5F53\u524D\u8FDB\u5EA6\uFF1A".concat(percent, "%<br/>\u4E0B\u8F7D\u4E2D\u8BF7\u52FF\u64CD\u4F5C\u6D4F\u89C8\u5668\uFF01"), function () {
      need_show_progress = false;
      message.MessageBox.alert('注意：刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。');
    });
  }

  if (total === loaded) {
    message.MessageBox.alert('下载完成，请等待浏览器保存！');
    download_blob_clicked = false;
  }
}

function download_blob(url, filename) {
  if (download_blob_clicked) {
    message.Message.miaow();
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

  message.Message.info('准备开始下载');
}

function _download_danmaku_ass(cid, title) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // todo: 暂时使用随机弹幕
  (0,ajax.ajax)({
    url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
    dataType: 'text'
  }).then(function (result) {
    var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''));

    if (!result_dom || !result_dom.find('d')[0]) {
      if (return_type === 'callback' && callback) {
        callback();
        return;
      }

      message.Message.warning('未发现弹幕');
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
      }; // todo 3. make


      var content = ['[Script Info]', '; Script generated by injahow/user.js', '; https://github.com/injahow/user.js', "Title: ".concat(title), 'ScriptType: v4.00+', "PlayResX: ".concat(1920), "PlayResY: ".concat(1080), 'Timer: 10.0000', 'WrapStyle: 2', 'ScaledBorderAndShadow: no', '', '[V4+ Styles]', 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding', 'Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', 'Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0', '', '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'];
      var scroll_id = 0,
          fix_id = 0;

      var _iterator3 = download_createForOfIteratorHelper(danmaku_data),
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
        } // 4.ass & return

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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
  }).catch(function (_) {
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
      message.Message.warning('未发现字幕');
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
  // 异步递归
  if (!videos) return;

  if (videos.length === 0) {
    if (Object.keys(zip.files).length === 0) {
      message.Message.warning('未发现弹幕');
      return;
    }

    zip.generateAsync({
      type: 'blob'
    }).then(function (data) {
      return download_blob_zip(data, video.base().name + '_ass');
    });
    return;
  }

  var videos_pop = videos.pop();

  _download_danmaku_ass(videos_pop.cid, videos_pop.filename, 'callback', function (data) {
    if (data) {
      zip.file(videos_pop.filename + '.ass', data);
    }

    download_danmaku_ass_zip(videos, zip);
  });
}
/**
 * 批量下载字幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */


function download_subtitle_vtt_zip(videos, zip) {
  // 异步递归
  if (!videos) return;

  if (videos.length === 0) {
    if (Object.keys(zip.files).length === 0) {
      message.Message.warning('未发现字幕');
      return;
    }

    zip.generateAsync({
      type: 'blob'
    }).then(function (data) {
      return download_blob_zip(data, video.base().name + '_vtt');
    });
    return;
  }

  var videos_pop = videos.pop();
  api.get_subtitle_data(videos_pop.p, function (data) {
    if (data) {
      zip.file(videos_pop.filename + '.vtt', data);
    }

    download_subtitle_vtt_zip(videos, zip);
  });
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
    name = name.replace(/[\/\\*|]+/g, '-').replace(/:/g, '：').replace(/\?/g, '？').replace(/"/g, '\'').replace(/</g, '《').replace(/>/g, '》');
    var filename = name + format(url);

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
;// CONCATENATED MODULE: ./src/html/config.html
// Module
var config_code = "<div id=\"bp_config\">\n  <div class=\"config-mark\"></div>\n  <div class=\"config-bg\">\n    <span style=\"font-size: 20px\">\n      <b>bilibili视频下载 参数设置</b>\n      <b>\n        <a href=\"javascript:;\" id=\"reset_config\"> [重置] </a>\n        <a style=\"text-decoration: underline\" href=\"javascript:;\" id=\"show_help\">&lt;通知/帮助&gt;</a>\n      </b>\n    </span>\n    <div style=\"margin: 2% 0\">\n      <label>请求地址：</label>\n      <input id=\"base_api\" style=\"width: 30%\" />&nbsp;&nbsp;&nbsp;&nbsp;\n      <label>请求方式：</label>\n      <select id=\"request_type\">\n        <option value=\"auto\">自动判断</option>\n        <option value=\"local\">本地请求</option>\n        <option value=\"online\">远程请求</option>\n      </select><br />\n      <small>注意：普通使用请勿修改；默认使用混合请求</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>视频格式：</label>\n      <select id=\"format\">\n        <option value=\"flv\">FLV</option>\n        <option value=\"dash\">DASH</option>\n        <option value=\"mp4\">MP4</option>\n      </select>&nbsp;&nbsp;&nbsp;&nbsp;\n      <label>切换CDN：</label>\n      <select id=\"host_key\">\n        {{host_key_options}}\n      </select><br />\n      <small>注意：无法选择MP4清晰度；建议特殊地区或播放异常时切换（自行选择合适线路）</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>下载方式：</label>\n      <select id=\"download_type\">\n        <option value=\"a\">URL链接</option>\n        <option value=\"web\">Web浏览器</option>\n        <option value=\"blob\">Blob请求</option>\n        <option value=\"rpc\">RPC接口</option>\n        <option value=\"aria\">Aria命令</option>\n      </select>&nbsp;&nbsp;&nbsp;&nbsp;\n      <label>AriaNg地址：</label>\n      <input id=\"ariang_host\" style=\"width: 30%\" /><br />\n      <small>提示：前两种方式不会设置文件名；非HTTPS或非本地的RPC域名使用AriaNg下载</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br />\n      <input id=\"rpc_domain\" style=\"width: 25%\" /> :\n      <input id=\"rpc_port\" style=\"width: 10%\" /> |\n      <input id=\"rpc_token\" placeholder=\"未设置不填\" style=\"width: 15%\" /> |\n      <input id=\"rpc_dir\" placeholder=\"留空使用默认目录\" style=\"width: 20%\" /><br />\n      <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>Aria参数：</label>\n      最大连接数：<select id=\"aria2c_connection_level\">\n        <option value=\"min\">1</option>\n        <option value=\"mid\">8</option>\n        <option value=\"max\">16</option>\n      </select><br />\n      <small>说明：用于配置Aria命令下载方式的参数</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>强制换源：</label>\n      <select id=\"replace_force\">\n        <option value=\"0\">关闭</option>\n        <option value=\"1\">开启</option>\n      </select>\n      &nbsp;&nbsp;&nbsp;&nbsp;\n      <label>弹幕速度：</label>\n      <input id=\"danmaku_speed\" style=\"width: 5%\" /> s\n      &nbsp;&nbsp;&nbsp;&nbsp;\n      <label>弹幕字号：</label>\n      <input id=\"danmaku_fontsize\" style=\"width: 5%\" /> px<br />\n      <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>自动下载：</label>\n      <select id=\"auto_download\">\n        <option value=\"0\">关闭</option>\n        <option value=\"1\">开启</option>\n      </select>\n      &nbsp;&nbsp;&nbsp;&nbsp;\n      <label>视频质量：</label>\n      <select id=\"video_quality\">\n        {{video_quality_options}}\n      </select><br />\n      <small>说明：请求地址成功后将自动点击下载视频按钮</small>\n    </div>\n    <div style=\"margin: 2% 0\">\n      <label>授权状态：</label>\n      <select id=\"auth\" disabled>\n        <option value=\"0\">未授权</option>\n        <option value=\"1\">已授权</option>\n      </select>\n      <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login\">账号授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" id=\"show_logout\">取消授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_2\">手动授权</a>\n      <a class=\"setting-context\" href=\"javascript:;\" id=\"show_login_help\">这是什么？</a>\n    </div>\n    <br />\n    <div style=\"text-align: right\">\n      <button class=\"setting-button\" id=\"save_config\">确定</button>\n    </div>\n  </div>\n\n  <style>\n    #bp_config {\n      opacity: 0;\n      display: none;\n      position: fixed;\n      inset: 0px;\n      top: 0px;\n      left: 0px;\n      width: 100%;\n      height: 100%;\n      z-index: 10000;\n    }\n\n    #bp_config .config-bg {\n      position: absolute;\n      background: rgb(255, 255, 255);\n      border-radius: 10px;\n      padding: 20px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 600px;\n      z-index: 10001;\n    }\n\n    #bp_config .config-mark {\n      width: 100%;\n      height: 100%;\n      position: fixed;\n      top: 0;\n      left: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 10000;\n    }\n\n    #bp_config .setting-button {\n      width: 120px;\n      height: 40px;\n      border-width: 0px;\n      border-radius: 3px;\n      background: #1e90ff;\n      cursor: pointer;\n      outline: none;\n      color: white;\n      font-size: 17px;\n    }\n\n    #bp_config .setting-button:hover {\n      background: #5599ff;\n    }\n\n    #bp_config .setting-context {\n      margin: 0 1%;\n      color: blue;\n    }\n\n    #bp_config .setting-context:hover {\n      color: red;\n    }\n  </style>\n</div>\n";
// Exports
/* harmony default export */ var config = (config_code);
;// CONCATENATED MODULE: ./src/js/ui/config.js









var config_config = {
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
  aria2c_connection_level: "min",
  ariang_host: 'http://ariang.injahow.com/',
  auto_download: '0',
  video_quality: '0',
  danmaku_speed: '15',
  danmaku_fontsize: '22'
};
var default_config = Object.assign({}, config_config); // 浅拷贝

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
var videoQualityMap = {
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
        message.MessageBox.alert('检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；' + '请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；' + '配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！', function () {
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
    ui_scroll.scroll.show();
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
      message.Message.miaow();
      return;
    }

    help_clicked = true;
    (0,ajax.ajax)({
      url: "".concat(config_config.base_api, "/auth/v2/?act=help"),
      dataType: 'text'
    }).then(function (res) {
      if (res) {
        message.MessageBox.alert(res);
      } else {
        message.Message.warning('获取失败');
      }
    }).finally(function () {
      return help_clicked = false;
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
    message.MessageBox.confirm('进行授权之后将能在远程请求时享有用户账号原有的权益，例如能够请求用户已经付费或承包的番剧，是否需要授权？', function () {
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

  config_config.auth = store.get('auth_id') ? '1' : '0';
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


;// CONCATENATED MODULE: ./src/js/auth.js
function auth_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function auth_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function auth_createClass(Constructor, protoProps, staticProps) { if (protoProps) auth_defineProperties(Constructor.prototype, protoProps); if (staticProps) auth_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }







var Auth = /*#__PURE__*/function () {
  function Auth() {
    auth_classCallCheck(this, Auth);

    this.auth_clicked = false;
  }

  auth_createClass(Auth, [{
    key: "checkLoginStatus",
    value: function checkLoginStatus() {
      var _this = this;

      var _ref = [store.get('auth_id'), store.get('auth_sec'), store.get('access_key'), store.get('auth_time') || '0'],
          auth_id = _ref[0],
          auth_sec = _ref[1],
          access_key = _ref[2],
          auth_time = _ref[3];
      if (!access_key) return;

      if (user.is_login && (config_config.base_api !== store.get('pre_base_api') || Date.now() - parseInt(auth_time) > 24 * 60 * 60 * 1000)) {
        // check key
        (0,ajax.ajax)({
          url: "https://api.bilibili.com/x/space/myinfo?access_key=".concat(access_key),
          type: 'GET',
          dataType: 'json'
        }).then(function (res) {
          if (res.code) {
            message.MessageBox.alert('授权已过期，准备重新授权', function () {
              _this.reLogin();
            });
          } else {
            store.set('auth_time', Date.now());
            (0,ajax.ajax)({
              url: "".concat(config_config.base_api, "/auth/v2/?act=check&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&access_key=").concat(access_key),
              type: 'GET',
              dataType: 'json'
            }).then(function (res) {
              if (res.code) {
                message.MessageBox.alert('检查失败，准备重新授权', function () {
                  _this.reLogin();
                });
              }
            });
          }
        });
      }

      store.set('pre_base_api', config_config.base_api);
    }
  }, {
    key: "_login",
    value: function _login(resolve) {
      var _this2 = this;

      if (this.auth_clicked) {
        message.Message.miaow();
        return;
      }

      this.auth_clicked = true;
      (0,ajax.ajax)({
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
      var auto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';
      var do_login = auto === '1' // 绑定 this
      ? this.loginAuto.bind(this) : this.loginManual.bind(this);

      if (store.get('auth_id')) {
        message.MessageBox.confirm('发现授权记录，是否重新授权？', do_login);
        return;
      }

      do_login();
    }
  }, {
    key: "reLogin",
    value: function reLogin() {
      store.set('auth_id', '');
      store.set('auth_sec', '');
      store.set('access_key', '');
      store.set('auth_time', '0');
      this.loginAuto();
    }
  }, {
    key: "loginAuto",
    value: function loginAuto() {
      this._login(function (res) {
        if (res.data.has_login) {
          $('body').append("<iframe id='auth_iframe' src='".concat(res.data.confirm_uri, "' style='display:none;'></iframe>"));
        } else {
          message.MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', function () {
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
          message.MessageBox.alert(msg, function () {
            var auth_url = $('#auth_url').val();
            var auth_id = store.get('auth_id') || '',
                auth_sec = store.get('auth_sec') || '';
            (0,ajax.ajax)({
              url: auth_url.replace('https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?', "".concat(config_config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
              type: 'GET',
              dataType: 'json'
            }).then(function (res) {
              if (!res.code) {
                message.Message.success('授权成功');

                if (res.auth_id && res.auth_sec) {
                  store.set('auth_id', res.auth_id);
                  store.set('auth_sec', res.auth_sec);
                }

                store.set('access_key', new URL(auth_url).searchParams.get('access_key'));
                store.set('auth_time', Date.now());
                $('#auth').val('1');
                config_config.auth = '1';
              } else {
                message.Message.warning('授权失败');
              }
            });
          });
        } else {
          message.MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', function () {
            location.href = 'https://passport.bilibili.com/login';
          });
        }
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this3 = this;

      if (!store.get('auth_id')) {
        message.MessageBox.alert('没有发现授权记录');
        return;
      }

      if (this.auth_clicked) {
        message.Message.miaow();
        return;
      }

      var _ref2 = [store.get('auth_id'), store.get('auth_sec')],
          auth_id = _ref2[0],
          auth_sec = _ref2[1];
      (0,ajax.ajax)({
        url: "".concat(config_config.base_api, "/auth/v2/?act=logout&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
        type: 'GET',
        dataType: 'json'
      }).then(function (res) {
        if (!res.code) {
          message.Message.success('取消成功');
          store.set('auth_id', '');
          store.set('auth_sec', '');
          store.set('auth_time', '0');
          store.set('access_key', '');
          $('#auth').val('0');
          config_config.auth = '0';
        } else {
          message.Message.warning('取消失败');
        }
      }).finally(function (_) {
        return _this3.auth_clicked = false;
      });
    }
  }, {
    key: "initAuth",
    value: function initAuth() {
      var _this4 = this;

      window.addEventListener('message', function (e) {
        if (typeof e.data !== 'string') return;

        if (e.data.split(':')[0] === 'bilibili-parse-login-credentials') {
          $('iframe#auth_iframe').remove();
          var url = e.data.split(': ')[1];
          var _ref3 = [store.get('auth_id'), store.get('auth_sec')],
              auth_id = _ref3[0],
              auth_sec = _ref3[1];
          (0,ajax.ajax)({
            url: url.replace('https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?', "".concat(config_config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
            type: 'GET',
            dataType: 'json'
          }).then(function (res) {
            if (!res.code) {
              message.Message.success('授权成功');

              if (res.auth_id && res.auth_sec) {
                store.set('auth_id', res.auth_id);
                store.set('auth_sec', res.auth_sec);
              }

              store.set('access_key', new URL(url).searchParams.get('access_key'));
              store.set('auth_time', Date.now());
              $('#auth').val('1');
              config_config.auth = '1';
            } else {
              message.Message.warning('授权失败');
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
;// CONCATENATED MODULE: ./src/js/main.js
function main_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function main_createClass(Constructor, protoProps, staticProps) { if (protoProps) main_defineProperties(Constructor.prototype, protoProps); if (staticProps) main_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
















var Main = /*#__PURE__*/function () {
  function Main() {
    main_classCallCheck(this, Main);

    /* global JS_VERSION GIT_HASH */
    console.log('\n'.concat(" %c bilibili-parse-download.user.js v", "2.3.6", " ").concat("fd5f1d4", " %c https://github.com/injahow/user.js ", '\n', '\n'), 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
  }

  main_createClass(Main, [{
    key: "set_toolbar",
    value: function set_toolbar() {
      if (!!$('#arc_toolbar_report')[0]) {
        $('#arc_toolbar_report').after(arc_toolbar);
      } else if (!!$('#toolbar_module')[0]) {
        // ! fix
        $('#toolbar_module').after(toolbar);
      } else if (!!$('div.video-toolbar')[0]) {
        $('div.video-toolbar').after(video_toolbar);
      }
    }
  }, {
    key: "run",
    value: function run() {
      this.set_toolbar();
      var root_div = document.createElement('div');
      root_div.id = 'bp_root';
      document.body.append(root_div); // initConfig

      initConfig("#".concat(root_div.id));
      (0,message.initMessage)("#".concat(root_div.id));
      user.lazyInit();
      auth.initAuth();
      auth.checkLoginStatus();
      check.refresh();
      $("#".concat(root_div.id)).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">'); // for dom changed

      $("#".concat(root_div.id)).append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
      $("#".concat(root_div.id)).append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>');
      var api_url, api_url_temp;
      var e = {
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
          ui_scroll.scroll.hide();
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
              message.MessageBox.confirm('仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？', function () {
                Download.download_all();
              });
            }
          } else {
            message.MessageBox.confirm('批量下载仅支持授权用户使用RPC接口下载，是否进行授权？', function () {
              auth.login();
            });
          }
        },
        video_download: function video_download() {
          var type = config_config.download_type;

          if (type === 'web') {
            $('#video_url')[0].click();
          } else if (type === 'a') {
            var _ref = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
                video_url = _ref[0],
                video_url_2 = _ref[1];
            var msg = '建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>' + "<a href=\"".concat(video_url, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u89C6\u9891\u5730\u5740&lt</a><br/><br/>") + (config_config.format === 'dash' ? "<a href=\"".concat(video_url_2, "\" target=\"_blank\" style=\"text-decoration:underline;\">&gt\u97F3\u9891\u5730\u5740&lt</a>") : '');
            message.MessageBox.alert(msg);
          } else if (type === 'aria') {
            var _ref2 = [$('#video_url').attr('href'), $('#video_url_2').attr('href')],
                _video_url = _ref2[0],
                _video_url_ = _ref2[1];
            var video_title = video.base().filename();
            var file_name, file_name_2;
            file_name = video_title + Download.url_format(_video_url);
            file_name_2 = video_title + '_audio.mp4';
            var aria2_header = "--header \"User-Agent: ".concat(window.navigator.userAgent, "\" --header \"Referer: ").concat(window.location.href, "\"");
            var url_max_connection = 1,
                server_max_connection = 5;

            switch (config_config.aria2c_connection_level) {
              case "min":
                url_max_connection = 1;
                server_max_connection = 5;
                break;

              case "mid":
                url_max_connection = 16;
                server_max_connection = 8;
                break;

              case "max":
                url_max_connection = 32;
                server_max_connection = 16;
                break;
            }

            var aria2c_max_concurrent_downloads = "--max-concurrent-downloads ".concat(url_max_connection);
            var aria2c_max_connection_per_server = "--max-connection-per-server ".concat(server_max_connection);
            var code = "aria2c \"".concat(_video_url, "\" --out \"").concat(file_name, "\" ").concat(aria2_header, " ").concat(aria2c_max_concurrent_downloads, " ").concat(aria2c_max_connection_per_server),
                code_2 = "aria2c \"".concat(_video_url_, "\" --out \"").concat(file_name_2, "\" ").concat(aria2_header, " ").concat(aria2c_max_concurrent_downloads, " ").concat(aria2c_max_connection_per_server);

            var _msg = '点击文本框即可复制下载命令！<br/><br/>' + "\u89C6\u9891\uFF1A<br/><input id=\"aria2_code\" value='".concat(code, "' onclick=\"bp_clip_btn('aria2_code')\" style=\"width:100%;\"></br></br>") + (config_config.format === 'dash' ? "\u97F3\u9891\uFF1A<br/><input id=\"aria2_code_2\" value='".concat(code_2, "' onclick=\"bp_clip_btn('aria2_code_2')\" style=\"width:100%;\"><br/><br/>") + "\u5168\u90E8\uFF1A<br/><textarea id=\"aria2_code_all\" onclick=\"bp_clip_btn('aria2_code_all')\" style=\"min-width:100%;max-width:100%;min-height:100px;max-height:100px;\">".concat(code, "\n").concat(code_2, "</textarea>") : '');

            !window.bp_clip_btn && (window.bp_clip_btn = function (id) {
              $("#".concat(id)).select();

              if (document.execCommand('copy')) {
                message.Message.success('复制成功');
              } else {
                message.Message.warning('复制失败');
              }
            });
            message.MessageBox.alert(_msg);
          } else {
            var url = $('#video_url').attr('href');
            var filename = video.base().filename();
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
            var filename = video.base().filename();
            Download.download(url, filename, type);
          }
        },
        bilibili_parse: function bilibili_parse() {
          user.lazyInit(true); // init

          var vb = video.base();
          var _ref3 = [vb.type, vb.aid(), vb.p(), vb.cid(), vb.epid()],
              type = _ref3[0],
              aid = _ref3[1],
              p = _ref3[2],
              cid = _ref3[3],
              epid = _ref3[4];

          var _video$get_quality = video.get_quality(),
              q = _video$get_quality.q;

          api_url = "".concat(config_config.base_api, "?av=").concat(aid, "&p=").concat(p, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(config_config.format, "&otype=json&_host=").concat(config_config.host_key, "&_req=").concat(config_config.request_type, "&_q=").concat(config_config.video_quality);
          var _ref4 = [store.get('auth_id'), store.get('auth_sec')],
              auth_id = _ref4[0],
              auth_sec = _ref4[1];

          if (config_config.auth === '1' && auth_id && auth_sec) {
            api_url += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec);
          }

          if (api_url === api_url_temp && config_config.request_type !== 'local') {
            message.Message.miaow();
            var url = $('#video_url').attr('href');
            var url_2 = $('#video_url_2').attr('href');

            if (url && url !== '#') {
              $('#video_download').show();
              config_config.format === 'dash' && $('#video_download_2').show();

              if (user.needReplace() || vb.is_limited() || config_config.replace_force === '1') {
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
          message.Message.info('开始请求');
          api.get_url(function (res) {
            if (res && !res.code) {
              message.Message.success('请求成功');
              res.times && message.Message.info("\u5269\u4F59\u8BF7\u6C42\u6B21\u6570\uFF1A".concat(res.times));

              var _url, _url_;

              if (res.url) {
                _url = res.url.replace('http://', 'https://');
                _url_ = '#';
              } else if (res.video && res.audio) {
                _url = res.video.replace('http://', 'https://');
                _url_ = res.audio.replace('http://', 'https://');
              } else {
                message.Message.warning('数据错误');
                return;
              }

              $('#video_url').attr('href', _url);
              $('#video_download').show();

              if (_url_ !== '#') {
                $('#video_url_2').attr('href', _url_);
                $('#video_download_2').show();
              }

              if (user.needReplace() || vb.is_limited() || config_config.replace_force === '1') {
                player.replace_player(_url, _url_);
              }

              if (config_config.auto_download === '1') {
                $('#video_download').click();
              }
            }
          });
        }
      }; // api & click

      window.bpd = e;
      $('body').on('click', '#setting_btn', e.setting_btn);
      $('body').on('click', '#download_danmaku', e.download_danmaku);
      $('body').on('click', '#download_subtitle', e.download_subtitle);
      $('body').on('click', '#video_download_all', e.video_download_all);
      $('body').on('click', '#video_download', e.video_download);
      $('body').on('click', '#video_download_2', e.video_download_2);
      $('body').on('click', '#bilibili_parse', e.bilibili_parse); // part of check

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
      var bili_video_tag = player.bili_video_tag();
      !!$(bili_video_tag)[0] && ($(bili_video_tag)[0].onended = function () {
        check.refresh();
      }); // 监听q

      $('body').on('click', 'li.bui-select-item', function () {
        check.refresh();
      });
      setInterval(function () {
        if (check.q !== video.get_quality().q) {
          check.refresh();
        } else if (video.type() === 'cheese') {
          // epid for cheese
          if (check.epid !== video.base().epid()) {
            check.refresh();
          }
        }
      }, 1000); // 监听aid

      $('body').on('click', '.rec-list', function () {
        check.refresh();
      });
      $('body').on('click', '.bilibili-player-ending-panel-box-videos', function () {
        check.refresh();
      }); // 定时检查 aid 和 cid

      setInterval(function () {
        var vb = video.base();

        if (check.aid !== vb.aid() || check.cid !== vb.cid()) {
          check.refresh();
        }
      }, 3000);
    }
  }]);

  return Main;
}();

/* harmony default export */ var main = (Main);
;// CONCATENATED MODULE: ./src/js/index.js


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

  setTimeout(function () {
    new main().run();
  }, 3000);
})();
}();
/******/ })()
;