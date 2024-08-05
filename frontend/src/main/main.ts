import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { exec, ChildProcess } from 'child_process';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;
let jarProcess: ChildProcess | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    fullscreen: true, // Set the window to fullscreen
    resizable:false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (jarProcess) {
      jarProcess.kill(); // Stop the JAR process when the window is closed
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open URLs in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

// Start Java backend when Electron app starts
const startJavaBackend = () => {
  const jarPath = app.isPackaged
    ? path.join(process.resourcesPath, 'assets', 'bijoux-0.0.1-SNAPSHOT.jar')
    : path.join(__dirname, '../../assets', 'bijoux-0.0.1-SNAPSHOT.jar');

  jarProcess = exec(`java -jar "${jarPath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend: ${err}`);
      return;
    }
    console.log(`Backend stdout: ${stdout}`);
    console.error(`Backend stderr: ${stderr}`);
  });
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    startJavaBackend();
      createWindow();
      app.on('activate', () => {
        if (mainWindow === null) createWindow();
      });
  })
  .catch(console.log);
