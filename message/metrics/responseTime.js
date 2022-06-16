const client = require('prom-client')


module.exports = (pathname, helpname) => {
    const sumary = new client.Summary({
        name: pathname,
        help: helpname,
        labels: []
    })
    return sumary
}
