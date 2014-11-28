// hack from https://gist.github.com/branneman/8048520
process.env.NODE_PATH = __dirname + '/plugins';
require('module').Module._initPaths();

var path = require('path');
var Hapi = require('hapi');
var Glue = require('glue');
var _ = require('lodash');

var manifest = {
  server: {
    cache: 'catbox-memory',
    app: {
      'app-specific': 'value'
    }
  },
  connections: [
    {
      host: 'localhost',
      port: 8001,
      labels: ['api']
    },
    {
      host: 'localhost',
      port: '8000',
      labels: ['web']
    }
  ],
  plugins: {
    "api_test": [
      {
        select: 'api',
        routes: {
          prefix: '/api'
        }
      }
    ],
    "web_test": [
    {
      select: 'web'
    }
    ]
  }
};

Glue.compose(manifest, function (err, server) {
  server.start(function (err) {
    var server_info = _.map(server.connections, function(connection){
      return  [
        connection.settings.labels.join(', '),
        ': ',
        connection.info.uri,
        ' with plugins ',
        _.keys(connection._registrations).join(', ')
      ].join('');
    });
    console.log("Hapi version:", server.version, "started with servers: \n", server_info.join('\n '));
  });
});
