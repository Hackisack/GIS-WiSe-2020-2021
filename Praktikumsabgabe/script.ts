



namespace Abgabe {




let buttondiv: HTMLElement = document.getElementById("dropdown-content");
let bilddiv: HTMLElement = document.getElementById("Bild");
export let nextpage: string = "";
let choose: string = "";
let maxlaenge: number = 0;
let saveidentifier: string = "";
let imagecounter: number = 3;


if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erster_schritt01.html") {
choose = "bilder/oben/";
saveidentifier = "auswahloben";
nextpage = "zweiter_schritt02.html";

}


if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "zweiter_schritt02.html") {
choose = "bilder/mitte/";
saveidentifier = "auswahlmitte";
nextpage = "dritter_schritt03.html";
maxlaenge = 1;
if (JSON.parse(sessionStorage.getItem("auswahloben")).form != undefined) {auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/"); }
}


if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "dritter_schritt03.html") {
choose = "bilder/unten/";
saveidentifier = "auswahlunten";
nextpage = "ende04.html";
maxlaenge = 2;
auswahl(JSON.parse(sessionStorage.getItem("auswahloben")).form, "bilder/oben/");
auswahl(JSON.parse(sessionStorage.getItem("auswahlmitte")).form, "bilder/mitte/");
}
 

for (let x: number = 1; x <= imagecounter; x++) {


  let a: HTMLElement = document.createElement("a");
  a.id = "form" + x;
  a.innerText = "Form " + x ;
  buttondiv.appendChild(a);

  let bildname: string = x + ".png";
  let idname: string = "form" + x;
  document.getElementById(idname).addEventListener("click", function(): void {resetform(); auswahl(bildname, choose); });

}


(<HTMLInputElement> document.getElementById("weiter")).disabled = true;
document.getElementById("weiter").addEventListener("click", function(): void {window.open(nextpage, "_self"); });
  
    





    
function save(form: string): void {

  
     let auswahl: Auswahl = {form: form};
     let auswahlJSON: string = JSON.stringify(auswahl);
     sessionStorage.setItem(saveidentifier, auswahlJSON);
     (<HTMLInputElement> document.getElementById("weiter")).disabled = false;
    }
      
   
function resetform(): void {
          
     
while (bilddiv.childElementCount > maxlaenge) { bilddiv.lastChild.remove(); }

      
  }
    
      

export function auswahl( bild: string, choose: string): void {

    
   
   
    let image: HTMLImageElement = new Image();  
    image.useMap = choose + bild;  
    let img: HTMLImageElement = document.createElement("img");  
    img.setAttribute("src", image.useMap);  
    img.className = "generiert";
    bilddiv.appendChild(img);  
    save(bild);
    

    

     

    
        
     
   } 

}





  
  
  
  
    
  
  
  

 
  
  
  
  
  
  
  














  