import { DatabaseConnection } from "./DatabaseTypes";
import DatabaseManager from "./DatabaseManager";

export default class AgentsTable {
    static queryUUIDs(): string[] {
        let uuidArr : string[] = [];
        let db : DatabaseConnection = DatabaseManager.openConnection();
        if(db.connected){
            let query = `SELECT uuid FROM agents`;
            DatabaseManager.queryAll(db, query).then((uuids : any) => {
                uuids.forEach(uuid => {
                    uuidArr.push(uuid)
                });
            })
        }
        else{
            console.error("Could not connect to database.");
        }
        DatabaseManager.closeConnection(db);
        return uuidArr;
    }
}