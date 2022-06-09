import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";
import redis from "./redis.js";

import getMessages from "./src/controllers/getMessages.js";
import getMessageStatus from "./src/clients/getMessageStatus.js";
import sendMessage from "./src/controllers/sendMessage.js";
import topUpCredit from "./src/controllers/topUpCredit.js";


const app = express();
redis()

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
};

const creditSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number"
    }
  }
}

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  sendMessage
);

app.post("/credit",
  bodyParser.json(),
  validate({ body: creditSchema }),
  topUpCredit
)

app.get("/messages", getMessages);
app.get("/message/:taskID/status", getMessageStatus)
app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
