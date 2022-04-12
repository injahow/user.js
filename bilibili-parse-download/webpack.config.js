const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
// const GitRevisionPlugin = require('git-revision-webpack-plugin');
// const gitRevisionPlugin = new GitRevisionPlugin();

const meta = require('./src/client/bilibili-parse-download.meta.json')

const getBanner = meta => `${meta.main.map(e => {
    if (typeof e === 'object') {
        return Object.entries(e).map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(item => `// @${key.padEnd(14, ' ')}${item}`).join('\n')
            }
            return `// @${key.padEnd(14, ' ')}${value}`
        }).join('\n')
    }
    return `// ${e}`
}).join('\n')}\n${meta.last.join('\n')}\n\n`

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bilibili-parse-download.user.js'
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
            JS_VERSION: `"${require('./package.json').version}"`,
            GIT_HASH: "JSON.stringify('gitRevisionPlugin.version()')",
        }),
        new webpack.BannerPlugin({
            banner: getBanner(meta),
            entryOnly: true,
            raw: true
        })
    ]
}
