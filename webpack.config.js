const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssChain = [{
  loader: 'css-loader', // translates CSS into CommonJS modules
  options : { autoprefixer: false, sourceMap: true, importLoaders: 1 }
}, {
  loader: 'postcss-loader', // Run post css actions
  options: {
    plugins: function () { // post css plugins, can be exported to postcss.config.js
      return [
        require('precss'),
        require('autoprefixer')
      ];
    }
  }
}, {
  loader: 'sass-loader' // compiles Sass to CSS
}];

const extractRule = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: cssChain
})

module.exports = {
  entry: {
    main: './src/index.js',
    scss: './src/scss/main.scss'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss)$/,
        use: extractRule
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};