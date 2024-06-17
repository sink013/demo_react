const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ],
    },
  },
};
