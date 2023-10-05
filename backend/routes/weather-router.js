//import express module
const express=require("express");
//import axios module
const axios = require('axios');

const router=express.Router();
//business logic:weather get
router.post("/", (req, res) => {

    console.log("here into BL:add city", req.body);
    
    let key ="11875a0713a3ca57209eec4c4281a91e";
    let apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&routerid=${key}`;
    axios.get(apiURL).then((response)=>{
       const infoObject = {
          tempurature: response.data.main.temp,
          pressure: response.data.main.pressure,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
         icone:`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 
 
 
       };
       console.log("here is response from API",infoObject);
       res.json({weather:infoObject});
 
    });
 
 
 });
 module.exports=router;
