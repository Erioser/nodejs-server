const FS = require('fs-extra')
const MOMONET = require('moment')
module.exports = {
    errorHandler (err)  {
        let time = MOMONET()
        let day = time.format('YY-MM-DD')
        let more = time.format('YY-MM-DD hh:mm:ss')
        return FS.appendFile(`${__dirname}/errors/${day}-error.log`, `${more}  ${err} \r`)
    }
}