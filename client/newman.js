const newman = require("newman")
require("./cabifyAppTest.postman_collection.json")

newman.run({
    collection: require("./cabifyAppTest.postman_collection.json"),
    reporters: ['cli'],
    verbose: true
})