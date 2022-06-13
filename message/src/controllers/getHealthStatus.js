
export default async (req, res) => {
    res.status(200).json(`connetion on ${process.env.APIPORT} is healthy`)
};
