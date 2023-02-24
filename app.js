const express = require('express');
const https = require('https');
const app = express();

app.get("/",function(request,response){
    // response.sendFile(__dirname+"/index.html");
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Yangon&appid=ea20a9984986425c0c8025db970f4dd4";
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