const express = require('express');
const https = require('https');
const app = express();

require('dotenv').config();
const apiKey = process.env.API_KEY;

app.get("/",function(request,response){
    // response.sendFile(__dirname+"/index.html");
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Yangon&appid="+apiKey;
    https.get(url,function(res){
        res.on("data",function(data){
            const weatherData = JSON.parse(data);
            const imgUrl = "http://openweathermap.org/img/wn/" +weatherData.weather[0].icon+"@2x.png";
           
            response.write("<div><img src="+imgUrl+"></div>");
            response.write("<h1>The temperature in Yangon is "+ weatherData.main.temp +" Kelvins.</h1>")
            response.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server is running at port 3000.");
})