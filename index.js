'use strict';

const express = require('express');
const bodyParser = require('body-parser');

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (request, response) {

    console.log('hook request');

   
	 const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    app.ask('Hello, World!');
  }

return app.ask("the number of households in rajasthan is 201");
//return responseHandler (app);
  const actionMap = new Map();
  actionMap.set('<API.AI_action_name>', responseHandler);

  app.handleRequest(actionMap);
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
