import { DatabaseConnection } from "./DatabaseTypes"

const sqlite3 = require('sqlite3').verbose();

export default class DatabaseManager {
    static openConnection(): DatabaseConnection {
        let db = null;
        let dbCon: DatabaseConnection = {
            "connected": false,
            "database": db
        };
        db = new sqlite3.Database("../../../res/database/machines.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error(err.message);
                return dbCon;
            }
            console.log('Opened connection to the Database.');
        });
        dbCon.connected = true;
        dbCon.database = db;
        return dbCon;
    }

    static closeConnection(dbCon: DatabaseConnection): DatabaseConnection {
        dbCon.database.close((err) => {
            if (err) {
                console.error(err.message);
                return dbCon;
            }
        });
        console.log("Closed connection to the Database.")
        dbCon.database = null;
        dbCon.connected = false;
        return dbCon;
    }

    static checkDatabaseSchema(): void {
        let db: DatabaseConnection = this.openConnection();
        if (db.connected) {
            let agentTableCreateStatement = `CREATE TABVLE IF NOT EXISTS agents (
                uuid TEXT PRIMARY KEY, hostname TEXT, ip_addr TEXT
            )`;
            this.run(db, agentTableCreateStatement);//LOG that this has been done
        }
        this.closeConnection(db);
    }

    static querySpecific(db: DatabaseConnection, sql, params = []) {
        return new Promise((resolve, reject) => {
            db.database.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static queryAll(db: DatabaseConnection, sql, params = []) {
        return new Promise((resolve, reject) => {
            db.database.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static run(db: DatabaseConnection, sql, params = []) {
        return new Promise((resolve, reject) => {
            db.database.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }
}