"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let produktcode = "<div class=\"produkt\">" +
        "<label  >" +
        "<input type=\"checkbox\" class=\"checkbox\" >" +
        "</label>" +
        "<div class=\"container\">" +
        "<img class=\"produktbild\">" + //--> hier src für Image einfügen
        "<button class=\"detailbutton\">Details</button>" +
        "</div>" +
        "</div>" +
        "<div class=\"detailhide\">" +
        "<div class=\"detaildiv\">" +
        "<p class=\"information\"></p>" + //--> hier informationen einfügen. Nach jeder Info zwei <br> einfügen
        "<button class=\"auswahl\">Auswählen</button>" +
        "</div>" +
        "<p class=\"schließen\">(Zum schließen Fenster anklicken)</p>" +
        "</div>";
    let detailbuttons = document.getElementsByClassName("detailbutton");
    let detailseitenshow = document.getElementsByClassName("detailshow");
    let detailseitenhide = document.getElementsByClassName("detailhide");
    let auswahlbuttons = document.getElementsByClassName("auswahl");
    let insertdiv = document.getElementById("insert");
    let produktbild = document.getElementsByClassName("produktbild");
    let information = document.getElementsByClassName("information");
    let produktdiv = document.getElementsByClassName("produkt");
    let containerdiv = document.getElementsByClassName("container");
    let carttext = document.getElementById("carttext");
    let reservebutton = document.getElementById("reservieren");
    let reserveseitenhide = document.getElementById("reservehide");
    let savereserve = document.getElementById("savereservieren");
    let form = document.getElementById("form");
    let checkformresponse = document.getElementById("checkformresponse");
    let inputfield1 = document.getElementById("input1");
    let inputfield2 = document.getElementById("input2");
    let reload = 0; //verhindert mehrfache Events
    let checkboxen = document.getElementsByClassName("checkbox");
    getData();
    async function getData() {
        let response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json = await response.text();
        let data = JSON.parse(json);
        console.log("test");
        buildSite(data);
    }
    function checkForm(_formSize, _data) {
        let formdata = new FormData(form);
        let formstring = new URLSearchParams(formdata);
        let formfilled = 0;
        let cartfilled = 0;
        for (let entry of formstring.values()) {
            if (entry != "") {
                formfilled++;
            }
        }
        for (let x = 0; x < checkboxen.length; x++) {
            if (checkboxen[x].checked) {
                cartfilled++;
            }
        }
        if (formfilled < _formSize) {
            checkformresponse.innerText = "Bitte füllen Sie das Formular vollständig aus";
        } //Form ausgefüllt?
        else if (cartfilled == 0) {
            checkformresponse.innerText = "Es befinden sich keine Artikel in Ihrer Auswahl";
        } //Etwas ausgewählt?
        else {
            send(_data);
        }
    }
    async function send(_data) {
        let formdata = new FormData(form);
        let formstring = new URLSearchParams(formdata);
        formstring.append("_id", "user");
        for (let x = 0; x < checkboxen.length; x++) {
            if (checkboxen[x].checked) {
                formstring.append("_id", _data.produkte[x]._id);
            }
        }
        //Senden und fetchen der Antwort
        await fetch("https://pruefungsabgabe.herokuapp.com/", {
            method: "POST",
            body: formstring
        });
        refreshData();
    }
    function refreshData() {
        insertdiv.innerHTML = "";
        getData();
        checkformresponse.innerHTML = "Ihre Artikel wurden für Sie reserviert";
    }
    function buildSite(_data) {
        for (let x = 0; x < _data.produkte.length; x++) { //Build all Produkte
            insertdiv.innerHTML = insertdiv.innerHTML + produktcode;
            produktbild[x].setAttribute("src", _data.produkte[x].produktbild);
            information[x].innerHTML = "Name: " + _data.produkte[x].name + "<br>" + "<br>" + "Beschreibung: " + _data.produkte[x].beschreibung + "<br>" + "<br>" + "Ausleihgebühr: " + _data.produkte[x].preis + "€" + "<br>" + "<br>";
            if (_data.produkte[x].status != "frei") {
                produktdiv[x].className = "produkt produktgrey";
                containerdiv[x].className = "container containergrey";
                checkboxen[x].toggleAttribute("disabled");
            }
        }
        showhideDetail(); //Eventlistener auf jeden Knopf, der die Details öffnet + Details schließen
        auswahlEvent(_data); //Auswählen auf der Detailseite checked die Checkmark
        onetimeEvent(_data); //verhindert mehrfache Eventlistener nach neuem getdata
    }
    function onetimeEvent(_data) {
        if (reload == 0) {
            window.addEventListener("click", function callrefresh() { auswahlRefresh(_data); }); //liest alle gecheckten checkboxen + addiert Gebühr + schreibt sie hin
            savereserve.addEventListener("click", function callcheck() { checkForm(2, _data); });
            reservebutton.addEventListener("click", function () { reserveseitenhide.id = "reserveshow"; checkformresponse.innerText = ""; });
            reserveseitenhide.addEventListener("click", function () { if (event.target != form && event.target != inputfield1 && event.target != inputfield2 && event.target != savereserve)
                reserveseitenhide.id = "reservehide"; });
            reload++;
        }
    }
    function auswahlRefresh(_data) {
        let currentprice = 0;
        for (let x = 0; x < checkboxen.length; x++) {
            if (checkboxen[x].checked && _data.produkte[x].status == "frei") {
                currentprice += _data.produkte[x].preis;
                carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€";
            }
            else {
                carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€";
            }
        }
    }
    function auswahlEvent(_data) {
        for (let x = 0; x < _data.produkte.length; x++) {
            if (_data.produkte[x].status == "frei") {
                auswahlbuttons[x].addEventListener("click", function () { checkboxen[x].checked = true; });
            }
            else {
                auswahlbuttons[x].className = "auswahl auswahlgrey";
                auswahlbuttons[x].toggleAttribute("disabled");
            }
        }
    }
    function showhideDetail() {
        for (let x = 0; x < detailbuttons.length; x++) {
            detailbuttons[x].addEventListener("click", function () { if (detailseitenshow.length < 1) {
                detailseitenhide[x].classList.replace("detailhide", "detailshow");
            } });
        }
        for (let x = 0; x < detailseitenhide.length; x++) {
            detailseitenhide[x].addEventListener("click", function () { detailseitenshow[0].classList.replace("detailshow", "detailhide"); });
        }
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=script.js.map