import "dotenv/config"
import lockedSync from "locked-sync";
import { maindb, reservedb } from "../models/credit.js";
import { addJobToMessageQueue } from "../queues/creditQueue.js"


const sync = lockedSync();


const checkBalance = async (dbName) => {
    const availableCredit = await dbName.findOne()
    return (availableCredit) && (availableCredit.amount - process.env.MESSAGE_COST >= 0)
}

const modifyBalance = async (dbName, cost) => {

    const newBalance = await dbName.findOneAndUpdate({}, {
        $inc: { amount: - cost }
    }, { new: true })

    return newBalance
}

const backUpBalance = async (dbName, data) => {

    const newEntry = await dbName.replaceOne({}, { ...data }, { new: true, upsert: true })

    return newEntry

}


export default async () => {
    const end = await sync();
    let response
    try {
        const hasEnoughCredit = await checkBalance(maindb, process.env.MESSAGE_COST)
        if (hasEnoughCredit) {


            response = "QUEUED"
            try {
                const newCredit = await modifyBalance(maindb, process.env.MESSAGE_COST)
                await backUpBalance(reservedb, newCredit._doc)
            } catch (err) {
                response = "PAYMENT ERROR"
                console.error("impossible to modify Credit")
            }

        }
        else {

            console.log("Not enought money")
            response = "NO CREDIT"
        }

    } catch {
        //should be a retry credit check
        console.log("Error while checking balance on main db");

    } finally {
        end()
        return response
    }

}
