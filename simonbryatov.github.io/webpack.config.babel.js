var path = require('path');  
var HtmlWebpackPlugin = require('html-webpack-plugin');

export default () => ({  
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    }),
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
            }
          }
        ]
      },
      {
          test:/\.(s*)css$/,
                 use:['style-loader','css-loader', 'sass-loader']
      },
    ]
  },
});