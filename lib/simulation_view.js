class SimulationView {
  constructor(simulation, ctx) {
    this.simulation = simulation;
    this.ctx = ctx;
    this.maxGen = 0;
    this.status = 'paused';
    this.simulationSpeed = 1;
    this.graphID;
    this.simulationID;

    this.initializeButtons();
    this.initializeSliders();
    this.initializeModal();
  }

  initializeButtons(){
    $('#play-btn').click(() => {
      let $start = $('#start-overlay');
      if($start){
        $start.remove();
      }
      this.togglePlay();
    });

    $('#reset-btn').click(() => {
      this.reset();
    });

    $('#overlay-start').click(() => {
      $('#start-overlay').remove();
      this.togglePlay();
    });
  }

  initializeSliders(){
    $('#mut-slider').on('input', (e) => {
      $('#mut-val').text(`${Math.floor(e.currentTarget.value * 100)}%`);
    });

    $('#mut-slider').on('change', (e) => {
      let mutationRate = e.currentTarget.value;
      this.simulation.setMutationRate(mutationRate);
    });

    $('#gen-slider').on('input', (e) => {
      $('#gen-val').text(`${e.currentTarget.value}`);
    });

    $('#gen-slider').on('change', (e) => {
      let generationTime = e.currentTarget.value;
      this.simulation.setPreyGeneration(generationTime * 50);
    });

    $('#speed-slider').on('input', (e) => {
      $('#speed-val').text(`${e.currentTarget.value}`);
    });

    $('#speed-slider').on('change', (e) => {
      let speed = e.currentTarget.value;
      this.simulation.setPredatorSpeed(speed);
    });

    $('#sim-speed-slider').on('input', (e) => {
      $('#sim-val').text(`${e.currentTarget.value}x`);
    });

    $('#sim-speed-slider').on('change', (e) => {
      let simSpeed = e.currentTarget.value;
      this.setSimulationSpeed(simSpeed);
    });
  }

  initializeModal(){
    let modal = $('.about-modal-overlay');

    $('.modal-link').click((e) => {
      modal.show();
      e.stopPropagation();
    });

    $('.about-modal').click((e) => {
      e.stopPropagation();
    });

    $(window).click(() => {
      modal.hide();
    });

    $('#close-modal-btn').click((e) => {
      modal.hide();
      e.stopPropagation();
    });

  }

  setSimulationSpeed(speed){
    this.simulationSpeed = speed;

    let view = this;

    if(this.simulationID){
      clearInterval(this.simulationID);
    }

    if(this.status === 'playing'){
      let simInterval = 30 / speed;
      this.simulationID = window.setInterval(() => {
        view.simulation.draw(view.ctx);
        view.simulation.step();
        view.checkOver();
      }, simInterval);
    }
  }

  checkOver(){
    if(this.simulation.prey.length === 0){
      window.clearInterval(this.simulationID);
      this.simulation.draw(this.ctx);
      this.handleExtinction('prey');
    } else if(this.simulation.predators.length === 0){
      window.clearInterval(this.simulationID);
      this.simulation.draw(this.ctx);
      this.handleExtinction('predators')
    }
  }

  handleExtinction(species){
    $('#play-btn').prop('disabled', true);
    let $div = $('<div>', {class: 'extinction-overlay after-sim'});
    let $p = $('<p>', {class: 'ex-text'});

    const generations = this.maxGen === 1 ? 'generation' : 'generations';
    const fitnessChange = (100*((this.simulation.data.averageSpeed - 2)/2)).toFixed(1);
    const increased  = fitnessChange >= 0 ? 'increased' : 'decreased';

    $p.text(`The ${species} have gone extinct after ${this.maxGen} ${generations}! The prey fitness ${increased} by ${fitnessChange}%.`);

    let $btnContainer = $('<div>', {class: "overlay-btn-cont"});
    let $btn = $('<button>', {class: 'btn btn-success', id: 'overlay-reset', type: 'button'});
    $btn.text('Restart');
    $btn.click(() => this.reset());
    $btnContainer.append($btn);

    $div.append($p);
    $div.append($btnContainer);

    $('#sim-container').append($div);
  }

  reset(){
    clearInterval(this.graphID);
    clearInterval(this.simulationID);

    $('#play-btn').prop('disabled', false);
    this.clearOverlay();

    this.maxGen = 0;
    this.simulation.charter.stop();
    this.simulation.reset();
    this.resetStrainTable();

    if(this.status === 'paused'){
      this.togglePlay();
    } else{
      this.start();
      this.simulation.charter.togglePlaying();
    }
  }

  clearOverlay(){
    let $overlay = $('.extinction-overlay');
    if ($overlay.length > 0) {
      $overlay[0].remove();
    }
  }



  togglePlay(){
    if(this.status === 'paused'){
      this.status = 'playing';
      this.start();
      $('#play-btn').text('Pause');
    } else{
      this.pause();
      this.status = 'paused';
      $('#play-btn').text('Play');
    }

    this.simulation.charter.togglePlaying();
  }

  pause(){
    clearInterval(this.graphID);
    clearInterval(this.simulationID);
  }

  start(){
    let view = this;

    this.graphID = setInterval(function () {
      let latest = view.simulation.data;

      if(latest.generation > view.maxGen){
        view.maxGen = latest.generation;
        view.updateStrainTable();
      }
    }, 1000);

    this.setSimulationSpeed($('#sim-speed-slider').val());
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
          <td>${(strain.totalSpeed / strain.population).toFixed(2)}</td>
        </tr>`
      );
    });

    $('#table-title').text(`Top Strains: Generation ${this.maxGen}`);
  }

  getTopStrains(){
    const strains = this.simulation.data.strains;

    let strainArray = Object.keys(strains).map(strainName =>{
      return Object.assign({}, strains[strainName], {name: strainName});
    });

    return strainArray.sort((s1, s2) => {
      return s2.population - s1.population;
    }).slice(0,3);
  }

  resetStrainTable(){
    $('#top-strains-body').empty();
    $('#top-strains-body').append(
      `<tr>
        <td>
          <div class="strain-key" style="background:blue"></div>
          Original
        </td>
        <td>30</td>
        <td>2</td>
      </tr>`
    );

    $('#table-title').text('Top strains: Generation 0');
  }
}

export default SimulationView;
