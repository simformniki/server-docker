"use strict";

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://172.16.1.154:27017/";
var db;
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

//mongo connection
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  db = client.db("testdb");
  console.log("connected to mongodb");
  db.collection("test").save({ date: new Date() }, function(err, count) {
    if (err) throw err;
    console.log("Data: " + count);
  });
});

// App
const app = express();

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

//get data from test collection
app.get("/data", (req, res) => {
  db.collection("test")
    .find()
    .toArray(function(err, result) {
      if (err) res.send("Error!");
      else res.send(result);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
