import { React, useEffect, useState } from "react";
import ApexCharts from "apexcharts";

import { useAuthContext } from "../hooks/useAuthContext";

import "./progresbar.scss";

const ProgressBar = () => {
  const [data, setData] = useState(null);
  const { user } = useAuthContext();

  const fetchCPDSummary = async () => {
    const response = await fetch("/api/userDetails", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    setData(json);
    
    
  };

  useEffect(() => {
    fetchCPDSummary();
    const {areaOfPractice} = data
  


  var options = {
    series: [areaOfPractice, 55, 67, 83],
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
    labels: [
      "Area of practice",
      "Risk management",
      "Business",
      "Career Interests",
    ],
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}, [user]);

  return (
    <div className="progressBar">
      <div id="chart"></div>
    </div>
  );
};

export default ProgressBar;
