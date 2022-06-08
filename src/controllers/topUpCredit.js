
import topUpCredit from "../clients/topUpCredit.js";

export default async (req, res) => {

    try {
        const response = await topUpCredit(req.body);
        console.log(response)
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message)
    }

}