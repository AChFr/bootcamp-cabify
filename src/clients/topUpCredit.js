import { mainCredit, reserveCredit } from "../models/credit.js";
import lockedSync from "locked-sync";

const sync = lockedSync();
let mainDatabase = mainCredit
let secondaryDatabase = reserveCredit

export default async (creditAmount) => {
  const end = await sync();
  try {

    const existingCreditOnMain = await mainDatabase.findOneAndUpdate({}, { $inc: { amount: creditAmount.amount } },
      { new: true, upsert: true })

    try {

      await secondaryDatabase.replaceOne({}, existingCreditOnMain._doc,
        { upsert: true })


    } catch (err) {
      //rollback. chack if timeout
      await mainDatabase.findOneAndUpdate({}, { $inc: { amount: -creditAmount.amount } },
        { new: true, upsert: true })
      console.log(err)
      throw new Error("something went wrong. safty rollback executed")
    }
    return `your new balance is ${existingCreditOnMain.amount}`

  } catch (err) {

    throw err

  } finally {
    end()

  }
}


