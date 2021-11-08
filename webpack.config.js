const { Configuration } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const rules = require("./config/rules");
/**
 * @type {Configuration}
 */

module.exports = (env) => {
  const { mode } = env;
  const config = {
    entry: path.resolve(__dirname, "src/main.js"),
    mode,
    output: {
      filename: "[name].js",
      publicPath: "/",
      clean: true,
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules,
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    externals: {
      vue: "Vue",
      "element-plus": "ElementPlus",
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "src/index.html"),
      }),
      // 提取单独的CSS
      new MiniCssExtractPlugin({
        filename: "[name]/main.[contenthash:10].css",
      }),
      // 压缩css
      new CssMinimizerPlugin(),
      new CleanWebpackPlugin(),
     
      // new BundleAnalyzerPlugin({
      //   analyzerMode: mode === 'production' ? 'server' : 'disabled'
      // })
    ],
    devServer: {
      // contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3033,
      host: "127.0.0.1",
      open: true,
      hot: true,
    },
    devtool: mode === "development" ? "eval-source-map" : "eval",
  };

  return config;
};
