const Fs = require('fs')
const Path = require('path')

const util = {

  setStorage (key, value) {
    let [file, _key] = util.handleKey(key)
    let data = util.readFile(file)
    data[_key] = value
    util.writeFile(file, data)
  },
  getStorage (key) {
    let [file, _key] = util.handleKey(key)
    let data = util.readFile(file)
    return data[_key] || null
  },
  handleKey (key) {
    let arr = key.split('/')
    return [ arr[0], arr[1] ]
  },
  readFile (file) {
    let path = Path.resolve(__dirname, `../storage/${file}.json`)
    let str = Fs.readFileSync(path)
    return JSON.parse(str)
  },
  writeFile (file, data) {
    let path = Path.resolve(__dirname, `../storage/${file}.json`)
    Fs.writeFileSync(path, JSON.stringify(data))
  }

}
module.exports = util