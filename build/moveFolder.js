import path from 'path'
import fs from 'fs'
import { copyFiles } from './copyFiles';
// 获取根目录
const rootPath = path.resolve(__dirname, '../')

// 获取根目录下的packages
const packagesPath = path.resolve(__dirname, '../packages')
/**
 * 1. 读取根目录下的packages文件夹下面的目录
 * 2. 判断是否为文件夹，是的话就将lib中的相对应的文件夹复制到lib/packages
 * @returns 
 */
const copyFilesToPackages = () => fs.readdir(packagesPath, function (err, paths) {
  if(err){
      throw err;
  }
  paths.forEach( p => {
    const _src= packagesPath + '\\' + p;
    fs.stat(_src, function (err, st){
        if(err){
            throw err;
        }
        // 判断是否文件还是文件夹
        if(st.isDirectory()){
          copyFiles(rootPath + '\\lib\\' + p, rootPath + '\\lib\\packages\\' + p, rootPath)
        }
    })
  })
})

copyFilesToPackages()