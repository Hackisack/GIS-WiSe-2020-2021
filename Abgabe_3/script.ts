
namespace Abgabe3 {

let submit: HTMLElement = document.getElementById("submit");
let form: HTMLFormElement = document.getElementById("form");
submit.addEventListener("click", send);

async function send(): Promise<void> {

let formdata: FormData = new FormData(form);
let formstring: URLSearchParams = new URLSearchParams(formdata);

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

}