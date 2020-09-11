import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

function BitcoinChart() {
  const authToken = useSelector( store => store.main.authToken )

  const [chartData, setChartData] = useState({});

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10")
      .then(res => {
        res.data.Data.Data.map( element => {
          empSal.push(parseInt(element.high));

          let date = new Date(element.time * 1000)
          empAge.push(parseInt(date))
        })
        
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "level of thiccness",
              data: empSal,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  
  const moveContentValue = useSelector( store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px"

  return (
    <div className="content" style={{ marginLeft: margin }}>
      <h1>BitCoin Chart</h1>
      <div className="bitcoinChart" >
        <Line
          width={600} 
          height={200}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio : true,
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
  )
}

export default BitcoinChart