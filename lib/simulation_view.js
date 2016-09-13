class SimulationView {
  constructor(simulation, ctx) {
    this.simulation = simulation;
    this.ctx = ctx;
  }

  start(){
    let view = this;

    this.simulationID = window.setInterval(() => {
      view.simulation.draw(view.ctx);
      view.simulation.step();
      if(view.simulation.prey.length === 0 || view.simulation.predators.length === 0){
        window.clearInterval(this.simulationID);
      }
    }, 30);
  }
}

export default SimulationView;
