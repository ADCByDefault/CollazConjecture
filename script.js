const form = document.querySelector("form");
const sizeInput = document.querySelector("#conjectureSize");

const canvas = document.querySelector(".canvas-cont canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.7;

ctx.lineWidth = 1;
ctx.strokeStyle = "white";
ctx.lineCap = "round";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let size = parseInt(sizeInput.value);
    console.group(`size : ${size}`);
    console.time("totalTime");
    console.time("calculationTime");
    let arr = getConjectureArray(size);
    console.timeEnd("calculationTime");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    let scale =
        arr.length > 200000
            ? 1000 / arr.length
            : arr.length > 100000
            ? 500 / arr.length
            : arr.length > 18000
            ? 200 / arr.length
            : arr.length > 3000
            ? 100 / arr.length
            : arr.length > 300
            ? 40 / arr.length
            : arr.length > 50
            ? 25 / arr.length
            : 10 / arr.length;
    console.time("drawingTime");
    ctx.scale(scale, scale);
    arr.forEach((a) => {
        drawConjecture(a.path);
    });
    ctx.restore();
    console.timeEnd("drawingTime");
    console.timeEnd("totalTime");
    console.groupEnd(`size : ${size}`);
});

function getConjectureArray(num) {
    let arrTop = [];
    for (let i = 2; i <= num; i++) {
        let arr = [];
        let temp = i;
        while (temp != 1) {
            arr.push(temp);
            if (temp % 2 == 0) {
                temp = temp / 2;
            } else {
                temp = temp * 3 + 1;
            }
        }
        arrTop.push({ num: i, path: arr });
    }
    return arrTop;
}

function drawConjecture(arr) {
    arr.reverse();
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    let rotation = 10;
    if (arr.length > 50) {
        rotation = 15;
    }
    arr.forEach((num) => {
        num = num / 2;
        ctx.lineTo(num * 2, num);
        ctx.translate(num * 2, num);
        if (num % 2 == 0) {
            ctx.rotate((Math.PI / 180) * rotation);
        } else {
            ctx.rotate((Math.PI / 180) * -rotation);
        }
    });
    ctx.stroke();
    ctx.restore();
}
