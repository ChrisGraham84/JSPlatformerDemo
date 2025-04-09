

  
  function rectangularCollision({ rectangle, rectangle2 }) {
    //console.log(rectangle.height)
    return (
      rectangle.position.x + rectangle.width >= rectangle2.position.x &&
      rectangle.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle.position.y + rectangle.height >= rectangle2.position.y &&
      rectangle.position.y <= rectangle2.position.y + rectangle2.height
    );
  }
  


function rectangularCollisionAttackBox({ rectangle, rectangle2 }) {
    return (
      rectangle.attackBox.position.x + rectangle.attackBox.width >=
        rectangle2.position.x &&
      rectangle.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle.attackBox.position.y + rectangle.attackBox.height >=
        rectangle2.position.y &&
      rectangle.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
  }
  
  function determineWinner({player, enemy, timerId}) 
  {
    clearTimeout(timerId);
    document.querySelector("#displayText").style.display = "flex";
    if (player.health === enemy.health) {
      //console.log('tie');
      document.querySelector("#displayText").innerHTML = "Tie";
    } else if (player.health > enemy.health) {
      document.querySelector("#displayText").innerHTML = "Player 1 Wins";
    } else if (player.health < enemy.health) {
      document.querySelector("#displayText").innerHTML = "Player 2 Wins";
    }
  }

  let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
   
    determineWinner({player, enemy, timerId});
  }
}

