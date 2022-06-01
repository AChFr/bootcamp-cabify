const APIHandler = require("../services/message.service");
const router = require("express").Router();

const messageService = new APIHandler

router.post("/messages", (req, res, next) => {

  messageService
    .sendMessage(req.body)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

module.exports = router;


