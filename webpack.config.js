/* eslint-disable */
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const _ = require('underscore');
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourceDir = './src';
const outputDir = './dist';

module.exports = (env, argv) => {
  const isProduction = !!(process.env.NODE_ENV == 'production');
  const appTarget = process.env.APP_TARGET;

  const config = {
    mode: process.env.NODE_ENV || 'production',
    context: __dirname,

    devtool: isProduction ? undefined : 'source-map',

    entry: { 
      app: path.join(__dirname, sourceDir, 'js', 'index.tsx'),
      background: path.join(__dirname, sourceDir, 'js', 'background.ts')
    },

    output: {
      compareBeforeEmit: false,
      path: path.resolve(__dirname, outputDir),
      filename: 'js/[name].js',
      chunkFilename: '[chunkhash].[ext].map',
      sourceMapFilename: '[file].map',
    },

    resolve: {
      roots: [path.join(__dirname, sourceDir)],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.html', '.json'],
      alias: {

      }
    },
  
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      }),
      new LiveReloadPlugin({
        appendScriptTag: !isProduction,
        hostname: 'localhost',
        protocol: 'http'
      }),
      new webpack.NormalModuleReplacementPlugin(
        /.*\.webapp.*/,
        function (resource) {
          const newRequest = resource.request.replace(
            /\.webapp/,
            `.${appTarget}`
          )
          // console.log(`${resource.request} -> ${newRequest}`)
          resource.request = newRequest
        }
      ),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.APP_TARGET': JSON.stringify(process.env.APP_TARGET)
      })
    ], 
  
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // test: /[\\/]node_modules[\\/]/,
            test(module) {
              return (
                module.resource &&
                /[\\/]node_modules[\\/]/.test(module.resource) &&
                !(/[\\/]node_modules[\\/]graphql/.test(module.resource))
              )
            },
            name: 'libs',
            chunks: 'all',
          },
          graphql: {
            test: /[\\/]node_modules[\\/]graphql/,
            name: 'graphql',
            chunks: 'all',
            reuseExistingChunk: true,
            usedExports: true
          }
        },
      },

      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ]
    },
  
    module: {
      rules: [
        /* 
          SVG
        */
        {
          test: /\.svg$/,
          exclude: /(node_modules|favicon)/,
          loader: 'svg-react-loader',
        },

        /* 
          TS
         */
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json'
              }
            }
          ]
        },

        /* 
          JSON 
        */
        {
          test: /\.json$/,
          loader: 'file-loader',
          type: 'javascript/auto',
          options: {
            outputPath: '/',
            esModule: false,
            emitFile: true,
            name: '[name].[ext]'
          }
        },

        /* 
          Asset loader
        */
        {
          test: /\.(woff2?|eot|gif|png|jpe?g|webmanifest|xml|svg|ico)$/,
          loader: 'file-loader',
          exclude: /assets\/svg/,
          options: {
            esModule: false,
            emitFile: true,
            name(resourcePath, resourceQuery) {		
              const newPathBreakdown = path.dirname(resourcePath).split(path.sep)
              const prefixPath = _.rest(newPathBreakdown, _.indexOf(newPathBreakdown, path.basename(sourceDir)) + 1).join(path.sep)
              return `${prefixPath}/[name].[ext]`;
            }
          }
        },
  
        /* 
        LESS
        */
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/'
              }
            },
            { 
              loader: "css-modules-typescript-loader", 
              options: {
                mode: 'emit'
              }
            },
            { 
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                esModule: false,
                modules: 'global',
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  paths: ['.'],
                  rewriteUrls: 'all',
                  rootpath: '/'
                }
              }
            }
          ]
        },
  
        /* 
        HTML
        */
        {
          test: /\.html$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name: "[name].[ext]",
              }
            },
            {
              loader: 'extract-loader',
              options: {
                esModule: false,
                publicPath: path.join(__dirname, outputDir)
              }
            },
            {
                loader: "html-loader",
                options: {
                  esModule: false,
                  sources: false,
                  preprocessor: (content, loaderContext) => {
                    return content.replace(/{{process\.env\.APP_TARGET}}/ig, `${appTarget}`)
                  },
                }
            }
          ]
        },
        
      ]
    }
  }
  return config;
}