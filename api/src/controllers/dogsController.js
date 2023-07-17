require('dotenv').config();
const {Dog, Temperament} = require("../db")
const axios = require("axios")
const {API_KEY} = process.env


const getDogDB = async () => {

    const allDogs = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through:{attributes: []}
        }
    }) 

    const filter = allDogs.map((dog) => {
        if(dog.Temperaments.length){
            
            var temp = dog.Temperaments.map((t) => t.name).join(", ")
        }else temp = "Not Found"
        //const resultado = arrayDeObjetos.map(objeto => objeto.temperamentos.map(temperamento => temperamento.name).join(', '));
        return{
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            temperament: temp,
            image: dog.image,
            life_span: dog.life_span
        }
    })    
    return filter

}

const getDogApi = async () => {
    const response = (await axios.get(`http://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`)).data

    const apiMap = response.map((dog) =>{
        return{
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric? dog.weight.metric : "Not Found",
            height: dog.height.metric? dog.height.metric : "Not Found",
            temperament: dog.temperament? dog.temperament : "Not Found",
            image: dog.image.url,
            life_span: dog.life_span
        }
    })
    return apiMap
}

const getAllDog = async () => {
    const dogsDB = await getDogDB()
    const dogsApi = await getDogApi()
    const allDogs = [...dogsDB, ...dogsApi]

    return allDogs

}

const getDogName = async (name) => {
    
    const allDogs = await getAllDog()

    if(name){
        let dogsFilter = allDogs.filter((dog) =>
            dog.name.toLowerCase().includes(name.toLowerCase()))
            
        if(!dogsFilter.length) throw new Error(`No se encontro el perro con el nombre: ${name}`)
        return dogsFilter
    }
    else throw new Error("El nombre ingresado es incorrecto")
}

const getDogId = async (id) => {
    if(isNaN(id)){
        const dogDB = await Dog.findByPk(id)
        if(dogDB) return dogDB
        else throw new Error(`No se encontro un perro con el id: ${id}`)
    }

    const dogs_api = await getDogApi()
    const dogFiltered = dogs_api.find(dog => dog.id === Number(id))
    if(dogFiltered) return dogFiltered
    else throw new Error(`No se encontro un perro con el id: ${id}`)

}


const createDogDB = async (name, image, temperament, maxHeight, minHeight, maxWeight, minWeight, minLife_span, maxLife_span) => {
    
    if(!name || !image  || !maxHeight || !minHeight || !maxWeight || !minWeight || !minLife_span || !maxLife_span){
        throw new Error("Faltan datos para la creacion")
    }

    const allDogs = await getAllDog()

    const dogFound = allDogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase())

    if(dogFound) throw new Error(`El perro con nombre: ${name} ya existe`)
    
    const created = await Dog.create({name, image, height:`${minHeight} - ${maxHeight}`, weight: `${minWeight} - ${maxWeight}`, life_span: `${minLife_span} - ${maxLife_span} years`})

    await created.addTemperament(temperament)
    return created
}


module.exports = {
    getAllDog,
    getDogName,
    getDogId,
    createDogDB
}