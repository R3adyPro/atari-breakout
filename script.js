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
  y: 700,
  size: 20,
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

function canvasGetCoords(e){
    mousex=e.clientX-433;
    console.log(mousex);
}



document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
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
          b.status = 0;
        }
  })

  
  var hor = circle.x > rect.x && circle.x < rect.x + rect.w;
  var ver = circle.y > rect.y && circle.y < rect.y + rect.h;

  if(hor && ver){

    circle.dy *= -1;

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
  ctx.fillStyle = 'purple';
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

  drawCircle();
  drawBricks();
  drawRect();
  collisionDetection();

  circle.x -= circle.dx;
  circle.y -= circle.dy;

  if(mousex <= 50){
    mousex = 51;
  }else if(mousex >= 850){
    mousex = 849;
  }
  rect.x = mousex-50;

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }

  if (circle.y - circle.size < 0) {
    console.log(1)
    circle.dy *= -1;
  }
  if (circle.y + circle.size > canvas.height) {
    location.reload();
  }

  requestAnimationFrame(update);
}




