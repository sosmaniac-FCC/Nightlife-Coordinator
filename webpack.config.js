require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        style: path.join(__dirname, 'src/css/style.sass'),
        client: path.join(__dirname, 'src/js/client.jsx'),
        materialize: path.join(__dirname, 'src/materialize-src/sass/materialize.scss')
    },
    output: {
        path: path.join(__dirname, 'src/'),
        filename: '__[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0']
                }
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader?includePaths[]=' + path.join(__dirname, 'node_modules/compass-mixins/lib')]
                })
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                exclude: /node_modules/,
                loader: 'url-loader?limit=200000&mimetype=application/font-woff' 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                exclude: /node_modules/,
                loader: 'file-loader?limit=200000' 
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                PORT: JSON.stringify(process.env.PORT),
                TWITTER_KEY: JSON.stringify(process.env.TWITTER_KEY),
                TWITTER_SECRET: JSON.stringify(process.env.TWITTER_SECRET),
                YELP_KEY: JSON.stringify(process.env.YELP_KEY),
                MONGO_URI: JSON.stringify(process.env.MONGO_URI),
                APP_URL: JSON.stringify(process.env.APP_URL)
            }
        }),
        new ExtractTextPlugin({
            filename: '__[name].css'
        })
    ]
};