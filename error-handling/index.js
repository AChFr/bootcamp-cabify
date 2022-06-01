module.exports = (app) => {

    app.use((req, res, next) => {
        res.status(404).json("This route does not exist");
    });


    app.use((err, req, res, next,) => {

        if (err.response && err.response.data.includes(`This is a "controlled" 500 error.`)) {
            res.status(500).json(`${err.response.data}`)
        }

        else {
            res.status(err.response.status).json(`${err.message}`)
        }
    });

};

