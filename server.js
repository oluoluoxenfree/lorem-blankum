var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');

var server = new Hapi.Server({
});

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
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
    path : Path.join(__dirname, '/public/'),
    listing: false
        }
    }
});

server.start(function () {});
