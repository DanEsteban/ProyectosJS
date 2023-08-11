

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
 
    res.sendFile(__dirname+"/singup.html");

});

app.post('/', function(req, res){
 
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;
     const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
	                LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    //console.log(jsonData)
    const url = "https://us21.mailchimp.com/3.0/lists/d9e843b390";
    const options ={
        method: "POST",
        auth: "DanielV:d782b3fe266dfd99cf3b2dbaaf5f4159-us21"
    }
    const request =https.request(url, options, function(response){
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
/*
  
    const r= https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.send("Successfully subscribed!")
        }else{
            res.send("There was an error with singing up, please try again!")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });
    r.write(jsonData);
    r.end();
    
    */

});

app.listen(3000, function(){
   console.log("Server is running on port 3000"); 
});


/*
API KEY: 22d0ced1caee5c5d9a4537114f07acd8-us21
Audience ID: d9e843b390.
*/