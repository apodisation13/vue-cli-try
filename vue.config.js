const webpack = require("webpack");
module.exports = {
  devServer: {
    disableHostCheck: true
  }
}

new webpack.DefinePlugin({
  VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL),
  VUE_APP_TRY1: JSON.stringify(process.env.VUE_APP_TRY1),
});