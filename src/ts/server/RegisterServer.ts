import RegisterServerObject from "../server/RegisterServerObject";

const serverObject = new RegisterServerObject();
serverObject.express.set('port', serverObject.port);

let http = require("http").Server(serverObject.express);
let io = require("socket.io")(http);

//authenticate method
function authenticate(key: string): boolean {
    if (serverObject.secret === key) {
        return true;
    }
    else {
        return false;
    }
}

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket: any) {
    let timeout: NodeJS.Timeout = setTimeout(socket, 10000);

    socket.on("authenticate", function (key: string) {
        let authenticated: boolean = authenticate(key);
        if (!authenticated) { socket.disconnect(true); }//Close connection
        else { //authenticated
            clearTimeout(timeout);
            socket.emit("authenticated", true);
        }

        socket.on("register", function (agentHostName: string, agentIP_addr: string, agentRegistration: any) {
            let uuid = require("./registration/RegisterAgent").Registration.register(agentHostName, agentIP_addr);
            agentRegistration(uuid);
        });
    });
});


let server;
export function start() : void {
    server = http.listen(serverObject.port, function () {
        console.log(`listening on *:${serverObject.port}`);
    });
}