const orderModel = require('../model/Order')
const mongoose = require('mongoose')
const response = require('../config/response')
const ObjectId = mongoose.Types.ObjectId

exports.insert = (data) =>
new Promise((resolve, reject) => {
  orderModel.create(data)
    .then(() => resolve(response.commonSuccessMsg('Berhasil Memesan')))
    .catch(()=> reject(response.commonErrorMsg('Mohon Maaf Transaksi Gagal')))
})

exports.getTransaksi = () =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userName",
          foreignField: "userName",
          as: "dataUser"
        }
      }
    ])
    .then((data) => {
      console.log(data)
      resolve(response.commonResult(data))
    })
    .catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal mendapatkan Data'))
    })
  })

  exports.lihatTransaksi = (userName) =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $match: {
          userName: userName
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userName",
          foreignField: "userName",
          as: "dataUser"
        }
      }
    ]).then((data) => {
      resolve(response.commonResult(data))
    }).catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal mendapatkan Data'))
    })
  })

  exports.ubahTransaksi = (id, data) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: ObjectId(id)
    }, {
      Status: data.Status
    })
    .then(() => resolve(response.commonSuccessMsg('Berhasil Merubah Data')))
    .catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal Merubah Data'))
    })
  })

  