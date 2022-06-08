import { mainCredit, reserveCredit } from "../models/credit.js";
import lockedSync from "locked-sync";

const sync = lockedSync();
let mainDatabase = mainCredit
let secondaryDatabase = reserveCredit

export default async (messageCost) => {
    const end = await sync();
    try {

        const existingCreditOnMain = await mainDatabase.findOneAndUpdate({}, { $inc: { amount: -messageCost } }, { new: true })

        try {
            await secondaryDatabase.findOneAndReplace({}, { amount: existingCreditOnMain.amount }, { new: true, })
        } catch {
            throw new Error("something went wrong. no payment has been made. the message wont be sent")
        }


    } catch (err) {
        throw err
    } finally {
        end()

    }
}
