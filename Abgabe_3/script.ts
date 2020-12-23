
namespace Abgabe3 {





  //Registrierung und Login
  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "einloggen.html") {

    let submit: HTMLElement = document.getElementById("submit");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let antwort: HTMLElement = document.getElementById("antwort");

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
      submit.addEventListener("click", function (): void { checkForm(4); });
    }
    else { submit.addEventListener("click", function (): void { checkForm(2); }); }


    function checkForm(_formSize: number): void {
      let formdata: FormData = new FormData(form);
      console.log(formdata);
      let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
      console.log(formstring);
      let x: number = 0;
      antwort.innerText = "";

      for (let entry of formstring.values()) {
        if (entry != "") { x++; }
        console.log(entry);
      }

      if (x < _formSize) { antwort.innerText = "Bitte füllen Sie das Formular vollständig aus"; }
      else { send(); }
    }

    async function send(): Promise<void> {

      let formdata: FormData = new FormData(form);
      let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);



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

  //Alle User abfragen
  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "alle_user.html") {


    let submit: HTMLElement = document.getElementById("submit");
    let antwort: HTMLElement = document.getElementById("antwort");
    submit.addEventListener("click", send);



    async function send(): Promise<void> {

      antwort.innerText = "";
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

}