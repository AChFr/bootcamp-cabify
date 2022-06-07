import lockedSync from "locked-sync";
const sync = lockedSync();
import topUpCredit from "../clients/topUpCredit.js";

export default async (req, res) => {
    const end = await sync()
    try {

        const response = await topUpCredit(req.body);

        res.json(response);
    } finally { end() }

}