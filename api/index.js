// Import Dependencies
const express = require("express");
const app = express();

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

// Home route
app.get("/api", async (req, res) => {
  var fse = require('fs-extra');
  var path = require('path');
  var os = require('os');

  var output = "req.host = " + req.host + "<br/>";
  output += "req.hostname = " + req.hostname + "<br/>";
  output += "os.hostname = " + os.hostname + "<br/>";
  var contents = await fse.readFile(path.join(__dirname, 'index.txt'), 'utf8');
  var hello = require('./hello.js');

  output += "__dirname = " + __dirname + "<br/>";
  output += "hello.js = " + hello + "<br/>";
  output += "index.txt = " + contents + "<br/>";

  res.send(output);
  //res.send("Welcome to a basic express App.");
});

// Mock APIs
app.get("/api/users", async (req, res) => {
  let result = await callDB('SELECT id,name,location FROM users');
  return res.json(result.rows);
  /*
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" },
    { name: "Aaron", location: "Jupiter" },
    { name: "Jbo", location: "Umatilla" },
    { name: "Trenton", location: "WPB" }
  ]);
  */
});

app.post("/api/user", (req, res) => {
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});
async function callDB(query) {
  const pg = require('pg');

  let conString = "postgres://nzivzfbg:2oocpudzBzBBsyiHlmBNhFND8Ye92fJ3@isilo.db.elephantsql.com:5432/nzivzfbg" //Can be found in the Details page
  let client = new pg.Client(conString);
  try {
    await client.connect();
  } catch(ex) {
    throw('could not connect to postgres: ', ex);
  }
  let result;
  try {
    result = await client.query(query);
  } catch(ex) {
    throw('error running query: ', ex);
  }
  client.end();
  return result;
}

