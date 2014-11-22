## Realtime Irish Train Data in Geo-JSON

### Why?

AngularJS works with JSON not XML. JSON is preferred to XML for RESTful API's. JSON takes less bandwidth to transmit, is simpler to understand visually and is far easier to deal with on the client as it works seamlessly with javascript.
[Geo JSON](http://geojson.org/) is a JSON format specifically designed for geographic applications.


### App Functionality

NodeJS server gets real time train data in XML format from the Irish Rail API. The XML data is then converted to a javascript. String manipulation is performed to create an Object in the [Geo JSON format](http://geojson.org/geojson-spec.html). The Object is send via socket.io. Socket.io serialises the transmitted data as JSON. The client will receive the train data as Geo JSON. 


### Main Technologies Used

- [NodeJS](http://nodejs.org/)
- [ExpressJS](http://expressjs.com/) 
- [AngularJS](https://angularjs.org/)
- [Socket.io](socket.io)
- [BT Ford's socket.io Angular Module](https://github.com/btford/angular-socket-io)
- [Simplified HTTP request client](https://github.com/request/request)
- [xml2js XML to JavaScript object converter](https://github.com/Leonidas-from-XIV/node-xml2js)
- [Geo JSON](http://geojson.org/)


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
