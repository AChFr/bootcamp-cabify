import { mainMessage, reserveMessage } from "../models/message.js";
import lockedSync from "locked-sync";

const sync = lockedSync();
let mainDatabase = mainMessage
let secondaryDatabase = reserveMessage


export default async (messageParams) => {
  const end = await sync();


  try {
    const doc = await mainDatabase.create(messageParams)

    // tried to simplify it the most, but  {..doc} did not work
    await secondaryDatabase.create({ _id: doc._id, destination: doc.destination, body: doc.body, status: doc.status })
    return doc
  } catch (err) {
    console.log("Error while saving", err)
    throw err
  } finally {
    end()
  }
}
