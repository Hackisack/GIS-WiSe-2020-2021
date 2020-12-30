"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let tabellenheader = "<tr>" +
        "<th>Artikel</th>" +
        "<th>Status</th>" +
        "<th>Name</th>" +
        "<th>Mail</th>" +
        "<th>Verwalten</th>" +
        "</tr>";
    let tabellencode = "<tr>" +
        "<td class=\"artikel\"></td>" +
        "<td class=\"status\"></td>" +
        "<td class=\"name\"></td>" +
        "<td class=\"email\"></td>" +
        "<td> <button class=\"buttonausgeliehen\"> Ausgeliehen </button> <button class=\"buttonfrei\"> Frei </button> </td>" +
        "</tr>";
    let tabelle = document.getElementById("tabelle");
    let artikel = document.getElementsByClassName("artikel");
    let status = document.getElementsByClassName("status");
    let name = document.getElementsByClassName("name");
    let email = document.getElementsByClassName("email");
    let buttonausgeliehen = document.getElementsByClassName("buttonausgeliehen");
    let buttonfrei = document.getElementsByClassName("buttonfrei");
    getdata();
    async function getdata() {
        let response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json = await response.text();
        let data = JSON.parse(json);
        buildSite(data);
    }
    function buildSite(_data) {
        tabelle.innerHTML = tabellenheader;
        for (let x = 0; x < _data.produkte.length; x++) { //Build alle Tabelleneinträge
            tabelle.innerHTML = tabelle.innerHTML + tabellencode;
            artikel[x].textContent = _data.produkte[x].name;
            status[x].textContent = _data.produkte[x].status;
            if (_data.produkte[x].ausleihname != "") {
                name[x].textContent = _data.produkte[x].ausleihname;
            }
            else {
                name[x].textContent = " -- ";
            }
            if (_data.produkte[x].ausleihemail != "") {
                email[x].textContent = _data.produkte[x].ausleihemail;
            }
            else {
                email[x].textContent = " -- ";
            }
        }
        for (let x = 0; x < _data.produkte.length; x++) {
            buttonausgeliehen[x].addEventListener("click", function () { send(_data.produkte[x]._id, "ausgeliehen"); });
            buttonfrei[x].addEventListener("click", function () { send(_data.produkte[x]._id, "frei"); });
            if (_data.produkte[x].status == "frei") {
                buttonfrei[x].className = "buttonfrei buttonausfreigrau";
                buttonfrei[x].toggleAttribute("disabled");
                buttonausgeliehen[x].className = "buttonausgeliehen buttonausfreigrau";
                buttonausgeliehen[x].toggleAttribute("disabled");
            }
        }
    }
    async function send(_id, _operation) {
        let formstring = new URLSearchParams();
        formstring.append("Email", "asta.furtwangen");
        formstring.append("Name", "Asta");
        formstring.append("_id", _operation);
        formstring.append("_id", _id);
        //Senden und fetchen der Antwort
        await fetch("https://pruefungsabgabe.herokuapp.com/", {
            method: "POST",
            body: formstring
        });
        clearsite();
    }
    function clearsite() {
        tabelle.innerHTML = "";
        getdata();
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=adminscript.js.map