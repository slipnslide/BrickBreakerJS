var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 8;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 9;
var brickWidth = 76;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 20;
var score = 0;
var lives = 3

var bricks = [];
for(i=0; i<brickColumnCount; i++){
  bricks[i] = [];
  for(j=0; j<brickRowCount; j++){
    bricks[i][j] = {x: 0, y: 0, status: 1};
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(event){
  var relativeX = event.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }else if(event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event){
  if(event.keyCode == 39){
    rightPressed = false;
  }else if(event.keyCode == 37) {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#05ffd5";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#05ffd5";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(i=0; i<brickColumnCount; i++){
    for(j=0; j<brickRowCount; j++){
      if(bricks[i][j].status == 1){
        var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#841326"
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection(){
  for(i=0; i<brickColumnCount; i++){
    for(j=0; j<brickRowCount; j++){
      var b = bricks[i][j];
      if(b.status == 1){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = - dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount){
            alert("You Win!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
  ctx.font = "16 Arial";
  ctx.fillStyle = "#ffffff"
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  drawBricks();
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  if(y + dy < ballRadius){
    dy = -dy;
  }else if(y + dy > canvas.height-ballRadius*1.1){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }
    else {
      lives--;
      if(!lives){
        alert("You Lose!");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth){
    paddleX += 5
  }else if(leftPressed && paddleX > 0){
    paddleX -= 5
  }
  x += dx;
  y += dy;

}

setInterval(draw, 7);
