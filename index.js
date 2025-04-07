const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//variables
const gravity = 1;
const PROPULSION = -12;
const SPEED = 3;

let controllerEnabled = false;
let can_fire = true;
let isGameOver = false;

c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    width: 50, 
    height: 70,
    color: "pink",
    offset: { x: 0, y: 0 },
  });
  
  const ground = new Sprite({
    position: { x:0, y: canvas.height - 70 },
    width: canvas.width - 120, 
    height: 70,
    velocity: { x: 0, y: 0 },
    color: "purple",
    offset: { x: 0, y: 0 },
  });

  const platform = new Sprite({
    position: { x:canvas.width - 120, y: canvas.height -270 },
    width: 120, 
    height: 70,
    velocity: { x: 0, y: 0 },
    grounded: true,
    color: "purple",
    offset: { x: 0, y: 0 },
  });

function animate(){
    window.requestAnimationFrame(animate);
    //console.log('animating');


    if (controllerEnabled) {
        controllerMapping();
      }
    

    //clear canvas
    c.fillStyle = "grey";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    ground.update();
    platform.update()
    platform.velocity.y = 0;


    //player movement

    
    if(rectangularCollision({rectangle: player, rectangle2: ground})){
    //console.log("collide")
       player.velocity.x = -(player.velocity.x + 1);
       player.velocity.y = 0;
       if(player.position.y + player.height > ground.position.y){
        player.position.y = canvas.height - player.height - ground.height;
       }
       
        player.grounded = true;
        player.airborn = false;
    }
    if(rectangularCollision({rectangle: player, rectangle2: platform})){
      if(player.position.y >= platform.position.y + platform.height) console.log("bottome hit")
      //  console.log("collide")
           // player.velocity.x = -(player.velocity.x + 1);
           player.velocity.y = 0;
          // player.position.y = canvas.height - player.height - platform.height;
          player.grounded = true;
          player.airborn = false;
        }
    //console.log(player.grounded)

    player.velocity.x = 0;
    if (keys.a.pressed ) {
      player.velocity.x = -SPEED;
    } else if (keys.d.pressed) {
      player.velocity.x = SPEED;
    }
}

animate();