import Message from "../models/message.js";
import lockedSync from "locked-sync";
const sync = lockedSync();

export default async (messageParams) => {
  const message = new Message(messageParams);
  const end = await sync();
  try {

    const doc = await message.save();

    console.log("Message saved succesfully:", doc);
    return doc;
  } catch (err) {
    console.log("Error while saving", err);
  } finally {
    end()
  }
}
