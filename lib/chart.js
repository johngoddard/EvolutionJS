class Charter {
  constructor(simulation){
    this.simulation = simulation;
    this.renderChart();
    this.maxGen = 0;
  }


  renderChart(){
    let simulation = this.simulation;
    let charter = this;
    $('#pop-graph').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(function () {
                        let latest = simulation.data.slice(-1)[0];

                        if(latest.generation > charter.maxGen){
                          charter.maxGen = latest.generation;
                          console.log(latest.generation);
                          console.log(latest.prey);
                          series.addPoint([latest.generation, latest.prey], true, false);
                          console.log(series);
                        }
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Prey Population'
        },
        xAxis: {
          title: {
              text: 'Prey Population'
          },
          tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Population Data',
            data: (function () {
                  return [[0,30]];
            }())
        }]
    });
  }
}

export default Charter;
