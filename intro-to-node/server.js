const express = require('express');

const app =express();

app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>');
});

app.get('/contact', function(req, res){
    res.send('<h1>Mi correo de contacto es: desteban.velpi@gmail.com</h1>');
});

app.get('/about', function(req, res){
    res.send('<p>Mi nombre es Daniel Velasco y estoy aprendiendo a programar!</p>');
});

app.get('/hobbies', function(req, res){
    res.send('<ul><li>Cafe</li><li>Colada Morada</li><li>Women</li></ul>');
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});