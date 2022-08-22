import React from 'react'
import ApexCharts from 'apexcharts'


const ProgressBar = () => {
    var options = {
        series: [44, 55, 67, 83],
        chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '24px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 300
              }
            }
          }
        }
      },
      labels: ['Area of practice', 'Risk management', 'Business', 'Career Interests'],
      };
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
      console.log("rendering chart")

  return (
    <div id="chart">CPD Progress</div>
  )
}

export default ProgressBar

