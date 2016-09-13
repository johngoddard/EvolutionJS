class SimulationView {
  constructor(simulation, ctx) {
    this.simulation = simulation;
    this.ctx = ctx;
    this.maxGen = 0;
  }

  start(){
    let view = this;

    setInterval(function () {
      let latest = view.simulation.data;

      if(latest.generation > view.maxGen){
        view.maxGen = latest.generation;
        view.updateStrainTable();
      }
    }, 1000);

    this.simulationID = window.setInterval(() => {
      view.simulation.draw(view.ctx);
      view.simulation.step();
      if(view.simulation.prey.length === 0 || view.simulation.predators.length === 0){
        window.clearInterval(this.simulationID);
      }
    }, 30);
  }

  updateStrainTable(){

    const topStrains = this.getTopStrains();
    $('#top-strains-body').empty();

    topStrains.forEach(strain => {
      $('#top-strains-body').append(
        `<tr>
          <td>
            <div class="strain-key" style="background:${strain.color}"></div>
            ${strain.name}
          </td>
          <td>${strain.population}</td>
          <td>${(strain.totalSpeed / strain.population).toFixed(3)}</td>
        </tr>`
      );
    });

    $('#table-tile').text(`Top Strains: Generation ${this.maxGen}`);
  }

  getTopStrains(){
    const strains = this.simulation.data.strains;

    let strainArray = Object.keys(strains).map(strainName =>{
      return Object.assign({}, strains[strainName], {name: strainName});
    });

    return strainArray.sort((s1, s2) => {
      return s2.population - s1.population;
    }).slice(0,5);
  }
}

export default SimulationView;
