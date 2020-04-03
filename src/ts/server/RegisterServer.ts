import * as path from "path";
import RegisterServerObject from "../server/RegisterServerObject";

const serverObject = new RegisterServerObject();
serverObject.express.set('port', serverObject.port);

let http = require("http").Server(serverObject.express);
let io = require("socket.io")(http);

//authenticate method
function authenticate(key: string): boolean{
    if(serverObject.secret === key){
        return true;
    }
    else{
        return false;
    }
}

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket: any) {
    socket.on("authenticate", function(key: string){
        let authenticated : boolean = authenticate(key);
        if(!authenticated) {socket.disconnect(true);}//Close connection
        else{ //authenticated
            socket.emit("authenticated", true);
        }
    });
});

const server = http.listen(serverObject.port, function () {
    console.log(`listening on *:${serverObject.port}`);
});