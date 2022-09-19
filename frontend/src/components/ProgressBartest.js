import React, { Component} from 'react';
import Chart from 'react-apexcharts'

import "./progresbar.scss";
class Donut extends Component {

    
      
  constructor(props) {
    super(props);

    this.state = {
      options: {labels: ["Area of Practice", 'B', 'C', 'D', 'E'],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "24px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Current CPD points",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 150;
              },
            },
          },
        },
      },
    },
      series: [44, 55, 41, 17, 15],
    }
  }

  render() {

    return (
    <div className='progressBar'>

      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" width="400" />
      </div>
    </div>
    );
  }
}

export default Donut;