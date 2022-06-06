const MessageappApiHandler = require("../services/message.service")
const messageService = new MessageappApiHandler

let responseFromApi
let status
let firstTry = true

const sendMessage = async (messageInfo) => {

    responseFromApi = await messageService.sendMessage(messageInfo)

    if (responseFromApi instanceof Error) {
        firstTry ? await retry(messageInfo) : giveUp()
        return status
    }
    else {
        firstTry = true
        status = "success"
        return status
    }
}

const retry = async (messageInfo) => {
    firstTry = false
    await sendMessage(messageInfo)
    return status
}

const giveUp = () => {
    firstTry = true

    if (responseFromApi.message.includes("timeout") || responseFromApi.name.includes("timeout")) {
        status = "timeout"
        return status
    }
    else {
        status = "failure"
        return status
    }
}
module.exports = { sendMessage }