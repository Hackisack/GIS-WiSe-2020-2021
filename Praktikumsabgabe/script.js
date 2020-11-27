"use strict";
var Abgabe;
(function (Abgabe) {
    let buttondiv = document.getElementById("dropdown-content");
    let bilddiv = document.getElementById("Bild");
    Abgabe.nextpage = "";
    let choose = "";
    let maxlaenge = 0;
    let saveidentifier = "";
    let imagecounter = 3;
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
        choose = "bilder/oben/";
        saveidentifier = "auswahloben";
        Abgabe.nextpage = "zweiter_schritt02.html";
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
        choose = "bilder/mitte/";
        saveidentifier = "auswahlmitte";
        Abgabe.nextpage = "dritter_schritt03.html";
        maxlaenge = 1;
        if (JSON.parse(sessionStorage.getItem("auswahloben")).form != undefined) {
            auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
        choose = "bilder/unten/";
        saveidentifier = "auswahlunten";
        Abgabe.nextpage = "ende04.html";
        maxlaenge = 2;
        auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
        auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
    }
    for (let x = 1; x <= imagecounter; x++) {
        let a = document.createElement("a");
        a.id = "form" + x;
        a.innerText = "Form " + x;
        buttondiv.appendChild(a);
        let bildname = x + ".png";
        let idname = "form" + x;
        document.getElementById(idname).addEventListener("click", function () { resetform(); auswahl(bildname, choose); });
    }
    //document.getElementById("form1").addEventListener("click", function(): void {resetform(); auswahl("1.png", choose); });
    //document.getElementById("form2").addEventListener("click", function(): void {resetform(); auswahl("2.png", choose); });
    //document.getElementById("form3").addEventListener("click", function(): void {resetform(); auswahl("3.png", choose); });
    document.getElementById("weiter").disabled = true;
    document.getElementById("weiter").addEventListener("click", function () { window.open(Abgabe.nextpage, "_self"); });
    function save(form) {
        let auswahl = { form: form };
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
        save(bild);
    }
    Abgabe.auswahl = auswahl;
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script.js.map