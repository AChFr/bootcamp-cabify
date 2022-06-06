const router = require("express").Router();

const { reqBodyValidator, jsonParser } = require("../middleware");
//const { sendMessage } = require("../controllers/messegeapp.controller")
//const { recordMessage } = require("../controllers/database.controller");
const { getEntries, deleteAll } = require("../services/database.service")

const { formClientResponse } = require("../controllers/clientResponse.controller")

router.post("/messages", jsonParser, reqBodyValidator, async (req, res, next) => {

  const responseToClient = await formClientResponse(req.body)
  res.status(responseToClient.status).json(responseToClient.message)
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


