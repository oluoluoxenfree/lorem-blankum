var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var app = require('./twitterClient.js');
var server = new Hapi.Server({

});

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: {
    cors: true
  }
});

server.register(Inert, function () {});

server.route({
  method: 'GET',
  path: '/',
  handler: {
      file: Path.join(__dirname, 'index.html')
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory :{
      path : Path.join(__dirname),
      listing: false
    }
  }
});

server.route({
  method: 'GET',
  path: '/{value}',
  handler: function(req, res) {
    return app.twitterRequest(req.url.query, res);
  }
});

server.start(function (err) {
  if(err) {
    console.log(err);
  }
});
