var Joi = require('joi');

exports.register = function (plugin, options, next) {

  plugin.route([
    {
      path: "/test",
      method: "GET",
      handler: function(request, reply) {
        reply("this is a get");
      },
      config: {
        validate: {
          params: false,
          query: {
            name: Joi.string().description("get all the test bits")
          }
        },
        tags: ['api'],
        description: "Get all the test thingies"
      }
    },
    {
      path: "/test/{id}",
      method: "GET",
      handler: function(request, reply) {
        reply("get by id "+ request.params.id);
      },
      config: {
        validate: {
          params: {
            id: Joi.number().required()
          },
          query: {
            name: Joi.string().description("Filter by user's name")
          }
        },
        tags: ['api'],
        description: "Get one test thingy"
      }
    },
    {
      path: "/test",
      method: "POST",
      handler: function(request, reply) {
        reply("this is a post response");
      },
      config: {
        validate: {
          params: false,
          payload: {
            "id": Joi.number(),
            "name": Joi.string()
          }
        },
        tags: ['api'],
        description: "create a test thingy"
      }
    },
    {
      path: "/test/{id}",
      method: "POST",
      handler: function(request, reply) {
        reply('update id '+ request.params.id);
      },
      config: {
        validate: {
          params: false,
          payload: {
            "id": Joi.number().required(),
            "name": Joi.string()
          }
        },
        tags: ['api'],
        description: "update a test thingy"
      }
    }

    ]);

    next();
  };

  exports.register.attributes = {
    pkg: {
      "name": "testplugin",
      "version": "0.0.1",
      "description": "example test feature for sample Hapi app",
      "main": "index.js"
    }
  };
