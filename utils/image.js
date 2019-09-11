const storage = require('../utils/storage')
const request = require('../utils/request')
const qs = require('querystring')
const fs = require('fs')

const util = {
  getAccessToken () {
    return new Promise(async resolve => {

      let token = storage.getStorage('token/bai_access_token')
      if (token) return resolve(token)

      const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'xsdVxZK2e24KQiWdS5lXQQSe',
        'client_secret': 'LL0o0QEW1jLjGLmUR3FiVSnEmqjpIWvQ'
      });
      const params = {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
      }
      let rawData = await request.get('https', params)
      let access_token = JSON.parse(rawData).access_token
      storage.setStorage('token/bai_access_token', access_token)
      resolve(access_token)

    })
  },
  // url, image
  async getImageText (params) {
    let access_token = await util.getAccessToken()
    let data = qs.stringify(params)

    const options = {
      hostname: 'aip.baidubce.com',
      path: '/rest/2.0/ocr/v1/general_basic?access_token=' + access_token,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    }

    let result = await request.post('https', data, options)
    return JSON.parse(result)
  },
  saveImageToPath (file, path) {

    const reader = fs.createReadStream(file.path);
    let filePath = path + `/${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);

  },
  getImageBase64 (file) {
    return new Promise(resolve => {

      const reader = fs.createReadStream(file.path)
      let chunks = []
      reader.on('data', (chunk) => {
        chunks.push(chunk)
      })
      reader.on('end', () => {
        let data = Buffer.concat(chunks, file.size)
        let base64Img = data.toString('base64')
        resolve(base64Img)
      })
      
    })
  }
}

module.exports = util