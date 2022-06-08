import { mainCredit, reserveCredit } from "../models/credit.js";

let mainDatabase = mainCredit
let secondaryDatabase = reserveCredit

export default async (messageCost) => {

    try {
        const existingCreditOnMain = await mainDatabase.findOne()

        if ((existingCreditOnMain) && (existingCreditOnMain.amount - messageCost >= 0)) {
            return true
        } else {
            return false
        }
    } catch {
        console.log("Error while checking balance on main db");
        try {
            const existingCreditOnSeconday = await secondaryDatabase.findOne()
            if ((existingCreditOnSeconday) && (existingCreditOnSeconday.amount - messageCost >= 0)) {
                return true
            } else {
                return false
            }
        } catch (err) {
            throw new Error(("something went wrong. unable to check balance on either database. message aborted"))
        }
    }
}
