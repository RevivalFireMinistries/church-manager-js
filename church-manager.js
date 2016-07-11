var express = require('express');
var connection = require('./db/connection');
q = require('q');
log4js = require('log4js');
log4js.configure( "./config/log4js.json" );
logger = log4js.getLogger("app");


var app = module.exports = express.createServer();

// Check node_env, if not set default to development
var env = (process.env.NODE_ENV || "development");
var config = require('./config/config')[env];

 _ = require('underscore');
var cors = require('cors');
 rfm = require('./utils/Utils');
 email = require('./notifications/email-engine');


// Configuration, defaults to jade as the view engine
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cors({origin: '*'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

connection.init();

/*
 * This section is for environment specific configuration
 */
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
    logger = log4js.getLogger("file-appender");
});



app.listen(config.EnvConfig.port, function(){
  logger.info("Church Manager server listening on port %d in %s mode", app.address().port, app.settings.env);
});


/*
 * Exports the express app for other modules to use
 * all route matches go the routes.js file
 */
module.exports.app = app;
routes = require('./routes');