"use strict";
var Abgabe;
(function (Abgabe) {
    getdata(); //Startfunktion
    let buttondiv = document.getElementById("dropdown-content");
    let bilddiv = document.getElementById("Bild");
    Abgabe.nextPage = "";
    let chooseLink = "";
    let maxLaenge = 0;
    let saveIdentifier = "";
    let imageCounter = 0;
    async function getdata() {
        let response = await fetch("data.json");
        let json = JSON.stringify(await response.json());
        let data = JSON.parse(json);
        //Seitenunterscheidung
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
            chooseLink = data.oben[0].link;
            saveIdentifier = "auswahloben";
            Abgabe.nextPage = "zweiter_schritt02.html";
            imageCounter = data.oben.length;
            create_event(data, "oben");
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
            chooseLink = data.mitte[0].link;
            saveIdentifier = "auswahlmitte";
            Abgabe.nextPage = "dritter_schritt03.html";
            imageCounter = data.mitte.length;
            maxLaenge = 1;
            auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
            create_event(data, "mitte");
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
            chooseLink = data.unten[0].link;
            saveIdentifier = "auswahlunten";
            Abgabe.nextPage = "ende04.html";
            imageCounter = data.unten.length;
            maxLaenge = 2;
            auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
            auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
            create_event(data, "unten");
        }
    }
    //Funktionen
    function create_event(data, seite) {
        for (let x = 1; x <= imageCounter; x++) {
            let a = document.createElement("a");
            a.id = "form" + x;
            a.innerText = "Form " + x;
            buttondiv.appendChild(a);
            let bildname = "";
            if (seite == "oben") {
                bildname = data.oben[x - 1].name;
            }
            else if (seite == "mitte") {
                bildname = data.mitte[x - 1].name;
            }
            else if (seite == "unten") {
                bildname = data.unten[x - 1].name;
            }
            let idName = "form" + x;
            document.getElementById(idName).addEventListener("click", function () { resetform(); auswahl(bildname, chooseLink); });
        }
        document.getElementById("weiter").disabled = true;
        document.getElementById("weiter").addEventListener("click", function () { window.open(Abgabe.nextPage, "_self"); });
    }
    function save(_form, _chooseLink) {
        let auswahl = { form: _form, link: _chooseLink };
        let auswahlJSON = JSON.stringify(auswahl);
        sessionStorage.setItem(saveIdentifier, auswahlJSON);
        document.getElementById("weiter").disabled = false;
    }
    function resetform() {
        while (bilddiv.childElementCount > maxLaenge) {
            bilddiv.lastChild.remove();
        }
    }
    function auswahl(bild, chooseLink) {
        let image = new Image();
        image.useMap = chooseLink + bild;
        let img = document.createElement("img");
        img.setAttribute("src", image.useMap);
        img.className = "generiert";
        bilddiv.appendChild(img);
        save(bild, chooseLink);
    }
    Abgabe.auswahl = auswahl;
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script.js.map