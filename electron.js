const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

function mainWindow() {
  const thisWindow = new BrowserWindow({
    title:"NTRAK",
    width:1000,
    height:600,
    frame:false,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });



  // IPC Main listener for the 'close' event
  ipcMain.on('close', () => {
    try {
        app.quit(); // Quit the application
    } catch (error) {
        console.error('Error while quitting the application:', error);
    }
  });

  // IPC Main listener for the 'minimize' event
  ipcMain.on('minimize', () => {
      try {
          if (BrowserWindow.getFocusedWindow()) {
              BrowserWindow.getFocusedWindow().minimize(); // Minimize the focused window
          }
      } catch (error) {
          console.error('Error while minimizing the window:', error);
      }
  });

  // IPC Main listener for the 'maximize' event
  ipcMain.on('maximize', () => {
    try {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            if (focusedWindow.isMaximized()) {
                focusedWindow.restore(); // Restore the window if it's already maximized
            } else {
                focusedWindow.maximize(); // Maximize the window if it's not already maximized
            }
        }
    } catch (error) {
        console.error('Error while maximizing/restoring the window:', error);
    }
});


  const startUrl = url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol:'file'
  })

  thisWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(mainWindow)