import { BrowserWindow } from 'electron';
import * as path from "path";
import {format as formatUrl} from "url";

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null;
    }

    private static onReady() {
        //console.log(__dirname);
        //console.log('file://' + __dirname + '/../html/index.html');
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow
            .loadURL(///*'file://' + */__dirname + '../html/index.html');
            formatUrl({
                pathname: path.join(__dirname, "../html/index.html"),
                protocol: "file",
                slashes: true
            }));
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        //Start the main server on port 3001
        require("./server/core/CoreServer").start();
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}