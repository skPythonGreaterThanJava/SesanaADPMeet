var express = require("express");
var apiServer = express();
var bodyParser = require("body-parser")
var fs = require("fs");

var port = 3000;
var host = 'localhost';
apiServer.use(bodyParser.json());
apiServer.use(bodyParser.urlencoded({extended: true}));
apiServer.listen(port, host, ()=>{
    console.log('Server running at http://%s:%d', host, port);
});

apiServer.get('/', (request, response)=>{
    response.sendFile('index.html', {root: __dirname });
});

apiServer.get('/register', (request, response)=>{
    response.sendFile('registration.html', {root: __dirname });
});

apiServer.get('/login', (request, response)=>{
    response.sendFile('login.html', {root: __dirname });
});

apiServer.post('/register', (request, response)=>{
    fs.readFile("users.json", (err, data)=> {
        if (err) console.log(err);
        else {
            var users = JSON.parse(data);
            users.push({"username": request.body.username, "password": request.body.password, "isPM": false});
            fs.writeFile("users.json", JSON.stringify(users), (err)=>{if(err)console.log(err);});
            response.send("<h1>Registration successful. You may now log in</h1><br><a href='http://localhost:3000'>Main page</a>")
        }
    })
});

apiServer.post('/login')