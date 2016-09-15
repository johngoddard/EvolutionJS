import * as UTIL from './utils.js';

class Animal {
  constructor(options) {
    this.position = options['pos'];
    this.speed = options['speed'];
    this.radius = options['radius'];
    this.color = options['color'];
    this.simulation = options['simulation'];
    this.velocity = [0, 0];
    this.steps = 0;
    this.strain = options['strain'];
    this.sinceReproduce = 0;
    this.FULL = 2*Math.PI;
  }

  isTouching(otherAnimal){
    if(UTIL.distance(this.position, otherAnimal.position) < (this.radius + otherAnimal.radius)){
      return true;
    }
    return false;
  }

  move(){
    this.steps++;
    this.setVelocity();

    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];

    if(this.simulation.isOutOfBounds(this.position)){
      this.position = this.simulation.wrap(this.position);
    }

    this.sinceReproduce++;
  }


  resetReproduce(){
    this.sinceReproduce = 0;
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      this.FULL,
      false
    );

    ctx.fill();
  }
}

export default Animal;
