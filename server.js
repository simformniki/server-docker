"use strict";

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
var db;
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

//mongo connection
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  db = client.db("thepolyglotdeveloper");
  console.log("connected to mongodb");
  db.collection("test").save({ date: new Date() }, function(err, count) {
    if (err) throw err;
    console.log("Total Rows: " + count);
  });
});

// App
const app = express();
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
