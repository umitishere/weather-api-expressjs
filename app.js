const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {

    // You need to add appid parameter from your openweathermap account to get the result.
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Istanbul&units=metric&appid=c48b651fd7b1b3bd091de9fd74605c55";

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature in Istanbul is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src='" + imageURL + "' />");

            res.send();
        });
    });

});

app.listen(3000, () => {
    console.log("Server is running.");
});