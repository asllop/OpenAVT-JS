const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: {
      index: path.resolve(__dirname, "./dist/esm/index.js")
    },
    output: {
      path: path.resolve(__dirname, "./dist/umd"), // builds to ./dist/umd/
      filename: "openavt-html5.js", // index.js
      library: "OpenAVT", // aka window.myLibrary
      libraryTarget: "umd", // supports commonjs, amd and web browsers
      globalObject: "this"
    },
    module: {
      rules: [{ test: /\.t|js$/, use: "babel-loader" }]
    }
  };
};