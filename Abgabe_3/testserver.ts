import * as Http from "http";
import * as querystring from "querystring";
import * as Mongo from "mongodb";




export namespace P_3_1Server {

  
    interface Order {

      [type: string]: string | string[];

    }

    let orders: Mongo.Collection;

    
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
     
      let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
      let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
     
      await mongoClient.connect();
     
      orders = mongoClient.db("Daten").collection("Collection");
      console.log("Database connection ", orders != undefined);
    }
    

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        
        if (_request.method == "POST") {
            let body = "";
            _request.on("data", data => {
              body += data.toString();
            });
            _request.on("end",  () => {
             
              
             let jsonString: string = JSON.stringify(querystring.parse(body));
             let order: Order = querystring.parse(body);

             _response.setHeader("content-type", "text/html; charset=utf-8");
             _response.setHeader("Access-Control-Allow-Origin", "*");
             _response.write(jsonString);
             _response.end();
             storeOrder(order);
             
            });
          }
        
    }

    function storeOrder(_order: Order): void {
      orders.insertOne(_order);
  }
    
}