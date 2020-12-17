"use strict";
var Abgabe3;
(function (Abgabe3) {
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
        let submit = document.getElementById("submit");
        let form = document.getElementById("form");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", checkForm);
        function checkForm() {
            let formdata = new FormData(form);
            console.log(formdata);
            let formstring = new URLSearchParams(formdata);
            console.log(formstring);
            let x = 0;
            for (let entry of formstring.values()) {
                if (entry != "") {
                    x++;
                }
                console.log(entry);
            }
            if (x < 4) {
                antwort.innerText = "Bitte füllen Sie das Formular vollständig aus";
            }
            else {
                send();
            }
        }
        async function send() {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            //Senden und fetchen der Antwort
            fetch("https://giswise2020.herokuapp.com/", {
                method: "POST",
                body: formstring
            }).then(response => response.text())
                .then(data => {
                antwort.innerText = data;
            })
                .catch((error) => {
                console.error("Error:", error);
            });
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "einloggen.html") {
        let submit = document.getElementById("submit");
        let form = document.getElementById("form");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", checkForm);
        function checkForm() {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            let x = 0;
            for (let entry of formstring.values()) {
                if (entry != "") {
                    x++;
                }
            }
            if (x < 2) {
                antwort.innerText = "Bitte füllen Sie das Formular vollständig aus";
            }
            else {
                send();
            }
        }
        async function send() {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            //Senden und fetchen der Antwort
            fetch("https://giswise2020.herokuapp.com/", {
                method: "POST",
                body: formstring
            }).then(response => response.text())
                .then(data => {
                antwort.innerText = data;
            })
                .catch((error) => {
                console.error("Error:", error);
            });
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "alle_user.html") {
        let submit = document.getElementById("submit");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", send);
        async function send() {
            //Senden und fetchen der Antwort
            fetch("https://giswise2020.herokuapp.com/", {
                method: "POST"
            }).then(response => response.text())
                .then(data => {
                antwort.innerText = data.slice(0, -2) + ".";
            })
                .catch((error) => {
                console.error("Error:", error);
            });
        }
    }
})(Abgabe3 || (Abgabe3 = {}));
//# sourceMappingURL=script.js.map