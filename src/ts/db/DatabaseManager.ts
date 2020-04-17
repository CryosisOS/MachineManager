import { Agent } from "./DatabaseTypes"
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const DATABASE_VERSION : number = 1.0;
const DATABASE_FILE : string = "./dist/res/database/machines.json";
const DATABASE_ADAPTER : any = new FileSync(DATABASE_FILE);
const DATABASE_CONNECTOR : any = lowdb(DATABASE_ADAPTER);
DATABASE_CONNECTOR.defaults({version:DATABASE_VERSION, agents: []}).write();

class DatabaseManager {
    static update(): void{}
}

export default class AgentsTable {

    /******************
     * INSERTS
     *****************/
    static insertAgent(newAgent: Agent) : void{
        DATABASE_CONNECTOR.get("agents")
            .push({uuid: newAgent.uuid, hostname: newAgent.hostname, ip_addr: newAgent.ip_addr})
            .write();
    }

    /******************
     * QUERIES
     *****************/
    static queryVersion() : number {
        let query : any = DATABASE_CONNECTOR.get("version");
        return query.value();
    }

    static queryUUIDs() : string []{
        let uuids : string [] = [];
        let agents : any[] = DATABASE_CONNECTOR.get("agents");
        agents.forEach(agent => {
            uuids.push(agent.value().uuid);
        });
        return uuids;
    }

    static queryAgents() : Agent[] {
        let agents: Agent[] = [];
        let query : any[] = DATABASE_CONNECTOR.get("agents");
        query.forEach(result => {
            let newAgent : Agent = {
                uuid: result.value().uuid,
                hostname: result.value().hostname,
                ip_addr: result.value().ip_addr
            };
            agents.push(newAgent);
        });
        return agents;
    }
}