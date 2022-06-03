
const router = require("express").Router();

const { reqBodyValidator, jsonParser } = require("../middleware");

const { sendMessage } = require("../controllers/messegeapp.controller")
const { recordMessage } = require("../controllers/database.controller");

const { getEntries } = require("../services/database.service")

router.post("/messages", jsonParser, reqBodyValidator, async (req, res, next) => {

  let response = {}

  response.fromMessageapp = await sendMessage(req.body)
  response.fromDatabase = await recordMessage(req.body)

  if (response.fromMessageapp.status === 200
    && response.fromDatabase.status === 201) {
    return res.status(200).json("Your message was sent")
  }
  else if (response.fromMessageapp.status === 200
    && response.fromDatabase.status === 503) {

    return res.status(200).json("your message was sent but not stored. we will try to store it again")
  }

  else {
    return res.status(500).json("An error ocurred. Please retry later")
  }



})

router.get("/messages", async (req, res, next) => {

  const popino = await getEntries()

  console.log(popino)
  return res.status(200).json(popino)
})


router.put("/messages", (req, res, next) => {
  res.status(405).json("This method is not authorized for this endpoint")
})
router.patch("/messages", (req, res, next) => {
  res.status(405).json("This method is not authorized for this endpoint")
})
router.delete("/messages", (req, res, next) => {
  res.status(405).json("This method is not authorized for this endpoint")
})



module.exports = router;


