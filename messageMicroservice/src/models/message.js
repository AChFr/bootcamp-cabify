import mongoose from "mongoose"

import { mainDatabase, backupDatabase } from "../database/database.js"


const messageSchema = new mongoose.Schema({

  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT", "NO CREDIT", "PAYMENT ERROR", "QUEUED"],
  },
})

const mainMessage = mainDatabase.model("Message", messageSchema)
const reserveMessage = backupDatabase.model("Message", messageSchema)
export { mainMessage, reserveMessage }
