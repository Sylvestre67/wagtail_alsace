const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const isProd = process.env.NODE_ENV === 'production';
console.log('Building for: ', process.env.NODE_ENV);

const extractCss = new ExtractTextPlugin({
    filename: '../css/alsace.css'
});

const config = {
    context: path.resolve(__dirname),
    entry: './alsace/src/index.js',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'alsace', 'static', 'js'),
        filename: 'alsace.js',
        publicPath: '/static/'
    },
    stats: {
        colors: true,
        chunks: true,
        children: false,
        optimizationBailout: true,
        maxModules: 5
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })

            },
            {
                test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 24
                }
            }
        ]
    },
    plugins: [
        extractCss,
        new CleanWebpackPlugin([
            './alsace/static/js/*.*',
            './alsace/static/css/*.*'
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    mode: process.env.NODE_ENV
};

if(!isProd){
    config.plugins.push(
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    )
}

module.exports = config;