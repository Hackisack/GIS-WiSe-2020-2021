"use strict";
var Abgabe;
(function (Abgabe) {
    getdata();
    let buttondiv = document.getElementById("dropdown-content");
    let bilddiv = document.getElementById("Bild");
    Abgabe.nextpage = "";
    let choose = "";
    let maxlaenge = 0;
    let saveidentifier = "";
    let imagecounter = 0;
    async function getdata() {
        let response = await fetch("data.json");
        let data = await response.json();
        console.log(data);
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
            choose = data.oben[0].link;
            saveidentifier = "auswahloben";
            Abgabe.nextpage = "zweiter_schritt02.html";
            imagecounter = data.oben.length;
            create_event();
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
            choose = data.mitte[0].link;
            saveidentifier = "auswahlmitte";
            Abgabe.nextpage = "dritter_schritt03.html";
            imagecounter = data.mitte.length;
            maxlaenge = 1;
            auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
            create_event();
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
            choose = data.unten[0].link;
            saveidentifier = "auswahlunten";
            Abgabe.nextpage = "ende04.html";
            imagecounter = data.unten.length;
            maxlaenge = 2;
            console.log(maxlaenge);
            auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
            auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
            create_event();
        }
    }
    function create_event() {
        for (let x = 1; x <= imagecounter; x++) {
            let a = document.createElement("a");
            a.id = "form" + x;
            a.innerText = "Form " + x;
            buttondiv.appendChild(a);
            let bildname = x + ".png";
            let idname = "form" + x;
            document.getElementById(idname).addEventListener("click", function () { resetform(); auswahl(bildname, choose); });
        }
        document.getElementById("weiter").disabled = true;
        document.getElementById("weiter").addEventListener("click", function () { window.open(Abgabe.nextpage, "_self"); });
    }
    function save(_form, _choose) {
        let auswahl = { form: _form, link: _choose };
        let auswahlJSON = JSON.stringify(auswahl);
        sessionStorage.setItem(saveidentifier, auswahlJSON);
        document.getElementById("weiter").disabled = false;
    }
    function resetform() {
        while (bilddiv.childElementCount > maxlaenge) {
            bilddiv.lastChild.remove();
        }
    }
    function auswahl(bild, choose) {
        let image = new Image();
        image.useMap = choose + bild;
        let img = document.createElement("img");
        img.setAttribute("src", image.useMap);
        img.className = "generiert";
        bilddiv.appendChild(img);
        save(bild, choose);
    }
    Abgabe.auswahl = auswahl;
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script.js.map