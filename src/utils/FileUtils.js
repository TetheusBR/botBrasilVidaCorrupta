const fs = require('fs')
const path = require('path')
const { promisify } = require('util')


const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)

const requireDirectory = async (dirPath, success, error, recursive = true) => {
    const files = await readdir(dirPath)
    const filesObject = {}
    return Promise.all(files.map(async file => {
      const fullPath = path.resolve(dirPath, file)
      if (file.match(/\.(js|json)$/)) {
        try {
          const required = require(fullPath)
          if (success) success(required, file.replace(/.js|.json/g, ''), dirPath.split(/\\|\//g).pop())
          filesObject[file] = required
          return required
        } catch (e) {
          error(e)
        }
      } else if (recursive) {
        const isDirectory = await stat(fullPath).then(f => f.isDirectory())
        if (isDirectory) {
          return requireDirectory(fullPath, success, error)
        }
      }
    })).then(() => filesObject).catch(console.error)
}

module.exports = { readFile, readdir, stat, requireDirectory }