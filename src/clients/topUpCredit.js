import Credit from "../models/credit.js";

export default async (creditAmount) => {

  try {
    const existingCredit = await Credit.findOne()

    if (existingCredit) {

      existingCredit.amount = existingCredit.amount + creditAmount.amount
      const newCredit = await existingCredit.save();

      console.log("credit topped succesfully:", newCredit);
      return newCredit;


    } else {
      const startingCredit = new Credit({ amount: 50 })
      const newCredit = await startingCredit.save()

      console.log("credito abierto")
      return newCredit;
    }



  } catch (err) {
    console.log("Error while saving", err);
  }
}


