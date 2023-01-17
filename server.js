const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const user = require("./router/user")
app.use("/kasir_kafe/user", user)

const menu = require("./router/menu")
app.use("/kasir_kafe/menu", menu)

const meja =require("./router/meja")
app.use("/kasir_kafe/meja", meja)

const transaksi = require("./router/transaksi")
app.use("/kasir_kafe/transaksi", transaksi)

const detail_transaksi = require("./router/detail_transaksi")
app.use("/kasir_kafe/detail_transaksi", detail_transaksi)

app.listen(4040, () => {
    console.log("Server run on port 4040")
})