const APIHandler = require("../services/message.service");
const { contentValidator } = require("../middleware");
const router = require("express").Router();

const messageService = new APIHandler



router.post("/messages", contentValidator, (req, res, next) => {

  messageService
    .sendMessage(req.body)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

//// GET requests should never be blocked

// router.get("/messages", (req, res, next) => {
//   res.status(405).json("This method is not authorized for this endpoint")
// })


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


