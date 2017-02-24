const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        bundle: [path.join(__dirname, '/scripts/index.ts')]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/bin/styles'),
        publicPath: '/styles/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.join(__dirname, '/node_modules')]
    },
    resolveLoader: {
        modules: [path.join(__dirname, '/node_modules')]
    },
    module: {
        rules: [
            {
                test: /search\.worker\.ts$/,
                use: 'worker-loader',
                exclude: ['node_modules']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: ['node_modules']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{ loader: 'css-loader' },
                    { loader: 'sass-loader' }]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery'
        })
    ]
};