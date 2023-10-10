import path from 'path'
import fs from 'fs'

// 获取oldFile文件夹，newFile的绝对路径
const OriginFilePath = [
  {
    path: 'typings',
    isFile: false,
  },
  {
    path: 'global.d.ts',
    isFile: true,
  },
]
const CopyFilePath = [
  ['es/typings', 'lib/typings'],
  ['es/global.d.ts', 'lib/global.d.ts'],
]

function getFiles(OriginFilePath, CopyFilePath) {
  fs.stat(OriginFilePath, (err, stat) => {
    // 判断是否文件夹
    if (stat.isDirectory()) {
      //读取newFile文件夹下的文件
      fs.readdir(OriginFilePath, { withFileTypes: true }, (err, files) => {
        for (const file of files) {
          //判断是否是文件夹，不是则直接复制文件到newFile中
          if (!file.isDirectory()) {
            //获取旧文件夹中要复制的文件
            const OriginFile = path.resolve(OriginFilePath, file.name)
            //获取新文件夹中复制的地方
            const CopyFile = path.resolve(CopyFilePath, file.name)
            //将文件从旧文件夹复制到新文件夹中
            fs.copyFileSync(OriginFile, CopyFile)
          } else {
            //如果是文件夹就递归变量把最新的文件夹路径传过去
            const CopyDirPath = path.resolve(CopyFilePath, file.name)
            const OriginDirPath = path.resolve(OriginFilePath, file.name)
            fs.mkdir(CopyDirPath, () => ({}))
            getFiles(OriginDirPath, CopyDirPath)
          }
        }
      })
    } else {
      fs.copyFileSync(OriginFilePath, CopyFilePath)
    }
  })
}

//传入路径
OriginFilePath.forEach((item, index) => {
  CopyFilePath[index].forEach((each) => {
    //判断要创建的文件夹（newFile）是否存在，不存在就创建一个
    if (!fs.existsSync(path.resolve(process.cwd(), each)) && !item.isFile) {
      fs.mkdir(path.resolve(process.cwd(), each), () => {
        // console.log(err)
      })
    }
    getFiles(
      path.resolve(process.cwd(), item.path),
      path.resolve(process.cwd(), each)
    )
  })
})
