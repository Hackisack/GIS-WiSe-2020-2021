

namespace Pruefungsabgabe {

    let tabellenheader: string =


        "<tr>" +

        "<th>Artikel</th>" +
        "<th>Status</th>" +
        "<th>Name</th>" +
        "<th>Mail</th>" +
        "<th>Verwalten</th>" +

        "</tr>";



    let tabellencode: string =

        "<tr>" +

        "<td class=\"artikel\"></td>" +
        "<td class=\"status\"></td>" +
        "<td class=\"name\"></td>" +
        "<td class=\"email\"></td>" +
        "<td> <button class=\"buttonausgeliehen\"> Ausgeliehen </button> <button class=\"buttonfrei\"> Frei </button> </td>" +

        "</tr>";






    let tabelle: HTMLTableElement = <HTMLTableElement>document.getElementById("tabelle");
    let artikel: HTMLCollection = document.getElementsByClassName("artikel");
    let status: HTMLCollection = document.getElementsByClassName("status");
    let name: HTMLCollection = document.getElementsByClassName("name");
    let email: HTMLCollection = document.getElementsByClassName("email");
    let buttonausgeliehen: HTMLCollection = document.getElementsByClassName("buttonausgeliehen");
    let buttonfrei: HTMLCollection = document.getElementsByClassName("buttonfrei");


    getdata();


    async function getdata(): Promise<void> {
        let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json: string = await response.text();
        let data: Daten = JSON.parse(json);
        buildSite(data);
    }


    function buildSite(_data: Daten): void {

        tabelle.innerHTML = tabellenheader;

        for (let x: number = 0; x < _data.produkte.length; x++) { //Build alle Tabelleneinträge

            tabelle.innerHTML = tabelle.innerHTML + tabellencode;



            artikel[x].textContent = _data.produkte[x].name;
            status[x].textContent = _data.produkte[x].status;

            if (_data.produkte[x].ausleihname != "") { name[x].textContent = _data.produkte[x].ausleihname; }
            else { name[x].textContent = " -- "; }

            if (_data.produkte[x].ausleihemail != "") { email[x].textContent = _data.produkte[x].ausleihemail; }
            else { email[x].textContent = " -- "; }

        }


        for (let x: number = 0; x < _data.produkte.length; x++) {
            buttonausgeliehen[x].addEventListener("click", function (): void { send(_data.produkte[x]._id, "ausgeliehen"); });
            buttonfrei[x].addEventListener("click", function (): void { send(_data.produkte[x]._id, "frei"); });

            if (_data.produkte[x].status == "frei") {

                buttonfrei[x].className = "buttonfrei buttonausfreigrau"; buttonfrei[x].toggleAttribute("disabled");
                buttonausgeliehen[x].className = "buttonausgeliehen buttonausfreigrau"; buttonausgeliehen[x].toggleAttribute("disabled");

            }
        }

    }



    async function send(_id: string, _operation: string): Promise<void> {


        let formstring: URLSearchParams = new URLSearchParams();

        formstring.append("Email", "asta.furtwangen");
        formstring.append("Name", "Asta");
        formstring.append("_id", _operation);
        formstring.append("_id", _id);






        //Senden und fetchen der Antwort
        fetch("https://pruefungsabgabe.herokuapp.com/", {
            method: "POST",

            body: formstring
        });

        clearsite();
        


    }

    function clearsite(): void {

        tabelle.innerHTML = "";

        getdata();

    }

    interface Daten {

        produkte: [{ _id: string, name: string, produktbild: string, beschreibung: string, preis: number, status: string, ausleihname: string, ausleihemail: string }];



    }


}