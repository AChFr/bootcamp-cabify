import http from "http"
import "dotenv/config"
import mongoose from "mongoose"
import saveMessage from "../clients/saveMessage.js"
import { addJobToCreditQueue } from "../queues/messageQueue.js"

export default async (req, res) => {

  const messageId = mongoose.Types.ObjectId()
  const messageInfo = { ...req.body, _id: messageId }


  try {
    await saveMessage({
      ...messageInfo, status: "QUEUED"
    })

    res.status(202).json(`your message was processed. id: ${messageId}`)
    try {

      addJobToCreditQueue(messageInfo)
    } catch {
      throw new Error("ERROR IN CREDIT SERVICE")
    }
  } catch (err) {
    res.status(500).json("an error ocurred, retry later")
  }


}





