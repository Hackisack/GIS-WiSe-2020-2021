




namespace Abgabe {


    let h2Server: HTMLElement = document.getElementById("ServerAntwort");
    let div: HTMLElement = document.getElementById("Bild");
    let auswahlOben: Auswahl = JSON.parse(sessionStorage.getItem("auswahloben"));
    let auswahlMitte: Auswahl = JSON.parse(sessionStorage.getItem("auswahlmitte"));
    let auswahlUnten: Auswahl = JSON.parse(sessionStorage.getItem("auswahlunten"));

    let endergebnis: Objekt = { oben: auswahlOben, mitte: auswahlMitte, unten: auswahlUnten };

    //Bilder anzeigen

    let oben: HTMLImageElement = new Image();
    oben.useMap = endergebnis.oben.link + endergebnis.oben.form;
    let imgOben: HTMLImageElement = document.createElement("img");
    imgOben.setAttribute("src", oben.useMap);
    imgOben.id = "endeoben";
    div.appendChild(imgOben);


    let mitte: HTMLImageElement = new Image();
    mitte.useMap = endergebnis.mitte.link + endergebnis.mitte.form;
    let imgMitte: HTMLImageElement = document.createElement("img");
    imgMitte.setAttribute("src", mitte.useMap);
    imgMitte.id = "endemitte";
    div.appendChild(imgMitte);


    let unten: HTMLImageElement = new Image();
    unten.useMap = endergebnis.unten.link + endergebnis.unten.form;
    let imgUnten: HTMLImageElement = document.createElement("img");
    imgUnten.setAttribute("src", unten.useMap);
    imgUnten.id = "endeunten";
    div.appendChild(imgUnten);



    //Serverkommunikation

    send("https://gis-communication.herokuapp.com");

    async function send(url: string): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(<any>sessionStorage);
        url = url + "?" + query.toString();
        await fetch(url);

        retrieve(url);

        async function retrieve(_url: RequestInfo): Promise<void> {
            let response: Response = await fetch(_url);
            let answer: string = JSON.stringify(await response.json());
            let data: DataAnswer = JSON.parse(answer);

            if (data.error != undefined) { h2Server.innerText = "Antwort des Servers: " + data.error; h2Server.style.color = "red"; }
            else { h2Server.innerText = "Antwort des Servers: " + data.message; h2Server.style.color = "green"; }
        }

    }


    //weiterleiten

    nextPage = "erster_schritt01.html";
    (<HTMLInputElement>document.getElementById("weiter")).disabled = false;
    document.getElementById("weiter").addEventListener("click", function (): void { window.open(nextPage, "_self"); });

    interface DataAnswer {

        error: string;
        message: string;

    }



}







































