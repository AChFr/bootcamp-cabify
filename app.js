const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

require("./middleware/errors/api.errorHandler.js")(app);

module.exports = app;
