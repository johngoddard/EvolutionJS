import Animal from './animal.js';
import * as UTIL from './utils.js';

class Prey extends Animal {
  constructor(options){
    super(options);
  }


  setVelocity(){
    if(this.steps % 15 === 0 || (this.velocity[0] === 0 && this.velocity[1] === 0)){
      let closestPred = this.findClosestPredator();
      let dir = UTIL.findDirection(this.position, closestPred.position);
      this.velocity = [- this.speed * dir[0], - this.speed * dir[1]];
    }
  }

  findClosestPredator(){
    let prey = this;

    let closest;
    let minDistance = 100000;

    this.simulation.predators.forEach(predator => {
      const distance = UTIL.distance(prey.position, predator.position);
      if(distance < minDistance){
        minDistance = distance;
        closest = predator;
      }
    });

    return closest;
  }
}

export default Prey;
