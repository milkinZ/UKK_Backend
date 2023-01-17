const express = require("express")
const app = express()
const moment = require("moment")
const transaksi = require("../models/index").transaksi
const detail_transaksi = require("../models/index").detail_transaksi
const menu = require("../models/index").menu

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
    detail_transaksi.findAll({
        include: ["transaksi", "menu"]
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
        id_detail_transaksi: req.params.id
    }
    detail_transaksi.findAll({
        include: ["transaksi", "menu"],
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
        id_transaksi: req.body.id_transaksi,
        id_menu: req.body.id_menu,
        harga: req.body.harga
    }
    detail_transaksi.create(data)
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
        id_detail_transaksi: req.body.id_detail_transaksi
    }
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_menu: req.body.id_menu,
        harga: req.body.harga
    }
    detail_transaksi.update(data, { where: param })
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
        id_detail_transaksi: req.params.id
    }
    detail_transaksi.destroy({ where: param })
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