var pisteet = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 800;
var mousex;

let rowCount = 8;
let columnCount = 5;
let bricks = [];

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

function palikkasound() {
  var sound = new Audio("aani.mp3");
  sound.play();
}
function seinasound() {
  var seina = new Audio("seina.mp3");
  seina.play();
}
function canvasGetCoords(e){
  var leveys = document.documentElement.clientWidth;
  if(leveys % 2){
    leveys-=1;
  }
  mousex=e.clientX-((leveys-document.getElementById("tilasto").clientWidth-canvas.width-4)/2);
}



document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    document.getElementById("alkuRuutu").style.display = "none";
    document.getElementById("canvasDiv").style.display = "inline-block";
    document.getElementById("tilastoDiv").style.display = "inline-block";
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
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(circle.x == 900 ){
    circle.x = 900-circle.size;
  }else if(circle.x == 1){
    circle.x = 1+circle.size;
  }

  drawCircle();
  drawBricks();
  drawRect();
  collisionDetection();

  circle.x -= circle.dx;
  circle.y -= circle.dy;

  if (pisteet == 400) {
    dx == 0;
    dy == 0;
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
    console.log(1)
    circle.dy *= -1;
    seinasound();
  }
  if (circle.y + circle.size > canvas.height) {
    document.getElementById("havioRuutu").style.display = "block";
    document.getElementById("canvasDiv").style.display = "none";
    document.getElementById("tilastoDiv").style.display = "none";    
  }

  requestAnimationFrame(update);
}




