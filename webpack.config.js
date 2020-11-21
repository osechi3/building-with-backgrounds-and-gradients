const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = {
  mode: 'development',
  entry: './src/app.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader?compact=false',
          'eslint-loader'
        ]
      },

      {
        test: /\.jpg$/,
        use: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/images',
          to: path.resolve(__dirname, 'dist/assets/images')
        }
      ]
    }),

    new ImageminWebpPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 90
        }
      }]
    }),

    new ImageminPlugin({
      jpegtran: null,
      gifsicle: null,
      optipng: null

      // plugins: [
      //   imageminMozjpeg({
      //     quality: 95,
      //     progressive: true
      //   })
      // ]
    })
  ]
}
