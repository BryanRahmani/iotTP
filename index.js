const express = require('express');
var path = require('path');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Particle = require('particle-api-js');
var particle = new Particle();
var token;

//Pour servir le css etc ...
app.use('/assets', express.static('client/static'));
app.use('/app', express.static('client/app'));

app.use(bodyParser.urlencoded({ extended: true }));
// Parse le JSON. Ajout pas possible sans cette ligne
app.use(bodyParser.json({ type: 'application/json' }));

/////////////////////

particle.login({username: 'xxx@live.fr', password: ''}).then(
    function(data) {
        token = data.body.access_token;
        var devicesPr = particle.listDevices({ auth: token });
        devicesPr.then(
            function(devices){
                app.get('/photon', function(req,res) {
                    return res.json(devices.body);
                });
                console.log('Devices: ', devices.body);
            },
            function(err) {
                console.log('List devices call failed: ', err);
            }
        );
    particle.getEventStream({ deviceId: '290029001047363333343437', auth: token }).then(function(stream) {
        stream.on('event', function(data) {
            console.log("Event: ", data);
            });
        });
    },
    function (err) {
        console.log('Could not log in.', err);
    }
);

////////////////////

app.get('/', function(req, res) {
    
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});