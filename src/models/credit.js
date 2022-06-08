import mongoose from "mongoose";

import database from "../database.js";
import backupDatabase from "../backupDatabase.js";


const creditSchema = new mongoose.Schema({

    amount: Number

});

const mainCredit = database.model("Credit", creditSchema)
const reserveCredit = backupDatabase.model("Credit", creditSchema)
export { mainCredit, reserveCredit }