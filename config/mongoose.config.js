
const mongoose = require("mongoose");



// const MONGO_URI = "mongodb://localhost/server";
const MONGO_URI = "mongodb://mongodb/server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
