const axios = require("axios")

class MessageappAPIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `http://messageapp:3000`,
            //baseURL: `http://localhost:3000`,
            timeout: 1500
        })
    }

    sendMessage = async (messagefromClient) => {

        const messageToApi = {
            destination: messagefromClient.destination,
            body: messagefromClient.message
        }

        try {
            const response = await this.axiosApp.post(`/message`, messageToApi)
            return response
        } catch (error) {
            return (error)
        }
    }

}

module.exports = MessageappAPIHandler