const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin();
const { VueLoaderPlugin } = require('vue-loader')

const { getBanner } = require('./webpack.common');
const meta = require('../src/client/bilibili-parse-download.meta.json');

module.exports = {
    mode: 'production',

    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bilibili-parse-download.user.js',
    },

    performance: {
        hints: false,
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..', 'src/'),
        },
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
                    },
                },
                extractComments: false
            })
        ]
    },

    module: {
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
                test: /\.html$/i,
                enforce: 'post',
                loader: 'html-loader',
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
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
        }),
        new VueLoaderPlugin()
    ]
}
