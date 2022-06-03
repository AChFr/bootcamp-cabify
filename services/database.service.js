const Message = require("../models/Message.model")


const createEntry = async (entryInfo) => {


    try {
        const response = await Message.create(entryInfo)
        return response
    } catch (error) {
        return (error);
    }


}

const getEntries = async () => {

    const response = await Message.find()
    return response

}
module.exports = { createEntry, getEntries }