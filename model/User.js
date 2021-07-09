const mongoose = require('mongoose')
const userSchema = mongoose.Schema

({
  userName: {
    type : String
  },
  no_telp : {
    type: String
  },
  alamat: {
    type: String
  },
  role : {
    type: Number
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('users', userSchema)