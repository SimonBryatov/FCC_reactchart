var path = require('path');  
var HtmlWebpackPlugin = require('html-webpack-plugin');
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {  
    dev: true,
    production: false,
};


export default (env = defaultEnv) => ({  
  entry: [
    path.join(__dirname, 'src/index.jsx'),
    ...env.dev ? [
    'react-hot-loader/patch', // Needed to preserve state
    'webpack-dev-server/client?https://0.0.0.0:8080'] : []
  ],
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    }),
    ...env.dev ? [
    new HotModuleReplacementPlugin()] : [ new ExtractTextPlugin('[name].css')]
  ], 
  module: {
    rules: [
      {
        test: /.js(x)$/, //deleted x?
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
        options: {
            "babelrc": false,
            "presets": [
                [
                    "es2015",  {
                        "modules": false
                    }
                ], "react"
            ],
            plugins: ['react-hot-loader/babel']
            }
          }
        ]
      },
      {
          test:/\.(s*)css$/,
                 loader: env.dev ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      },
    ]
  },
  devServer: {
    hot: true,
  historyApiFallback: true,
  contentBase: './',
  host: process.env.IP,
  //https: true,
  port: process.env.PORT,
  "public": "fcc-reactchart-simonbryatov.c9users.io" //no trailing slash
  },
});