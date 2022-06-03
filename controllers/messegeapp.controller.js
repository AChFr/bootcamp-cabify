const MessageappApiHandler = require("../services/message.service")
const messageService = new MessageappApiHandler

const sendMessage = async (messageInfo) => {

    const response = await messageService.sendMessage(messageInfo)

    if (response.data === "OK") {
        response.status = 200
        return response
    }
    else {
        response.status = 500
        return response
    }


}

module.exports = { sendMessage }