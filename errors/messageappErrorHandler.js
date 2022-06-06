
module.exports = (app) => {

    app.use((req, res, next) => {
        return res.status(404).json("This route does not exist");
    });


    app.use((err, req, res, next,) => {


        if (err.type === "entity.parse.failed") {
            return res.status(500).json("Your .JSON contains an error")
        }

        else {

            return res.status(500).json(`something went terrbly wrong serverwise =======>` + err)
        }
    });

};