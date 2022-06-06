const Message = require("../models/Message.model")


const createEntry = async (entryInfo) => {
    try {
        const response = await Message.create(entryInfo)
        return response
    } catch (error) {
        return (error);
    }
}

const checkForDuplicates = async (searchCriteria) => {
    let response
    const isDuplicate = await Message.find(searchCriteria)
    response = isDuplicate.length === 0 ? false : true
    return response
}

const getEntries = async () => {

    const response = await Message.find()
    return response

}

module.exports = { createEntry, checkForDuplicates, getEntries }