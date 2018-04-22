/*
**  Nuxt
*/
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
const config = require('./nuxt.config')

config.rootDir = __dirname // for electron-builder

// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
	builder
		.build()
		.catch(err => {
			console.error(err) // eslint-disable-line no-console
			process.exit(1)
		})
}

// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

module.exports = {
	config: config,
	url: _NUXT_URL_
}
