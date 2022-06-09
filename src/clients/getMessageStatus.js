import { mainMessage } from "../models/message.js"

export default (req, res) => {

    const { taskID } = req.params
    console.log(req.params)

    mainMessage.find({ taskID: taskID }, "status")
        .then(response => res.json(response))

} 