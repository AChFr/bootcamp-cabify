const databaseApiHandler = require("../services/database.service")

let responseFromApi
let firstTry = true
let status

const recordMessage = async (entryInfo) => {

    responseFromApi = await databaseApiHandler.createEntry(entryInfo)

    if ((responseFromApi instanceof Error)) {

        if (responseFromApi.message.includes("timeout") || responseFromApi.name.includes("timeout")) {

            const thisMoment = Date.now()
            const momentsAgo = new Date(thisMoment - 1000)
            const duplicate = await databaseApiHandler.checkForDuplicates({ ...entryInfo, createdAt: momentsAgo })

            if (duplicate) {
                status = "success"
            }
            else {
                firstTry ? await retry(entryInfo) : giveUp()
            }
            return status
        }

        else {
            firstTry ? await retry(entryInfo) : giveUp()
            return status
        }

    }

    else {
        firstTry = true
        status = "success"
        return status
    }
}

const retry = async (entryInfo) => {
    firstTry = false
    console.log("lo reinteti")
    await recordMessage(entryInfo)
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

module.exports = { recordMessage }