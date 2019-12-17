const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.DEV_PORT || 7777;

module.exports = {
    entry: [
        './src/index.tsx'
    ],
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    devServer: {
        port: port,
        inline: true,
        open: true,
        contentBase: './dist',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]'
                            },
                            import: true,
                            importLoaders: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // favicon: 'dist/favicon.ico'
        })
    ],
};