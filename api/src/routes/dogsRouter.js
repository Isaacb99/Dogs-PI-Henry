const { Router } = require("express");
const {getDogsHandler, getDogIdHandler , createDog, getDogsNameHandler} = require("../handlers/dogsHandler")

const dogsRouter = Router()

dogsRouter
    .get("/", getDogsHandler)
    .get("/name", getDogsNameHandler)
    .get("/:id", getDogIdHandler)
    .post("/", createDog)

module.exports = dogsRouter