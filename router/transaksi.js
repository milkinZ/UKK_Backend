const express = require("express")
const app = express()
const moment = require("moment")
const user = require("../models/index").user
const transaksi = require("../models/index").transaksi
const meja = require("../models/index").meja

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
    transaksi.findAll({
        include: ["user", "meja"]
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/:id", async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    transaksi.findAll({
        include: ["user", "meja"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", async (req, res) => {
    let data = {
        tgl_transaksi: moment().format("YYYY-MM-DD"),
        id_user: req.body.id_user,
        id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        status: req.body.status
    }
    transaksi.create(data)
        .then(result => {
            res.json({
                message: "Data Berhasil Ditambahkan",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", async (req, res) => {
    let param = {
        id_transaksi: req.body.id_transaksi
    }
    let data = {
        tgl_transaksi: moment().format("YYYY-MM-DD"),
        id_user: req.body.id_user,
        id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        status: req.body.status
    }
    transaksi.update(data, { where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Diperbarui"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    transaksi.destroy({ where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app