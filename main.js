const path = require('path')
const server = require('./server/index.js')

server({ clientRoot: path.join(__dirname, 'client/build') })
