var express = require('express');
var app = express();
app.get("/", function(request,response) {
  response.sendfile("static/startScreens.html");
});

app.get("/feed_api_demo",function(request,response) {
  response.sendfile("static/feed.html");
});

var static_dir = express.static(__dirname + "/static");

app.use(static_dir, function(request, response, next){
  next();
});

/*var local_dir = express.static(__dirname + "/local/lib");

app.use(local_dir, function(request, response, next){
  next();
});*/
/*
app.get("/static/:filename", function(request, response) {
  response.sendfile("static/" + request.params.filename);
});
*/

app.listen("80");
console.log("Listening at 80");

