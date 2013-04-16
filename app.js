var express = require('express');
var app = express();

var fs = require('fs');
app.use(express.bodyParser());

app.get("/",function(request,response) {
  response.sendfile("static/index.html");
});

app.get("/feed_api_demo",function(request,response) {
  console.log("trace1\n");
  response.sendfile("static/feed_demo/feed.html");
});
//initServer();

app.get("/static/:staticFilename", function (request, response) {
    console.log("trace2");
	response.sendfile("static/" + "feed_demo/" + request.params.staticFilename);
});

app.listen("3000");
console.log("Listening at 3000");