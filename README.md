## Realtime Irish Train Data


NodeJS server gets real time train data in XML format from the Irish Rail API. Then converts the XML data to an array of javascript objects. Iterates through the array and transmits each train data object in a separate socket.io packet.


## Why?

AngularJS works with JSON not XML. JSON is preferred for RESTful API's in that it takes less bandwidth to transmit, is simpler and is far easier to deal with on the client if you are using javascript.


### Main Technologies Used

- [NodeJS](http://nodejs.org/)
- [ExpressJS](http://expressjs.com/) 
- [AngularJS](https://angularjs.org/)
- [Socket.io](socket.io)
- [BT Ford's socket.io Angular Module](https://github.com/btford/angular-socket-io)
- [Simplified HTTP request client](https://github.com/request/request)
- [xml2js XML to JavaScript object converter](https://github.com/Leonidas-from-XIV/node-xml2js)



### Running the App

- clone the repository
- npm install
- bower install
- node server.js
- browse to _http://localhost:3000/_
- Enable browsers developer tools (e.g. turn on Firebug)
- Be patient
- The train data shall appear in the browsers console panel


<hr>


Michael Cullen 2014
