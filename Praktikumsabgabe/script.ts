




namespace Abgabe {

  getdata();



  let buttondiv: HTMLElement = document.getElementById("dropdown-content");
  let bilddiv: HTMLElement = document.getElementById("Bild");
  export let nextpage: string = "";
  let choose: string = "";
  let maxlaenge: number = 0;
  let saveidentifier: string = "";
  let imagecounter: number = 0;


  async function getdata(): Promise<void> {
    let response: Response = await fetch("data.json");
    let data: any = await response.json();
    


    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
      choose = data.oben[0].link;
      saveidentifier = "auswahloben";
      nextpage = "zweiter_schritt02.html";
      imagecounter = data.oben.length;
      create_event();
    }


    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
      choose = data.mitte[0].link;
      saveidentifier = "auswahlmitte";
      nextpage = "dritter_schritt03.html";
      imagecounter = data.mitte.length;
      maxlaenge = 1;
      auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
      create_event();
    }


    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
      choose = data.unten[0].link;
      saveidentifier = "auswahlunten";
      nextpage = "ende04.html";
      imagecounter = data.unten.length;
      maxlaenge = 2;
      auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
      auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
      create_event();
    }
  }

  function create_event(): void {

    for (let x: number = 1; x <= imagecounter; x++) {


      let a: HTMLElement = document.createElement("a");
      a.id = "form" + x;
      a.innerText = "Form " + x;
      buttondiv.appendChild(a);

      let bildname: string = x + ".png";
      let idname: string = "form" + x;
      document.getElementById(idname).addEventListener("click", function (): void { resetform(); auswahl(bildname, choose); });

    }

    (<HTMLInputElement>document.getElementById("weiter")).disabled = true;
    document.getElementById("weiter").addEventListener("click", function (): void { window.open(nextpage, "_self"); });

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

  function save(_form: string, _choose: string): void {

    let auswahl: Auswahl = { form: _form, link: _choose };
    let auswahlJSON: string = JSON.stringify(auswahl);
    sessionStorage.setItem(saveidentifier, auswahlJSON);
    (<HTMLInputElement>document.getElementById("weiter")).disabled = false;
  }

  function resetform(): void {

    while (bilddiv.childElementCount > maxlaenge) { bilddiv.lastChild.remove(); }

  }



  export function auswahl(bild: string, choose: string): void {

    let image: HTMLImageElement = new Image();
    image.useMap = choose + bild;
    let img: HTMLImageElement = document.createElement("img");
    img.setAttribute("src", image.useMap);
    img.className = "generiert";
    bilddiv.appendChild(img);
    save(bild, choose);


  }

}




































