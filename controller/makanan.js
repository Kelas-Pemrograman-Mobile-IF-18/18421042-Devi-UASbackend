const makanan = require('../model/makanan')
const response = require('../config/response')
const mongoose = require('mongoose')
const fs = require('fs')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataMakanan = (data, gambar) =>
  new Promise(async (resolve, reject) => {
      const makananBaru = new makanan({
        idMenu : data.idMenu,
        namaMenu : data.namaMenu,
        hargaMenu : data.hargaMenu,
        ratingMenu : data.ratingMenu,
        kategori : data.kategori,
        gambar : gambar
      })
      await makanan.findOne({idMenu: data.idMenu})
        .then(makanan => {
          if(makanan){
            reject(response.commonErrorMsg('id menu sudah digunakan'))
          } else {
              makananBaru.save()
                .then(r=>{
                  resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
              }).catch(err => {
                  reject(response.commonErrorMsg('Gagal Menginput Data'))
            })
          }
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
  })


  exports.getDataMenu = () =>
    new Promise((resolve, reject) => {
      makanan.find({})
      .then(data => resolve(response.commonResult(data)))
      .catch(err => reject(response.commonError))
    })

  exports.lihatdataMenu = (kategori) =>
    new Promise(async (resolve, reject) => {
      makanan.find({kategori: kategori})
        .then(result => {
          resolve(response.commonResult(result))
        })
        .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

    exports.lihatdetailMenu = (idMenu) =>
    new Promise(async (resolve, reject) => {
      makanan.findOne({idMenu: idMenu})
        .then(result => {
          resolve(response.commonResult(result))
        })
        .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

    exports.updateMakanan = (id, data, changeImage) =>
      new Promise(async (resolve, reject) => {
        makanan.findOne({
          _id: ObjectId(id)
        }).then((makan) => {
          if (changeImage) {
            fs.unlinkSync(`./gambar/${makan.gambar}`)
          }
          makanan.updateOne(
            {_id : ObjectId(id)}, data)
            .then(makanan => {
              resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
            }).catch(err => {


              console.log(err)
              reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            })
        })
      })

      exports.hapusMenu = (_id) =>
        new Promise(async(resolve, reject) =>{
          makanan.findOne({
            _id: ObjectId(_id)
          }).then((makan) => {
            fs.unlinkSync(`./gambar/${makan.gambar}`)
            makanan.remove({_id: ObjectId(_id)})
              .then(() =>{
                resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
              }).catch(() =>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
              })
          })
        })