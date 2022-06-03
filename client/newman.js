const newman = require("newman")
require("./cabifyAppTest.postman_collection.json")

newman.run({
    collection: require("./cabifyAppTest.postman_collection.json"),
    reporters: ['html', 'cli'],
    verbose: true
})