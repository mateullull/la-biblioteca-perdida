'use strict'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

require('electron-debug')({ showDevTools: true })
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1200,
    resizable: false,
    center: true,
    fullscreenable: false,
    title: 'La Biblioteca Perdida',
    webPreferences: {
      webSecurity: false
    }
  })

  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
let ipcEvent = null

if (process.env.NODE_ENV !== 'development') {
  ipcMain.on('checkUpdates', (event, data) => {
    ipcEvent = event
    autoUpdater.checkForUpdates()
  })

  ipcMain.on('goWithUpdate', (event, data) => {
    autoUpdater.downloadUpdate()
  })
}

autoUpdater.autoDownload = false

autoUpdater.on('error', (event, error) => {
  dialog.showErrorBox('Error: ', error === null ? 'unknown' : (error.stack || error).toString())
})

autoUpdater.on('update-available', (info) => {
  ipcEvent.sender.send('checkUpdatesResult', info)
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
})
