namespace Aufgabe2_3_1 {

    const element: HTMLElement  = document.body;

    let neu: HTMLElement = document.getElementById("neu");
    let reset: HTMLElement = document.getElementById("reset");

    function createRect(): void {
        let div: HTMLParagraphElement = document.createElement("div");
        div.style.width = "200px";
        div.style.height = "100px";
        div.style.backgroundColor = "black";
        div.style.margin = "auto";
        div.style.marginTop = "20px";
        div.className = "rechteck";
        element.appendChild(div);
        
    }

    function resetpage(): void {
        
        var elements = document.getElementsByClassName("rechteck");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
   
    neu.addEventListener("click", createRect);
    reset.addEventListener("click", resetpage);
    
    
    

}
