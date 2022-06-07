import lockedSync from "locked-sync";
const sync = lockedSync();
import topUpCredit from "../clients/topUpCredit.js";

export default async (req, res) => {

    try {

        const response = await topUpCredit(req.body);

        res.json(response);
    } catch {
        res.status(500).json("impossible to top up credit. error ocurred")
    }

}