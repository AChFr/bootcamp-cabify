const sendMessage = require("../jobs/sendMessage");
const logger = require("loglevel");
const metricExporter = require("../../metrics/responseTime.js")
const summary = metricExporter("PostMessageResponseTime", "timesTheResponseOfPostMessage")
module.exports = async function (req, res) {

  const observe_response_time = summary.startTimer();


  await sendMessage(req.body)
    .then(messageId => {
      const response = {
        messageId
      }
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    })

    .catch(error => {
      logger.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    });
  observe_response_time();
};
