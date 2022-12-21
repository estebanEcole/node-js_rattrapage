/** module dependencies */
import app from "./app.js"
import http from "http";



/** Import the mongoose module */
import mongoose from "mongoose";

/** define a schema */
const Schema = mongoose.Schema;



/** set port */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);



/** http server */
var server = http.createServer(app);



/** listen on port */
server.listen(port);



/** Normalize a port into a number, string, or false. */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}