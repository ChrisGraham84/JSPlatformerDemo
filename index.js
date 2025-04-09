const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//variables
const gravity = 1;
const PROPULSION = -12;
const SPEED = 8;

let dropRate = 700;
let controllerEnabled = false;
let can_fire = true;
let isGameOver = false;
let isPaused = false;
let gameMenu = document.querySelector("#gameMenu");
let gameTimer = document.querySelector("#gameTimer");
let gameScore = document.querySelector("#gameScore");
let score = 0;

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
        //console.log("in ground")
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


  //falling boulders
  boulders = []
  gravMod = 1
  let difficulty = 1;
const intervalId = window.setInterval(() => {
  const index = Math.floor(Math.random() * canvas.width);

 
 for(let i = 0; i < difficulty; i++ ){
  boulders.push(
    new Sprite({
      position: { x: index, y: 0},
      velocity: { x: 0, y: 0 },
      height: 50, 
      width: 50,
      color: "brown",
      offset: { x: 0, y: 0 },
      isStatic:  false,
      gravModifier: gravMod
    })
  )
 }


}, dropRate)


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
  if(!isPaused) window.requestAnimationFrame(animate);
    //console.log('animating');


    if (controllerEnabled) {
        controllerMapping();
      }
    

    //clear canvas
    c.fillStyle = "grey";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    gameScore.innerHTML = `Score: ${score}`;
   
      
    //Pickups
    //pickup.countdown -= 1;
    if(pickup.countdown == 0){
      window.setInterval( GeneratePickup(), 100);
    }else{
      if(rectangularCollision({rectangle: player, rectangle2: pickup})){
        player.color = "darksalmon"
        window.setTimeout(()=>{
          player.color = "pink"
        }, 100)
        pickup.alive = false;
        if(dropRate >= 50){
          dropRate -= 50;
          gravMod += .2;
          difficulty += 1;
        }
        score  += 1;
        GeneratePickup();
        //console.log(pickup);
     }
     //console.log(difficulty);
    }
    pickup.update();
   

   for (let i = boulders.length - 1; i >= 0; i--) {
      const boulder = boulders[i];
      boulder.update();

    if(rectangularCollision({rectangle: boulder, rectangle2: player})){
      isPaused = true;
    }

      if(boulder.position.y > canvas.height - 70){
        boulders.splice(i,1)
      }
   }


    //player movement

    
   ground.update();
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
    //  console.log(keys.a.pressed)
    } else if (keys.d.pressed) {
      player.velocity.x = SPEED;
    }
    
    if(keys.w.pressed){
      if (player.velocity.y == 0 && !player.airborn) {
        //console.log( keys.w.pressed)  
        player.velocity.y = -20;
        player.grounded = false;
        player.airborn = true;
      }
    }
}

animate();
GeneratePickup();