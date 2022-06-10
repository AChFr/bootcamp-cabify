
import topUpCredit from "../clients/topUpCredit.js"


export default async (req, res) => {

    try {

        const response = await topUpCredit(req.body);
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err)
    }

}