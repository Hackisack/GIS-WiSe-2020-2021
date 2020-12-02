




namespace Abgabe {

  getdata(); //Startfunktion

  let buttondiv: HTMLElement = document.getElementById("dropdown-content");
  let bilddiv: HTMLElement = document.getElementById("Bild");
  export let nextPage: string = "";
  let chooseLink: string = "";
  let maxLaenge: number = 0;
  let saveIdentifier: string = "";
  let imageCounter: number = 0;


  async function getdata(): Promise<void> {
    let response: Response = await fetch("data.json");
    let json: string = JSON.stringify(await response.json());
    let data: Daten = JSON.parse(json);

    //Seitenunterscheidung

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
      chooseLink = data.oben[0].link;
      saveIdentifier = "auswahloben";
      nextPage = "zweiter_schritt02.html";
      imageCounter = data.oben.length;
      create_event(data, "oben");
    }


    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
      chooseLink = data.mitte[0].link;
      saveIdentifier = "auswahlmitte";
      nextPage = "dritter_schritt03.html";
      imageCounter = data.mitte.length;
      maxLaenge = 1;
      auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
      create_event(data, "mitte");
    }


    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
      chooseLink = data.unten[0].link;
      saveIdentifier = "auswahlunten";
      nextPage = "ende04.html";
      imageCounter = data.unten.length;
      maxLaenge = 2;
      auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
      auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
      create_event(data, "unten");
    }
  }


  //Funktionen

  function create_event(data: Daten, seite: string): void {

    for (let x: number = 1; x <= imageCounter; x++) {


      let a: HTMLElement = document.createElement("a");
      a.id = "form" + x;
      a.innerText = "Form " + x;
      buttondiv.appendChild(a);

      let bildname: string = "";
      if (seite == "oben") { bildname = data.oben[x - 1].name; }
      else if (seite == "mitte") { bildname = data.mitte[x - 1].name; }
      else if (seite == "unten") { bildname = data.unten[x - 1].name; }


      let idName: string = "form" + x;
      document.getElementById(idName).addEventListener("click", function (): void { resetform(); auswahl(bildname, chooseLink); });

    }

    (<HTMLInputElement>document.getElementById("weiter")).disabled = true;
    document.getElementById("weiter").addEventListener("click", function (): void { window.open(nextPage, "_self"); });

  }



  function save(_form: string, _chooseLink: string): void {

    let auswahl: Auswahl = { form: _form, link: _chooseLink };
    let auswahlJSON: string = JSON.stringify(auswahl);
    sessionStorage.setItem(saveIdentifier, auswahlJSON);
    (<HTMLInputElement>document.getElementById("weiter")).disabled = false;
  }

  function resetform(): void {

    while (bilddiv.childElementCount > maxLaenge) { bilddiv.lastChild.remove(); }

  }



  export function auswahl(bild: string, chooseLink: string): void {

    let image: HTMLImageElement = new Image();
    image.useMap = chooseLink + bild;
    let img: HTMLImageElement = document.createElement("img");
    img.setAttribute("src", image.useMap);
    img.className = "generiert";
    bilddiv.appendChild(img);
    save(bild, chooseLink);


  }

  //Interfaces

  export interface Daten {

    oben: [{ name: string, link: string }];
    mitte: [{ name: string, link: string }];
    unten: [{ name: string, link: string }];

  }

  export interface Auswahl {
    form: string;
    link: string;
  }

  export interface Objekt {
    oben: Auswahl;
    mitte: Auswahl;
    unten: Auswahl;
  }


}




































