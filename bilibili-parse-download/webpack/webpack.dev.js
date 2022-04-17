const path = require('path')
const webpack = require('webpack')
const { getBanner, getDefaultConfig } = require('./webpack.common')
const devMeta = require('../src/client/dev.meta.json')

const devConfig = Object.assign(getDefaultConfig(), {
    devtool: false,
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bilibili-parse-download.dev.user.js'
    },
})

devConfig.plugins.push(
    new webpack.BannerPlugin({
        banner: getBanner(devMeta),
        raw: true,
        entryOnly: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
)

module.exports = devConfig
