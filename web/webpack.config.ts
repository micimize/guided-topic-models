import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

const context = path.resolve(__dirname, 'src')

const config: webpack.Configuration = {
  context,

  entry: [
    'react-hot-loader/patch',
    './index.tsx',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.scss', '.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-hot-ts',
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, './src/index.ejs')
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: context,
        use: ExtractTextPlugin.extract({
          use: [
            // load component css via css modules with local scoping
            {
              loader: "css-loader",
              query: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]",
                minimize: false,
                sourceMap: true,
              },
            },
            "postcss-loader", // config is in postcss.config.js
          ],
        })
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        include: context,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              presets: [ [ 'env', { 'modules': false } ], 'react' ],
              plugins: [
                [
                  'react-css-modules',
                  {
                    context,
                    'generateScopedName': '[name]__[local]'
                  }
                ]
              ]
            }
          },
          'awesome-typescript-loader',
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  },
  devServer: {
    hot: true
  }
};

export default config;
