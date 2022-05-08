const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { getBanner, getDefaultConfig } = require('./webpack.common')
const meta = require('../src/client/bilibili-parse-download.meta.json')

const prodConfig = Object.assign(getDefaultConfig(), {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bilibili-parse-download.user.js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js$/i,
                extractComments: false,
                terserOptions: {
                    mangle: false,
                    keep_classnames: false,
                    keep_fnames: true,
                    toplevel: true,
                    output: {
                        beautify: true,
                        comments: /==\/?UserScript==|^[ ]?@/i,
                    },
                }
            })
        ]
    }
})

prodConfig.plugins.push(
    new webpack.BannerPlugin({
        banner: getBanner(meta),
        raw: true,
        entryOnly: true,
    })
)

module.exports = prodConfig
