
let cache = {}
const connect = (database) => {
  if (cache[database]) return mongoose
  const mongoose = require('mongoose');
  mongoose.connect(`mongodb://47.92.164.250:27017/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  cache[database] = mongoose
  return mongoose
}

module.exports = connect