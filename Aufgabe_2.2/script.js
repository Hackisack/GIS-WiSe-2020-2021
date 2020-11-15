"use strict";
var Aufgabe2_2_1_2;
(function (Aufgabe2_2_1_2) {
    console.log(min(8, 19, 4, 5, 6, 3, 5, 7, 3, 2));
    function min(...werte) {
        let min = werte[0];
        for (let x = 0; werte.length - 1 > x; x++) {
            if (min > werte[x + 1]) {
                min = werte[x + 1];
            }
        }
        return min;
        //return Math.min(...werte) ; optinal
    }
    let nummer = -75;
    console.log(isEven(nummer));
    function isEven(nummer) {
        if (nummer < 0) {
            nummer = nummer * -1;
        }
        if (nummer == 0) {
            return true;
        }
        if (nummer == 1) {
            return false;
        }
        else {
            return isEven(nummer - 2);
        }
    }
    class Student {
        constructor(name, studiengang, semester) {
            this.name = name;
            this.studiengang = studiengang;
            this.semester = semester;
        }
        showInfo() {
            console.log(this.name + "," + this.studiengang + "," + this.semester);
        }
    }
    let student1 = new Student("Vinzenz Liebherr", "MIB", 2);
    let student2 = new Student("Nikita Gärtner", "OMB", 4);
    let student3 = new Student("Jannik Weißer", "MKB", 6);
    student1.showInfo();
    student2.showInfo();
    student3.showInfo();
    function backwards(a) {
        let ruckgabe = [0];
        for (let zaehler = 0; a.length - 1 > zaehler; zaehler++) {
            ruckgabe.push(a[a.length - zaehler + 1]);
        }
        return ruckgabe;
    }
    function join(a, werte) {
        for (let zaehler = 0; werte.length - 1 > zaehler; zaehler++) {
            a.push(werte[zaehler]);
        }
        return a;
    }
    function split(a, links, rechts) {
        let ruckgabe;
        ruckgabe = a;
        //  if (links < 0 || rechts > a.length) { return [99]  ; }
        for (let zaehler = links + 1; rechts - 1 < zaehler; zaehler++) {
            //ruckgabe.push(a[zaehler]);
        }
        return ruckgabe;
    }
    let arr = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack = backwards(arr);
    console.log(arr);
    console.log(arrBack);
    console.log(join(arr, [15, 9001, -440]));
    // console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024])); // Bonus b)
    arr = split(arr, 0, 4);
    console.log(arr);
    // console.log(split(arr, 1, 2));
    //  console.log(split(arr, 2, 0));     // Bonus c)
    //  console.log(split(arr, -1, 2));    // Bonus c)
    // console.log(split(arr, 0, 7));     // Bonus c)
})(Aufgabe2_2_1_2 || (Aufgabe2_2_1_2 = {}));
var Aufgabe2_2_3;
(function (Aufgabe2_2_3) {
    let canvas = document.getElementById("myFirstCanvas");
    let context = canvas.getContext("2d");
    context.lineWidth = 10;
    context.strokeRect(75, 140, 150, 110);
    context.fillRect(130, 190, 40, 60);
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.fillStyle = "#654321";
    context.fill();
    context.strokeStyle = "brown";
    context.stroke();
    context.beginPath();
    context.moveTo(500, 250);
    context.lineTo(0, 250);
    context.closePath();
    context.fillStyle = "#654321";
    context.fill();
    context.strokeStyle = "brown";
    context.stroke();
    let path = new Path2D();
    path.arc(25, 25, 50, 0, 2 * Math.PI);
    context.fillStyle = "#ffff00";
    context.fill();
    context.strokeStyle = "yellow";
    context.stroke(path);
    context.beginPath();
    context.moveTo(350, 250);
    context.lineTo(350, 150);
    context.closePath();
    context.fillStyle = "#654321";
    context.fill();
    context.strokeStyle = "brown";
    context.stroke();
    let baum = new Path2D();
    baum.arc(350, 100, 50, 0, 2 * Math.PI);
    context.fillStyle = "#006400";
    context.fill();
    context.strokeStyle = "green";
    context.stroke(baum);
    let rechteck1 = { breite: 50, hoehe: 50, x: 300, y: 300 };
    context.strokeRect(rechteck1.x, rechteck1.y, rechteck1.breite, rechteck1.hoehe);
    context.fillRect(rechteck1.x, rechteck1.y, rechteck1.breite, rechteck1.hoehe);
    function createRect() {
        let rechteck1 = { breite: Math.random() * 50 + 50, hoehe: Math.random() * 50 + 50, x: Math.random() * 50 + 50, y: Math.random() * 50 + 50 };
        return rechteck1;
    }
    drawRect(createRect());
    function drawRect(_rechteck1) {
        context.strokeRect(_rechteck1.x, _rechteck1.y, _rechteck1.breite, _rechteck1.hoehe);
        context.fillRect(_rechteck1.x, _rechteck1.y, _rechteck1.breite, _rechteck1.hoehe);
    }
})(Aufgabe2_2_3 || (Aufgabe2_2_3 = {}));
//# sourceMappingURL=script.js.map