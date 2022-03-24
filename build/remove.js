import path from 'path'
import fs from 'fs'
fs.readdirSync(path.resolve(__dirname, '../packages')).forEach( p => {
  const _src= path.resolve(__dirname, '../lib') + '\\' + p;
  // 判断是否文件还是文件夹
  if(fs.existsSync(_src) && fs.statSync(_src).isDirectory()){
    deleteFolderRecursive(_src)
  }
})

// 清除文件夹
function deleteFolderRecursive(url) {
  let files = [];
  /**
   * 判断给定的路径是否存在
   */
  if (fs.existsSync(url)) {
      /**
       * 返回文件和子目录的数组
       */
      files = fs.readdirSync(url);
      files.forEach(function (file, index) {

          var curPath = path.join(url, file);
          /**
           * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
           */
          if (fs.statSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);

          } else {
              fs.unlinkSync(curPath);
          }
      });
      /**
       * 清除文件夹
       */
      fs.rmdirSync(url);
  } else {
      console.log("给定的路径不存在，请给出正确的路径");
  }
}