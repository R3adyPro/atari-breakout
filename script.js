var pisteet = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 800;
var mousex;
var modal = document.getElementById("tulokset")
var btn = document.getElementById("näytä")
var span = document.getElementsByClassName("close")[0];
var gamemode = 0;

if (localStorage.getItem("score") == null) {
  localStorage.setItem("score","0");
}

let rowCount = 8;
let columnCount = 5;
let bricks = [];
let topScore = [];

const circle = {
  x: 450,
  y: 650,
  size: 10,
  dx: 5,
  dy: 4
}

const brickType = {
  w: 104,
  h: 35,
  padding: 9,
  offsetX: 3,
  offsetY: 90,
  visible: true,
}

const rect = {
  x: 400,
  y: 700,
  w: 100,
  h: 10
};

//scoreboard
function nayta(){
  modal.style.display = "block";
}

window.onclick = function(event){
  if (event.taget == modal){
      modal.style.display = "none";
  }
}

span.onclick = function(){
  modal.style.display = "none";
}

function addScore(){
  topScore = JSON.parse(localStorage.getItem("score")) || [];  
  topScore.push(pisteet);
  topScore.sort((a, b) => b - a);
  for(i = 4; i < topScore.length; i++){
    topScore.pop();
  }
  console.log(topScore);
  localStorage.setItem("score", JSON.stringify(topScore));
}

function scoreboard(){
  let ar = JSON.parse(localStorage.score);
  for(i=0; i<5; i++){
    document.getElementById(i+1).innerHTML = ar[i];
  }

}

function palikkasound() {
  var sound = new Audio("aani.mp3");
  sound.play();
}
function seinasound() {
  var seina = new Audio("seina.mp3");
  seina.play();
}
function voittosound() {
  var voitto = new Audio("voittoaani.mp3");
  voitto.loop = false;
  voitto.play();
}
function haviosound() {
  var havio = new Audio("havioaani.mp3");
  havio.loop = false;
  havio.play();
}
function canvasGetCoords(e){
  var leveys = document.documentElement.clientWidth;
  if(leveys % 2){
    leveys-=1;
  }
  mousex=e.clientX-((leveys-document.getElementById("tilasto").clientWidth-canvas.width-300)/2);
  mousex=e.clientX-((leveys-document.getElementById("scoreboard").clientWidth-canvas.width-300)/2);
}

function collisionDetection(){

  bricks.forEach(function(b){
    if (!b.status) return;

    var colums = circle.x > b.palikkaX && circle.x < b.palikkaX + brickType.w,
        rows = circle.y > b.palikkaY && circle.y < b.palikkaY + brickType.h;

        if (colums && rows){
          pisteet += 10;
          document.getElementById("lukema").innerHTML = pisteet;
          circle.dy *= -1;
          palikkasound();
          b.status = 0;
        }
  })

  
  var hor = (circle.x+circle.size > rect.x || circle.x-circle.size > rect.x) && (circle.x+circle.size < rect.x + rect.w || circle.x-circle.size < rect.x + rect.w);
  var ver = circle.y+circle.size > rect.y && circle.y+circle.size < rect.y + rect.h;

  if(hor && ver){

    circle.dy *= -1;

    suunta();

  }

}

function suunta(){
  if(circle.x > rect.x && circle.x < rect.x +35 && circle.dx < 0){
    circle.dx *=-1;
  }else if(circle.x > rect.x+65 && circle.x < rect.x +rect.w && circle.dx > 0){
    circle.dx *=-1;
  }

}

function drawRect(){
  ctx.fillStyle = "darkred";
  ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);
  ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
}
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function drawBricks(){
  bricks.forEach(function(brick){
    if (!brick.status) return;
    
    ctx.beginPath();
    ctx.rect(brick.palikkaX, brick.palikkaY, brickType.w, brickType.h)
    if (brick.hela == 1) {
      ctx.fillStyle = "red"
    }
    if (brick.hela == 0) {
      ctx.fillStyle = "darkred"
    }
    else {
      ctx.fillStyle = "red"
    }
    ctx.fill();
    ctx.closePath();
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(circle.x == 900 ){
    circle.x = 900-circle.size;
  } else if (circle.x == 1) {
    circle.x = 1+circle.size;
  }

  drawCircle();
  drawBricks();
  drawRect();
  if (gamemode == 1) {
    collisionDetection();
  }
  if (gamemode == 2) {
    collisionDetectionToinen();
  }

  circle.x -= circle.dx;
  circle.y -= circle.dy;

  if (pisteet == 400) {
    circle.dx *= 0;
    circle.dy *= 0;
    circle.y = 200;
    circle.x = 200;
    voittosound();
    addScore();
    scoreboard();
    document.getElementById("voittoRuutu").style.display = "block";
    document.getElementById("canvasDiv").style.display = "none";
    document.getElementById("tilastoDiv").style.display = "none";
    document.getElementById("scoreboardDiv").style.display = "none";  
    context.clearRect(0, 0, canvas.width, canvas.height);  
  }
  if(mousex <= rect.w/2){
    mousex = rect.w/2;
  }else if(mousex >= canvas.width-rect.w/2){
    mousex = canvas.width-rect.w/2;
  }
  rect.x = mousex-rect.w/2;
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
    seinasound();
  }
  if (circle.y - circle.size < 0) {
    circle.dy *= -1;
    seinasound();
  }
  if (circle.y + circle.size > canvas.height) {
    circle.dx *= 0;
    circle.dy *= 0;
    circle.y = 200;
    circle.x = 200;
    haviosound();
    addScore();
    scoreboard();
    document.getElementById("havioRuutu").style.display = "block";  
    document.getElementById("canvasDiv").style.display = "none";
    document.getElementById("tilastoDiv").style.display = "none";
    document.getElementById("scoreboardDiv").style.display = "none"; 
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(update);
  }

function klassikkoPeli() {
  gamemode = 1;
  document.getElementById("alkuRuutu").style.display = "none";
    document.getElementById("canvasDiv").style.display = "inline-block";
    document.getElementById("tilastoDiv").style.display = "inline-block";
    document.getElementById("scoreboardDiv").style.display = "inline-block";
    scoreboard();
    console.log("Peli alkoi space-näppäimestä");
  
  for(c = 0; c < columnCount; c++){ 
    for(r = 0; r < rowCount; r++){
     bricks.push({
       palikkaX : (r * (brickType.w + brickType.padding)) + brickType.offsetX,
       palikkaY : (c * (brickType.h + brickType.padding)) + brickType.offsetY,
       status: 1
     })
    }
  };
    update();
}
  
function tuplaKosketus(){
  gamemode = 2;
  document.getElementById("alkuRuutu").style.display = "none";
  document.getElementById("canvasDiv").style.display = "inline-block";
  document.getElementById("tilastoDiv").style.display = "inline-block";
  document.getElementById("scoreboardDiv").style.display = "inline-block";
  scoreboard();
  console.log("Peli alkoi space-näppäimestä");

  for(c = 0; c < columnCount; c++){ 
    for(r = 0; r < rowCount; r++){
      bricks.push({
        palikkaX : (r * (brickType.w + brickType.padding)) + brickType.offsetX,
        palikkaY : (c * (brickType.h + brickType.padding)) + brickType.offsetY,
        hela: 1,
        status: 1
      })
    }
    }
  update();
  }
  function collisionDetectionToinen(){

  bricks.forEach(function(b){
    if (!b.status) return;

    var colums = circle.x > b.palikkaX && circle.x < b.palikkaX + brickType.w,
        rows = circle.y > b.palikkaY && circle.y < b.palikkaY + brickType.h;

        if (colums && rows){
          circle.dy *= -1;
          palikkasound();
          if(b.hela == 0){
            pisteet += 10;
            document.getElementById("lukema").innerHTML = pisteet;
            b.status = 0;
          }
          b.hela = b.hela -1;
        }
    })
    var hor = (circle.x+circle.size > rect.x || circle.x-circle.size > rect.x) && (circle.x+circle.size < rect.x + rect.w || circle.x-circle.size < rect.x + rect.w);
    var ver = circle.y+circle.size > rect.y && circle.y+circle.size < rect.y + rect.h;
  
    if(hor && ver){
  
      circle.dy *= -1;
  
      suunta();
  }
  }