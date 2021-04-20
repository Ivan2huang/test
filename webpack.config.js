const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './server.js',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js',
  },
};
