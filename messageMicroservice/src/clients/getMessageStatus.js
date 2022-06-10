import { mainMessage } from "../models/message.js"

export default async (_id) => {

    const result = await mainMessage.findOne({ _id: _id })
    return result

} 