var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
//drawing ball and moving direction
var dx = 2;
var dy = -2;
var ballRadius = 10;
//Paddle
var paddleHeight = 5;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
//User Interaction 
var rightPressed = false;
var leftpressed = false;

//extra features by adding bricks to make game more interesting 
var brickRowCount = 5;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 10;

var bricks = [];
for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Making canvas responsive
window.addEventListener("resize", OnResizeCalled, false);
function OnResizeCalled() {
    canvas.style.width = window.innerWidth - 'px';
    canvas.style.height = window.innerHeight - 'px';
}

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftpressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftpressed = false;
    }
}
function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}


//Function that detects the collision
function collisionDetection(){
    for(c = 0; c < brickColumnCount; c++){
        for(var r =0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if( x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;    
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("You win, Congratulations!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//function that draws ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#8b0000";
    ctx.fill();
    ctx.closePath();
}
//function that draws paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#8b0000";
    ctx.fill();
    ctx.closePath();
}
//draw bricks
function drawBricks(){
    for(c = 0; c < brickColumnCount; c++){
        for(r = 0; r< brickRowCount; r++){
           if(bricks[c][r].status == 1) {
            var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#8b0000";
            ctx.fill();
            ctx.closePath();
           }
        }
    }
}
//function that tracks the score record
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "8b0000";
    ctx.fillText("Score: "+score, 8, 20);
}
//function that counts the lives
function drawLives(){
    ctx.font = "16px, Arial";
    ctx.fillStyle = "#8b0000";
    ctx.fillText("Lives " +lives, canvas.width-65, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            lives--;
            if(!lives){
                alert("Game Over");
                document.location.reload();
            }else{
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;

    }else if(leftpressed && paddleX > 0){
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();

