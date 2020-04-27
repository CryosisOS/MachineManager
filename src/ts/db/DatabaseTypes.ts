export type DatabaseConnection = {
    connected: boolean;
    database: any;
}

export type Agent = {
    uuid: string;
    hostname: string;
    ip_addr: string;
}