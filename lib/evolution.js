import Simulation from './simulation.js';
import SimulationView from './simulation_view.js';

window.addEventListener('DOMContentLoaded', function(){
  let canvas = document.getElementById('simulation-canvas');
  let context = canvas.getContext('2d');
  let simulation = new Simulation(500, 500, 5, 10);
  let simulationView = new SimulationView(simulation, context);
  simulationView.start();
});
