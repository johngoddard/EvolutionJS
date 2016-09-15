class Charter {
  constructor(simulation){
    this.simulation = simulation;
    this.maxPopGen = 0;
    this.maxFitGen = 0;
    this.renderFitnessChart();
    this.renderPopulationChart();
    this.playing = false;
    this.popInterval;
    this.fitInterval;
  }

  togglePlaying(){
    this.playing = this.playing ? false : true;
  }

  stop(){
    clearInterval(this.popInterval);
    clearInterval(this.fitInterval);
  }

  renderPopulationChart(){
    let simulation = this.simulation;
    let charter = this;

    $('#pop-graph').highcharts({
      chart: {
        type: 'spline',
        animation: Highcharts.svg,
        marginRight: 10,
        style: {
           fontFamily: "'Roboto', sans-serif"
        },
        events: {
          load: function () {
            let preySeries = this.series[0];
            let predSeries = this.series[1];

            charter.popInterval = setInterval(function () {
              let latest = simulation.data;

              if(latest && charter.playing && latest.generation > charter.maxPopGen){
                charter.maxGen = latest.generation;

                preySeries.addPoint([latest.generation, latest.prey], true, false);
                predSeries.addPoint([latest.generation, latest.predators], true, false);
              }
            }, 1000);
          }
        }
      },
    title: {
      text: 'Species Populations',
      style: {
              fontSize: '14px'
            }
    },
    xAxis: {
      title: {
        text: 'Generations'
      },
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Population (relative to initial)'
      },
      labels: {
        format: `{value} %`
      },
      marker: {
        enabled: false
        },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + `${this.series.name} Population` + '</b><br/>' +
          `Generation: ${this.x}` + '<br/>' +
          `Relative population: ${this.y.toFixed(1)} %`;
      }
    },
    legend: {
      enabled: true,
      floating: true,
      verticalAlign: 'top',
      x: 0,
      y: 9
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Prey',
      data: (function () {
              return [[0,100]];
            }()),
      color: '#50BDD8',
      marker: {
        enabled: false
        },
      },
      {
        name: 'Predators',
        data: (function () {
          return [[0,100]];
        }()),
        color: '#F25F5C',
        marker: {
          enabled: false
          },
        }]
    });
  }

  renderFitnessChart(){
    let simulation = this.simulation;
    let charter = this;
    $('#fit-graph').highcharts({
      chart: {
        type: 'spline',
        style: {
           fontFamily: "'Roboto', sans-serif"
        },
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
          load: function () {
            let fitSeries = this.series[0];

            charter.fitInterval = setInterval(function () {
              let latest = simulation.data;

              if(latest && charter.playing && latest.generation > charter.maxFitGen){
                charter.maxFitGen = latest.generation;
                fitSeries.addPoint([latest.generation, latest.averageSpeed], true, false);
              }
            }, 1000);
          }
        }
      },
    title: {
      text: 'Average Prey Fitness',
      style: {
              fontSize: '14px'
            }
    },
    xAxis: {
      title: {
        text: 'Generations'
      },
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Average Speed'
      },
      labels: {
        format: `{value}`
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#f00'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + `Average Prey Fitness` + '</b><br/>' +
          `Generation: ${this.x}` + '<br/>' +
          `Average speed: ${this.y.toFixed(2)}`;
      }
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Average Speed',
      color: '#71b871',
      marker: {
        enabled: false
        },
      data: (function () {
              return [[0,2]];
            }())
      }]
    });
  }
}

export default Charter;
