import { mainCredit, reserveCredit } from "../models/credit.js";

let mainDatabase = mainCredit
let secondaryDatabase = reserveCredit

const checkBalance = async (dbName, cost) => {
    const existingonDb = await dbName.findOne()
    return (existingonDb) && (existingonDb.amount - cost >= 0)
}


export default async (messageCost) => {

    try {
        return await checkBalance(mainDatabase, messageCost)
    } catch {
        console.log("Error while checking balance on main db");
        try {
            return await checkBalance(secondaryDatabase, messageCost)
        } catch (err) {
            throw new Error(("something went wrong. unable to check balance on either database. message aborted"))
        }
    }
}
