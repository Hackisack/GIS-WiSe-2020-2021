"use strict";
var Abgabe3;
(function (Abgabe3) {
    let submit = document.getElementById("submit");
    let form = document.getElementById("form");
    submit.addEventListener("click", send);
    async function send() {
        let formdata = new FormData(form);
        let formstring = new URLSearchParams(formdata);
        //Senden und fetchen der Antwort
        fetch("https://giswise2020.herokuapp.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formstring
        }).then(response => response.text())
            .then(data => {
            console.log(data);
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
})(Abgabe3 || (Abgabe3 = {}));
//# sourceMappingURL=script.js.map