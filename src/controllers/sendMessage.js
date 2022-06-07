import http from "http";



import saveMessage from "../clients/saveMessage.js";
import checkCredit from "../clients/checkCredit.js";
import deductCredit from "../clients/deductCredit.js";


const messageCost = 10

export default async (req, res) => {

  const body = JSON.stringify(req.body);
  try {
    const enoughMoney = await checkCredit(messageCost)
  } catch (err) {
    console.log(err)
    res.statusCode = 500;
    res.end("Impossible to check balance.");
  }
  if (enoughMoney) {

    const postOptions = {
      //host: "127.0.0.1",
      host: "messageapp",
      port: 3000,
      path: "/message",
      method: "post",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const postReq = http.request(postOptions);

    postReq.on("response", async (postRes) => {
      try {
        await saveMessage({
          ...req.body,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
        });
        if (postRes.statusCode !== 200) {
          throw new Error('Error in the messageapp request');
        }
        await deductCredit(messageCost)
        res.statusCode = 200;
        res.end(postRes.body);
      } catch (error) {
        console.log(error.message);
        res.statusCode = 500;
        res.end(`Internal server error: SERVICE ERROR ${error.message}`);
      }
    });


    //impossible to implement following:

    /* Define a behaviour for the case when there's credit left but the external
   provider times out. You could, for instance, charge the operation, and check
   again later on to revert that charge if the provider indeed failed to send the message. */

    /* if messageapp times out, we save the message as "unconfirmed/timout" in the database. 
    there isnt a way -at least that im aware of- to check if that message was actually sent, as messagapp is inacessable*/

    /*the only way i can interpret this is to retry sending the message and overwritting the database entry afterwards*/


    postReq.on("timeout", async () => {
      console.error("Timeout Exceeded!");
      postReq.abort();

      try {
        await saveMessage({
          ...req.body,
          status: "TIMEOUT",
        });

      } finally {
        res.statusCode = 500;
        res.end("Internal server error: TIMEOUT");
      }
    });

    postReq.on("error", (error) => {
      res.statusCode = 500;
      res.end(error.message);
    });

    postReq.write(body);
    postReq.end();

  }

  else {
    res.statusCode = 500
    res.end("not enought credit. Top up!")
  }





}
