"use strict";
var Abgabe;
(function (Abgabe) {
    let h2Server = document.getElementById("ServerAntwort");
    let div = document.getElementById("Bild");
    let auswahlOben = JSON.parse(sessionStorage.getItem("auswahloben"));
    let auswahlMitte = JSON.parse(sessionStorage.getItem("auswahlmitte"));
    let auswahlUnten = JSON.parse(sessionStorage.getItem("auswahlunten"));
    let endergebnis = { oben: auswahlOben, mitte: auswahlMitte, unten: auswahlUnten };
    //Bilder anzeigen
    let oben = new Image();
    oben.useMap = endergebnis.oben.link + endergebnis.oben.form;
    let imgOben = document.createElement("img");
    imgOben.setAttribute("src", oben.useMap);
    imgOben.id = "endeoben";
    div.appendChild(imgOben);
    let mitte = new Image();
    mitte.useMap = endergebnis.mitte.link + endergebnis.mitte.form;
    let imgMitte = document.createElement("img");
    imgMitte.setAttribute("src", mitte.useMap);
    imgMitte.id = "endemitte";
    div.appendChild(imgMitte);
    let unten = new Image();
    unten.useMap = endergebnis.unten.link + endergebnis.unten.form;
    let imgUnten = document.createElement("img");
    imgUnten.setAttribute("src", unten.useMap);
    imgUnten.id = "endeunten";
    div.appendChild(imgUnten);
    //Serverkommunikation
    send("https://gis-communication.herokuapp.com");
    async function send(url) {
        let query = new URLSearchParams(sessionStorage);
        url = url + "?" + query.toString();
        await fetch(url);
        retrieve(url);
        async function retrieve(_url) {
            let response = await fetch(_url);
            let answer = JSON.stringify(await response.json());
            let data = JSON.parse(answer);
            if (data.error != undefined) {
                h2Server.innerText = "Antwort des Servers: " + data.error;
                h2Server.style.color = "red";
            }
            else {
                h2Server.innerText = "Antwort des Servers: " + data.message;
                h2Server.style.color = "green";
            }
        }
    }
    //weiterleiten
    Abgabe.nextPage = "erster_schritt01.html";
    document.getElementById("weiter").disabled = false;
    document.getElementById("weiter").addEventListener("click", function () { window.open(Abgabe.nextPage, "_self"); });
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script_ende.js.map