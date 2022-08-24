const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 800;

let rowCount = 8;
let columnCount = 5;
let bricks = [];

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    console.log("Peli alkoi space-näppäimestä");
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
  for(c = 0; c < columnCount; c++){ 
    for(r = 0; r < rowCount; r++){
     bricks.push({
       palikkaX : (r * (brickType.w + brickType.padding)) + brickType.offsetX,
       palikkaY : (c * (brickType.h + brickType.padding)) + brickType.offsetY,
       status: 1
     })
    }
};
  
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
  
    circle.x -= circle.dx;
    circle.y -= circle.dy;

    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
      circle.dx *= -1;
    }
  
    if (circle.y - circle.size < 0) {
      circle.dy *= -1;
    }
    if (circle.y + circle.size > canvas.height) {
      location.reload();
    }
  
    requestAnimationFrame(update);
  }
  
  update();
  
  }
}




