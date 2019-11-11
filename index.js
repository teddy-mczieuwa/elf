const {app, BrowserWindow} = require('electron')

let win

const createWindow = () => {

    // create browser window
    win = new BrowserWindow({
        width: 1200,
        height: 900,
        show: false,
        
        
        webPreferences: {
            nodeIntegration: true // allow electron use core node features
        }
    })

    // load the index.html 
    win.loadFile(`index.html`)

    //ready to show 
    win.once('ready-to-show', () => {
        win.show()
    })

    //close the window
    win.once('closed', () => {
        win = null
    })
}

// execute app when ready
app.on('ready', createWindow)

