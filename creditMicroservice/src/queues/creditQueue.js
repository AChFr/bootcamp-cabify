import Queue from "bull";
import "dotenv/config"
import checkCredit from "../clients/checkCredit.js";


const creditQueue = new Queue("creditQueue", {
    redis: { host: `${process.env.REDISDOCKER}`, port: 6379 }
});

const messageQueue = new Queue("messageQueue", {
    redis: { host: `${process.env.REDISDOCKER}`, port: 6379 }
});

creditQueue.process(async (receivedInfo, done) => {
    const status = await checkCredit()
    addJobToMessageQueue({ ...receivedInfo.data, status: status })
    done()
})

const addJobToMessageQueue = async (sentInfo) => {

    await messageQueue.add(sentInfo)
}


console.log("Init creditQueue")
export { addJobToMessageQueue }
