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
    let checkformresponse: HTMLElement = document.getElementById("checkformresponse");


    let reload: number = 0; //verhindert mehrfache Events
    let checkboxen: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("checkbox");





    getData();




    async function getData(): Promise<void> {
        let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json: string = await response.text();
        let data: Daten = JSON.parse(json);
        buildSite(data);



    }







    async function save(_data: Daten): Promise<void> {

        let cartfilled: number = 0;

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (checkboxen[x].checked) { cartfilled++; }
        }
        if (cartfilled == 0) { checkformresponse.innerText = "Es befinden sich keine Artikel in Ihrer Auswahl"; } //Etwas ausgewählt?

        //Daten in SessionStorage
        else {

            let formstring: URLSearchParams = new URLSearchParams();
            

            for (let x: number = 0; x < checkboxen.length; x++) {

                if (checkboxen[x].checked) { formstring.append("_id", _data.produkte[x]._id); }
            }

            sessionStorage.setItem("data", formstring.toString());


            window.open("/GIS-WiSe-2020-2021/Prüfungsabgabe/AStA_Reg.html", "_self");
        }
    }



    function buildSite(_data: Daten): void {





        for (let x: number = 0; x < _data.produkte.length; x++) { //Build all Produkte

            insertdiv.innerHTML = insertdiv.innerHTML + produktcode;
            produktbild[x].setAttribute("src", _data.produkte[x].produktbild);
            information[x].innerHTML = "Name: " + _data.produkte[x].name + "<br>" + "<br>" + "Beschreibung: " + _data.produkte[x].beschreibung + "<br>" + "<br>" + "Ausleihgebühr: " + _data.produkte[x].preis + "€" + "<br>" + "<br>";

            if (_data.produkte[x].status != "frei") { produktdiv[x].className = "produkt produktgrey"; containerdiv[x].className = "container containergrey"; checkboxen[x].toggleAttribute("disabled"); }



        }



        showhideDetail(); //Eventlistener auf jeden Knopf, der die Details öffnet + Details schließen


        auswahlEvent(_data); //Auswählen auf der Detailseite checked die Checkmark

        onetimeEvent(_data); //verhindert mehrfache Eventlistener nach neuem getdata




    }


    function onetimeEvent(_data: Daten): void {


        if (reload == 0) {
            window.addEventListener("click", function callrefresh(): void { auswahlRefresh(_data); }); //liest alle gecheckten checkboxen + addiert Gebühr + schreibt sie hin

            reservebutton.addEventListener("click", function (): void { save(_data); });
            reload++;
        }


    }


    function auswahlRefresh(_data: Daten): void {

        let currentprice: number = 0;

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (currentprice != 0) {checkformresponse.innerText = ""; }
            if (checkboxen[x].checked && _data.produkte[x].status == "frei") { currentprice += _data.produkte[x].preis; carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€"; }
            else { carttext.innerHTML = "Gesamte Leihgebühr: " + currentprice.toString() + "€"; }
           
        } 

    }



    function auswahlEvent(_data: Daten): void {

        for (let x: number = 0; x < _data.produkte.length; x++) {

            if (_data.produkte[x].status == "frei") {
                auswahlbuttons[x].addEventListener("click", function (): void { checkboxen[x].checked = true; });
            }
            else { auswahlbuttons[x].className = "auswahl auswahlgrey"; auswahlbuttons[x].toggleAttribute("disabled"); }

        }
    }




    function showhideDetail(): void {

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