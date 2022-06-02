const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()




const contentValidator = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json("You need to provide a valid JSON as a req.body.")
    }

    if (Object.keys(req.body).length > 2) {
        return res.status(400).json("You need to provide destination and message only.")
    }

    if (Object.keys(req.body).length < 2) {
        return res.status(400).json("You need to provide both destination and message.")
    }

    if ((Object.values(req.body)[0].length === 0) || (Object.values(req.body)[1].length === 0)) {
        return res.status(400).json("You need to specify both the destination and the message, they cannot be empty.")
    }

    if (!Object.keys(req.body).includes("destination")) {
        return res.status(400).json("The properties can only be called destination and message.")
    }
    if (!Object.keys(req.body).includes("message")) {
        return res.status(400).json("The properties can only be called destination and message.")
    }

    next()

}



module.exports = { contentValidator, jsonParser }