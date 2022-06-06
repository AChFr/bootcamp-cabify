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
    isDuplicate.length === 0 ? response = false : response = true
    return response
}

const getEntries = async () => {

    const response = await Message.find()
    return response

}


const deleteAll = () => {
    Message.collection.drop()
}
module.exports = { createEntry, checkForDuplicates, getEntries, deleteAll }