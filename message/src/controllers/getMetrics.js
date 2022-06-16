const client = require('prom-client')
const metricExporter = require("../../metrics/counter.js")

const counter = metricExporter("generalCounter", "generalCounterHelp")


module.exports = async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
};
