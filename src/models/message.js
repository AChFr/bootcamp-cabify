import mongoose from "mongoose";

import database from "../database.js";
import backupDatabase from "../backupDatabase.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"],
  },
});

const mainMessage = database.model("Message", messageSchema)
const reserveMessage = backupDatabase.model("Message", messageSchema)
export { mainMessage, reserveMessage }
