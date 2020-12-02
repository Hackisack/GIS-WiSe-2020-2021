




namespace Abgabe {


    let h2server: HTMLElement = document.getElementById("ServerAntwort");
    let div: HTMLElement = document.getElementById("Bild");
    let a: Auswahl = JSON.parse(sessionStorage.getItem("auswahloben"));
    let b: Auswahl = JSON.parse(sessionStorage.getItem("auswahlmitte"));
    let c: Auswahl = JSON.parse(sessionStorage.getItem("auswahlunten"));

    let endergebnis: Objekt = { oben: a, mitte: b, unten: c };


    let oben: HTMLImageElement = new Image();
    oben.useMap = endergebnis.oben.link + endergebnis.oben.form;
    let imgoben: HTMLImageElement = document.createElement("img");
    imgoben.setAttribute("src", oben.useMap);
    imgoben.id = "endeoben";
    div.appendChild(imgoben);


    let mitte: HTMLImageElement = new Image();
    mitte.useMap = endergebnis.mitte.link + endergebnis.mitte.form;
    let imgmitte: HTMLImageElement = document.createElement("img");
    imgmitte.setAttribute("src", mitte.useMap);
    imgmitte.id = "endemitte";
    div.appendChild(imgmitte);


    let unten: HTMLImageElement = new Image();
    unten.useMap = endergebnis.unten.link + endergebnis.unten.form;
    let imgunten: HTMLImageElement = document.createElement("img");
    imgunten.setAttribute("src", unten.useMap);
    imgunten.id = "endeunten";
    div.appendChild(imgunten);





    send("https://gis-communication.herokuapp.com");

    async function send(url: string): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(<any>sessionStorage);
        url = url + "?" + query.toString();
        await fetch(url);

        retrieve(url);

        async function retrieve(_url: RequestInfo): Promise<void> {
            let response: Response = await fetch(_url);
            let answer: string = JSON.stringify(await response.json());
            let data: Answer = JSON.parse(answer);

            if (data.error != undefined) { h2server.innerText = "Antwort des Servers: " + data.error; h2server.style.color = "red"; }
            else { h2server.innerText = "Antwort des Servers: " + data.message; h2server.style.color = "green"; }
        }

    }




    nextpage = "erster_schritt01.html";
    (<HTMLInputElement>document.getElementById("weiter")).disabled = false;
    document.getElementById("weiter").addEventListener("click", function (): void { window.open(nextpage, "_self"); });

    interface Answer {

        error: string;
        message: string;

    }



}







































