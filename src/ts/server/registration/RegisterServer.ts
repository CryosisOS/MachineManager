import ServerObject from "../ServerObject";
import SERVER_MESSAGES from "../SERVER_MESSAGES";

class RegisterServer {
    public registration_server: ServerObject = null;
    public http;
    public io;

    constructor() {
        this.registration_server = new ServerObject();
        this.registration_server.express.set('port', this.registration_server.serverConfig.registration_port);
        this.http = require("http").Server(this.registration_server.express);
        this.io = require("socket.io")(this.http);
    }

    //authenticate method
    public authenticate(key: string): boolean {
        if (this.registration_server.serverConfig.secret === key) {
            return true;
        }
        else {
            return false;
        }
    }
}
export function start(): void {
    let svrObj = new RegisterServer();
    let server = svrObj.http.listen(svrObj.registration_server.serverConfig.registration_port, function () {
        console.log(`listening on *:${svrObj.registration_server.serverConfig.registration_port}`);
    });
    // whenever a user connects on port 3000 via
    // a websocket, log that a user has connected
    svrObj.io.on("connection", function (socket: any) {
        let authenticated: boolean = false;
        let timeout: NodeJS.Timeout = setTimeout(function(){
            if(!authenticated/* Not Authenticated */){
                socket.disconnect(true);
                console.log(`${SERVER_MESSAGES.DISCONNECTED_FROM_REGISTRATION_SERVER} ${SERVER_MESSAGES.AUTHENTICATION_RUN_OUT_OF_TIME}`);
            }
        }, 10000);

        console.log(`${SERVER_MESSAGES.CONNECTED_TO_REGISTRATION_SERVER}`);
        socket.on("authenticate", function (key: string) {
            //console.log(`Key received from Agent: ${key}`);
            //console.log(`Key stored in the server: ${svrObj.registration_server.serverConfig.secret}`);
            authenticated = svrObj.authenticate(key);
            if (!authenticated) {
                console.log(`${SERVER_MESSAGES.DISCONNECTED_FROM_REGISTRATION_SERVER} ${SERVER_MESSAGES.AUTHENTICATION_FAILED}`)
                socket.disconnect(true);
            }//Close connection
            else { //authenticated
                console.log(`${SERVER_MESSAGES.AUTHENTICATION_SUCCESS}`);
                clearTimeout(timeout);
                socket.emit("authenticated");
            }

            socket.on("register", function (agentHostName: string, agentRegistration: any) {
                let agentIP_addr = socket.handshake.address;
                agentIP_addr = agentIP_addr.split(":").pop();
                let uuid = require("./RegisterAgent").register(agentHostName, agentIP_addr);
                console.log(`${SERVER_MESSAGES.REGISTRATION_SUCCESS}`);
                agentRegistration(uuid, svrObj.registration_server.serverConfig.main_port);
            });
        });
    });
}