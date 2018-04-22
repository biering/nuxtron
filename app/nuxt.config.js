const { join } = require('path')

module.exports = {
	mode: 'spa',
	head: { title: 'nuxtron' }, // Headers of the page
	loading: false, // Disable default loading bar
	build: {
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				// Run ESLint on save
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Extend only webpack config for client-bundle
			if (isClient) { 
				config.target = 'electron-renderer' 
			}
		},

		postcss: [
			require('postcss-import')(),
			require('postcss-cssnext')(),
			require('cssnano')()
		]
	},
	dev: process.env.NODE_ENV === 'DEV',
	css: [join(__dirname, 'assets/css/global.css')],
}
