import { mainMessage, reserveMessage } from "../models/message.js";
import lockedSync from "locked-sync";

const sync = lockedSync();
let mainDatabase = mainMessage
let secondaryDatabase = reserveMessage


export default async (id, messageInfo) => {
  const end = await sync();

  try {
    const doc = await mainDatabase.findByIdAndUpdate(id, messageInfo, { new: true })
    console.log("EL NUEVO======>", doc)
    await secondaryDatabase.findByIdAndUpdate(id, messageInfo, { new: true })
  } catch (err) {
    //implement que to sync db later
    console.log("Error while saving", err)
    throw err
  } finally {
    end()
  }
}
