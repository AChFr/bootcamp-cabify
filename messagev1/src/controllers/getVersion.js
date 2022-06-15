
export default (req, res) => {
    res.status(200).json(`this is the ${process.env.SERVICE_NAME}`)
};
