var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: true,
  resolve: {
      alias: {
        "ag-grid-root" : __dirname + "/node_modules/ag-grid/dist/styles"
      },
      extensions: ['', '.js', '.jsx']
  },
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            minimize: true
        }
    })
  ] : [],
  externals: {
      "ZoomdataSDK": "ZoomdataSDK"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      { 
        test: /\.jsx$/, 
        include: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader',
        exclude: /node_modules/
      },   
      {
        test: /\.(svg|gif|png|jpg)$/,
        loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
        exclude: /node_modules/
      }
    ],
    noParse: [
        /[\/\\]node_modules[\/\\]zoomdata-client[\/\\]distribute[\/\\]sdk[\/\\]2\.0[\/\\]zoomdata-client\.js$/
    ]
  }
}

