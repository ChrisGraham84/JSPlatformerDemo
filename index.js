const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//variables
const gravity = 1;
const PROPULSION = -12;
const SPEED = 8;

let controllerEnabled = false;
let can_fire = true;
let isGameOver = false;

c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite({
    position: { x: Math.floor(canvas.width/2), y: 0 },
    velocity: { x: 0, y: 0 },
    width: 50, 
    height: 70,
    color: "pink",
    offset: { x: 0, y: 0 },
    isStatic: false
  });
  
  const ground = new Sprite({
    position: { x:70, y: canvas.height - 70 },
    width: canvas.width - 160, 
    height: 70,
    velocity: { x: 0, y: 0 },
    color: "purple",
    offset: { x: 0, y: 0 },
    isStatic:  true
  });

  let pickup = new Sprite({
    position: { x: 200, y: canvas.height/2},
    velocity: { x: 0, y: 0 },
    height: 30, 
    width: 30,
    color: "goldenrod",
    offset: { x: 0, y: 0 },
    isStatic:  true
  });



  function GeneratePickup(){
      let x,y;
      let _x = Math.random() * canvas.width;
      let _y = Math.random() * 300 + 300;

      while((_y >= ground.position.y - 30)){
        console.log("in ground")
        _x = Math.random() * canvas.width;
        _y = Math.random() * 300 + 200;
      }

      pickup = new Sprite({
      position: { x: _x, y: _y},
      velocity: { x: 0, y: 0 },
      height: 30, 
      width: 30,
      color: "goldenrod",
      offset: { x: 0, y: 0 },
      isStatic:  true
    });

  }
  // const platform = new Sprite({
  //   position: { x:canvas.width - 120, y: canvas.height -270 },
  //   width: 120, 
  //   height: 70,
  //   velocity: { x: 0, y: 0 },
  //   grounded: true,
  //   color: "purple",
  //   offset: { x: 0, y: 0 },
  // });

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
    pickup.update();

    if(rectangularCollision({rectangle: player, rectangle2: pickup})){
      pickup.alive = false;
      //score  += 1;
      GeneratePickup();
      //console.log(pickup);
   }

    
    //platform.update()
 


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
    // if(rectangularCollision({rectangle: player, rectangle2: platform})){
    //   if(player.position.y >= platform.position.y + platform.height) console.log("bottome hit")
    //   //  console.log("collide")
    //        // player.velocity.x = -(player.velocity.x + 1);
    //        player.velocity.y = 0;
    //       // player.position.y = canvas.height - player.height - platform.height;
    //       player.grounded = true;
    //       player.airborn = false;
    //     }
    //console.log(player.grounded)

    player.velocity.x = 0;
    if (keys.a.pressed ) {
      player.velocity.x = -SPEED;
    } else if (keys.d.pressed) {
      player.velocity.x = SPEED;
    }
}

animate();
GeneratePickup();