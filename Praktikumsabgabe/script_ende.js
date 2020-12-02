"use strict";
var Abgabe;
(function (Abgabe) {
    let h2server = document.getElementById("ServerAntwort");
    let div = document.getElementById("Bild");
    let a = JSON.parse(sessionStorage.getItem("auswahloben"));
    let b = JSON.parse(sessionStorage.getItem("auswahlmitte"));
    let c = JSON.parse(sessionStorage.getItem("auswahlunten"));
    let endergebnis = { oben: a, mitte: b, unten: c };
    let oben = new Image();
    oben.useMap = endergebnis.oben.link + endergebnis.oben.form;
    let imgoben = document.createElement("img");
    imgoben.setAttribute("src", oben.useMap);
    imgoben.id = "endeoben";
    div.appendChild(imgoben);
    let mitte = new Image();
    mitte.useMap = endergebnis.mitte.link + endergebnis.mitte.form;
    let imgmitte = document.createElement("img");
    imgmitte.setAttribute("src", mitte.useMap);
    imgmitte.id = "endemitte";
    div.appendChild(imgmitte);
    let unten = new Image();
    unten.useMap = endergebnis.unten.link + endergebnis.unten.form;
    let imgunten = document.createElement("img");
    imgunten.setAttribute("src", unten.useMap);
    imgunten.id = "endeunten";
    div.appendChild(imgunten);
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
                h2server.innerText = "Antwort des Servers: " + data.error;
                h2server.style.color = "red";
            }
            else {
                h2server.innerText = "Antwort des Servers: " + data.message;
                h2server.style.color = "green";
            }
        }
    }
    Abgabe.nextpage = "erster_schritt01.html";
    document.getElementById("weiter").disabled = false;
    document.getElementById("weiter").addEventListener("click", function () { window.open(Abgabe.nextpage, "_self"); });
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script_ende.js.map