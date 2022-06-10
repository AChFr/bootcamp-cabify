import getMessageStatus from "../clients/getMessageStatus.js"

export default async (req, res) => {

    try {
        const _id = req.params
        const response = await getMessageStatus(_id)
        res.status(200).json(`Your message status is ${response.status}`)
    } catch (err) {
        console.log(err)
        res.status(500).json("something went wrong")
    }

}
