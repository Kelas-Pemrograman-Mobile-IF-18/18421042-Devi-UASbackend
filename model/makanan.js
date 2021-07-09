const mongoose = require('mongoose')
const userSchema = mongoose.Schema

({
  idMenu: {
    type : String
  },
  namaMenu: {
    type : String
  },
  hargaMenu: {
    type : String
  },
  ratingMenu : {
    type : String
  },
  kategori : {
    type : String
  },
  gambar: {
    type : String
  }
})

module.exports = mongoose.model('makanan', userSchema)