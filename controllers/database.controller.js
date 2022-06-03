const databaseApiHandler = require("../services/database.service")


const recordMessage = async (entryInfo) => {

    const response = await databaseApiHandler.createEntry(entryInfo)


    if (!response.name) {
        response.status = 201
        return response
    }

    else if (response.name === "MongooseError") {
        response.status = 503
        return response
    }
    else {
        response.status = 500
        return response
    }
}

module.exports = { recordMessage }