namespace Pruefungsabgabe {




    let produktcode: string =  //--> String in div mit id= insert einfügen


        "<div class=\"produkt\">" +

        "<label  >" +
        "<input type=\"checkbox\" class=\"checkbox\" >" +
        "</label>" +

        "<div class=\"container\">" +


        "<img class=\"produktbild\">" +  //--> hier src für Image einfügen

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












    //Detailseite


    let detailbuttons: HTMLCollection = document.getElementsByClassName("detailbutton");
    let detailseitenshow: HTMLCollection = document.getElementsByClassName("detailshow");
    let detailseitenhide: HTMLCollection = document.getElementsByClassName("detailhide");
    let auswahlbuttons: HTMLCollection = document.getElementsByClassName("auswahl");
    let insertdiv: HTMLElement = document.getElementById("insert");
    let produktbild: HTMLCollection = document.getElementsByClassName("produktbild");
    let information: HTMLCollection = document.getElementsByClassName("information");
    let produktdiv: HTMLCollection = document.getElementsByClassName("produkt");
    let containerdiv: HTMLCollection = document.getElementsByClassName("container");
    let carttext: HTMLElement = document.getElementById("carttext");
    let reservebutton: HTMLElement = document.getElementById("reservieren");
    let reserveseitenhide: HTMLElement = document.getElementById("reservehide");
    let savereserve: HTMLElement = document.getElementById("savereservieren");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let checkformresponse: HTMLElement = document.getElementById("checkformresponse");
    let inputfield1: HTMLElement = document.getElementById("input1");
    let inputfield2: HTMLElement = document.getElementById("input2");
    let reload: number = 0; //verhindert mehrfache Events
    let checkboxen: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("checkbox");





    getdata();




    async function getdata(): Promise<void> {
        let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json: string = await response.text();
        let data: Daten = JSON.parse(json);
        buildSite(data);



    }



    function checkForm(_formSize: number, _data: Daten): void {
        let formdata: FormData = new FormData(form);
        let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        let formfilled: number = 0;
        let cartfilled: number = 0;


        for (let entry of formstring.values()) {
            if (entry != "") { formfilled++; }
        }
        for (let x: number = 0; x < checkboxen.length; x++) {

            if (checkboxen[x].checked) { cartfilled++; }
        }


        if (formfilled < _formSize) { checkformresponse.innerText = "Bitte füllen Sie das Formular vollständig aus"; } //Form ausgefüllt?
        else if (cartfilled == 0) { checkformresponse.innerText = "Es befinden sich keine Artikel in Ihrer Auswahl"; } //Etwas ausgewählt?
        else { send(_data); }
    }


    async function send(_data: Daten): Promise<void> {

        let formdata: FormData = new FormData(form);
        let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        formstring.append("_id", "user");

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (checkboxen[x].checked) { formstring.append("_id", _data.produkte[x]._id); }
        }


        //Senden und fetchen der Antwort
        fetch("https://pruefungsabgabe.herokuapp.com/", {
            method: "POST",

            body: formstring
        });

        clearsite();
        getdata();

    }

    
    function clearsite(): void {

        insertdiv.innerHTML = "";
       
    }



    function buildSite(_data: Daten): void {





        for (let x: number = 0; x < _data.produkte.length; x++) { //Build all Produkte

            insertdiv.innerHTML = insertdiv.innerHTML + produktcode;
            produktbild[x].setAttribute("src", _data.produkte[x].produktbild);
            information[x].innerHTML = "Name: " + _data.produkte[x].name + "<br>" + "<br>" + "Beschreibung: " + _data.produkte[x].beschreibung + "<br>" + "<br>" + "Ausleihgebühr: " + _data.produkte[x].preis + "€" + "<br>" + "<br>";

            if (_data.produkte[x].status != "frei") { produktdiv[x].className = "produkt produktgrey"; containerdiv[x].className = "container containergrey"; checkboxen[x].toggleAttribute("disabled"); }



        }



        showhidedetail(); //Eventlistener auf jeden Knopf, der die Details öffnet + klick auf seite = schließen


        auswahlevent(_data); //Eventlistener auf jeden Knopf, der die Details öffnet

        onetimeEvent(_data); //verhindert mehrfache Eventlistener




    }


    function onetimeEvent(_data: Daten): void {


        if (reload == 0) {
            window.addEventListener("click", function callrefresh(): void { auswahlrefresh(_data); }); //liest alle gecheckten checkboxen und addiert Gebühr und schreibt sie hin
            savereserve.addEventListener("click", function callcheck(): void { checkForm(2, _data); });
            reservebutton.addEventListener("click", function (): void { reserveseitenhide.id = "reserveshow"; checkformresponse.innerText = ""; });
            reserveseitenhide.addEventListener("click", function (): void { if (event.target != form && event.target != inputfield1 && event.target != inputfield2 && event.target != savereserve) reserveseitenhide.id = "reservehide"; });
            reload++;
        }


    }


    function auswahlrefresh(_data: Daten): void {

        let currentprice: number = 0;

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (checkboxen[x].checked && _data.produkte[x].status == "frei") { currentprice += _data.produkte[x].preis; carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€"; }
            else { carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€"; }
        }

    }



    function auswahlevent(_data: Daten): void {

        for (let x: number = 0; x < _data.produkte.length; x++) {

            if (_data.produkte[x].status == "frei") {
                auswahlbuttons[x].addEventListener("click", function (): void { checkboxen[x].checked = true; });
            }
            else { auswahlbuttons[x].className = "auswahl auswahlgrey"; auswahlbuttons[x].toggleAttribute("disabled"); }

        }
    }




    function showhidedetail(): void {

        for (let x: number = 0; x < detailbuttons.length; x++) {

            detailbuttons[x].addEventListener("click", function (): void { if (detailseitenshow.length < 1) { detailseitenhide[x].classList.replace("detailhide", "detailshow"); } });

        }

        for (let x: number = 0; x < detailseitenhide.length; x++) {

            detailseitenhide[x].addEventListener("click", function (): void { detailseitenshow[0].classList.replace("detailshow", "detailhide"); });

        }

    }









    interface Daten {

        produkte: [{ _id: string, name: string, produktbild: string, beschreibung: string, preis: number, status: string }];



    }





}