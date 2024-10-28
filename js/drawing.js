// お絵描きのためのコード

//ctx.lineWidth = 10; //線の太さ
//ctx.lineCap = 'square'; //線の先が四角（roundもあり）
//ctx.beginPath(); //始点
//ctx.closePath(); //終点
//strokeStyle //線の色
//fillStyle //塗りつぶしの色

const can = $('#drawing-area')[0];
const ctx = can.getContext('2d');
const clearBtn = $('#clear-button');
ctx.lineCap = 'round';

let x;
let y;
let mousePressed = false;

// 描画を開始する
function startDrawing(e) {
    mousePressed = true;
    x = e.offsetX; //offsetでキャンバス内の位置を捕捉
    y = e.offsetY;
}

// 線を描画する
function draw(e) {
    if (!mousePressed) return;
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    ctx.beginPath(); //始点
    ctx.moveTo(x, y); //(x,y)の座標に動く
    ctx.lineTo(x2, y2);
    ctx.stroke(); //描画ストローク
    x = x2; //座標の位置を更新して繰り返していく
    y = y2;
}

$('#drawing-area').on('mousedown', startDrawing);
$('#drawing-area').on('mousemove', draw);
$(window).on('mouseup', () => mousePressed = false);

$("#penS").on("click", function () {
    ctx.lineWidth = 1; 
});
$("#penM").on("click", function () {
    ctx.lineWidth = 5; 
});
$("#penL").on("click", function () {
    ctx.lineWidth = 10; 
});

$("#black").on("click",function(){
    ctx.strokeStyle = "black";
});
$("#white").on("click",function(){
    ctx.strokeStyle = "white";
});
$("#red").on("click",function(){
    ctx.strokeStyle = "red";
});
$("#blue").on("click",function(){
    ctx.strokeStyle = "blue";
});
$("#yellow").on("click",function(){
    ctx.strokeStyle = "yellow";
});
$("#green").on("click",function(){
    ctx.strokeStyle = "green";
});
