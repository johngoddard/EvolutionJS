import Util from './utils.js';

class Animal {
  constructor(options) {
    this.position = options['pos'];
    this.velocity = options['velocity'];
    this.radius = options['radius'];
    this.color = options['color'];
    this.simulation = options['simulation'];
  }

  isTouching(otherAnimal){
    if(Util.distance(this.pos, otherAnimal.pos) < this.radius + otherAnimal.radius){
      return true;
    }
    return false;
  }

  move(){
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
    if(this.simulation.isOutOfBounds(this.position)){
      this.position = this.simulation.wrap(this.position);
    }
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

export default Animal;
