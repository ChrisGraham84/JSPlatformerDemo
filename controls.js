const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
    space: { pressed: false },
    left: { pressed: false },
    right: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },
  };
  
  
  
  window.addEventListener("keydown", (ev) => {
    //console.log(ev.key);
    switch (ev.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        keys.w.pressed = true;
        player.lastKey = "w";
        break;
      case " ":
        //player.attack();
       window.location.reload()
        break;
  
    }
  });
  
  window.addEventListener("keyup", (ev) => {
    //console.log(ev.key);
    switch (ev.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "w":
        keys.w.pressed = false;
        break;
  
      //enemy keys
      case "ArrowRight":
        keys.right.pressed = false;
        break;
      case "ArrowLeft":
        keys.left.pressed = false;
        break;
      case "ArrowRUp":
        keys.up.pressed = false;
        break;
    }
  });
  
  ////controller
  const gamepads = {};
  
  function gamepadHandler(event, connected) {
    const gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]
    if (connected) {
      gamepads[gamepad.index] = gamepad;
      console.log(gamepads);
    } else {
      delete gamepads[gamepad.index];
    }
  }
  
  window.addEventListener(
    "gamepadconnected",
    (e) => {
      gamepadHandler(e, true);
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons,
        e.gamepad.axes.length
      );
      console.log(navigator.getGamepads()[0]);
      controllerEnabled = true;
      //gameLoop();
    },
    false
  );
  window.addEventListener(
    "gamepaddisconnected",
    (e) => {
      gamepadHandler(e, false);
      controllerEnabled = false;
    },
    false
  );
  
  function controllerMapping() {
    const gp = navigator.getGamepads()[0];
  
    let a = 0;
    let b = 0;
    keys.w.pressed = false;
    if (gp.buttons[0].value > 0 || gp.buttons[0].pressed) {
          keys.w.pressed = true;
          player.lastKey = "w";
      
    }
    if (gp.buttons[2].value > 0 || gp.buttons[2].pressed) {
         player.attack();
    }
    // else if (gp.buttons[1].value > 0 || gp.buttons[1].pressed) {
    //       console.log("circle")
    //   } else if (gp.buttons[2].value > 0 || gp.buttons[2].pressed) {
    //       console.log("square")
    //   } else if (gp.buttons[3].value > 0 || gp.buttons[3].pressed) {
    //       console.log("triangle");
    //   }
    //keys.w.pressed = false;
    keys.a.pressed = false;
    keys.d.pressed = false;
    if (gp.buttons[15].value > 0 || gp.buttons[15].pressed) {
      keys.d.pressed = true;
      player.lastKey = "d";
      //console.log("right")
    } else if (gp.buttons[14].value > 0 || gp.buttons[14].pressed) {
      keys.a.pressed = true;
      player.lastKey = "a";
      //console.log("left");
    } else if (gp.buttons[12].value > 0 || gp.buttons[12].pressed) {
      //console.log("up");
     
    } else if (gp.buttons[13].value > 0 || gp.buttons[13].pressed) {
      //console.log("down");
    }
  
    //console.log(gp.axes);
  
    //requestAnimationFrame(gameLoop);
  }