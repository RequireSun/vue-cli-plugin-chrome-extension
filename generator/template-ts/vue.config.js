/**
 * Created by kelvinsun on 18/9/29.
 *
 * vue-cli config file.
 */

'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // 因为这个项目是打包发布的 app, 不是线上资源, 所以不需要哈希
    filenameHashing: false,
    pages: {
        popup: {
            entry: 'src/popup.ts',
            template: 'public/popup.html',
        },
        background: {
            entry: 'src/background.ts',
            template: 'public/background.html',
        },
    },
    // 开发的时候为 true, 发布时为 false
    productionSourceMap: 'development' === process.env.NODE_ENV,
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                { from: 'public/manifest.json', to: 'manifest.json', },
                { from: 'src/image/*.png', to: 'image/[name].png', },
            ]),
        ],
    },
    // chainWebpack 修改编译目标目录
    // https://segmentfault.com/q/1010000016475212
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(args => {
                // 日, 这里不应该放数组
                return {
                    limit: 4096,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'image/[name].[ext]',
                        },
                    },
                };
            });
    },
};
