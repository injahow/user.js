
import Main from './main'

/* global JS_VERSION GIT_HASH */
'use strict';
console.log(`${'\n'} %c bilibili-parse-download.user.js v${JS_VERSION} ${GIT_HASH} %c https://github.com/injahow/user.js ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

new Main().run()
