// お絵描きのためのコード
const canvas = document.querySelector('#drawing-area');
const ctx = canvas.getContext('2d');
const clearBtn = $('#clear-button');

let x;
let y;
let mousePressed = false;

// 描画を開始する
function startDrawing(e) {
    mousePressed = true;
    x = e.offsetX;
    y = e.offsetY;
}

// 線を描画する
function draw(e) {
    if (!mousePressed) return;
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    x = x2;
    y = y2;
}

$('#drawing-area').on('mousedown', startDrawing);
$('#drawing-area').on('mousemove', draw);
$(window).on('mouseup', () => mousePressed = false);


// //お絵描きのためのコード
// const canvas = document.querySelector('#drawing-area');
// const ctx = canvas.getContext('2d');
// const clearBtn = document.querySelector('#clear-button');

// let x;
// let y;
// let mousePressed = false;

// //描画を開始する
// function startDrawing(e) {
//     mousePressed = true;
//     x = e.offsetX;
//     y = e.offsetY;
// }

// //線を描画する
// function draw(e) {
//     if (!mousePressed) return;
//     x2 = e.offsetX;
//     y2 = e.offsetY;
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
//     x = x2;
//     y = y2;
// }

// //マウス押下で描画開始
// canvas.addEventListener('mousedown', startDrawing);

// //マウスを動かして描画
// canvas.addEventListener('mousemove', draw);

// //マウスボタンを離して描画終了
// window.addEventListener('mouseup', () => mousePressed = false);

// ///消去ボタンクリックで全消去
// clearBtn.addEventListener('click', () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// });