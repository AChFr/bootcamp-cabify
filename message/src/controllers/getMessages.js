const getMessages = require("../clients/getMessages");

const counterMetricExporter = require("../../metrics/counter.js")
const counter = counterMetricExporter("getMessage", "getMessageHelp")

const summaryMetricExporter = require("../../metrics/responseTime.js")
const summary = summaryMetricExporter("GetMessageResponseTime", "timesTheResponseOfGetMessages")

module.exports = function (req, res) {
  const observe_response_time = summary.startTimer();
  counter.inc(1)
  getMessages().then(messages => {
    res.json(messages);
  });
  observe_response_time();
};
