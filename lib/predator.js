import Animal from './animal.js';
import * as UTIL from './utils.js';


class Predator extends Animal {
  constructor(options){
    super(options);
    this.sinceFood = 0;
  }

  setVelocity(){
    if(this.steps % 5 === 0 || (this.velocity[0] === 0 && this.velocity[1] === 0)){
      let closestPred = this.findClosestPrey();
      let dir = UTIL.findDirection(this.position, closestPred.position);

      this.velocity = [
        this.simulation.predatorSpeed * dir[0],
        this.simulation.predatorSpeed * dir[1]
      ];
    }

    this.sinceFood++;
  }

  findClosestPrey(){
    let predator = this;

    let closest;
    let minDistance = 100000;

    this.simulation.prey.forEach(prey => {
      const distance = UTIL.distance(predator.position, prey.position);
      if(distance < minDistance){
        minDistance = distance;
        closest = prey;
      }
    });

    return closest;
  }

  resetSinceFood(){
    this.sinceFood = 0;
  }
}

export default Predator;
