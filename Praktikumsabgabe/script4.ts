




namespace Abgabe {

    

let div: HTMLElement = document.getElementById("Bild");
let a: Auswahl = JSON.parse(sessionStorage.getItem("auswahloben"));
let b: Auswahl = JSON.parse(sessionStorage.getItem("auswahlmitte"));
let c: Auswahl = JSON.parse(sessionStorage.getItem("auswahlunten"));
  
let endergebnis: Objekt = {oben: a , mitte: b , unten: c};
    
console.log(endergebnis.oben.form);
console.log(endergebnis.mitte.form);
console.log(endergebnis.unten.form);


let oben: HTMLImageElement = new Image();  
oben.useMap = "bilder/oben/" + endergebnis.oben.form;  
let imgoben: HTMLImageElement = document.createElement("img");  
imgoben.setAttribute("src", oben.useMap);    
imgoben.id = "endeoben"; 
div.appendChild(imgoben);  

  
let mitte: HTMLImageElement = new Image();  
mitte.useMap = "bilder/mitte/" + endergebnis.mitte.form;  
let imgmitte: HTMLImageElement = document.createElement("img");  
imgmitte.setAttribute("src", mitte.useMap);    
imgmitte.id = "endemitte"; 
div.appendChild(imgmitte);    

  
let unten: HTMLImageElement = new Image();  
unten.useMap = "bilder/unten/" + endergebnis.unten.form;  
let imgunten: HTMLImageElement = document.createElement("img");  
imgunten.setAttribute("src", unten.useMap);    
imgunten.id = "endeunten"; 
div.appendChild(imgunten);    






      
nextpage = "erster_schritt01.html";
(<HTMLInputElement> document.getElementById("weiter")).disabled = false;
document.getElementById("weiter").addEventListener("click", function(): void {window.open(nextpage, "_self"); });
   
}

  

  
  
    
   
    
  
   
  
  
    
  
  
  

 
  
  
  
  
  
  
  














