import path from 'path'
import fs from 'fs'
/**
 * 判断是否存在文件夹
 * @param {number} index 当前文件夹下标
 * @param {array} dest 文件夹路径数组
 * @param {string} rootPath 根路径
 * @param {function} callback 回调函数
 * @param {object} arg 回调函数入参
 */
const isDir = (src, index, dest, rootPath) => {
  if (index + 1 > dest.length - 1) {
    // console.log('已经到最后一个了')
    return
  }
  let _src = src + dest[index + 1]
  if (!fs.existsSync(rootPath + '/' + _src)) {
    fs.mkdirSync(rootPath + '/' + _src)
  }
  isDir(_src + '/', index + 1, dest, rootPath)
}

export const copyFiles= (src, dest, rootPath = path.resolve(__dirname, './')) => {
  //读取目录
  fs.readdir(src, function (err, paths){
      if(err){
          throw err;
      }
      // 获取当前文件路径的最后一个
      const currentPaths = rootPath.split('\\')
      // 当前文件下标
      const index = dest.split('\\').indexOf(currentPaths[currentPaths.length - 1])
      isDir('./', index, dest.split('\\'), rootPath)

      paths.forEach((path) => {
        const _src= src + '\\' + path
        const _dst= dest + '\\' + path
          fs.stat(_src, function (err, st){
              if (err) {
                  throw err;
              }
              // 判断是否文件还是文件夹
              if (st.isFile()) {
                  const rs= fs.createReadStream(_src);//创建读取流
                  const ws= fs.createWriteStream(_dst);//创建写入流
                  rs.pipe(ws);
              } else if (st.isDirectory()) {
                copyFiles(_src,_dst, rootPath);
              }
          })
      })
  })
}