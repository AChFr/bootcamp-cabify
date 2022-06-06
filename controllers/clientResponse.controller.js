const { sendMessage } = require("./messegeapp.controller")
const { recordMessage } = require("./database.controller");


const response = {}
const responseToClient = {}

const sendAndRecord = async (messageInfo) => {
    const entryData = { ...messageInfo, status: undefined }
    response.fromMessageapp = await sendMessage(messageInfo)
    switch (response.fromMessageapp) {
        case "success":
            entryData.status = "sent"
            break
        case "timeout":
            entryData.status = "unconfirmed"
            break
        case "failure":
            entryData.status = "not sent"
            break
    }
    response.fromDatabase = await recordMessage(entryData)
}




const formClientResponse = async (requestBody) => {

    await sendAndRecord(requestBody)
    let statusCombination = response.fromMessageapp + "&" + response.fromDatabase


    switch (statusCombination) {
        case "success&success":
            responseToClient.message = "message sent and recorded as such."
            responseToClient.status = 200
            break
        case "success&timeout":
            responseToClient.message = "message sent but we are uncertain if it was recorded"
            responseToClient.status = 503
            break
        case "success&failure":
            responseToClient.status = 500
            responseToClient.message = "message sent but not recorded"
            break


        case "timeout&success":
            responseToClient.status = 503
            responseToClient.message = "message status is uncertain and was recorded as such"
            break
        case "timeout&timeout":
            responseToClient.status = 503
            responseToClient.message = "the message app and the database both timed out. we are uncertain about everything"
            break
        case "timeout&failure":
            responseToClient.status = 503
            responseToClient.message = "message app timed out and the database crashed"
            break


        case "failure&success":
            responseToClient.status = 500
            responseToClient.message = " message was not sent and was recorded as such"
            break
        case "failure&timeout":
            responseToClient.status = 500
            responseToClient.message = "message was not sent and the databese timed out"
            break
        case "failure&failure":
            responseToClient.status = 500
            responseToClient.message = "messageapp and databse both crashed"
            break


        default:
            responseToClient.status = 500
            responseToClient.message = "something unexpected happened"
            break
    }

    return responseToClient
}




module.exports = { formClientResponse }