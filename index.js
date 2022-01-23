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
    response.json({"status": true});
});

apiServer.get('/register', (request, response)=>{
    response.json({"status": true});
});

apiServer.get('/login', (request, response)=>{
    response.json({"status": true});
});

apiServer.post('/register', (request, response)=>{
    fs.readFile("users.json", (err, data)=> {
        if (err) console.log(err);
        else {
            var users = JSON.parse(data);
            users.push({"username": request.body.username, "password": request.body.password, "isPM": false});
            fs.writeFile("users.json", JSON.stringify(users), (err)=>{if(err)console.log(err);});
            response.json({"registered": true});
        }
    })
});

apiServer.post('/login', (request, response)=>{
    fs.readFile("users.json", (err, data)=>{
        if(err) console.log(err);
        else {
            var users = JSON.parse(data);
            var found = false;
            users.forEach(element => {
                if (element.username == request.body.username) {
                    if(element.password == request.body.password) {
                        found = true;
                    }
                }
            });
            response.json({"found": found});
        }
    })
});

apiServer.get('/dashboard', (request, reponse)=>{
   if(request.query.islogged === true) {
        response.json({"status": true});
   } else {
       response.json({"status": false})
   }
});

apiServer.get('/pm_dashboard', (request, response)=>{
    if(request.query.islogged === true) {
        response.json({"status": true});
    } else {
        response.json({"status": false})
    }
});

