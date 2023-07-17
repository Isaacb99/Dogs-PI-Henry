const {getAllDog, getDogId, createDogDB, getDogName} = require("../controllers/dogsController")


const getDogsHandler = async (req, res) =>{
    
    try {
            const response = await getAllDog()
            res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

const getDogsNameHandler = async (req,res) => {
    const {name} = req.query
    try {
            const response = await getDogName(name)
            res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getDogIdHandler = async (req, res) =>{
    const {id} = req.params
    try {
        const response = await getDogId(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createDog = async (req, res) => {
    const {
        name, 
        image, 
        maxHeight, 
        minHeight,
        maxWeight, 
        minWeight,
        minLife_span, 
        maxLife_span,
        temperament} = req.body
    try {
        const response = await createDogDB(name, image, temperament, maxHeight, minHeight, maxWeight, minWeight, minLife_span, maxLife_span)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getDogsHandler,
    getDogsNameHandler,
    getDogIdHandler,
    createDog
}