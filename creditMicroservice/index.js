import bodyParser from "body-parser"
import express from "express"
import { ValidationError, Validator } from "express-json-validator-middleware"

import topUpCredit from "./src/controllers/topUpCredit.js"


const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;



const creditSchema = {
    type: "object",
    required: ["amount"],
    properties: {
        amount: {
            type: "number"
        }
    }
}


app.post("/credit",
    bodyParser.json(),
    validate({ body: creditSchema }),
    topUpCredit
)

app.use((err, req, res, _next) => {
    console.log(res);
    if (err instanceof ValidationError) {
        res.sendStatus(400)
    } else {
        res.sendStatus(500)
    }
})

const port = 9017;
app.listen(port, () => {
    console.log("credit service started on PORT: ", port)
});
