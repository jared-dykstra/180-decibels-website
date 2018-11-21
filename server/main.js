const path = require('path')
const server = require('./src/index.js')

server({ clientRoot: path.join(__dirname, '../client/build') })
