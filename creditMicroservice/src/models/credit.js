import mongoose from "mongoose";

import { mainDatabase, backupDatabase } from "../database/database.js";

const creditSchema = new mongoose.Schema({
    amount: Number
});

const maindb = mainDatabase.model("Credit", creditSchema)
const reservedb = backupDatabase.model("Credit", creditSchema)


export { maindb, reservedb }