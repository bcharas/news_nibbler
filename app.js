var express = require('express');
var app = express();

var fs = require('fs');
app.use(express.bodyParser());

app.get("/",function(request,response) {
  response.sendfile("static/index.html");
});

app.get("/feed_api_demo",function(request,response) {
  response.sendfile("static/feed_demo/feed.html");
});
//initServer();
app.listen("3000");
//console.log("Listening at 80");
