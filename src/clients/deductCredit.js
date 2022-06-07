import Credit from "../models/credit.js";
import lockedSync from "locked-sync";
const sync = lockedSync();

export default async (messageCost) => {
    const end = await sync();
    try {
        const existingCredit = await Credit.findOne()
        existingCredit.amount -= messageCost
        await existingCredit.save();

    } catch (err) {
        console.log("Error while deducting balance", err);
    } finally { end() }
}
