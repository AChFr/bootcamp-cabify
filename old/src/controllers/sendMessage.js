import http from "http";

import saveMessage from "../../../old/src/clients/saveMessage.js";
import checkCredit from "../clients/checkCredit.js";
import deductCredit from "../clients/deductCredit.js";
import mainQueue from "../../../old/src/clients/mainQueue.js";
import uniqid from "uniqid"


const messageCost = 10




export default async (req, res) => {

  const body = JSON.stringify(req.body);
  let enoughMoney

  try {
    enoughMoney = await checkCredit(messageCost)
  } catch (err) {
    console.log(err)
    res.statusCode = 500;
    res.end("Impossible to check balance. Message aborted");
  }

  if (enoughMoney) {
    const messageSendingProcess = (body, id) => {

      const postOptions = {
        host: "127.0.0.1",
        //host: "messageapp",
        port: 3000,
        path: "/message",
        method: "post",
        json: true,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        }
      }

      const postReq = http.request(postOptions);
      postReq.on("response", async (postRes) => {
        try {
          await saveMessage({
            ...req.body,
            status: postRes.statusCode === 200 ? "OK" : "ERROR",
            taskID: id
            //should retry sending the message
          });

          res.statusCode = 200;
          res.end(`your message was sent. ID:${id}`)

        } catch (err) {
          await deductCredit(-messageCost)
          res.statusCode = 500;
          res.end(`your message wasnt send, no credit deduction`)
          //res.end(`Internal server error: SERVICE ERROR ${err}`);
        }
      });

      postReq.on("timeout", async () => {
        console.error("Timeout Exceeded!");
        postReq.abort();
        try {
          await saveMessage({
            ...req.body,
            status: "TIMEOUT",
            taskID: id
          });
        } finally {
          res.statusCode = 500;
          res.end("Internal server error: TIMEOUT");
        }
      });

      postReq.on("error", async (err) => {
        console.log("ERRRooooooooooorrrrRRRRRRRRRR")
        res.statusCode = 500;
        res.json(err);
      });
      postReq.write(body);
      postReq.end();
    }
    const taskID = uniqid()
    await deductCredit(messageCost)
    mainQueue(messageSendingProcess(body, taskID), taskID)

  } else {
    res.statusCode = 500
    res.end("not enought credit. Top up!")
  }

}
