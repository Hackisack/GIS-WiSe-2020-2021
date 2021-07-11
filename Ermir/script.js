"use strict";
var Modulprüfung;
(function (Modulprüfung) {
    Modulprüfung.auswahl = {
        entschei: []
    };
    let cartFilled = 0;
    let nam = [];
    let besch = [];
    let bil = [];
    let ausl = [];
    let stat = [];
    let einer = document.getElementsByTagName("img");
    let aufgedeckt = document.createElement("img");
    let zaehler = parseInt(aufgedeckt.getAttribute("data-entryCount"));
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
        datenerhebung();
        async function datenerhebung() {
            let formData = new FormData(document.forms[0]);
            let _url = "https://ermirtest.herokuapp.com/index";
            console.log("huh1");
            let response = await fetch(_url);
            console.log("huhu");
            let data = await response.text();
            let speicher = JSON.parse(data);
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "spiel.html") {
        let checkFormResponse = document.getElementById("checkformresponse");
        let formString = new URLSearchParams(sessionStorage.getItem("data"));
        let submit = document.getElementById("submit");
        let submit1 = document.getElementById("submit1");
        let form = document.getElementById("form");
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        submit1.addEventListener("click", function () {
            sessionStorage.clear();
            console.log("wird alles gelöscht");
        });
        datenerhebung();
        async function datenerhebung() {
            let sekunden = 1;
            let _url = "https://ermirtest.herokuapp.com/index";
            console.log("huh1");
            let response = await fetch(_url);
            console.log("huhu");
            let data = await response.text();
            let start = 10;
            let zeit = start * 60;
            let timer = document.getElementById("countdown");
            for (let i = 0; i < 60; i++) {
                timen();
            }
            function timen() {
                window.setInterval(() => {
                    //let minuten:   = Math.floor(zeit / 60);
                    timer.innerHTML = Math.round((sekunden / 60)).toString();
                    sekunden++;
                }, 1000);
            }
            let speicher = JSON.parse(data);
            let div1;
            let eineAufgedeckt = false;
            let match = false;
            let ersteKarte;
            let zweiteKarte;
            let erste;
            let zweite;
            let mischen = [0, 1, 2, 3, 4, 5, 6, 7];
            let matchCounter = 0;
            //    mischen.sort( () => .5 - Math.random() );
            for (let y = 0; y < 2; y++) {
                //   mischen.sort( () => .5 - Math.random() );
                for (let x = 0; x < speicher.length - 1; x++) {
                    let aufgedeckt = document.createElement("img");
                    let verdeckt = document.createElement("img");
                    aufgedeckt.src = speicher[mischen[x]].Bild;
                    verdeckt.src = speicher[8].Bild;
                    document.getElementById("spiel").appendChild(verdeckt);
                    verdeckt.addEventListener("click", function () {
                        verdeckt.src = aufgedeckt.src;
                        if (!eineAufgedeckt) {
                            eineAufgedeckt = true;
                            ersteKarte = aufgedeckt.src;
                            verdeckt.style.display = "";
                            erste = verdeckt;
                        }
                        else {
                            eineAufgedeckt = false;
                            zweiteKarte = aufgedeckt.src;
                            zweite = verdeckt;
                            verdeckt.style.display = "";
                        }
                        if (ersteKarte == zweiteKarte && zweiteKarte != null) {
                            matchCounter++;
                            console.log(matchCounter);
                            match = true;
                            console.log(aufgedeckt);
                            setTimeout(() => {
                                erste.style.display = "none";
                                zweite.style.display = "none";
                            }, 1500);
                            if (matchCounter == 8) {
                                console.log("winner");
                                console.log(sekunden);
                                let ergebnis = (sekunden / 60).toString();
                                localStorage.setItem("score", (ergebnis));
                                location.href = "./deinHighscore.html";
                            }
                        }
                        if (ersteKarte != zweiteKarte && zweiteKarte != null) {
                            match = false;
                            setTimeout(() => {
                                erste.src = speicher[8].Bild;
                                zweite.src = speicher[8].Bild;
                            }, 1500);
                        }
                        if (ersteKarte != null && zweiteKarte != null) {
                            ersteKarte = null;
                            zweiteKarte = null;
                        }
                    });
                }
            }
            /*   function markierenUndSpeichern(_speicher: Speicher[], _aufgedeckt: HTMLImageElement): void {
          
                 console.log(parseInt(_aufgedeckt.getAttribute("data-entryCount")));
                 let zaehler: number = parseInt(_aufgedeckt.getAttribute("data-entryCount"));
                 let dats: string = "dataEntry" + zaehler.toString();
                 // console.log(sessionStorage.getItem("data"));
                 if (sessionStorage.getItem(dats) != null)
                   sessionStorage.removeItem(dats);
         
                 else sessionStorage.setItem(dats, JSON.stringify(_speicher[zaehler]));
         
                 submit.addEventListener("click", function (): void {
         
         
                   location.href = "./bestaetigung.html";
                 });
         
               }
             }
           }
           if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "bestaetigung.html") {
             // function send(dats: string): void {
             console.log("halololo");
         
         
             let _url: string = "http://localhost:bestaetigung";
             console.log("huhuhuhhuu");
             let speicher: Speicher[] = [];
             for (let value in sessionStorage) {
               if (value.includes("dataEntry")) {
         
                 sessionStorage.getItem(value);
                 speicher.push(JSON.parse(sessionStorage.getItem(value)));
               }
             }
             console.log(speicher);
             //    console.log(JSON.parse(dats));
             console.log("hahahaha");
             bil.forEach(e => {
               aufgedeckt.src = e;
             });
         
             location.href = "./erfolgreich.html";
             if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erfolgreich.html") {
               let h2: HTMLParagraphElement = document.createElement("p");
               h2.innerText = "Artikel erfolgreich geliehen";
               document.body.appendChild(h2);
         */
            // console.log(parseInt(_aufgedeckt.getAttribute("data-entryCount")));
            // console.log(zaehler);
            // console.log(_speicher[zaehler]);
            // cartFilled++;
            // let bildpfad: string = _aufgedeckt.src;
            // console.log(bildpfad);
            // if (cartFilled == 0) { console.log(cartFilled + "Es befinden sich keine Artikel in Ihrer Auswahl"); } //Etwas ausgewählt?
            //Daten in SessionStorage
            // let aufgedeckt: HTMLImageElement = document.createElement("img");
            //   let formString: URLSearchParams = new URLSearchParams();
            //   for (let i: number = 0; i < _speicher.length; i++) {
            //     _aufgedeckt.addEventListener("click", function (): void {
            //       // aufgedeckt.src = _speicher[i].Bild;
            //       console.log(formString.toString());
            //       console.log("test hier");
            //       JSON.stringify(_speicher[i].Bild);
            //       sessionStorage.setItem("data", "1");
            //       sessionStorage.setItem("data", "2");
            //       // sessionStorage.setItem("data", formString.toString());
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "deinHighscore.html") {
        let submit2 = document.getElementById("submit2");
        submit2.addEventListener("click", deinScore);
        function deinScore() {
            let formData = new FormData(document.forms[0]);
            localStorage.setItem("name", formData.get("name").toString());
            submit_highscore();
        }
        async function submit_highscore() {
            let _url = "https://ermirtest.herokuapp.com/highscore" + "?" + "name=" + localStorage.getItem("name") + "&" + "score=" + localStorage.getItem("score");
            let response = await fetch(_url);
            let data = await response.text();
            if (data == "saved") {
                location.href = "./highscore.html";
            }
        }
    }
})(Modulprüfung || (Modulprüfung = {}));
if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "highscore.html") {
    let submit = document.getElementById("submit");
    let submit1 = document.getElementById("submit1");
    let form = document.getElementById("form");
    get_highscore();
    async function get_highscore() {
        let _url = "https://ermirtest.herokuapp.com/gethighscore";
        let response = await fetch(_url);
        let text = await response.text();
        let data = JSON.parse(text);
        console.log(data);
        let i = 1;
        let antwort = document.getElementById("antwort");
        for (let x = 0; x < 10; x++) {
            antwort.innerHTML += i + ". " + "Name: " + data[i].name + " Deine Zeit: " + data[i].highscore + " Sekunden" + "<br>" + "<br>";
            i++;
        }
    }
}
if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "admin.html") {
    let submit = document.getElementById("submitsave");
    let submit1 = document.getElementById("submit1");
    submit1.addEventListener("click", function () {
        loeschen();
    });
    submit.addEventListener("click", function () {
        hinzufuegen();
    });
    let ausgewählt = "";
    admin();
    async function admin() {
        let formData = new FormData(document.forms[0]);
        let _url = "https://ermirtest.herokuapp.com/index";
        let response = await fetch(_url);
        let data = await response.text();
        let speicher = JSON.parse(data);
        for (let i = 0; i < speicher.length; i++) {
            let bildersammlung = document.createElement("p");
            bildersammlung.innerHTML = speicher[i].Bild;
            document.body.appendChild(bildersammlung);
            bildersammlung.addEventListener("click", function () {
                ausgewählt = bildersammlung.innerText;
                console.log(ausgewählt);
            });
        }
    }
    async function loeschen() {
        let antwort = document.getElementById("antwort");
        let _url = "https://ermirtest.herokuapp.com/loeschen" + "?" + "name=" + ausgewählt;
        let response = await fetch(_url);
        let text = await response.text();
        antwort.innerText = text;
    }
    async function hinzufuegen() {
        let form = document.getElementById("name");
        let formData = new FormData(form);
        let antwort = document.getElementById("antwort");
        let _url = "https://ermirtest.herokuapp.com/hinzufuegen" + "?" + "name=" + formData.get("name").toString();
        let response = await fetch(_url);
        let text = await response.text();
        antwort.innerText = text;
        //  antwort.innerText = text;
    }
    // aufgedeckt.addEventListener("click", function (): void { checkForm(2, formString); });
    // function checkForm(_formSize: number, _formString: URLSearchParams): void {
    //   let formFilled: number = 0;
    //   let checkMail: number = 0;
    //   let formValues: FormData = new FormData(form);
    //   for (let entry of formValues.values()) {
    //     if (entry != "") { formFilled++; } //Alle felder ausgefüllt?
    //     if (entry.toString().includes("@")) { checkMail++; } //Email auf @ überprüfen
    //   if (formFilled < _formSize) { checkFormResponse.innerText = "Bitte füllen Sie das Formular vollständig aus"; }
    //   else if (checkMail != 1) { checkFormResponse.innerText = "Bitte verwenden Sie eine echte Email"; }
    //   else { send(_formString); }
    // }
    // async function send(_data: URLSearchParams): Promise<void> {
    //   let aufgedeckt: HTMLImageElement = document.createElement("img");
    //   let formData: FormData = new FormData(form);
    //   let formString: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
    //   formString.append("_id", "user");
    //   for (let entry of _data.values()) {
    //     formString.append("_id", entry);
    //   let response: Response = await fetch(_url);
    //   let data: string = await response.text();
    //   let speicher: Speicher[] = JSON.parse(data);
    //   valu.length = angeklickt.length;
    //   valu.length++;
    //   speicher.length++;
    //   //  let x: number = 0;
    //   angeklickt.length = 0;
    //   arr.length = speicher.length;
    //   for (let i: number = 0; i < arr.length; i++) {
    //     console.log(valu);
    //     console.log(zaehler[i]);
    //     aufgedeckt.setAttribute("style", "-webkit-filter: drop-shadow(5px 5px 20px #03b670");
    //     console.log("geht das überhaupt");
    //     zaehler[i] = true;
    //     angeklickt.length++;
    //     break;
    // function schicken(): void {
    //   let submit: HTMLElement = document.getElementById("submit");
    //   let antwort: HTMLElement = document.getElementById("antwort");
    //   submit.addEventListener("click", send);
}
//# sourceMappingURL=script.js.map