const path = require('path');  //path模块
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/el-plus-powerful-table/'
    : '/',
  css: { extract: false },
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('#', resolve('types'))
  },
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