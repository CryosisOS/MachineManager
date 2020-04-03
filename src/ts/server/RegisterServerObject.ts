import express from 'express';
import * as server_data from '../../../res/server_config.json';

//TODO Export this to a types file
type ServerConfig = {
    protocol: string;
    address: string;
    port: number;
    secret:string;
}

export default class RegisterServerObject {
    // ref to Express instance
    public express: express.Application;

    public address: string;
    public port: number;
    public secret: string;
    //Run configuration methods on the Express instance.
    constructor() {
        let serverConfig: ServerConfig = this.loadServerConfig();
        this.address = serverConfig.address;
        this.port = serverConfig.port;
        this.express = express();
    }

    loadServerConfig(): ServerConfig {
        var json = {
            "protocol":"",
            "address":"",
            "port":-1,
            "secret":""
        };
        json.protocol = (<any>server_data).protocol;
        json.address = (<any>server_data).address
        json.port = (<any>server_data).port;
        json.secret = (<any>server_data).secret
        return json;
    }
}