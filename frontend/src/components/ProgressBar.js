import { React, useEffect, useState } from "react";
import ApexCharts from "apexcharts";

import { useAuthContext } from "../hooks/useAuthContext";

import "./progresbar.scss";

const ProgressBar = () => {
  const [data, setData] = useState(null);
  const [areaOfPractice, setAreaOfPractice] = useState('')
  const [businessAndManagement, setBusinessAndManagement] = useState('')
  const [careerInterests, setCareerInterests] = useState('')
  const [riskManagement, setRiskManagement] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthContext();

  
  useEffect(() => {
    const fetchCPDSummary = async () => {
      const response = await fetch("/api/userDetails", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok){
        console.log(json)
        setData(json)
        setBusinessAndManagement(json.businessAndManagement)
        setCareerInterests(json.careerInterests)
        setAreaOfPractice(json.areaOfPractice)
        setRiskManagement(json.riskManagement)
        setIsLoading(false)
      }
    };

    if (user){
      fetchCPDSummary()
      let chartData = {
        areaOfPractice:{
          value: areaOfPractice,
          barValue: Math.floor(areaOfPractice/50*100),
          divisor: 50,
          name: "Area Of Practice"
      },
        businessAndManagement:{
          value: businessAndManagement,
          barValue: Math.floor(businessAndManagement/15*100),
          divisor: 15,
          name: "Business"
        },
        careerInterests:{
          value: careerInterests,
          barValue: Math.floor(careerInterests/75*100),
          divisor: 75,
          name: "Career Interests"
        },
        riskManagement:{
          value: riskManagement,
          barValue: Math.floor(riskManagement/10*100),
          divisor: 10,
          name: "Risk Management"
        }
      }
      var options = {
        series: [
          chartData.areaOfPractice.barValue,
          chartData.businessAndManagement.barValue,
          chartData.riskManagement.barValue,
          chartData.careerInterests.barValue,
          
          ],
        chart: {
        height: 400,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '16px',
              formatter: function(seriesName){
                if (seriesName === "CPD points"){
                  return seriesName
                }else{
                  return chartData[seriesName].name;
                }
              },
            },
            value: {
              fontSize: '25px',
            },
            total: {
              show: true,
              label: "CPD points",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return parseInt(chartData.areaOfPractice.value)+parseInt(chartData.careerInterests.value)+parseInt(chartData.businessAndManagement.value)
                 + parseInt(chartData.riskManagement.value);
              },
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['areaOfPractice', 'businessAndManagement', 'riskManagement', 'careerInterests'],
      legend: {
        show: true,
        floating: true,
        fontSize: '15px',
        position: 'left',
        offsetX: -40,
        offsetY: 2,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return chartData[seriesName].name + ":  " + chartData[seriesName].value + "/" + chartData[seriesName].divisor
        },
        itemMargin: {
          vertical: 3
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
              show: false
          }
        }
      }]
      };
      
       

    if (!isLoading){
      new ApexCharts(document.querySelector("#chart"), options).render();
    }
      
}
}, [isLoading, user, areaOfPractice, businessAndManagement, careerInterests, riskManagement]);


    return (
      <div className="progressBar">
        {!isLoading ? (
          <div id="chart"></div>
        ) : (
          <div> Loading </div>
        )}
          
      </div>
    )

};

export default ProgressBar;
