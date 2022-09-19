import { React, useEffect, useState } from "react";
import ApexCharts from "apexcharts";

import { useAuthContext } from "../hooks/useAuthContext";

import "./progresbar.scss";

const ProgressBar = () => {
  const [data, setData] = useState(null);
  const [areaOfPractice, setAreaOfPractice] = useState(null)
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
        setIsLoading(false)
        setAreaOfPractice(json.areaOfPractice)
        
      }
    };

    if (user){
      fetchCPDSummary()
      let areaOfPracticebar = areaOfPractice/15*100;
        const options = {
          series: [areaOfPracticebar, 55, 67, 83],
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
                  show: true,
                  fontSize: "16px",
                  formatter: function () {
                    console.log(areaOfPractice)
                    return [areaOfPractice,];
                  }
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
      
       

    if (!isLoading){
      new ApexCharts(document.querySelector("#chart"), options).render();
    }
      
}
}, [isLoading]);


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
