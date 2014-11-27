var path = require('path');
var Hapi = require('hapi');
var _ = require('lodash');
var pack = new Hapi.Pack();

var manifest = {
  servers: [
  {
    host: 'localhost',
    port:8000,
    options: {
      labels: 'api',
      cors: true
    }
  },
  {
    host: 'localhost',
    port: 8001,
    options: {
      labels: 'web',
      state: {
        cookies: {
          clearInvalid: true
        }
      }
    }
  }
  ],
  plugins: {
    // "lout": {}
    'hapi-swagger':  {
      select: 'api',
      // basePath: server.info.uri,
      endpoint: '/docs',
      pathPrefixSize: 1,
      apiVersion: 1,
      auth: false,
      payloadType: 'form',
      enableDocumentationPage: false
    },
    "plugins/documentation":{}




  }
};

Hapi.Pack.compose(manifest, function(err, pack) {
  pack.start(function() {
    var server_info = _.map(pack.servers, function(server){
      return  server.settings.labels.join(', ') + ': ' + server.info.uri;
    });
    console.log("Hapi version:", pack.hapi.version, "started with plugins:", _.keys(pack.plugins).join(', '), '\nserver info:', server_info);
  });
});
