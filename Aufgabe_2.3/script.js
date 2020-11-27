"use strict";
var Aufgabe2_3_1;
(function (Aufgabe2_3_1) {
    const element = document.body;
    let neu = document.getElementById("neu");
    let reset = document.getElementById("reset");
    function createRect() {
        let div = document.createElement("div");
        div.style.width = "200px";
        div.style.height = "100px";
        div.style.backgroundColor = "black";
        div.style.margin = "auto";
        div.style.marginTop = "20px";
        div.className = "rechteck";
        element.appendChild(div);
    }
    function resetpage() {
        var elements = document.getElementsByClassName("rechteck");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    neu.addEventListener("click", createRect);
    reset.addEventListener("click", resetpage);
})(Aufgabe2_3_1 || (Aufgabe2_3_1 = {}));
//# sourceMappingURL=script.js.map