const express = require('express')
const app = express()
const router = require('express').Router()
const axios = require("axios")

router.get('/', (req, res) => {
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
        "temp","humidity"],
      "unit_system":"si",
      "lat":"-25.247200",
      "lon":"-57.535661"
    }
    })
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
})

module.exports = router;
