'use strict';

const express = require('express');
const bodyParser = require('body-parser');

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (request, response) {

    console.log('hook request');

    /*try {
        var speech = 'empty speech1111';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }*/
	
	 const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    app.ask('Hello, World!');
  }

//return app.ask("who are you");
return responseHandler (app);
  const actionMap = new Map();
  actionMap.set('<API.AI_action_name>', responseHandler);

  app.handleRequest(actionMap);
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
