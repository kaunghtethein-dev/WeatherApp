const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const { checkServerIdentity } = require('tls');
const app = express();


require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const apiKey = process.env.API_KEY;


app.get("/", function (request, response) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+"Yangon"+"&appid=" + apiKey+"&units=metric";
    https.get(url, function (res) {
        res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            var weatherEJS = {
                cityName: "Yangon",
                temp: weatherData.main.temp
            }
            response.render("index",weatherEJS);
         
        })
    })
    
})

app.post("/", function(request,response){
    const city = request.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + apiKey+"&units=metric";
    https.get(url, function (res) {
        res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            var weatherEJS = {
                cityName: city,
                temp: weatherData.main.temp
            }
            response.render("index",weatherEJS);
         
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running at port 3000.");
})

