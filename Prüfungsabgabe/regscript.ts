

namespace Pruefungsabgabe {


    let checkformresponse: HTMLElement = document.getElementById("checkformresponse");
    let savereserve: HTMLElement = document.getElementById("savereservieren");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");

    let formstring: URLSearchParams = new URLSearchParams(sessionStorage.getItem("data"));

    savereserve.addEventListener("click", function callcheck(): void { checkForm(2, formstring); });







    function checkForm(_formSize: number, _formstring: URLSearchParams): void {

        let formfilled: number = 0;
        let checkmail: number = 0;

        let formvalues: FormData = new FormData(form);



        for (let entry of formvalues.values()) {
            if (entry != "") { formfilled++; }
            if (entry.toString().includes("@")) { checkmail++; }
        }



        if (formfilled < _formSize) { checkformresponse.innerText = "Bitte füllen Sie das Formular vollständig aus"; } //Form ausgefüllt?
        else if (checkmail != 1) { checkformresponse.innerText = "Bitte verwenden Sie eine echte Email"; }
        else { send(_formstring); }



        async function send(_data: URLSearchParams): Promise<void> {

            let formdata: FormData = new FormData(form);
            let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
            formstring.append("_id", "user");

            for (let entry of _data.values()) {

                formstring.append("_id", entry);
            }



            //Senden und fetchen der Antwort
            let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/", {
                method: "POST",

                body: formstring
            });

            let data: string = await response.text();


            if (data == "Erfolg") {

                refreshData();

            }





        }
    }



    function refreshData(): void {

        sessionStorage.clear();
        window.open("/GIS-WiSe-2020-2021/Prüfungsabgabe/AStA_Verleih.html", "_self");



    }
}
