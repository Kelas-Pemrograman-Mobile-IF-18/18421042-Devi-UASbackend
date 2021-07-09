const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const makanan = require('../controller/makanan')


var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    )
    cb(null, Date.now() + ext);
  },
  destination: function (req, file, cb) {
    cb(null, './gambar')
  }
})

var upload = multer({storage: storage}).single("gambar")

router.post("/input", upload, (req, res) => {
  makanan.inputDataMakanan(req.body, req.file.filename)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get("/dataMenu", (req, res) => {
  makanan.getDataMenu()
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get("/datamakanan/:kategori", (req, res) =>{
  makanan.lihatdataMenu(req.params.kategori)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get("/datamakanan/:id", (req, res) =>{
  makanan.lihatdetailMenu(req.params.id)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) =>{
  makanan.hapusMenu(req.params.id)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})


router.put("/ubah/:id", upload, (req, res) => {
  console.log(req.body)
  let filename;
  var changeImage = false
  if(req.file !== undefined) {
    //console.log('image kosong')
    filename = req.file.filename
    changeImage = true
  } else {
    filename = req.body.gambar
  }
  const data = Object.assign(req.body,{
    oldGambar: req.body.gambar,
    gambar: filename,
  })
  console.log(data)
  makanan.updateMakanan(req.params.id, data, changeImage)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

module.exports = router