const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
<<<<<<< HEAD
  entry: "./client/index.tsx",
=======
  entry: "./client/index.js",
>>>>>>> dev
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, "dist"),
    //   publicPath: "/dist",
    // },
    port: 8080,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/client/index.html"),
      inject: true,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
<<<<<<< HEAD
        },
      },
      {
        test: /\.css$/i,
=======
          //   plugins: [
          //     "@babel/plugin-transform-runtime", //?
          //     "@babel/transform-async-to-generator", //?
          //   ],
        },
      },
      {
        // test: /\.(scss|css)$/,
        test: /\.css$/i,
        // exclude: /node_modules/,
>>>>>>> dev
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
<<<<<<< HEAD
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
=======
>>>>>>> dev
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      template: path.join(__dirname, "/client/index.html"),
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
=======
      template: "./client/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
>>>>>>> dev
  },
};
