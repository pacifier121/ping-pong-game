const ball = document.getElementById('ball')
const bobBar = document.getElementById('bobBar')
const aliceBar = document.getElementById('aliceBar')
const celebrationElem = document.getElementById('celebration');
const instructionElem = document.getElementById('instructions');
instructionElem.innerText = "Controls: W,S and Up,Down";

const barSpeed = 5;
const initialX = 725, initialY = 375;

let posBob = 300, posAlice = 300;
let velX = 10, velY = 10;
let ballX = initialX, ballY = initialY;
let gameOver = null;

let keys = {
    "w": false,
    "s": false,
    "ArrowUp": false,
    "ArrowDown": false
}

// For Bob
document.addEventListener("keydown", (e) => {
    if (e.key === "w") keys["w"] = true;
    else if (e.key === "s") keys["s"] = true;
})
document.addEventListener("keyup", (e) => {
    if (e.key === "w") keys["w"] = false;
    else if (e.key === "s") keys["s"] = false;
})

// For Alice
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") keys["ArrowUp"] = true;
    else if (e.key === "ArrowDown") keys['ArrowDown'] = true;
})
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") keys["ArrowUp"] = false;
    else if (e.key === "ArrowDown") keys["ArrowDown"] = false;
})


// Gameloop
let gameLoop = setInterval(resumeGame, 40);


// Helper functions
function resetGame(){
    posBob = 300; posAlice = 300;
    velX = 10; velY = 10;
    ballX = initialX; ballY = initialY;

    keys = {
        "w": false,
        "s": false,
        "ArrowUp": false,
        "ArrowDown": false
    }
    celebrationElem.style.opacity = 0;
    gameLoop = setInterval(resumeGame, 40);
    document.removeEventListener("keydown", captureSpacebarHit);
    instructionElem.innerHTML = "Controls: W,S and Up,Down";
}

function resumeGame() {
    if (keys["w"]) posBob = Math.max(0, posBob - barSpeed);
    if (keys["s"]) posBob = Math.min(600, posBob + barSpeed);

    if (keys["ArrowUp"]) posAlice = Math.max(0, posAlice - barSpeed);
    if (keys["ArrowDown"]) posAlice = Math.min(600, posAlice + barSpeed);

    bobBar.style.top = posBob + "px";
    aliceBar.style.top = posAlice + "px";

    checkCollision();
    moveBall();
}

function moveBall() {
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    ballX += velX;
    ballY += velY;
}

function checkCollision() {
    if (ballY <= 0 || ballY >= 750) velY *= -1;
    if (ballX <= 0) celebration("Red");     // Alice is Player Red
    if (ballX >= 1450) celebration("Blue");     // Bob is Player Blue

    // Check ball's collistion with Bob's bar
    if (ballX <= 50 && (posBob <= ballY && ballY <= posBob+200)) velX *= -1;

    // Check ball's collistion with Alice's bar
    if (ballX >= 1400 && (posAlice <= ballY && ballY <= posAlice+200)) velX *= -1;
}

function captureSpacebarHit(e) {
    if (e.key === " ") resetGame();
}

function celebration(winner){
    clearInterval(gameLoop);
    celebrationElem.innerText = `${winner} won!`;
    celebrationElem.style.opacity = 1; 
    instructionElem.innerHTML = "Use Spacebar to restart the game";

    // To restart the game
    document.addEventListener("keydown", captureSpacebarHit);
}