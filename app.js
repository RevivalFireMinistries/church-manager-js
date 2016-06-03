var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var connection = require('./connection');


var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});

connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
    console.log('Church Manager listening on port ' + server.address().port);
});