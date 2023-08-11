const express = require("express");
//make get request to external serve node. -> asi se busca para sacar informacion a travez de node
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");
   
});

app.post("/", function(req,res) {
   
    const query= req.body.cityName;
    const appid= "00f52d68b066cdbcdde09ac80a8deccc";
    const units= "metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+appid+"&units="+units;

    https.get(url, function(response){

        console.log(response.statusCode);
        response.on("data", function (data){
            const weather = JSON.parse(data); 
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const icon= weather.weather[0].icon;
            const image= "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently "+ description + "</p>");
            res.write("<h1>The temperature in" + query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + image +">");
            res.send();
        });

    }); 
});




app.listen(3000, function(){
    console.log("Server is running in port 3000");
});