const path = require('path');  //path模块
console.log(path.resolve('packages'))

module.exports = {
  // 修改 pages 入口
  pages: {
    index: {
      entry: "demo/main.ts", //入口
      template: "public/index.html", //模板
      filename: "index.html" //输出文件
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/el-plus-powerful-table/'
    : '/',
  css: { extract: false },
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
      .set('~', path.resolve('packages'))
      .set('@', path.resolve('src'))
      .set('#', path.resolve('types'))
      .set('$u', path.resolve('utils'))
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