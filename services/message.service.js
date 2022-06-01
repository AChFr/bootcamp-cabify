const axios = require("axios")

class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `http://messageapp:3000`
            // baseURL: `http://localhost:3000`
        })
    }

    sendMessage(messagefromClient) {

        const messageToApi = {
            destination: messagefromClient.destination,
            body: messagefromClient.message
        }

        return this.axiosApp.post(`/message`, messageToApi)
    }

}

module.exports = APIHandler