import mongoose from "mongoose";

const server = "127.0.0.1:27018";
//const server = "mongodbbackup:27017";
const database = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});
