import { DatabaseConnection } from "./../../db/DatabaseTypes";
import AgentsTable from "./../../db/AgentsTable";
import DatabaseManager from "../../db/DatabaseManager";

export default class Registration {
    static register(hostname: string, ip_addr: string): string {
        let uuid = this.getUUID();
        let db : DatabaseConnection = DatabaseManager.openConnection();
        if(db.connected){
            let query = `INSERT INTO agents (uuid, hostname, ip_addr) VALUES (?, ?, ?)`;
            DatabaseManager.run(db, query, [uuid, hostname, ip_addr]);
        }
        else{
            console.error("Could not connect to Datbase.");
        }
        DatabaseManager.closeConnection(db);
        return uuid;
    }

    private static getUUID(): string {
        let uuids: string[] = AgentsTable.queryUUIDs();
        let newUuid = "";
        do {
            newUuid = this.generateUUID();
        } while (uuids.indexOf(newUuid) !== -1);
        return newUuid;
    }

    private static generateUUID(): string {
        return Guid.create().toString();
    }
}

class Guid {

    public static validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");

    public static EMPTY = "00000000-0000-0000-0000-000000000000";

    public static isGuid(guid: any) {
        const value: string = guid.toString();
        return guid && (guid instanceof Guid || Guid.validator.test(value));
    }

    public static create(): Guid {
        return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-"));
    }

    public static createEmpty(): Guid {
        return new Guid("emptyguid");
    }

    public static parse(guid: string): Guid {
        return new Guid(guid);
    }

    public static raw(): string {
        return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-");
    }

    private static gen(count: number) {
        let out: string = "";
        for (let i: number = 0; i < count; i++) {
            // tslint:disable-next-line:no-bitwise
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }

    private value: string;

    private constructor(guid: string) {
        if (!guid) { throw new TypeError("Invalid argument; `value` has no value."); }

        this.value = Guid.EMPTY;

        if (guid && Guid.isGuid(guid)) {
            this.value = guid;
        }
    }

    public equals(other: Guid): boolean {
        // Comparing string `value` against provided `guid` will auto-call
        // toString on `guid` for comparison
        return Guid.isGuid(other) && this.value === other.toString();
    }

    public isEmpty(): boolean {
        return this.value === Guid.EMPTY;
    }

    public toString(): string {
        return this.value;
    }

    public toJSON(): any {
        return {
            value: this.value,
        };
    }
}