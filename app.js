var express = require('express');
var app = express();

var fs = require('fs');
app.use(express.bodyParser());

app.get("/",function(request,response) {
  response.sendfile("static/index.html");
});

app.get("/feed_api_demo",function(request,response) {
  response.sendfile("static/feed.html");
});

app.get("/static/:filename", function(request, response) {
  response.sendfile("static/" + request.params.filename);
});

//initServer();
app.listen("8889");
//console.log("Listening at 80");
