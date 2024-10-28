// お絵描きのためのコード

//ctx.lineWidth = 10; //線の太さ
//ctx.lineCap = 'square'; //線の先が四角（roundもあり）
//ctx.beginPath(); //始点
//ctx.closePath(); //終点

const can = $('#drawing-area')[0];
const ctx = can.getContext('2d');
const clearBtn = $('#clear-button');

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
