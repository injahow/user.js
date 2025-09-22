const path = require('path')
const webpack = require('webpack')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const { version } = require('../package.json')

const getBanner = meta => {
    return `${meta.main.map(e => {
        if (typeof e === 'object') {
            if (e.version === '${version}') {
                e.version = version
            }
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

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, '..', 'src/'),
            }
        },

        performance: {
            hints: false,
        },

        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                },
                {
                    test: /\.html$/i,
                    enforce: 'post',
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                JS_VERSION: `"${require('../package.json').version}"`,
                GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
            })
        ]

    }
}

module.exports = {
    getBanner,
    getDefaultConfig
}
