import Credit from "../models/credit.js";

export default async (messageCost) => {

    try {
        const existingCredit = await Credit.findOne()
        existingCredit.amount -= messageCost
        await existingCredit.save();

    } catch (err) {
        console.log("Error while deducting balance", err);
    }
}
