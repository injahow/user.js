const path = require('path')
const webpack = require('webpack')
const { getBanner, getDefaultConfig } = require('./webpack.common')
const meta = require('../src/client/bilibili-parse-download.meta.json')

const prodConfig = Object.assign(getDefaultConfig(), {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bilibili-parse-download.user.js'
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
