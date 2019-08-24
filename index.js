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
app.get("/", async (req, res) => {
  var fse = require('fs-extra');
  //var contents = await fse.readFile("index.html", 'utf8');
  //res.send(contents);
  var hello = require('./hello.js');
  res.send(hello);
  //res.send("Welcome to a basic express App.");
});

// Mock APIs
app.get("/users", async (req, res) => {
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

app.post("/user", (req, res) => {
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

async function callDB2(query) {
  var pg = require('pg');
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://nzivzfbg:2oocpudzBzBBsyiHlmBNhFND8Ye92fJ3@isilo.db.elephantsql.com:5432/nzivzfbg" //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(query, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);
      // >> output: 2018-08-23T14:02:57.117Z
      client.end();
    });
  });

}