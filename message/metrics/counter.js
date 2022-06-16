const client = require('prom-client')


module.exports = (name, helpname) => {
    const counter = new client.Counter({
        name: name,
        help: helpname,
    })
    return counter
};
