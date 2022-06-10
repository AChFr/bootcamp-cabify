import { mainMessage, reserveMessage } from "../models/message.js";
import lockedSync from "locked-sync";

const sync = lockedSync();
let mainDatabase = mainMessage
let secondaryDatabase = reserveMessage


export default async (messageParams) => {
  const end = await sync();


  try {
    const doc = await mainDatabase.create(messageParams)
    await secondaryDatabase.create(doc._doc)
    return doc._doc
  } catch (err) {
    //implement que to sync db later
    console.log("Error while saving", err)
    throw err
  } finally {
    end()
  }
}
