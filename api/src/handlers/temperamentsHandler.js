const getCreateTemps = require("../controllers/temperamentsController")

const getTempsHandler = async (req, res) => {
    try {
        const response = await getCreateTemps()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getTempsHandler