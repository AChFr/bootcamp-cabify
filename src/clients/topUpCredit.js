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
    console.log(existingCreditOnMain)
    try {
      //for some reason only works if both databases start emty. it wont let me change an existing _id 
      //in the secondary DB, despite using the aparrently correct method
      await secondaryDatabase.replaceOne({}, { _id: existingCreditOnMain._id, amount: existingCreditOnMain.amount },
        { upsert: true })


    } catch (err) {

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


