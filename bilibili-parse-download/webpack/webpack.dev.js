const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin()

const { getBanner } = require('./webpack.config')
const meta = require('../src/client/dev.meta.json')

module.exports = {
    mode: 'development',

    devtool: false,

    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bilibili-parse-download.dev.user.js'
    },

    performance: {
        hints: false,
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
                    },
                },
                extractComments: false,
            })
        ]
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            JS_VERSION: `"${require('../package.json').version}"`,
            GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
        }),
        new webpack.BannerPlugin({
            banner: getBanner(meta),
            entryOnly: true,
            raw: true
        })
    ]

};
