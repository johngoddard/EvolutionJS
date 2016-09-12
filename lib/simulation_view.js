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
    }, 30);
  }
}

export default SimulationView;
