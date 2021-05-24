const express = require("express");
const https = require("https");

const app = express();

// This usage is deprecated => app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    const city = req.body.cityName;
    const apiKey = "c48b651fd7b1b3bd091de9fd74605c55";
    const unit = "metric";
    
    // You need to add appid parameter from your openweathermap account to get the result.
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;
    
    https.get(url, (response) => {
        console.log(response.statusCode);
    
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src='" + imageURL + "' />");
    
            res.send();
        });
    });   
});

app.listen(3000, () => {
    console.log("Server is running.");
});