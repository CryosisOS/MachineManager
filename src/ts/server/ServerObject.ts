import express from 'express';
import * as server_data from '../../../res/server_config.json';

//TODO Export this to a types file
type ServerConfig = {
    protocol: string;
    address: string;
    registration_port: number;
    main_port: number;
    secret: string;
}

export default class ServerObject {
    // ref to Express instance
    public express: express.Application;
    public serverConfig: ServerConfig;
    //Run configuration methods on the Express instance.
    constructor() {
        this.serverConfig = this.loadServerConfig();
        this.express = express();
    }

    loadServerConfig(): ServerConfig {
        var json = {
            "protocol": "",
            "address": "",
            "registration_port": -1,
            "main_port":-1,
            "secret": ""
        };
        json.protocol = (<any>server_data).protocol;
        json.address = (<any>server_data).address;
        json.registration_port = (<any>server_data).registration_port;
        json.main_port = (<any>server_data).main_port;
        json.secret = (<any>server_data).secret;
        return json;
    }
}