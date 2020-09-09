import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import axios from "axios";

const BitcoinChart = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
    let empSal = [];
    let empDate = [];
    
    axios
      .get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10")
      .then(res => {
        console.log('res dankmemes ',res.data.Data.Data);
        res.data.Data.Data.forEach(element => {
          empSal.push(parseInt(element.high))

          // multiplied by 1000 so that the argument is in milliseconds, not seconds.
          var date = new Date(element.time * 1000);
          console.log('getDate ', date.getDate())
          empDate.push(date.getDate() )
        });

        setChartData({
          labels: empDate,
          datasets: [
            {
              label: "bitcoin price $",
              data: empSal,
              backgroundColor: ["rgba(255, 135, 15, 0.7)"],
              borderWidth: 1
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log('empSal', empSal);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="content">
      <h1>BitCoin Chart</h1>
      <div className="bitcoinChart">
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Last 10 days" , display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15,
                    beginAtZero: false
                  },
                  gridLines: {
                    display: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default BitcoinChart;