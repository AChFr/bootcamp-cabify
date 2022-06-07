import mongoose from "mongoose";

import database from "../database.js";

const creditSchema = new mongoose.Schema({

    amount: Number

});

export default database.model("Credit", creditSchema);
