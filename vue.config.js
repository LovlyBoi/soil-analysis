module.exports = {
  devServer: {
    // compress: true,
    // hot: true,
    // host: "0.0.0.0",
    port: 12345,
    open: true,
    proxy: {
      '/api': {
        target: 'http://120.79.189.55:10086/content1-2.0/',
        // changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}