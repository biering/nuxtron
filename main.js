const http = require('http')
const electron = require('electron')
const path = require('path')

const { config, url } = require('./app')

/*
** Electron
*/
let win = null // Current window

const app = electron.app
const newWin = () => {
	win = new electron.BrowserWindow({
		icon: path.join(__dirname, 'app/static/icon.png')
	})
	win.maximize()
	win.on('closed', () => win = null)
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

		installExtension(VUEJS_DEVTOOLS.id)
			.then(name => {
				console.log(`Added Extension:  ${name}`)
				win.webContents.openDevTools()
			})
			.catch(err => console.log('An error occurred: ', err))

		// Wait for nuxt to build
		const pollServer = () => {
			http.get(url, (res) => {
				if (res.statusCode === 200) { 
					win.loadURL(url) 
				} else { 
					setTimeout(pollServer, 300) 
				}
			}).on('error', pollServer)
		}

		pollServer()
	} else { 
		return win.loadURL(url) 
	}
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
