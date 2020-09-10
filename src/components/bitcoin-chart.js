import React, { Component } from 'react'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { Line } from 'react-chartjs-2'
import axios from 'axios'

class BitcoinChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    let price = []
    let empDate = []

    axios.get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10")
    .then(res => {
      console.log('res dankmemes ',res.data.Data.Data);
      res.data.Data.Data.forEach(element => {
        // get the price
        price.push(parseInt(element.high))

        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(element.time * 1000);
        console.log('getDate ', date.getDate())
        empDate.push(date.getDate() )
      });

      this.setState({
        data:{
          labels: empDate,
          datasets: [
            {
              label: "bitcoin price $",
              data: price,
              backgroundColor: ["rgba(255, 135, 15, 0.7)"],
              borderWidth: 1
            }
        ]}
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
    const { moveContentValue } = this.props
    const value = moveContentValue ?
    "60px" :  "250px"

    return (
      <div className="content" style={{ marginLeft: value }}>
        <h1>BitCoin Chart</h1>
        <div className="bitcoinChart" >
          <Line
            width={600} 
            height={200}
            data={this.state.data}
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
    );
  }
}

BitcoinChart.propTypes = {
  moveContentValue: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  moveContentValue: state.main.moveContentValue
})

export default connect(mapStateToProps, null)(BitcoinChart);