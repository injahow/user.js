// ==UserScript==
// @name          bilibili视频下载
// @namespace     https://github.com/injahow
// @version       2.3.2
// @description   支持Web、RPC、Blob、Aria等下载方式；支持flv、dash、mp4视频格式；支持下载港区番剧；支持会员下载；支持换源播放，自动切换为高清视频源
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
// @compatible    chrome
// @compatible    firefox
// @grant         none
// ==/UserScript==
/* globals $ waitForKeyElements */
// @[ You can find all source codes in GitHub repo ]
(function() {
    "use strict";
    var __webpack_modules__ = {
        99: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                v0: function() {
                    return Message;
                },
                _p: function() {
                    return MessageBox;
                },
                N5: function() {
                    return initMessage;
                }
            });
            var ui_scroll = __webpack_require__(537), message = '<div class="message-bg"></div> <div id="message_box"> <div class="message-box-mark"></div> <div class="message-box-bg"> <span style="font-size:20px"><b>提示：</b></span> <div id="message_box_context" style="margin:2% 0">...</div><br/><br/> <div class="message-box-btn"> <button name="affirm">确定</button> <button name="cancel">取消</button> </div> </div> </div> <style>.message-bg{position:fixed;float:right;right:0;top:2%;z-index:30000}.message{margin-bottom:15px;padding:2% 2%;width:300px;display:flex;margin-top:-70px;opacity:0}.message-success{background-color:#dfd;border-left:6px solid #4caf50}.message-error{background-color:#fdd;border-left:6px solid #f44336}.message-info{background-color:#e7f3fe;border-left:6px solid #0c86de}.message-warning{background-color:#ffc;border-left:6px solid #ffeb3b}.message-context{font-size:21px;word-wrap:break-word;word-break:break-all}.message-context p{margin:0}#message_box{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:20000}.message-box-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:420px;z-index:20001}.message-box-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:20000}.message-box-btn{text-align:right}.message-box-btn button{margin:0 5px;width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}.message-box-btn button:hover{background:#59f}</style> ';
            function initMessage(el) {
                el && $(el)[0] ? $(el).append(message) : $("body").append(message);
            }
            function messageBox(ctx, type) {
                "confirm" === type ? $('div.message-box-btn button[name="cancel"]').show() : "alert" === type && $('div.message-box-btn button[name="cancel"]').hide(), 
                ctx.html ? $("div#message_box_context").html('<div style="font-size:18px">'.concat(ctx.html, "</div>")) : $("div#message_box_context").html('<div style="font-size:18px">╰(￣▽￣)╮</div>'), 
                ui_scroll.A.hide(), $("#message_box").show(), $("div#message_box").animate({
                    opacity: "1"
                }, 300), $('div.message-box-btn button[name="affirm"]')[0].onclick = function() {
                    $("div#message_box").hide(), $("div#message_box").css("opacity", 0), ui_scroll.A.show(), 
                    ctx.callback && ctx.callback.affirm && ctx.callback.affirm();
                }, $('div.message-box-btn button[name="cancel"]')[0].onclick = function() {
                    $("div#message_box").hide(), $("div#message_box").css("opacity", 0), ui_scroll.A.show(), 
                    ctx.callback && ctx.callback.cancel && ctx.callback.cancel();
                };
            }
            var id = 0;
            function message_message(html, type) {
                (function messageEnQueue(message, id) {
                    $("div.message-bg").append(message), $("div#message_".concat(id)).animate({
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
            var Message = {
                success: function success(html) {
                    return message_message(html, "success");
                },
                warning: function warning(html) {
                    return message_message(html, "warning");
                },
                error: function error(html) {
                    return message_message(html, "error");
                },
                info: function info(html) {
                    return message_message(html, "info");
                },
                miaow: function miaow(_) {
                    return message_message("(^・ω・^)~喵喵喵~", "info");
                }
            }, MessageBox = {
                alert: function alert(html, affirm) {
                    return messageBox({
                        html: html,
                        callback: {
                            affirm: affirm
                        }
                    }, "alert");
                },
                confirm: function confirm(html, affirm, cancel) {
                    return messageBox({
                        html: html,
                        callback: {
                            affirm: affirm,
                            cancel: cancel
                        }
                    }, "confirm");
                }
            };
        },
        537: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                A: function() {
                    return scroll;
                }
            });
            var scroll = {
                show: function show_scroll() {
                    $("div#bp_config").is(":hidden") && $("div#message_box").is(":hidden") && $("body").css("overflow", "auto");
                },
                hide: function hide_scroll() {
                    $("body").css("overflow", "hidden");
                }
            };
        },
        866: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                h: function() {
                    return ajax;
                },
                j: function() {
                    return _ajax;
                }
            });
            var _ui_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99);
            function ajax(obj) {
                return new Promise((function(resolve, reject) {
                    obj.success = function(res) {
                        res && res.code && _ui_message__WEBPACK_IMPORTED_MODULE_0__.v0.warning("".concat(res.message || "CODE:".concat(res.code))), 
                        resolve(res);
                    }, obj.error = function(err) {
                        _ui_message__WEBPACK_IMPORTED_MODULE_0__.v0.error("网络异常"), reject(err);
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
        },
        711: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                $c: function() {
                    return JSZip;
                },
                bc: function() {
                    return DPlayer;
                }
            });
            var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(866);
            function _typeof(obj) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _typeof(obj);
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
                            return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then((function(value) {
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
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }
            var RuntimeLib = function() {
                function RuntimeLib(config) {
                    _classCallCheck(this, RuntimeLib), this.config = config, this.moduleAsync, this.anyResolved = !1;
                }
                return _createClass(RuntimeLib, [ {
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
                                            (0, _ajax__WEBPACK_IMPORTED_MODULE_0__.j)({
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
                                            _this.anyResolved = !0, console.log("[Runtime Library] Downloaded from ".concat(url, " , length = ").concat(code.length)), 
                                            function runEval() {
                                                return eval(code);
                                            }.bind(window)(), resolve(getModule(window)), _context.next = 21;
                                            break;

                                          case 15:
                                            if (_context.prev = 15, _context.t0 = _context.catch(0), !_this.anyResolved) {
                                                _context.next = 19;
                                                break;
                                            }
                                            return _context.abrupt("return");

                                          case 19:
                                            errs.push({
                                                url: url,
                                                err: _context.t0
                                            }), 0 == --i && (console.error(errs), reject(errs));

                                          case 21:
                                          case "end":
                                            return _context.stop();
                                        }
                                    }), _callee, null, [ [ 0, 15 ] ]);
                                }))), 1e3 * i++);
                            }));
                        }));
                    }
                } ]), RuntimeLib;
            }(), cdn_map = {
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
            }, urls = function urls(_ref2) {
                var name = _ref2.name, ver = _ref2.ver, filename = _ref2.filename, cdn_keys = _ref2.cdn_keys;
                return (cdn_keys = cdn_keys ? cdn_keys.filter((function(key) {
                    return key in cdn_map;
                })) : Object.keys(cdn_map)).map((function(k) {
                    return cdn_map[k](name, ver, filename);
                }));
            }, JSZip, flvjs, DPlayer;
            new RuntimeLib({
                urls: urls({
                    name: "jszip",
                    ver: "3.10.0",
                    filename: "jszip.min.js"
                }),
                getModule: function getModule(window) {
                    return window.JSZip;
                }
            }).getModulePromise().then((function(module) {
                return JSZip = module;
            })), new RuntimeLib({
                urls: urls({
                    name: "flv.js",
                    ver: "1.6.2",
                    filename: "flv.min.js"
                }),
                getModule: function getModule(window) {
                    return window.flvjs;
                }
            }).getModulePromise().then((function(module) {
                return flvjs = module;
            })), new RuntimeLib({
                urls: urls({
                    name: "dplayer",
                    ver: "1.26.0",
                    filename: "DPlayer.min.js"
                }),
                getModule: function getModule(window) {
                    return window.DPlayer;
                }
            }).getModulePromise().then((function(module) {
                return DPlayer = module;
            }));
        }
    }, __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
        module.exports;
    }
    __webpack_require__.d = function(exports, definition) {
        for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        });
    }, __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    var __webpack_exports__ = {};
    !function() {
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        var Store = function() {
            function Store() {
                !function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, Store), this.prefix = "bp_";
            }
            return function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
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
        function user_defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        var user = new (function() {
            function User() {
                !function user_classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, User), this.is_login = !1, this.vip_status = 0, this.mid = "", this.uname = "", 
                this.has_init = !1, this.lazyInit();
            }
            return function user_createClass(Constructor, protoProps, staticProps) {
                return protoProps && user_defineProperties(Constructor.prototype, protoProps), staticProps && user_defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }(User, [ {
                key: "needReplace",
                value: function needReplace() {
                    return !this.is_login || !this.vip_status && video.base().need_vip();
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
        function type() {
            return location.pathname.match("/cheese/play/") ? "cheese" : location.pathname.match("/medialist/play/") ? "medialist" : window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.epInfo ? "bangumi" : window.__INITIAL_STATE__.videoData ? "video" : void 0 : "?";
        }
        var q_map = {
            "1080P 高码率": 112,
            "1080P 高清": 80,
            "720P 高清": 64,
            "480P 清晰": 32,
            "360P 流畅": 16,
            "自动": 64
        };
        var video = {
            type: type,
            base: function base() {
                var _type = type();
                if ("video" === _type) {
                    var state = window.__INITIAL_STATE__, main_title = (state.videoData && state.videoData.title || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                    return {
                        type: "video",
                        name: main_title,
                        total: function total() {
                            return state.videoData.pages.length || 1;
                        },
                        title: function title(_p) {
                            var p = _p || state.p || 1;
                            return (state.videoData.pages[p - 1].part || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        filename: function filename(_p) {
                            var p = _p || state.p || 1;
                            return (main_title + " P".concat(p, " （").concat(state.videoData.pages[p - 1].part || p, "）")).replace(/[\/\\:*?"<>|]+/g, "");
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
                            return "";
                        },
                        need_vip: function need_vip() {
                            return !1;
                        },
                        vip_need_pay: function vip_need_pay() {
                            return !1;
                        },
                        is_limited: function is_limited() {
                            return !1;
                        }
                    };
                }
                if ("medialist" === _type) {
                    var medialist = $("div.player-auxiliary-playlist-item"), _id = $("div.player-auxiliary-playlist-item.player-auxiliary-playlist-item-active").index(), _main_title = ($(".player-auxiliary-playlist-top .player-auxiliary-filter-title").html() || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                    return {
                        type: "video",
                        name: _main_title,
                        total: function total() {
                            return medialist.length;
                        },
                        title: function title(_p) {
                            var id = _p ? _p - 1 : _id, title = medialist.eq(id).find(".player-auxiliary-playlist-item-title").attr("title") || "unknown";
                            return title.replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        filename: function filename(_p) {
                            var id = _p ? _p - 1 : _id, title = medialist.eq(id).find(".player-auxiliary-playlist-item-title").attr("title") || "unknown";
                            return "".concat(_main_title, " P").concat(id + 1, " （").concat(title, "）").replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        aid: function aid(_p) {
                            var id = _p ? _p - 1 : _id;
                            return medialist.eq(id).attr("data-aid");
                        },
                        p: function p() {
                            return _id + 1;
                        },
                        cid: function cid(_p) {
                            var id = _p ? _p - 1 : _id;
                            return medialist.eq(id).attr("data-cid");
                        },
                        epid: function epid(_p) {
                            return "";
                        },
                        need_vip: function need_vip() {
                            return !1;
                        },
                        vip_need_pay: function vip_need_pay() {
                            return !1;
                        },
                        is_limited: function is_limited() {
                            return !1;
                        }
                    };
                }
                if ("bangumi" === _type) {
                    var _state = window.__INITIAL_STATE__, _main_title2 = (_state.mediaInfo.season_title || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                    return {
                        type: "bangumi",
                        name: _main_title2,
                        total: function total() {
                            return _state.epList.length;
                        },
                        title: function title(_p) {
                            var ep = _p ? _state.epList[_p - 1] : _state.epInfo;
                            return "".concat(ep.titleFormat, " ").concat(ep.longTitle).replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        filename: function filename(_p) {
                            if (_p) {
                                var ep = _state.epList[_p - 1];
                                return "".concat(_main_title2, "：").concat(ep.titleFormat, " ").concat(ep.longTitle).replace(/[\/\\:*?"<>|]+/g, "");
                            }
                            return (_state.h1Title || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
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
                            return "会员" === _state.epInfo.badge;
                        },
                        vip_need_pay: function vip_need_pay() {
                            return _state.epPayMent.vipNeedPay;
                        },
                        is_limited: function is_limited() {
                            return _state.userState.areaLimit;
                        }
                    };
                }
                if ("cheese" === _type) {
                    var epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || [ "", "" ])[1];
                    window.bp_episodes || (window.bp_episodes = [], api.get_season(epid));
                    var episodes = window.bp_episodes, _id2 = $("li.on.list-box-li").index(), _main_title3 = ($("div.season-info h1").html() || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                    return {
                        type: "cheese",
                        name: _main_title3,
                        total: function total() {
                            return episodes.length;
                        },
                        title: function title(_p) {
                            return (episodes[_p ? _p - 1 : _id2].title || "unknown").replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        filename: function filename(_p) {
                            var id = _p ? _p - 1 : _id2;
                            return "".concat(_main_title3, " P").concat(id + 1, " （").concat(episodes[id].title || "unknown", "）").replace(/[\/\\:*?"<>|]+/g, "");
                        },
                        aid: function aid(_p) {
                            return episodes[_p ? _p - 1 : _id2].aid;
                        },
                        p: function p() {
                            return _id2 + 1;
                        },
                        cid: function cid(_p) {
                            return episodes[_p ? _p - 1 : _id2].cid;
                        },
                        epid: function epid(_p) {
                            return episodes[_p ? _p - 1 : _id2].id;
                        },
                        need_vip: function need_vip() {
                            return !1;
                        },
                        vip_need_pay: function vip_need_pay() {
                            return !1;
                        },
                        is_limited: function is_limited() {
                            return !1;
                        }
                    };
                }
                return {
                    type: "?",
                    name: "none",
                    total: function total() {
                        return 0;
                    },
                    title: function title(_p) {
                        return "";
                    },
                    filename: function filename(_p) {
                        return "";
                    },
                    aid: function aid(_p) {
                        return "";
                    },
                    p: function p() {
                        return 1;
                    },
                    cid: function cid(_p) {
                        return "";
                    },
                    epid: function epid(_p) {
                        return "";
                    },
                    need_vip: function need_vip() {
                        return !1;
                    },
                    vip_need_pay: function vip_need_pay() {
                        return !1;
                    },
                    is_limited: function is_limited() {
                        return !1;
                    }
                };
            },
            get_quality: function get_quality() {
                var _q = 0, _q_max = 0;
                return $("li.bui-select-item")[0] && (_q_max = parseInt($("li.bui-select-item")[0].dataset.value)) ? _q = parseInt($("li.bui-select-item.bui-select-item-active").attr("data-value")) || (_q_max > 80 ? 80 : _q_max) : $("li.squirtle-select-item")[0] && (_q_max = parseInt($("li.squirtle-select-item")[0].dataset.value)) ? _q = parseInt($("li.squirtle-select-item.active").attr("data-value")) || (_q_max > 80 ? 80 : _q_max) : $("div.edu-player-quality-item")[0] ? (_q = q_map[$("div.edu-player-quality-item.active span").text() || "自动"] || 80, 
                _q_max = q_map[$("div.edu-player-quality-item span").text() || "自动"] || 80) : _q = _q_max = 80, 
                user.isVIP() || (_q = _q > 80 ? 80 : _q), {
                    q: _q,
                    q_max: _q_max
                };
            },
            get_quality_support: function get_quality_support() {
                var list, quality_list = [], vb = video.base();
                return "video" !== vb.type ? ((list = "cheese" === vb.type ? $("div.edu-player-quality-item span") : $(".squirtle-quality-text")).each((function() {
                    if ("自动" === $(this).text()) return !1;
                    quality_list.push(q_map[$(this).text()]);
                })), quality_list.length ? quality_list : [ "80", "64", "32", "16" ]) : (list = $("li.bui-select-item")) && list.length ? (list.each((function() {
                    var q = "".concat($(this).attr("data-value"));
                    if ("0" === q) return !1;
                    quality_list.push(q);
                })), quality_list) : [ "80", "64", "32", "16" ];
            }
        }, ajax = __webpack_require__(866), runtime_lib = __webpack_require__(711);
        function request_danmaku(options, _cid) {
            _cid ? (0, ajax.h)({
                url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(_cid),
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
            })).catch((function(_) {
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
                window.bp_dplayer_2 = null, $("#bp_dplayer_2").remove()), $(function get_bili_player_id() {
                    return $("#bilibiliPlayer")[0] ? "#bilibiliPlayer" : $("#bilibili-player")[0] ? "#bilibili-player" : "cheese" === video.type() ? $('div.bpx-player[data-injector="nano"]')[0] ? 'div.bpx-player[data-injector="nano"]' : "#pay-mask" : void 0;
                }()).show();
            }
        }
        function danmaku_config() {
            var style = "" + '<style id="dplayer_danmaku_style">\n        .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {\n            animation-duration: '.concat(parseFloat(config_config.danmaku_speed), "s;\n            font-size: ").concat(parseInt(config_config.danmaku_fontsize), "px;\n        }\n        </style>");
            $("#dplayer_danmaku_style")[0] && $("#dplayer_danmaku_style").remove(), $("body").append(style);
        }
        var player = {
            bili_video_tag: bili_video_tag,
            recover_player: recover_player,
            replace_player: function replace_player(url, url_2) {
                recover_player();
                var bili_player_id, bili_video = $(bili_video_tag())[0];
                bili_video_stop(), bili_video && bili_video.addEventListener("play", bili_video_stop, !1), 
                $("#bilibiliPlayer")[0] ? (bili_player_id = "#bilibiliPlayer", $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor">'), 
                $(bili_player_id).hide()) : $("#bilibili-player")[0] ? (bili_player_id = "#bilibili-player", 
                $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor" style="width:100%;height:100%;"></div>'), 
                $(bili_player_id).hide()) : "cheese" === video.type() && ($('div.bpx-player[data-injector="nano"]')[0] ? ($("#pay-mask").hide(), 
                $("#bofqi").show(), bili_player_id = 'div.bpx-player[data-injector="nano"]', $(bili_player_id).before('<div id="bp_dplayer" style="width:100%;height:100%;"></div>'), 
                $(bili_player_id).hide()) : (bili_player_id = "#pay-mask", $(bili_player_id).html('<div id="bp_dplayer" style="width:100%;height:100%;"></div>'))), 
                $("#player_mask_module").hide(), api.get_subtitle_url(0, (function dplayer_init() {
                    var subtitle_url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    if (window.bp_dplayer = new runtime_lib.bc({
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
                        $("body").append('<div id="bp_dplayer_2" style="display:none;"></div>'), window.bp_dplayer_2 = new runtime_lib.bc({
                            container: $("#bp_dplayer_2")[0],
                            mutex: !1,
                            volume: 1,
                            autoplay: !0,
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
                    var vb = video.base();
                    this.aid = vb.aid(), this.cid = vb.cid(), this.epid = vb.epid(), this.q = video.get_quality().q, 
                    window.bp_episodes = null;
                }
            } ]), Check;
        }()), message = __webpack_require__(99), ui_scroll = __webpack_require__(537);
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
        function rpc_type() {
            return config_config.rpc_domain.match("https://") || config_config.rpc_domain.match(/localhost|127\.0\.0\.1/) ? "post" : "ariang";
        }
        var download_rpc_clicked = !1;
        function open_ariang(rpc) {
            var hash_tag = rpc ? "#!/settings/rpc/set/".concat(rpc.domain.replace("://", "/"), "/").concat(rpc.port, "/jsonrpc/").concat(window.btoa(rpc.token)) : "", url = config_config.ariang_host + hash_tag, a = document.createElement("a");
            a.setAttribute("target", "_blank"), a.setAttribute("onclick", "window.bp_aria2_window=window.open('".concat(url, "');")), 
            a.click();
        }
        var download_blob_clicked = !1, need_show_progress = !0;
        function download_blob(url, filename) {
            if (download_blob_clicked) return message.v0.miaow(), void (need_show_progress = !0);
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
                        need_show_progress && message._p.alert("文件大小：".concat(Math.floor(total / 1048576), "MB(").concat(total, "Byte)<br/>") + "已经下载：".concat(Math.floor(loaded / 1048576), "MB(").concat(loaded, "Byte)<br/>") + "当前进度：".concat(percent, "%<br/>下载中请勿操作浏览器！"), (function() {
                            need_show_progress = !1, message._p.alert("注意：刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。");
                        })), total === loaded && (message._p.alert("下载完成，请等待浏览器保存！"), download_blob_clicked = !1);
                    }({
                        total: tot,
                        loaded: loaded,
                        percent: Math.floor(100 * loaded / tot)
                    });
                }
            }, xhr.send(), download_blob_clicked = !0, message.v0.info("准备开始下载");
        }
        function _download_danmaku_ass(cid, title) {
            var return_type = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, callback = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            (0, ajax.h)({
                url: "https://api.bilibili.com/x/v1/dm/list.so?oid=".concat(cid),
                dataType: "text"
            }).then((function(result) {
                var result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ""));
                if (!result_dom || !result_dom.find("d")[0]) return "callback" === return_type && callback ? void callback() : void message.v0.warning("未发现弹幕");
                var danmaku_data = result_dom.find("d").map((function(i, el) {
                    var item = $(el), p = item.attr("p").split(","), type = 0;
                    return "4" === p[1] ? type = 2 : "5" === p[1] && (type = 1), [ {
                        time: parseFloat(p[0]),
                        type: type,
                        color: parseInt(p[3]),
                        text: item.text()
                    } ];
                })).get();
                danmaku_data.sort((function(a, b) {
                    return a.time - b.time;
                }));
                var _step3, dialogue = function dialogue(danmaku, scroll_id, fix_id) {
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
                }, content = [ "[Script Info]", "; Script generated by injahow/user.js", "; https://github.com/injahow/user.js", "Title: ".concat(title), "ScriptType: v4.00+", "PlayResX: ".concat(1920), "PlayResY: ".concat(1080), "Timer: 10.0000", "WrapStyle: 2", "ScaledBorderAndShadow: no", "", "[V4+ Styles]", "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding", "Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0", "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text" ], fix_id = 0, _iterator3 = _createForOfIteratorHelper(danmaku_data);
                try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                        var danmaku = _step3.value;
                        0 === danmaku.type ? 0 : fix_id++, content.push(dialogue(danmaku, 0, fix_id));
                    }
                } catch (err) {
                    _iterator3.e(err);
                } finally {
                    _iterator3.f();
                }
                var data = content.join("\n");
                if (null === return_type || "file" === return_type) {
                    var blob_url = URL.createObjectURL(new Blob([ data ], {
                        type: "text/ass"
                    })), a = document.createElement("a");
                    a.style.display = "none", a.href = blob_url, a.download = title + ".ass", a.click(), 
                    URL.revokeObjectURL(blob_url);
                } else "callback" === return_type && callback && callback(data);
            })).catch((function(_) {
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
                } else message.v0.warning("未发现字幕");
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
                if (0 === videos.length) return 0 === Object.keys(zip.files).length ? void message.v0.warning("未发现弹幕") : void zip.generateAsync({
                    type: "blob"
                }).then((function(data) {
                    return download_blob_zip(data, video.base().name + "_ass");
                }));
                var videos_pop = videos.pop();
                _download_danmaku_ass(videos_pop.cid, videos_pop.filename, "callback", (function(data) {
                    data && zip.file(videos_pop.filename + ".ass", data), download_danmaku_ass_zip(videos, zip);
                }));
            }
        }
        function download_subtitle_vtt_zip(videos, zip) {
            if (videos) {
                if (0 === videos.length) return 0 === Object.keys(zip.files).length ? void message.v0.warning("未发现字幕") : void zip.generateAsync({
                    type: "blob"
                }).then((function(data) {
                    return download_blob_zip(data, video.base().name + "_vtt");
                }));
                var videos_pop = videos.pop();
                api.get_subtitle_data(videos_pop.p, (function(data) {
                    data && zip.file(videos_pop.filename + ".vtt", data), download_subtitle_vtt_zip(videos, zip);
                }));
            }
        }
        function format(url) {
            return url.match(".flv") ? ".flv" : url.match(".m4s") ? "_video.mp4" : (url.match(".mp4"), 
            ".mp4");
        }
        var Download = {
            url_format: format,
            download: function download(url, name, type) {
                var filename = (name = name.replace(/[\/\\*|]+/g, "-").replace(/:/g, "：").replace(/\?/g, "？").replace(/"/g, "'").replace(/</g, "《").replace(/>/g, "》")) + format(url);
                "blob" === type ? download_blob(url, filename) : "rpc" === type && function download_rpc(url, filename) {
                    var type = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "post";
                    if (download_rpc_clicked) message.v0.miaow(); else {
                        download_rpc_clicked = !0;
                        var rpc = {
                            domain: config_config.rpc_domain,
                            port: config_config.rpc_port,
                            token: config_config.rpc_token,
                            dir: config_config.rpc_dir
                        }, json_rpc = {
                            id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
                            jsonrpc: "2.0",
                            method: "aria2.addUri",
                            params: [ "token:".concat(rpc.token), [ url ], {
                                dir: rpc.dir,
                                out: filename,
                                header: [ "User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href) ]
                            } ]
                        };
                        if (message.v0.info("发送RPC下载请求"), "post" === type) (0, ajax.h)({
                            url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
                            type: "POST",
                            dataType: "json",
                            data: JSON.stringify(json_rpc)
                        }).then((function(res) {
                            res.result ? message.v0.success("RPC请求成功") : message.v0.warning("请检查RPC参数");
                        })).catch((function(_) {
                            message.v0.error("请检查RPC服务配置");
                        })).finally((function(_) {
                            return download_rpc_clicked = !1;
                        })); else if ("ariang" === type) {
                            var bp_aria2_window = window.bp_aria2_window, time = 100;
                            bp_aria2_window && !bp_aria2_window.closed || (open_ariang(), time = 3e3), setTimeout((function() {
                                var bp_aria2_window = window.bp_aria2_window, aria2_header = "header=User-Agent:".concat(window.navigator.userAgent, "&header=Referer:").concat(window.location.href), task_hash = "#!/new/task?url=".concat(window.btoa(url), "&out=").concat(encodeURIComponent(filename), "&").concat(aria2_header);
                                bp_aria2_window && !bp_aria2_window.closed ? (bp_aria2_window.location.href = config_config.ariang_host + task_hash, 
                                message.v0.success("RPC请求发送成功")) : message.v0.warning("AriaNG页面未打开"), download_rpc_clicked = !1;
                            }), time);
                        }
                    }
                }(url, filename, rpc_type());
            },
            download_all: function download_all() {
                var vb = video.base(), _ref = [ video.get_quality().q, vb.total() ], q = _ref[0], total = _ref[1];
                $("body").on("click", 'input[name="option_video"]', (function() {
                    $(this).is(":checked") ? $(this).parent().css("color", "rgba(0,0,0,1)") : $(this).parent().css("color", "rgba(0,0,0,0.5)");
                }));
                for (var video_html = "", i = 0; i < total; i++) video_html += "" + '<label for="option_'.concat(i, '"><div style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="option_').concat(i, '" name="option_video" value="').concat(i, '">\n                P').concat(i + 1, " ").concat(vb.title(i + 1), "\n            </div></label>");
                var all_checked = !1;
                $("body").on("click", "button#checkbox_btn", (function() {
                    all_checked ? (all_checked = !1, $('input[name="option_video"]').prop("checked", all_checked), 
                    $('input[name="option_video"]').parent().css("color", "rgba(0,0,0,0.5)")) : (all_checked = !0, 
                    $('input[name="option_video"]').prop("checked", all_checked), $('input[name="option_video"]').parent().css("color", "rgb(0,0,0)"));
                }));
                var _step, option_support_html = "", _iterator = _createForOfIteratorHelper(video.get_quality_support());
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
                var msg = "" + '<div style="margin:2% 0;">\n            <label>视频格式:</label>\n            <select id="dl_format">\n                <option value="flv" selected>FLV</option>\n                <option value="mp4">MP4</option>\n            </select>\n            &nbsp;&nbsp;仅Video支持MP4\n        </div>\n        <div style="margin:2% 0;">\n            <label>视频质量:</label>\n            <select id="dl_quality">\n                '.concat(option_support_html, '\n            </select>\n        </div>\n        <div style="margin:2% 0;">\n            <label>下载选择:</label>\n            <label style="color:rgba(0,0,0,1);">\n                <input type="checkbox" id="dl_video" name="dl_option" checked="checked">\n                <label for="dl_video" >视频</label>\n            </label>\n            <label style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="dl_subtitle" name="dl_option">\n                <label for="dl_subtitle">字幕</label>\n            </label>\n            <label style="color:rgba(0,0,0,0.5);">\n                <input type="checkbox" id="dl_danmaku" name="dl_option">\n                <label for="dl_danmaku">弹幕</label>\n            </label>\n        </div>\n        <b>\n            <span style="color:red;">为避免请求被拦截，设置了延时且不支持下载无法播放的视频；请勿频繁下载过多视频，可能触发风控导致不可再下载！</span>\n        </b><br />\n        <div style="height:220px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);">\n            ').concat(video_html, "\n        </div>\n        <div>").concat("medialist" === video.type() ? "不支持多页视频，若需要请到视频原播放页面下载" : "", '</div>\n        <div style="margin:2% 0;">\n            <button id="checkbox_btn">全选</button>\n        </div>');
                function download_videos(videos, i, video_urls) {
                    if (videos.length) if (i < videos.length) {
                        var _video = videos[i], _msg = "第".concat(i + 1, "（").concat(i + 1, "/").concat(videos.length, "）个视频");
                        message._p.alert("".concat(_msg, "：获取中...")), setTimeout((function() {
                            api.get_urls(_video.p, _video.q, _video.format, (function success(res) {
                                if (!res.code) {
                                    message.v0.success("请求成功" + (res.times ? "<br/>今日剩余请求次数".concat(res.times) : "")), 
                                    message._p.alert("".concat(_msg, "：获取成功！"));
                                    var _ref4 = [ res.url, format(res.url), rpc_type() ], url = _ref4[0], video_format = _ref4[1], type = _ref4[2];
                                    "post" === type ? (video_urls.push({
                                        url: url,
                                        filename: _video.filename + video_format
                                    }), video_urls.length > 3 && (download_rpc_all(video_urls), video_urls.length = 0)) : "ariang" === type && function download_rpc_ariang_one(video) {
                                        var bp_aria2_window = window.bp_aria2_window, time = 100;
                                        bp_aria2_window && !bp_aria2_window.closed || (open_ariang(), time = 3e3);
                                        setTimeout((function() {
                                            var bp_aria2_window = window.bp_aria2_window, aria2_header = "header=User-Agent:".concat(window.navigator.userAgent, "&header=Referer:").concat(window.location.href);
                                            if (bp_aria2_window && !bp_aria2_window.closed) {
                                                var task_hash = "#!/new/task?url=".concat(window.btoa(video.url), "&out=").concat(encodeURIComponent(video.filename), "&").concat(aria2_header);
                                                bp_aria2_window.location.href = config_config.ariang_host + task_hash, message.v0.success("RPC请求成功");
                                            } else message.v0.warning("请检查RPC参数");
                                        }), time);
                                    }({
                                        url: url,
                                        filename: _video.filename + video_format
                                    });
                                }
                                setTimeout((function() {
                                    download_videos(videos, ++i, video_urls);
                                }), 3e3);
                            }), (function error() {
                                download_videos(videos, ++i, video_urls);
                            }));
                        }), 3e3);
                    } else message._p.alert("视频地址请求完成！"), "post" === rpc_type() && video_urls.length > 0 && (download_rpc_all(video_urls), 
                    video_urls.length = 0);
                }
                function download_rpc_all(video_urls) {
                    var _step2, rpc = {
                        domain: config_config.rpc_domain,
                        port: config_config.rpc_port,
                        token: config_config.rpc_token,
                        dir: config_config.rpc_dir
                    }, json_rpc = [], _iterator2 = _createForOfIteratorHelper(video_urls);
                    try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                            var _video2 = _step2.value;
                            json_rpc.push({
                                id: window.btoa("BParse_".concat(Date.now(), "_").concat(Math.random())),
                                jsonrpc: "2.0",
                                method: "aria2.addUri",
                                params: [ "token:".concat(rpc.token), [ _video2.url ], {
                                    dir: rpc.dir,
                                    out: _video2.filename,
                                    header: [ "User-Agent: ".concat(window.navigator.userAgent), "Referer: ".concat(window.location.href) ]
                                } ]
                            });
                        }
                    } catch (err) {
                        _iterator2.e(err);
                    } finally {
                        _iterator2.f();
                    }
                    message.v0.info("发送RPC下载请求"), (0, ajax.h)({
                        url: "".concat(rpc.domain, ":").concat(rpc.port, "/jsonrpc"),
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify(json_rpc)
                    }).then((function(res) {
                        res.length === json_rpc.length ? message.v0.success("RPC请求成功") : message.v0.warning("请检查RPC参数");
                    })).catch((function(_) {
                        message.v0.error("请检查RPC服务配置");
                    }));
                }
                message._p.confirm(msg, (function() {
                    for (var dl_quality = $("#dl_quality").val() || q, _ref2 = [ $("#dl_video").is(":checked"), $("#dl_subtitle").is(":checked"), $("#dl_danmaku").is(":checked") ], dl_video = _ref2[0], dl_subtitle = _ref2[1], dl_danmaku = _ref2[2], videos = [], _i = 0; _i < total; _i++) if ($("input#option_".concat(_i)).is(":checked")) {
                        var p = _i + 1, _ref3 = [ vb.cid(p), vb.filename(p) ], cid = _ref3[0], filename = _ref3[1], _format = $("#dl_format").val();
                        videos.push({
                            cid: cid,
                            p: p,
                            q: dl_quality,
                            format: _format,
                            filename: filename
                        });
                    }
                    dl_video && download_videos(videos, 0, []), dl_subtitle && (1 === videos.length ? download_subtitle_vtt(videos[0].p, videos[0].filename) : download_subtitle_vtt_zip([].concat(videos), new runtime_lib.$c)), 
                    dl_danmaku && (1 === videos.length ? download_danmaku_ass(videos[0].cid, videos[0].filename) : download_danmaku_ass_zip([].concat(videos), new runtime_lib.$c));
                })), $("body").on("click", 'input[name="dl_option"]', (function() {
                    $(this).is(":checked") ? $(this).parent().css("color", "rgba(0,0,0,1)") : $(this).parent().css("color", "rgba(0,0,0,0.5)");
                })), $("#dl_quality").val(q > 120 ? 80 : q);
            },
            download_danmaku_ass: download_danmaku_ass,
            download_subtitle_vtt: download_subtitle_vtt,
            open_ariang: open_ariang
        };
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
                }(this, Auth), this.auth_clicked = !1;
            }
            return function auth_createClass(Constructor, protoProps, staticProps) {
                return protoProps && auth_defineProperties(Constructor.prototype, protoProps), staticProps && auth_defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }(Auth, [ {
                key: "checkLoginStatus",
                value: function checkLoginStatus() {
                    var _this = this, _ref = [ store.get("auth_id"), store.get("auth_sec"), store.get("access_key"), store.get("auth_time") || "0" ], auth_id = _ref[0], auth_sec = _ref[1], access_key = _ref[2], auth_time = _ref[3];
                    access_key && (user.is_login && (config_config.base_api !== store.get("pre_base_api") || Date.now() - parseInt(auth_time) > 864e5) && (0, 
                    ajax.h)({
                        url: "https://api.bilibili.com/x/space/myinfo?access_key=".concat(access_key),
                        type: "GET",
                        dataType: "json"
                    }).then((function(res) {
                        res.code ? message._p.alert("授权已过期，准备重新授权", (function() {
                            _this.reLogin();
                        })) : (store.set("auth_time", Date.now()), (0, ajax.h)({
                            url: "".concat(config_config.base_api, "/auth/v2/?act=check&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&access_key=").concat(access_key),
                            type: "GET",
                            dataType: "json"
                        }).then((function(res) {
                            res.code && message._p.alert("检查失败，准备重新授权", (function() {
                                _this.reLogin();
                            }));
                        })));
                    })), store.set("pre_base_api", config_config.base_api));
                }
            }, {
                key: "_login",
                value: function _login(resolve) {
                    var _this2 = this;
                    this.auth_clicked ? message.v0.miaow() : (this.auth_clicked = !0, (0, ajax.h)({
                        url: "https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=https%3A%2F%2Fwww.mcbbs.net%2Ftemplate%2Fmcbbs%2Fimage%2Fspecial_photo_bg.png&sign=04224646d1fea004e79606d3b038c84a",
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "GET",
                        dataType: "json"
                    }).then(resolve).finally((function(_) {
                        return _this2.auth_clicked = !1;
                    })));
                }
            }, {
                key: "login",
                value: function login() {
                    var auto = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "1", do_login = "1" === auto ? this.loginAuto.bind(this) : this.loginManual.bind(this);
                    store.get("auth_id") ? message._p.confirm("发现授权记录，是否重新授权？", do_login) : do_login();
                }
            }, {
                key: "reLogin",
                value: function reLogin() {
                    store.set("auth_id", ""), store.set("auth_sec", ""), store.set("access_key", ""), 
                    store.set("auth_time", "0"), this.loginAuto();
                }
            }, {
                key: "loginAuto",
                value: function loginAuto() {
                    this._login((function(res) {
                        res.data.has_login ? $("body").append("<iframe id='auth_iframe' src='".concat(res.data.confirm_uri, "' style='display:none;'></iframe>")) : message._p.confirm("必须登录B站才能正常授权，是否登陆？", (function() {
                            location.href = "https://passport.bilibili.com/login";
                        }));
                    }));
                }
            }, {
                key: "loginManual",
                value: function loginManual() {
                    this._login((function(res) {
                        if (res.data.has_login) {
                            var msg = "" + "请点击<b><a href='".concat(res.data.confirm_uri, "' target='_blank'>授权地址</a></b>\n                    打开一个新窗口，正常情况新窗口应该显示一个图片，请将该窗口地址栏的URL链接复制到当前文本框中<br/>\n                    <input id='auth_url' style='width:100%;' type='text' autocomplete='off'><br>然后点击确定即可");
                            message._p.alert(msg, (function() {
                                var auth_url = $("#auth_url").val(), auth_id = store.get("auth_id") || "", auth_sec = store.get("auth_sec") || "";
                                (0, ajax.h)({
                                    url: auth_url.replace("https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?", "".concat(config_config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
                                    type: "GET",
                                    dataType: "json"
                                }).then((function(res) {
                                    res.code ? message.v0.warning("授权失败") : (message.v0.success("授权成功"), res.auth_id && res.auth_sec && (store.set("auth_id", res.auth_id), 
                                    store.set("auth_sec", res.auth_sec)), store.set("access_key", new URL(auth_url).searchParams.get("access_key")), 
                                    store.set("auth_time", Date.now()), $("#auth").val("1"), config_config.auth = "1");
                                }));
                            }));
                        } else message._p.confirm("必须登录B站才能正常授权，是否登陆？", (function() {
                            location.href = "https://passport.bilibili.com/login";
                        }));
                    }));
                }
            }, {
                key: "logout",
                value: function logout() {
                    var _this3 = this;
                    if (store.get("auth_id")) if (this.auth_clicked) message.v0.miaow(); else {
                        var _ref2 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref2[0], auth_sec = _ref2[1];
                        (0, ajax.h)({
                            url: "".concat(config_config.base_api, "/auth/v2/?act=logout&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec),
                            type: "GET",
                            dataType: "json"
                        }).then((function(res) {
                            res.code ? message.v0.warning("取消失败") : (message.v0.success("取消成功"), store.set("auth_id", ""), 
                            store.set("auth_sec", ""), store.set("auth_time", "0"), store.set("access_key", ""), 
                            $("#auth").val("0"), config_config.auth = "0");
                        })).finally((function(_) {
                            return _this3.auth_clicked = !1;
                        }));
                    } else message._p.alert("没有发现授权记录");
                }
            }, {
                key: "initAuth",
                value: function initAuth() {
                    var _this4 = this;
                    window.addEventListener("message", (function(e) {
                        if ("string" == typeof e.data && "bilibili-parse-login-credentials" === e.data.split(":")[0]) {
                            $("iframe#auth_iframe").remove();
                            var url = e.data.split(": ")[1], _ref3 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref3[0], auth_sec = _ref3[1];
                            (0, ajax.h)({
                                url: url.replace("https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?", "".concat(config_config.base_api, "/auth/v2/?act=login&auth_id=").concat(auth_id, "&auth_sec=").concat(auth_sec, "&")),
                                type: "GET",
                                dataType: "json"
                            }).then((function(res) {
                                res.code ? message.v0.warning("授权失败") : (message.v0.success("授权成功"), res.auth_id && res.auth_sec && (store.set("auth_id", res.auth_id), 
                                store.set("auth_sec", res.auth_sec)), store.set("access_key", new URL(url).searchParams.get("access_key")), 
                                store.set("auth_time", Date.now()), $("#auth").val("1"), config_config.auth = "1");
                            })).finally((function(_) {
                                return _this4.auth_clicked = !1;
                            }));
                        }
                    }));
                }
            } ]), Auth;
        }(), auth = new Auth, config = '<div id="bp_config"> <div class="config-mark"></div> <div class="config-bg"> <span style="font-size:20px"> <b>bilibili视频下载 参数设置</b> <b> <a href="javascript:;" id="reset_config"> [重置] </a> <a style="text-decoration:underline" href="javascript:;" id="show_help">&lt;通知/帮助&gt;</a> </b> </span> <div style="margin:2% 0"> <label>请求地址：</label> <input id="base_api" style="width:30%"/>&nbsp;&nbsp;&nbsp;&nbsp; <label>请求方式：</label> <select id="request_type"> <option value="auto">自动判断</option> <option value="local">本地请求</option> <option value="online">远程请求</option> </select><br/> <small>注意：普通使用请勿修改；默认使用混合请求</small> </div> <div style="margin:2% 0"> <label>视频格式：</label> <select id="format"> <option value="flv">FLV</option> <option value="dash">DASH</option> <option value="mp4">MP4</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>切换CDN：</label> <select id="host_key"> {{host_key_options}} </select><br/> <small>注意：仅Video支持MP4；建议特殊地区或网络受限时切换（自行选择合适线路）</small> </div> <div style="margin:2% 0"> <label>下载方式：</label> <select id="download_type"> <option value="a">URL链接</option> <option value="web">Web浏览器</option> <option value="blob">Blob请求</option> <option value="rpc">RPC接口</option> <option value="aria">Aria命令</option> </select>&nbsp;&nbsp;&nbsp;&nbsp; <label>AriaNg地址：</label> <input id="ariang_host" style="width:30%"/><br/> <small>提示：前两种方式不会设置文件名；非HTTPS或非本地的RPC域名使用AriaNg下载</small> </div> <div style="margin:2% 0"> <label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br/> <input id="rpc_domain" style="width:25%"/> : <input id="rpc_port" style="width:10%"/> | <input id="rpc_token" placeholder="没有密钥不用填" style="width:15%"/> | <input id="rpc_dir" placeholder="留空使用默认目录" style="width:20%"/><br/> <small>注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small> </div> <div style="margin:2% 0"> <label>强制换源：</label> <select id="replace_force"> <option value="0">关闭</option> <option value="1">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕速度：</label> <input id="danmaku_speed" style="width:5%"/> s &nbsp;&nbsp;&nbsp;&nbsp; <label>弹幕字号：</label> <input id="danmaku_fontsize" style="width:5%"/> px<br/> <small>说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small> </div> <div style="margin:2% 0"> <label>自动下载：</label> <select id="auto_download"> <option value="0">关闭</option> <option value="1">开启</option> </select> &nbsp;&nbsp;&nbsp;&nbsp; <label>视频质量：</label> <select id="video_quality"> {{video_quality_options}} </select><br/> <small>说明：请求地址成功后将自动点击下载视频按钮</small> </div> <div style="margin:2% 0"> <label>授权状态：</label> <select id="auth" disabled="disabled"> <option value="0">未授权</option> <option value="1">已授权</option> </select> <a class="setting-context" href="javascript:;" id="show_login">账号授权</a> <a class="setting-context" href="javascript:;" id="show_logout">取消授权</a> <a class="setting-context" href="javascript:;" id="show_login_2">手动授权</a> <a class="setting-context" href="javascript:;" id="show_login_help">这是什么？</a> </div> <br/> <div style="text-align:right"> <button class="setting-button" id="save_config">确定</button> </div> </div> <style>#bp_config{opacity:0;display:none;position:fixed;inset:0px;top:0;left:0;width:100%;height:100%;z-index:10000}#bp_config .config-bg{position:absolute;background:#fff;border-radius:10px;padding:20px;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;z-index:10001}#bp_config .config-mark{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:10000}#bp_config .setting-button{width:120px;height:40px;border-width:0;border-radius:3px;background:#1e90ff;cursor:pointer;outline:0;color:#fff;font-size:17px}#bp_config .setting-button:hover{background:#59f}#bp_config .setting-context{margin:0 1%;color:#00f}#bp_config .setting-context:hover{color:red}</style> </div> ', config_config = {
            base_api: "https://api.injahow.cn/bparse/",
            request_type: "auto",
            format: "flv",
            host_key: "0",
            replace_force: "0",
            auth: "0",
            download_type: "web",
            rpc_domain: "http://localhost",
            rpc_port: "16800",
            rpc_token: "",
            rpc_dir: "D:/",
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
                $("#video_url_2").attr("href", "#")), config_config.rpc_domain !== old_config.rpc_domain && (config_config.rpc_domain.match("https://") || config_config.rpc_domain.match(/(localhost|127\.0\.0\.1)/) || message._p.alert("检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！", (function() {
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
                $("#bp_config").hide(), $("#bp_config").css("opacity", 0), ui_scroll.A.show();
            },
            reset_config: function reset_config() {
                for (var key in default_config) "auth" !== key && (config_config[key] = default_config[key], 
                $("#".concat(key)).val(default_config[key]));
            },
            show_help: function show_help() {
                help_clicked ? message.v0.miaow() : (help_clicked = !0, (0, ajax.h)({
                    url: "".concat(config_config.base_api, "/auth/v2/?act=help"),
                    dataType: "text"
                }).then((function(res) {
                    res ? message._p.alert(res) : message.v0.warning("获取失败");
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
                message._p.confirm("进行授权之后将能在远程请求时享有用户账号原有的权益，例如能够请求用户已经付费或承包的番剧，是否需要授权？", (function() {
                    auth.login();
                }));
            }
        };
        function api_createForOfIteratorHelper(o, allowArrayLike) {
            var it = "undefined" != typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
            if (!it) {
                if (Array.isArray(o) || (it = function api_unsupportedIterableToArray(o, minLen) {
                    if (!o) return;
                    if ("string" == typeof o) return api_arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    "Object" === n && o.constructor && (n = o.constructor.name);
                    if ("Map" === n || "Set" === n) return Array.from(o);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return api_arrayLikeToArray(o, minLen);
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
        function api_arrayLikeToArray(arr, len) {
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
                message.v0.error("请求失败"), error(e);
            } : function _error(err) {
                return console.error(err);
            };
            var vb = video.base(), _ref = [ vb.aid(page), vb.cid(page), vb.epid(page), quality || video.get_quality().q, vb.type ], aid = _ref[0], cid = _ref[1], epid = _ref[2], q = _ref[3], type = _ref[4], format = video_format || config_config.format;
            "mp4" === format && "video" !== type && (format = "flv"), "auto" === request_type && user.needReplace() && (request_type = "online");
            var base_api, url_replace_cdn = function url_replace_cdn(url) {
                if ("0" !== config_config.host_key && "online" === request_type && "mp4" !== format) {
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
                "dash" === format ? (fnver = 0, fnval = 80) : (fnver = 1, fnval = 80)) : (base_api = "video" === type ? "https://api.bilibili.com/x/player/playurl" : "https://api.bilibili.com/pgc/player/web/playurl", 
                "dash" === format ? (fnver = 0, fnval = 4048) : (fnver = 0, fnval = 0)), base_api += "?avid=".concat(aid, "&cid=").concat(cid, "&qn=").concat(q, "&fnver=").concat(fnver, "&fnval=").concat(fnval, "&fourk=1&ep_id=").concat(epid, "&type=").concat(format, "&otype=json"), 
                base_api += "mp4" === format ? "&platform=html5&high_quality=1" : "", ajax_obj.xhrFields = {
                    withCredentials: !0
                };
            } else {
                base_api = config_config.base_api, base_api += "?av=".concat(aid, "&cid=").concat(cid, "&q=").concat(q, "&ep=").concat(epid, "&type=").concat(type, "&format=").concat(format, "&otype=json");
                var _ref2 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref2[0], auth_sec = _ref2[1];
                "1" === config_config.auth && auth_id && auth_sec && (base_api += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec), 
                page && (base_api += "&s"));
            }
            ajax_obj.url = base_api, (0, ajax.h)(ajax_obj).then((function(res) {
                var data;
                if (res.code || (data = res.result || res.data), !data) return "auto" === request_type ? void get_url_base(page, quality, video_format, success, error, "online") : (res.url && (res.url = url_replace_cdn(res.url)), 
                res.video && (res.video = url_replace_cdn(res.video)), res.audio && (res.audio = url_replace_cdn(res.audio)), 
                void _success(res));
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
                            result.video = url_replace_cdn(_video.base_url), result.audio = url_replace_cdn(data.dash.audio[0].base_url);
                            break;
                        }
                    }
                    _success(result);
                } else _success({
                    code: 0,
                    quality: data.quality,
                    accept_quality: data.accept_quality,
                    url: url_replace_cdn(data.durl[0].url)
                });
            })).catch((function(err) {
                return _error(err);
            }));
        }
        function _get_subtitle(p, callback) {
            var to_blob_url = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], video_base = video.base(), _ref3 = [ video_base.aid(p), video_base.cid(p), video_base.epid(p) ], aid = _ref3[0], cid = _ref3[1], epid = _ref3[2];
            (0, ajax.h)({
                url: "https://api.bilibili.com/x/player/v2?aid=".concat(aid, "&cid=").concat(cid, "&ep_id=").concat(epid),
                dataType: "json"
            }).then((function(res) {
                !res.code && res.data.subtitle.subtitles[0] ? (0, ajax.h)({
                    url: "".concat(res.data.subtitle.subtitles[0].subtitle_url),
                    dataType: "json"
                }).then((function(res) {
                    var _step, webvtt = "WEBVTT\n\n", _iterator = api_createForOfIteratorHelper(res.body || [ {
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
                get_url_base(0, "0" === config_config.video_quality ? 0 : parseInt(config_config.video_quality), format, success, error, request_type);
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
            get_season: function get_season(epid) {
                (0, ajax.h)({
                    url: "https://api.bilibili.com/pugv/view/web/season?ep_id=".concat(epid),
                    xhrFields: {
                        withCredentials: !0
                    },
                    dataType: "json"
                }).then((function(res) {
                    res.code ? message.v0.warning("获取剧集信息失败") : window.bp_episodes = res.data.episodes || null;
                }));
            }
        };
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
                }(this, Main), console.log("\n".concat(" %c bilibili-parse-download.user.js v", "2.3.2", " ").concat("810d834", " %c https://github.com/injahow/user.js ", "\n", "\n"), "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
            }
            return function main_createClass(Constructor, protoProps, staticProps) {
                return protoProps && main_defineProperties(Constructor.prototype, protoProps), staticProps && main_defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Constructor;
            }(Main, [ {
                key: "set_toolbar",
                value: function set_toolbar() {
                    $("#arc_toolbar_report")[0] ? $("#arc_toolbar_report").after('<div id="arc_toolbar_report_2" style="margin-top:16px" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true"> <div class="ops"> <span id="setting_btn"> <i class="van-icon-general_addto_s"></i>脚本设置 </span> <span id="bilibili_parse"> <i class="van-icon-floatwindow_custome"></i>请求地址 </span> <span id="video_download" style="display:none"> <i class="van-icon-download"></i>下载视频 </span> <span id="video_download_2" style="display:none"> <i class="van-icon-download"></i>下载音频 </span> <span id="video_download_all"> <i class="van-icon-download"></i>批量下载 </span> </div> <div class="more"> <i class="van-icon-general_moreactions"></i> <div class="more-ops-list"> <ul> <li><span id="download_danmaku">下载弹幕</span></li> <li><span id="download_subtitle">下载字幕</span></li> </ul> </div> </div> </div> ') : $("#toolbar_module")[0] ? $("#toolbar_module").after('<div id="toolbar_module_2" class="tool-bar clearfix report-wrap-module report-scroll-module media-info" scrollshow="true"> <div id="setting_btn" class="like-info"> <i class="iconfont icon-add"></i><span>脚本设置</span> </div> <div id="bilibili_parse" class="like-info"> <i class="iconfont icon-customer-serv"></i><span>请求地址</span> </div> <div id="video_download" class="like-info" style="display:none"> <i class="iconfont icon-download"></i><span>下载视频</span> </div> <div id="video_download_2" class="like-info" style="display:none"> <i class="iconfont icon-download"></i><span>下载音频</span> </div> <div id="video_download_all" class="like-info"> <i class="iconfont icon-download"></i><span>批量下载</span> </div> <div class="more">更多<div class="more-ops-list"> <ul> <li><span id="download_danmaku">下载弹幕</span></li> <li><span id="download_subtitle">下载字幕</span></li> </ul> </div> </div> <style>.tool-bar .more{float:right;cursor:pointer;color:#757575;font-size:16px;transition:all .3s;position:relative;text-align:center}.tool-bar .more:hover .more-ops-list{display:block}.tool-bar:after{display:block;content:"";clear:both}.more-ops-list{display:none;position:absolute;width:80px;left:-65px;z-index:30;text-align:center;padding:10px 0;background:#fff;border:1px solid #e5e9ef;box-shadow:0 2px 4px 0 rgba(0,0,0,.14);border-radius:2px;font-size:14px;color:#222}.more-ops-list li{position:relative;height:34px;line-height:34px;cursor:pointer;transition:all .3s}.more-ops-list li:hover{color:#00a1d6;background:#e7e7e7}</style> </div> ') : $("div.video-toolbar")[0] && $("div.video-toolbar").after('<div id="arc_toolbar_report_2" style="margin-top:16px" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true"> <div class="ops"> <span id="setting_btn"> <i class="van-icon-general_addto_s"></i>脚本设置 </span> <span id="bilibili_parse"> <i class="van-icon-floatwindow_custome"></i>请求地址 </span> <span id="video_download" style="display:none"> <i class="van-icon-download"></i>下载视频 </span> <span id="video_download_2" style="display:none"> <i class="van-icon-download"></i>下载音频 </span> <span id="video_download_all"> <i class="van-icon-download"></i>批量下载 </span> </div> <div class="more"> <i class="van-icon-general_moreactions"></i> <div class="more-ops-list"> <ul class="more-ops-list-box"> <li class="more-ops-list-box-li"> <span id="download_danmaku">下载弹幕</span> </li> <li class="more-ops-list-box-li"> <span id="download_subtitle">下载字幕</span> </li> </ul> </div> </div> </div> ');
                }
            }, {
                key: "run",
                value: function run() {
                    this.set_toolbar();
                    var api_url, api_url_temp, root_div = document.createElement("div");
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
                        config_config.auth = store.get("auth_id") ? "1" : "0", store.set("config_str", JSON.stringify(config_config));
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
                    }("#".concat(root_div.id)), (0, message.N5)("#".concat(root_div.id)), user.lazyInit(), 
                    auth.initAuth(), auth.checkLoginStatus(), check.refresh(), $("#".concat(root_div.id)).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">'), 
                    $("#".concat(root_div.id)).append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>'), 
                    $("#".concat(root_div.id)).append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>'), 
                    $("body").on("click", "#setting_btn", (function() {
                        for (var key in user.lazyInit(!0), config_config) $("#".concat(key)).val(config_config[key]);
                        $("#bp_config").show(), $("#bp_config").animate({
                            opacity: "1"
                        }, 300), ui_scroll.A.hide();
                    })), $("body").on("click", "#download_danmaku", (function() {
                        var vb = video.base();
                        Download.download_danmaku_ass(vb.cid(), vb.filename());
                    })), $("body").on("click", "#download_subtitle", (function() {
                        Download.download_subtitle_vtt(0, video.base().filename());
                    })), $("body").on("click", "#video_download_all", (function() {
                        user.lazyInit(!0), store.get("auth_id") && store.get("auth_sec") ? "rpc" === config_config.download_type ? Download.download_all() : message._p.confirm("仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？", (function() {
                            Download.download_all();
                        })) : message._p.confirm("批量下载仅支持授权用户使用RPC接口下载，是否进行授权？", (function() {
                            auth.login();
                        }));
                    })), $("body").on("click", "#video_download", (function() {
                        var type = config_config.download_type;
                        if ("web" === type) $("#video_url")[0].click(); else if ("a" === type) {
                            var _ref = [ $("#video_url").attr("href"), $("#video_url_2").attr("href") ], video_url_2 = _ref[1], msg = "建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>" + '<a href="'.concat(_ref[0], '" target="_blank" style="text-decoration:underline;">&gt视频地址&lt</a><br/><br/>') + ("dash" === config_config.format ? '<a href="'.concat(video_url_2, '" target="_blank" style="text-decoration:underline;">&gt音频地址&lt</a>') : "");
                            message._p.alert(msg);
                        } else if ("aria" === type) {
                            var file_name, file_name_2, _ref2 = [ $("#video_url").attr("href"), $("#video_url_2").attr("href") ], _video_url = _ref2[0], _video_url_ = _ref2[1], video_title = video.base().filename();
                            file_name = video_title + Download.url_format(_video_url), file_name_2 = video_title + "_audio.mp4";
                            var aria2_header = '--header "User-Agent: '.concat(window.navigator.userAgent, '" --header "Referer: ').concat(window.location.href, '"'), code = 'aria2c "'.concat(_video_url, '" --out "').concat(file_name, '" ').concat(aria2_header), code_2 = 'aria2c "'.concat(_video_url_, '" --out "').concat(file_name_2, '" ').concat(aria2_header), _msg = "点击文本框即可复制下载命令！<br/><br/>" + '视频：<br/><input id="aria2_code" value=\''.concat(code, '\' onclick="bp_clip_btn(\'aria2_code\')" style="width:100%;"></br></br>') + ("dash" === config_config.format ? '音频：<br/><input id="aria2_code_2" value=\''.concat(code_2, '\' onclick="bp_clip_btn(\'aria2_code_2\')" style="width:100%;"><br/><br/>') + '全部：<br/><textarea id="aria2_code_all" onclick="bp_clip_btn(\'aria2_code_all\')" style="min-width:100%;max-width:100%;min-height:100px;max-height:100px;">'.concat(code, "\n").concat(code_2, "</textarea>") : "");
                            !window.bp_clip_btn && (window.bp_clip_btn = function(id) {
                                $("#".concat(id)).select(), document.execCommand("copy") ? message.v0.success("复制成功") : message.v0.warning("复制失败");
                            }), message._p.alert(_msg);
                        } else {
                            var url = $("#video_url").attr("href"), filename = video.base().filename();
                            Download.download(url, filename, type);
                        }
                    })), $("body").on("click", "#video_download_2", (function() {
                        var type = config_config.download_type;
                        if ("web" === type) $("#video_url_2")[0].click(); else if ("a" === type) $("#video_download").click(); else if ("aria" === type) $("#video_download").click(); else {
                            var url = $("#video_url_2").attr("href"), filename = video.base().filename();
                            Download.download(url, filename, type);
                        }
                    })), $("body").on("click", "#bilibili_parse", (function() {
                        user.lazyInit(!0);
                        var vb = video.base(), _ref3 = [ vb.type, vb.aid(), vb.p(), vb.cid(), vb.epid() ], type = _ref3[0], aid = _ref3[1], p = _ref3[2], cid = _ref3[3], epid = _ref3[4], q = video.get_quality().q;
                        api_url = "".concat(config_config.base_api, "?av=").concat(aid, "&p=").concat(p, "&cid=").concat(cid, "&ep=").concat(epid, "&q=").concat(q, "&type=").concat(type, "&format=").concat(config_config.format, "&otype=json&_host=").concat(config_config.host_key, "&_req=").concat(config_config.request_type, "&_q=").concat(config_config.video_quality);
                        var _ref4 = [ store.get("auth_id"), store.get("auth_sec") ], auth_id = _ref4[0], auth_sec = _ref4[1];
                        if ("1" === config_config.auth && auth_id && auth_sec && (api_url += "&auth_id=".concat(auth_id, "&auth_sec=").concat(auth_sec)), 
                        api_url !== api_url_temp || "local" === config_config.request_type) $("#video_url").attr("href", "#"), 
                        $("#video_url_2").attr("href", "#"), api_url_temp = api_url, message.v0.info("开始请求"), 
                        api.get_url((function(res) {
                            if (res && !res.code) {
                                var _url, _url_;
                                if (message.v0.success("请求成功"), res.times && message.v0.info("剩余请求次数：".concat(res.times)), 
                                res.url) _url = res.url.replace("http://", "https://"), _url_ = "#"; else {
                                    if (!res.video || !res.audio) return void message.v0.warning("数据错误");
                                    _url = res.video.replace("http://", "https://"), _url_ = res.audio.replace("http://", "https://");
                                }
                                $("#video_url").attr("href", _url), $("#video_download").show(), "#" !== _url_ && ($("#video_url_2").attr("href", _url_), 
                                $("#video_download_2").show()), (user.needReplace() || vb.is_limited() || "1" === config_config.replace_force) && player.replace_player(_url, _url_), 
                                "1" === config_config.auto_download && $("#video_download").click();
                            }
                        })); else {
                            message.v0.miaow();
                            var url = $("#video_url").attr("href"), url_2 = $("#video_url_2").attr("href");
                            url && "#" !== url && ($("#video_download").show(), "dash" === config_config.format && $("#video_download_2").show(), 
                            (user.needReplace() || vb.is_limited() || "1" === config_config.replace_force) && !$("#bp_dplayer")[0] && player.replace_player(url, url_2), 
                            "1" === config_config.auto_download && $("#video_download").click());
                        }
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
        }), 3e3) : location.href.match("access_key") && window !== window.parent && (window.stop(), 
        window.parent.postMessage("bilibili-parse-login-credentials: " + location.href, "*")));
    }();
})();