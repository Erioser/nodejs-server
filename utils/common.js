
const common = {
  removeUselessProperty (obj) {
    for (let key in obj) {
      if (
        obj[key] === undefined ||
        obj[key] === ''
      ) {
        delete obj[key]
      }
    }
    return obj
  }
}

module.exports = common