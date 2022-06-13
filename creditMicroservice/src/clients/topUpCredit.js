import { maindb, reservedb } from "../models/credit.js"
import lockedSync from "locked-sync"

const sync = lockedSync();


export default async (creditAmount) => {
  const end = await sync();
  try {

    const existingCreditOnMain = await maindb.findOneAndUpdate({}, { $inc: { amount: creditAmount.amount } },
      { new: true, upsert: true })

    try {

      await reservedb.replaceOne({}, existingCreditOnMain._doc,
        { upsert: true })

    } catch (err) {

      await maindb.findOneAndUpdate({}, { $inc: { amount: -creditAmount.amount } },
        { new: true, upsert: true })
      console.log(err)
      throw new Error("something went wrong. safty rollback executed")
    }

    return `your new balance is ${existingCreditOnMain.amount}`

  } catch (err) {

    //should switch databases(next step)
    console.error(err)
  } finally {
    end()

  }
}


