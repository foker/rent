/**
 * Created by macbook on 11.04.15.
 */

var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);

app.use(express.static(path.join(__dirname, './')));

app.get('/', function(req, res){
    res.sendfile('views/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});