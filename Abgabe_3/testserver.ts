import * as Http from "http";
import * as querystring from "querystring";
import * as Mongo from "mongodb";




export namespace P_3_1Server {


  interface AllData {

     _id: string;
     Vname: string;
     Nname: string;
     Email: string;
     Password: string;

  }

  interface LoginData {

    Email: string; 
    Password: string;

  }

  interface Daten {

    [type: string]: string | string[];

  }

  let daten: Mongo.Collection;


  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let databaseUrl: string = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Daten?retryWrites=true&w=majority";

  startServer(port);

  connectToDatabase(databaseUrl);

  function startServer(_port: number): void {

    let server: Http.Server = Http.createServer();
    console.log("Server auf: " + _port);

    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);

    server.listen(_port);

  }


  async function connectToDatabase(_url: string): Promise<void> {

    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);

    await mongoClient.connect();

    daten = mongoClient.db("Daten").collection("Collection");
    console.log("Database connection ", daten != undefined);
  }


  function handleListen(): void {
    console.log("Listening");
  }


  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    if (_request.method == "POST") {
      let body: string = "";
      _request.on("data", data => {
        body += data.toString();
      });



      _request.on("end", async () => {



        let daten: Daten = querystring.parse(body);

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



  function checkMail(alldata: AllData[], storeDaten: Daten): string {

    let _daten: string =  JSON.stringify(storeDaten);
    let datenObjekt: AllData = JSON.parse(_daten);
    


    if (alldata.length >= 1) {

      for (let x: number = 0; x < alldata.length; x++) {

        if (alldata[x].Email == datenObjekt.Email) { return "Die benutze Email befindet sich bereits in unserer Datenbank. Loggen Sie sich ein oder registrieren Sie sich mit einer anderen."; }

      }

    }

    storeData(storeDaten);
    return "Ihre Daten wurden erfolgreich gespeichert";



  }


  function storeData(_daten: Daten): void {
    daten.insertOne(_daten);
  }



  async function retrieve(): Promise<AllData[]> {
    let alleDaten: AllData[] = await daten.find().toArray();

    return alleDaten;
  }



  async function retrieveNames(): Promise<string> {
    let alleDaten: AllData[] = await daten.find().toArray();
    let alleNamenString: string = "";
    let nummerierung: number = 1;

    if (alleDaten.length < 1) { return "Momentan befindet sich noch kein registrierter Nutzer in unserer Datenbank  "; }

    for (let x: number = 0; x < alleDaten.length; x++) {
      alleNamenString = alleNamenString + nummerierung + ". " + alleDaten[x].Vname + " " + alleDaten[x].Nname + ", ";
      nummerierung++;
    }

    return alleNamenString;
  }



  async function checkLogin(_daten: Daten): Promise<string> {
    let alleDaten: AllData[] = await daten.find().toArray();
   

    
    let datenObjekt: LoginData = JSON.parse(JSON.stringify(_daten));

    if (alleDaten.length >= 1) {

      for (let x: number = 0; x < alleDaten.length; x++) {

        if (alleDaten[x].Email == datenObjekt.Email && (alleDaten[x].Password == datenObjekt.Password)) { return "Erfolgreich angemeldet. Willkommen zurück " + alleDaten[x].Vname + " " + alleDaten[x].Nname + "."; }

      }

    }

    return "Die eingegebene Kombination aus Email und Passwort ist leider nicht in unserer Datenbank. Versuchen Sie es bitte erneut.";
  }

}