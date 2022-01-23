var express = require("express");
var apiServer = express();
var fs = require("fs");

var port = 3000;
var host = 'localhost';
apiServer.listen(port, host, ()=>{
    console.log('Server running at http://%s:%d', host, port);
});

apiServer.get('/', (request, response)=>{
    response.sendFile('index.html', {root: __dirname });
});

apiServer.get('/register', (request, response)=>{
    //...
});

apiServer.get('/login', (request, response)=>{
    //...
});