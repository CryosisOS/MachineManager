//const mysql = require('mysql');

import { app, BrowserWindow } from 'electron';
import Main from './Main';

/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MachineManager'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

*/

//Start Server
require("./server/RegisterServer").start();

//Start GUI App
//Main.main(app, BrowserWindow);