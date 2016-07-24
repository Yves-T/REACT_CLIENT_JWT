module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: './'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
