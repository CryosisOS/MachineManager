//const mysql = require('mysql');

import { app, BrowserWindow } from 'electron';
import Main from './Main';

//Start Server
require("./server/registration/RegisterServer").start();

//Start GUI App
Main.main(app, BrowserWindow);