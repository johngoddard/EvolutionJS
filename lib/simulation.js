import Prey from './prey.js';
import Predator from './predator.js';
import Charter from './chart.js';

const MUTANT_COLORS = ['green', 'aqua', 'bisque', 'violet', 'chartreuse', 'deeppink', 'orange'];

class Simulation {
  constructor(dimX, dimY, initialPred, initialPrey) {
    this.initialPredators = initialPred;
    this.initialPrey = initialPrey;
    this.DIM_X = dimX;
    this.DIM_Y = dimY;
    this.reset();
    this.mutationRate = .04;
    this.preyGeneration = 200;
    this.predatorSpeed = 2.7;
    this.predGeneration = 350;

    this.reset();
  }

  setMutationRate(rate){
    this.mutationRate = rate;
  }

  setPreyGeneration(time){
    this.preyGeneration = time;
  }

  setPredatorSpeed(speed){
    this.predatorSpeed = speed;
  }

  reset(){
    this.predators = [];
    this.prey = [];
    this.steps = 0;
    this.mutantIdx = 0;
    this.generation = 0;
    this.data = null;

    while(this.prey.length < this.initialPrey){
      this.addPrey(2, 'blue', 'original');
    }

    while(this.predators.length < this.initialPredators){
      this.addPredator();
    }

    this.charter = new Charter(this);
  }

  addPrey(speed, color, strain){
    if(this.prey.length < 100){
      this.prey.push(new Prey({
        pos: this.randomPosition(),
        speed: speed,
        radius: 5,
        color: color,
        simulation: this,
        strain: strain
      }));
    }
  }

  addPredator(){

    this.predators.push(new Predator({
      pos: this.randomPosition(),
      speed: this.predatorSpeed,
      radius: 10,
      color: 'red',
      simulation: this,
      mutationRate: .03
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
    this.handleCollisions();
    this.reproducePrey();
    this.reproducePredators();
    this.die();
    if(this.steps % (this.preyGeneration + 50) === 0){
      this.generation++;
      this.recordData(this.generation);
    }

    this.steps++;
  }

  recordData(generation){
    let strainInfo = this.getStrainInfo();
    let avgSpeed = this.getAverageSpeed();

    this.data = {
      generation: generation,
      predators: (this.predators.length/this.initialPredators)*100,
      prey: (this.prey.length/this.initialPrey)*100,
      dominantStrain: strainInfo[1],
      numStrains: strainInfo[0],
      strains: strainInfo[2],
      averageSpeed: avgSpeed
    };

  }

  getStrainInfo(){
    let strains = {};
    let strainCount = 0;

    this.prey.forEach(preyObj => {
      if(strains[preyObj.strain]){
        strains[preyObj.strain].population += 1;
        strains[preyObj.strain].totalSpeed += preyObj.speed;
      } else {
        strains[preyObj.strain] = {
          population: 1,
          totalSpeed: preyObj.speed,
          color: preyObj.color
        };
        strainCount += 1;
      }
    });

    let maxCount = 0;
    let maxStrain = null;

    Object.keys(strains).forEach(strain => {
      if(strains[strain].population > maxCount){
        maxStrain = strain;
        maxCount = strains[strain].population;
      }
    });

    return [strainCount, maxStrain, strains];
  }


  getAverageSpeed(){
    let total = 0;
    this.prey.forEach(preyObj => {
      total += preyObj.speed;
    });
    return (total / this.prey.length);
  }

  reproducePrey(){
    const simulation = this;

    this.prey.forEach(preyObj => {
      if(simulation.reproduces(preyObj)){

        const mutationNum = Math.random();
        preyObj.resetReproduce();

        if(mutationNum > (1 - (simulation.mutationRate / 2))){
          this.mutantIdx += 1;
          let newSpeed = preyObj.speed + .25;
          let strainName = `strain-${this.mutantIdx}`;
          this.addPrey(newSpeed, MUTANT_COLORS[this.mutantIdx % MUTANT_COLORS.length], strainName);
        } else if (mutationNum < (simulation.mutationRate / 2)) {
          this.mutantIdx += 1;
          let newSpeed = preyObj.speed - .25;
          let strainName = `strain-${this.mutantIdx}`;
          this.addPrey(newSpeed, MUTANT_COLORS[this.mutantIdx % MUTANT_COLORS.length, strainName]);
        } else {
          let newSpeed = preyObj.speed + .1 * (.5 - Math.random());
          this.addPrey(newSpeed, preyObj.color, preyObj.strain);
        }
      }
    });

  }

  reproduces(prey){
    if (prey.sinceReproduce > this.preyGeneration){
      let reproChance = Math.random();
      return (reproChance < (prey.sinceReproduce - this.preyGeneration) / 100) ? true : false;
    } else {
      return false;
    }
  }

  reproducePredators(){
    const simulation = this;

    this.predators.forEach(predObj => {
      const reproChance = Math.random();
      const reproLikelihood = (predObj.sinceReproduce - this.predGeneration) / 100;

      if(reproLikelihood > reproChance){
        predObj.resetReproduce();
        this.addPredator();
      }
    });
  }

  die(){
    let simulation = this;

    this.predators.forEach(predObj => {
      if(predObj.sinceFood > 200 || predObj.steps > 1500){
        simulation.remove(predObj, 'predator');
      }
    });

    this.prey.forEach(preyObj => {
      if(preyObj.steps > 600 || !preyObj.strain){
        simulation.remove(preyObj, 'prey');
      }
    });
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

  handleCollisions(){
    let toRemove = [];

    let simulation = this;
    this.prey.forEach(preyObj => {
      simulation.predators.forEach(predObj =>{
        if(preyObj.isTouching(predObj) && !toRemove.includes(preyObj)){
          predObj.resetSinceFood();
          toRemove.push(preyObj);
        }
      });
    });

    toRemove.forEach(item => {
      this.remove(item, 'prey');
    });
  }

  remove(animal, type){
    if(type === 'prey'){
      let idx = this.prey.indexOf(animal);
      this.prey.splice(idx, 1);
    } else {
      let idx = this.predators.indexOf(animal);
      this.predators.splice(idx, 1);
    }
  };
}

export default Simulation;
