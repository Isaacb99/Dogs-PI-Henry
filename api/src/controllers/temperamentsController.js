require('dotenv').config();
const { Temperament } = require("../db")
const axios = require("axios")
const {API_KEY} = process.env


const getCreateTemps = async () => {
    const tempDB = await Temperament.findAll()
    if(tempDB.length) return tempDB

    const temps = new Set()
    
    const tempsApi = (await axios.get(`http://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`)).data

    tempsApi.forEach(dog => {
        if(dog.temperament){
            const temp = dog.temperament.split(", ")
            temp.forEach((t) => temps.add(t))
        }
    });

    const tempsArray = Array.from(temps).map((tempName) => {
        return{
            name:tempName
        }
    })

    const getCreateTemps = async () => {
    const tempDB = await Temperament.findAll()
    if(tempDB.length) return tempDB

    const temps = new Set()
    
    const tempsApi = (await axios.get(`http://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`)).data

    tempsApi.forEach(dog => {
        if(dog.temperament){
            const temp = dog.temperament.split(", ")
            temp.forEach((t) => temps.add(t))
        }
    });

    const tempsArray = Array.from(temps).map((tempName) => {
        return{
            name:tempName
        }
    })
    
    tempsArray.sort((a,b) => a.name.localeCompare(b.name))

    const response = await Temperament.bulkCreate(tempsArray)
    return response
}

    const response = await Temperament.bulkCreate(tempsArray)
    return response
}

module.exports = getCreateTemps