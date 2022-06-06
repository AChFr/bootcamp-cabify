require("./config/mongoose.config");

const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

require("./errors/messageappErrorHandler.js")(app);

module.exports = app;
