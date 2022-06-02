
module.exports = (app) => {

    app.use((req, res, next) => {
        return res.status(404).json("This route does not exist");
    });


    app.use((err, req, res, next,) => {


        if (err.type === "entity.parse.failed") {
            return res.status(500).json("Your .JSON contains an error")
        }

        else if (err.response && err.response.data.includes(`This is a "controlled" 500 error.`)) {
            return res.status(500).json(`${err.response.data}`)
        }

        else if (err.code === 'ECONNABORTED') {
            return res.status(408).json("Your request timed out")
        }

        else {
            console.log(err)
            return res.status(500).json(`something went terrbly wrong serverwise`)
        }
    });

};