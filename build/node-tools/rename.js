var fs = require('fs');
var path = require("path");
var root = path.resolve();
var distPath = path.join(root, 'dist')

// 将dist里输出的index.html更名为index.php
let pages = fs.readdirSync(distPath)
pages.forEach((dir) => {
  let pagePath =  path.join(distPath, dir)
  let pathStat = fs.statSync(pagePath)
  if (pathStat.isDirectory()) {
    let subPages = fs.readdirSync(pagePath)
    subPages.forEach((subPage) => {
      let subPagePath = path.join(pagePath, subPage)
      let subPagePathStat = fs.statSync(subPagePath)
      if (subPagePathStat.isFile()) {
        rename(subPagePath)
      }
    })
  } else if (pathStat.isFile()) {
    rename(pagePath, dir)
  }
})

function rename (oldPath) {
  let newPath = oldPath.replace('index.html', 'index.php')
  if (oldPath.includes('index.html')) {
    fs.renameSync(oldPath, newPath)
    console.log('文件：' + oldPath + ' 改为：' + newPath)
  }
}

console.log('所有文件更改完毕！')
