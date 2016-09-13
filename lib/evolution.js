import Simulation from './simulation.js';
import SimulationView from './simulation_view.js';
import Charter from './chart.js';

window.addEventListener('DOMContentLoaded', function(){
  let canvas = document.getElementById('simulation-canvas');
  let context = canvas.getContext('2d');
  let simulation = new Simulation(500, 500, 3, 30);
  let simulationView = new SimulationView(simulation, context);
  Highcharts.setOptions({
      global: {
          useUTC: false
      }
  });

  simulationView.start();
});
