import Prey from './prey.js';
import Predator from './predator.js';

class Simulation {
  constructor(dimX, dimY, initialPred, initialPrey) {
    this.DIM_X = dimX;
    this.DIM_Y = dimY;
    this.initialPredators = initialPred;
    this.initialPrey = initialPrey;
    this.predators = [];
    this.prey = [];

    while(this.prey.length < this.initialPrey){
      this.addPrey();
    }

    while(this.predators.length < this.initialPredators){
      this.addPredator();
    }
  }

  addPrey(){
    this.prey.push(new Prey({
      pos: this.randomPosition(),
      velocity: [10 * (.5 - Math.random()), 10 * (.5 - Math.random())],
      radius: 5,
      color: 'blue',
      simulation: this
    }));
  }

  addPredator(){
    this.predators.push(new Predator({
      pos: this.randomPosition(),
      velocity: [10 * (.5 - Math.random()), 10 * (.5 - Math.random())],
      radius: 10,
      color: 'red',
      simulation: this
    }));
  }

  allAnimals(){
    return [...this.prey, ...this.predators];
  }

  draw(ctx){
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allAnimals().forEach(animal => {
      animal.draw(ctx);
    });
  }

  step(){
    this.moveAnimals();
  }

  moveAnimals(){
    this.allAnimals().forEach(animal => {
      animal.move();
    });
  }

  randomPosition() {
    return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
  }

  isOutOfBounds(pos){
    if(pos[0] > this.DIM_X || pos[0] < this.DIM_X || pos[1] > this.DIM_Y || pos[1] < this.DIM_Y){
      return true;
    }
    return false;
  }

  wrap(pos){
    const x = (pos[0] + this.DIM_X) % this.DIM_X;
    const y = (pos[1] + this.DIM_Y) % this.DIM_Y;
    return [x,y];
  }
}

export default Simulation;
