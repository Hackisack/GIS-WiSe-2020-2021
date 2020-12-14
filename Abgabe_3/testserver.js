"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const querystring = require("querystring");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    let orders;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let databaseUrl = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Daten?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server auf: " + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Daten").collection("Collection");
        console.log("Database connection ", orders != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        if (_request.method == "POST") {
            let body = "";
            _request.on("data", data => {
                body += data.toString();
            });
            _request.on("end", () => {
                let jsonString = JSON.stringify(querystring.parse(body));
                let order = querystring.parse(body);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(jsonString);
                _response.end();
                storeOrder(order);
            });
        }
    }
    function storeOrder(_order) {
        orders.insertOne(_order);
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=testserver.js.map