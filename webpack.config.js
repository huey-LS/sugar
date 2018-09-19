const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'home': [
      path.resolve(__dirname, './src/view/applications/home/index')
    ]
  },
  output: {
    path: path.resolve(__dirname, './static/view'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css']
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, './dist'),
  //   hot: true,
  //   host: 'localhost:5000',
  //   inline: true
  // },
  mode: process.env.NODE_ENV,
  devtool: 'cheap-module-eval-source-map',
  watch: process.env.NODE_ENV === 'development',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src/view')
        ],
        exclude: [
          path.resolve(__dirname, './dist')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'VIEW_ENV': JSON.stringify('client'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
