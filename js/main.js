
//生JSでないと動作しない（jQueryの場合は末尾に[0];が必要）
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10; //壁に触れているかのチェックに使用

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;

//ブロックの定義
const brickRowCount = 2;
const brickColumnCount = 4;
const brickWidth = 100;
const brickHeight = 20;
const brickPadding = 20;
const brickOffsetTop = 30;
const brickOffsetLeft = 10;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// // 音声認識の準備
// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// recognition.lang = 'ja-JP'; // 日本語
// recognition.continuous = true; // 音声認識を続ける指示

// recognition.onresult = (event) => {
//     const transcript = event.results[event.results.length - 1][0].transcript.trim();
//     console.log("認識された音声:", transcript);
  
//     // 「右」
//     if (transcript === "右") {
//       // 右に移動（左にはいかない）
//       rightPressed = true;
//       leftPressed = false;
//     }
//     // 「左」
//     if (transcript === "左") {
//       // 左に移動（右にはいかない）
//       rightPressed = false;
//       leftPressed = true;
//     }
//   };
//   recognition.start();


  //左右操作のキーボード認識
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


//衝突判定
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];//以下は計算
            if (b.status === 1) { //ブロックが残っている場合
                if (x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0; //衝突済みなら0にして描画を消す
                    score++; //スコアは不要かも
                    if (score === brickRowCount * brickColumnCount) {
                        alert("クリアおめでとう！");
                        document.location.reload();
                        clearInterval(interval); // 画面のリセット
                    }
                }
            }
        }
    }
}

//スコア
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`スコア: ${score}`, 8, 20);//最後の数字は座標
}


function drawBall() {
    //ボールの描画
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //ボールの描画
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    //操作棒の描画
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    //崩すブロック
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();//ブロック呼び出し
    drawBall(); //ボール呼び出し
    drawPaddle(); //操作棒呼び出し
    drawScore(); //スコアを表示
    collisionDetection();//衝突した際の動きを呼び出し
    if (y + dy < ballRadius) { //上側
        dy = -dy;
    }
    if (y + dy < ballRadius) { //下側
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) { //ゲームオーバーの仕様
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("えっ　失敗しちゃった！？");
            window.location.href = 'index.html';
            // document.location.reload();
            // clearInterval(interval); // リセット
        }
    }

    if (x + dx < ballRadius) { //左側
        dx = -dx;
    }
    if (x + dx > canvas.width - ballRadius) { //右側
        dx = -dx;
    }
    //キーボード操作の認識
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }
    x += dx;
    y += dy;
}

const interval = setInterval(draw, 10);





// //赤いやつ
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// //緑のやつ
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// //なんか青紫の枠がある透明な長方形
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
