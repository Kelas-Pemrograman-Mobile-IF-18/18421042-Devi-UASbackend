const router = require('express').Router()
const Order = require('../controller/Order')

router.post('/insert', (req, res) => {
  console.log(req.body)
  Order.insert(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/lihatTransaksi", (req, res) => {
  Order.getTransaksi()
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get('/dataTransaksi/:userName', (req, res) => {
  console.log(req.params.userName)
  Order.lihatTransaksi(req.params.userName)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.put('/ubah/:id', (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  Order.ubahTransaksi(req.params.id, req.body)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})


module.exports = router