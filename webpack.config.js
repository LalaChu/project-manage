var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer')
var getClientEnvironment = require('./config/env');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var env = getClientEnvironment('');
var devConfig = {
    entry: {
        page: ['./src', hotMiddlewareScript]
    },
    output: {
        filename: './public/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },{
                test: /\.css$/,
                loader: 'style!css?importLoaders=1!postcss'
            },
        ]
    },
    postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
   },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.DefinePlugin(env.stringified)
        // new webpack.optimizi.OccurenceOrderPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfig;
