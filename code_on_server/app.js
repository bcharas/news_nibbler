var express = require('express');
var app = express();

// body of a request
app.use(express.bodyParser());

var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;

var optionsWithEnableWriteAccess = { w : 1 };
var dbName = 'userAccounts';

var client = new mongo.Db(
  dbName,
  new mongo.Server(host, port),
  optionsWithEnableWriteAccess
);

app.get("/", function(request,response) {
  response.sendfile("static/startScreens.html");
});

app.get("/getFeeds/:id", function(request, response) {
  getFeeds(request.params.id, response);
});

function getFeeds(userID, response) {
  openDbForTopics(onDbOpenGettingTopics, userID, response);
}

function openDbForTopics(onOpen, userID, response) {
  client.open(onDbReady);

  function onDbReady(error) { 
    if (error) throw error;
    client.collection('userCollection', onUserCollectionReady);
  }

  function onUserCollectionReady(error, userCollection) {
    if (error) throw error;
    onOpen(userCollection, userID, response);
  }
}

function onDbOpenGettingTopics(collection, userID, response) {
  collection.find({_id : userID}).toArray(function (err, results) {
    if (err) throw err;
    closeDb();
    response.send(results);
  });
}

app.post("/addUserAccount", function(request, response) {
  insertNewUser(request.body.userID, response);
});

function insertNewUser(usr, response) {
  openDb(onDbOpen, usr, response);
}

function openDb(onOpen, usr, response) {
  client.open(onDbReady);

  function onDbReady(error){
    if (error) throw error;
    client.collection('userCollection', onUserCollectionReady);
  }

  function onUserCollectionReady(error, userCollection) {
    if (error)
      throw error;

    onOpen(userCollection, usr, response);
  }
}

function onDbOpen(collection, usr, response) {
  addUserToDB(collection, usr, errorHandler, response);
}

function addUserToDB(collection, usr, done, response){
  collection.insert({ _id : usr , topics : []}, function(err){
    if (err){
      done(err);
      response.send({success : false});
    }
    else {
      closeDb();
      response.send({success : true});
    }
  });
  
}

app.post("/addCategory", function(request, response) {
  openDbToEditCategory(onDbOpenForAddingCategories,
                       request.body.userID, 
                       request.body.cat_name, 
                       request.body.cat_url);
  response.send({ success : true });
});

app.post("/deleteCategory", function(request, response) {
  openDbToEditCategory(onDbOpenForDeletingCategories,
                       request.body.userID, 
                       request.body.cat_name, 
                       request.body.cat_url);
  response.send({ success : true });
});

function openDbToEditCategory(onOpen, userID, name, url) {
  client.open(onDbReady);

  function onDbReady(error){
    if (error) throw error;
    client.collection('userCollection', onUserCollectionReady);
  }

  function onUserCollectionReady(error, userCollection) {
    if (error)
      throw error;

    onOpen(userCollection, userID, name, url);
  }
}

function onDbOpenForAddingCategories(collection, userID, name, url) {
  addCategory(collection, userID, name, url, errorHandler);
}

function onDbOpenForDeletingCategories(collection, userID, name, url) {
  deleteCategory(collection, userID, name, url, errorHandler);
}

function errorHandler(err){
    if (err)
      closeDb();
}

function addCategory(collection, userID, name, url, done) {
  collection.update(
    { _id : userID}, 
    {$push: { topics: { name: name, url : url} }},
     function(err){
       if (err){
         done(err);
         return;
       }
     });
  collection.find().each(logger);
  closeDb();
}

function deleteCategory(collection, userID, name, url, done) {
  collection.update(
    { _id : userID}, 
    {$pull: { topics: { name: name, url : url} }},
     function(err){
       if (err){
         done(err);
         return;
       }
     });
  collection.find({_id : userID}).each(logger);
  closeDb();
}

function closeDb() {
  client.close();
}

var logger = function(error, result){
    if (error)
        throw error;
    if (result != null)
      console.log(result);
}

var logDoc = logger;
var logDocs = logger;


app.get("/feed_api_demo",function(request,response) {
  response.sendfile("static/feed.html");
});

var static_dir = express.static(__dirname + "/static");

app.use(static_dir, function(request, response, next){
  next();
});

/*
app.get("/static/:filename", function(request, response) {
  response.sendfile("static/" + request.params.filename);
});
*/

app.listen("12697");
console.log("Listening at 12697");
