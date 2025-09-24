const path = require('path')
const webpack = require('webpack')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const TerserPlugin = require('terser-webpack-plugin')
const metaJson = require('./scripts/meta.json')

const getBanner = meta => {
    return `${meta.main.map(e => {
        if (typeof e === 'object') {
            // if (e.version === '${version}') {
            //     e.version = version
            // }
            return Object.entries(e).map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map(item => `// @${key.padEnd(14, ' ')}${item}`).join('\n')
                }
                return `// @${key.padEnd(14, ' ')}${value}`
            }).join('\n')
        }
        return `// ${e}`
    }).join('\n')}\n${meta.last.join('\n')}`
}

const getDefaultConfig = () => {
    return {
        mode: 'development',
        entry: './index.js',
        resolve: {
            extensions: ['.js', '.json']
        },

        performance: {
            hints: false,
        },

        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                JS_VERSION: `"${require('./package.json').version}"`,
                GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
            })
        ]
    }
}

const prodConfig = Object.assign(getDefaultConfig(), {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `injahow.user.js`
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
                        comments: /==\/?UserScript==|globals|^[ ]?@/i,
                    },
                }
            })
        ]
    }
})

prodConfig.plugins.push(
    new webpack.BannerPlugin({
        banner: getBanner(metaJson),
        raw: true,
        entryOnly: true
    })
)

module.exports = prodConfig
