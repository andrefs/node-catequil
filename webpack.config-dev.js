var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './client/client'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module:{
        loaders: [
            {
                test: /.js/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
    },
};
