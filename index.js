//so we can require local stuff like require('@root/moduleName')
require('module-alias/register');
// Import Dependencies
const express = require("express");
const app = express();

require('dotenv').config();

app.set("root",__dirname);
var appRoot = require('app-root-path');
app.set("appRoot", appRoot);

global.rootRequire = function (name) {
    if (!process.env.NODE_PATH) {
        return require(appRoot + '/' + name);
    } else {
        return require(name);
    }
};

const port = 5000;


// Body parser
//app.use(express.urlencoded({ extended: false }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

app.use(express.static('public'));

// Home route
app.get("/api", async (req, res) => {
  var fse = require('fs-extra');
  var path = require('path');
  var os = require('os');

//console.log(process.env);

  var output = "find secret? = " + Object.keys(process.env).filter(x=>/NOW_PGCREDENTIALS/.test(x)) + "<br/>";
  output += "process.env.NOW_PGCREDENTIALS = " + process.env.NOW_PGCREDENTIALS + "<br/>";
  output += "process.env.NOW_GITHUB_COMMIT_REF = " + process.env.NOW_GITHUB_COMMIT_REF + "<br/>";
  output += "node version = process.version = " + process.version + "<br/>";

  output += "req.hostname = " + req.hostname + "<br/>";
  output += "os.hostname = " + os.hostname + "<br/>";
  var contents = await fse.readFile(path.join(__dirname, 'api/index.txt'), 'utf8');
  var hello = require('@root/api/hello.js');

  output += "__dirname = " + __dirname + "<br/>";
  output += "hello.js = " + hello + "<br/>";
  output += "index.txt = " + contents + "<br/>";


  res.send(output);
  //res.send("Welcome to a basic express App.");
});

require('@root/api/routes/users.js')(app);

