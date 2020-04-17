import ServerObject from "../ServerObject";
import SERVER_MESSAGES from "../SERVER_MESSAGES";
import SERVER_API from "../SERVER_API";

class CoreServer {
    public core_server: ServerObject = null;
    public http;
    public io;

    constructor() {
        this.core_server = new ServerObject();
        this.core_server.express.set('port', this.core_server.serverConfig.main_port);
        this.http = require("http").Server(this.core_server.express);
        this.io = require("socket.io")(this.http);
    }


    //authenticate method
    public authenticate(key: string): boolean {
        if (this.core_server.serverConfig.secret === key) {
            return true;
        }
        else {
            return false;
        }
    }
}
export function start(): void {
    let svrObj = new CoreServer();
    let server = svrObj.http.listen(svrObj.core_server.serverConfig.main_port, function () {
        console.log(`listening on *:${svrObj.core_server.serverConfig.main_port}`);
    });
    // whenever a user connects on port 3000 via
    // a websocket, log that a user has connected
    svrObj.io.on(SERVER_API.CONNECTION, function (socket: any) {
        let authenticated: boolean = false;
        let timeout: NodeJS.Timeout = setTimeout(function(){
            if(!authenticated/* Not Authenticated */){
                socket.disconnect(true);
                console.log(`${SERVER_MESSAGES.DISCONNECTED_FROM_CORE_SERVER} ${SERVER_MESSAGES.AUTHENTICATION_RUN_OUT_OF_TIME}`);
            }
        }, 10000);

        console.log(`${SERVER_MESSAGES.CONNECTED_TO_CORE_SERVER}`);
        socket.on(SERVER_API.AUTHENTICATE, function (key: string) {
            //console.log(`Key received from Agent: ${key}`);
            //console.log(`Key stored in the server: ${svrObj.core_server.serverConfig.secret}`);
            authenticated = svrObj.authenticate(key);
            if (!authenticated) {
                console.log(`${SERVER_MESSAGES.DISCONNECTED_FROM_REGISTRATION_SERVER} ${SERVER_MESSAGES.AUTHENTICATION_FAILED}`)
                socket.disconnect(true);
            }//Close connection
            else { //authenticated
                console.log(`${SERVER_MESSAGES.AUTHENTICATION_SUCCESS}`);
                clearTimeout(timeout);
                socket.emit(SERVER_API.AUTHENTICATED);
            }
        });
    });
}