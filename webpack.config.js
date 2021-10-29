const path = require('path');

module.exports = {
  entry: ['./src/index.js','./src/consts/SceneKeys.js','/src/scenes/Tutorial.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
    ],
  },
};