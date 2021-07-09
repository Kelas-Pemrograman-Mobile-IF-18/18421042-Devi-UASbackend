const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const OrderSchema = new Schema({
  userName: {
    type: String
  },
  namamenu: {
    type: String
  },
  harga: {
    type: String
  },
  jumlah: {
    type: String
  },
  total: {
    type: String
  },
  // 1 = sedang proses, 2 = proses pengiriman, 3 = pesanan sudah diterima
  Status: {
    type: String
  }
})

module.exports = mongoose.model('order', OrderSchema)