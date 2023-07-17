const { Router } = require("express")
const getTempsHandler = require("../handlers/temperamentsHandler")

const tempRouter = Router()

tempRouter
    .get("/", getTempsHandler)

module.exports = tempRouter