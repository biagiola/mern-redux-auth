import React, { Component } from 'react'
import axios from 'axios'


export default class bitcoin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            btcUSD: null,
        }
    }

    componentDidMount() {
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then( res => this.setState({
            btcUSD: parseFloat(res.data.bpi.USD.rate.split(".")[0].replace(',', '.')*1000*5900)
        })
        //console.log(res.data.bpi.USD.rate)
        )
        .catch( err => console.log(err))
    }

    render() {
        return (
            <div>
                <h2>BTC</h2>    
                <p>{ this.state.btcUSD != null ? this.state.btcUSD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' } $</p>
            </div>
        )
    }
}

