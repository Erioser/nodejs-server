

const service = {
  success (data) {
    this.response.body = service.template(200, data)
  },
  fail (code, msg) {
    this.response.body = service.template(code, msg)
  },
  template (code, data, msg = '出错了') {
    return {
      code,
      data: data || null,
      msg: code === 200 ? 'success' : msg
    }
  }
}
module.exports = service