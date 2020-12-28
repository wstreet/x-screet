const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack')

const resolve = (dir) => path.resolve(__dirname, dir)


module.exports = function (env) {
  const isDevelopment = env ==='development'
  const baseConfig = {
    mode: env,
    // stats: 'errors-only',  // webpack-cli中 const statsPresetToOptions = require("webpack").Stats.presetToOptions;
    context: __dirname,
    devtool: 'inline-source-map',
    // 入口文件
    entry: './src/index.tsx',
    // 输出文件名称
    output: {
      filename: '[name].js',
      path: resolve('./build'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        src: resolve('./src'),
        utils: resolve('./src/utils'),
        pages: resolve('./src/pages')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)?$/,
          use: [
            // MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'less-loader'
          ],
        },
      ]
    },
    plugins: [
      new WebpackBar(),
      // new ProgressBarPlugin(),
      new HtmlWebpackPlugin({
        template: resolve('./public/index.html'),
        title: 'GITHUB 数据可视化平台'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new MiniCssExtractPlugin({
      //   filename: '[name].css',
      //   chunkFilename: '[name].chunk.css',
      // })
    ],
  }

  if (isDevelopment) {
    baseConfig.devServer = {
      contentBase: resolve('./build'),
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    }
    baseConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin(),
    )
  } else {
    baseConfig.plugins.push(
      new CleanWebpackPlugin(),
    )
  }


  return baseConfig
}