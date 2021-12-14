module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/el-plus-powerful-table/'
    : '/',
  css: { extract: false },
  configureWebpack:{
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
      ]
    }
  }
}