"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const querystring = require("querystring");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    let daten;
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
        daten = mongoClient.db("Daten").collection("Collection");
        console.log("Database connection ", daten != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        if (_request.method == "POST") {
            let body = "";
            _request.on("data", data => {
                body += data.toString();
            });
            _request.on("end", async () => {
                let daten = querystring.parse(body);
                //Alle User abfragen
                if (JSON.stringify(daten) == "{}") {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(await retrieveNames());
                    _response.end();
                }
                //Login
                else if (JSON.stringify(daten).startsWith("{\"Email")) {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(await checkLogin(daten));
                    _response.end();
                }
                //Registrierung
                else {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(checkMail(await retrieve(), daten));
                    _response.end();
                }
            });
        }
    }
    function checkMail(alldata, storeDaten) {
        let _daten = JSON.stringify(storeDaten);
        let datenObjekt = JSON.parse(_daten);
        if (alldata.length >= 1) {
            for (let x = 0; x < alldata.length; x++) {
                if (alldata[x].Email == datenObjekt.Email) {
                    return "Die benutze Email befindet sich bereits in unserer Datenbank. Loggen Sie sich ein oder registrieren Sie sich mit einer anderen.";
                }
            }
        }
        storeData(storeDaten);
        return "Ihre Daten wurden erfolgreich gespeichert";
    }
    function storeData(_daten) {
        daten.insertOne(_daten);
    }
    async function retrieve() {
        let alleDaten = await daten.find().toArray();
        return alleDaten;
    }
    async function retrieveNames() {
        let alleDaten = await daten.find().toArray();
        let alleNamenString = "";
        let nummerierung = 1;
        if (alleDaten.length < 1) {
            return "Momentan befindet sich noch kein registrierter Nutzer in unserer Datenbank  ";
        }
        for (let x = 0; x < alleDaten.length; x++) {
            alleNamenString = alleNamenString + nummerierung + ". " + alleDaten[x].Vname + " " + alleDaten[x].Nname + ", ";
            nummerierung++;
        }
        return alleNamenString;
    }
    async function checkLogin(_daten) {
        let alleDaten = await daten.find().toArray();
        let datenObjekt = JSON.parse(JSON.stringify(_daten));
        if (alleDaten.length >= 1) {
            for (let x = 0; x < alleDaten.length; x++) {
                if (alleDaten[x].Email == datenObjekt.Email && (alleDaten[x].Password == datenObjekt.Password)) {
                    return "Erfolgreich angemeldet. Willkommen zurück " + alleDaten[x].Vname + " " + alleDaten[x].Nname + ".";
                }
            }
        }
        return "Die eingegebene Kombination aus Email und Passwort ist leider nicht in unserer Datenbank. Versuchen Sie es bitte erneut.";
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=testserver.js.map