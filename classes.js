//Classes
class Sprite {
    constructor({ position, height, width, velocity, color = "red", offset }) {
      this.position = position;
      this.velocity = velocity;
      this.height = height;
      this.width = width;
      this.color = color;
      this.lastKey;
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        offset,
        width: 100,
        height: 50,
      };
      this.isAttacking = false;
      this.health = 100;
      this.grounded = false;
      this.airborn = true;
    }
  
    draw() {
      c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
  
      //attack box
      if (this.isAttacking) {
        c.fillStyle = "green";
        c.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
  
    update() {
      this.draw();
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;
  
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      // if(!this.grounded){
      //   this.velocity.y += gravity;
      // }
      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
      }else{
        this.velocity.y += gravity;
      } 
    }
  
    attack() {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
  }