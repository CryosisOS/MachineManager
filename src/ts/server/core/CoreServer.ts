import ServerObject from "../ServerObject";

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
    svrObj.io.on("connection", function (socket: any) {
        let authenticated: boolean = false;
        let timeout: NodeJS.Timeout = setTimeout(function(){
            if(!authenticated/* Not Authenticated */){
                socket.disconnect(true);
                console.log("Agent has been disconnected. They did not authenticate in the alloted amount of time.");
            }
        }, 10000);

        console.log("Agent has connected to the server.");
        socket.on("authenticate", function (key: string) {
            //console.log(`Key received from Agent: ${key}`);
            //console.log(`Key stored in the server: ${svrObj.core_server.serverConfig.secret}`);
            authenticated = svrObj.authenticate(key);
            if (!authenticated) {
                console.log("Agent has been disconnected. They could not be authenticated.")
                socket.disconnect(true);
            }//Close connection
            else { //authenticated
                console.log("Agent has been authenticated");
                clearTimeout(timeout);
                socket.emit("authenticated");
            }
        });
    });
}