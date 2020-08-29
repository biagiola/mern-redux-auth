import React, { Component } from 'react'
import axios from 'axios'

export default class weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: null,
            humidity: null,
            wind:  null
        }
    }

    componentDidMount() {
        axios({
            "method":"GET",
            "url":"https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast",
            "headers":{
              "content-type":"application/octet-stream",
              "x-rapidapi-host":"climacell-microweather-v1.p.rapidapi.com",
              "x-rapidapi-key":"2b9247926dmshf23f8545a9edc31p1efe6ejsn5caaea5d053b",
              "useQueryString":true
            },
            "params":{
              "fields":[
                "temp","humidity","wind_speed"],
              "unit_system":"si",
              "lat":"-25.247200",
              "lon":"-57.535661"
            }
        })
        .then((response)=>{
            this.setState({
                temperature: response.data[0].temp,
                humidity: response.data[0].humidity,
                wind: response.data[0].wind_speed
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {

        console.log(this.state)

        const value = this.state.temperature !== null 
        ? 
        <div className="">
            <div>
                Temperature:
                    {" "}  
                    { this.state.temperature.value }
                    º{ this.state.temperature.units }
            </div>
            <div>
                humidity:
                    {" "}
                    { this.state.humidity.value }
                    { this.state.humidity.units }
            </div>
            <div>
                wind:
                    {" "}
                    { this.state.wind.value * 3,6 }
                    km/h
            </div>
        </div>
        : <div>loading...</div>

        return (
            <div className="content">
                <h1>Weather</h1>
                { value }
            </div>
        )
    }
}
