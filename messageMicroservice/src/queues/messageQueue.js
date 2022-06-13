import Queue from "bull";
import "dotenv/config"
import sendMessagetoApi from "../clients/sendMessagetoApi.js";
import updateMessage from "../clients/updateMessage.js";


const messageQueue = new Queue("messageQueue", {
    redis: { host: `${process.env.REDISDOCKER}`, port: 6379 }
});

const creditQueue = new Queue("creditQueue", {
    redis: { host: `${process.env.REDISDOCKER}`, port: 6379 }
});


messageQueue.process(async (receivedInfo, done) => {

    await sendMessagetoApi(receivedInfo.data, updateMessage)
    done()
})


const addJobToCreditQueue = async (sentInfo) => {
    await creditQueue.add(sentInfo, {
        attempts: 5,
        backoff: 3000
    })
}
console.log("Init messageQueue")
export { addJobToCreditQueue }
