import Credit from "../models/credit.js";

export default async (messageCost) => {

    try {
        const existingCredit = await Credit.findOne()

        if ((existingCredit) && (existingCredit.amount - messageCost >= 0)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("Error while checking balance", err);
    }
}
