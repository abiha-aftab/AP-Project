var express = require("express");
var mongoose = require("mongoose");
var db1 = require("./app_server/models/db");
var db = db1.connection;
var bodyparser = require('body-parser');
var http = require("http");
var expressValidator=require('express-validator');
var session =require('express-session');
//var db = model.connection;
//var bodyparser = require('body-parser');
//var cors = require("cors");
var MongoStore = require("connect-mongo")(session);
var path = require("path");
//var session = require('express-session');
var app = express();
//const ejsLint = require("ejs-lint");
//define route
app.use(bodyparser.urlencoded({ extended: false }));
//app.use(require('connect').bodyParser());

app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/vnd.api+json' }))





app.use(expressValidator());
app.set("views", path.join(__dirname, "app_server", "views"));
//adding static files
app.use(express.static(path.join(__dirname, "public")));


app.engine('html', require('ejs').__express);
app.set('view engine','html');
app.set("views", path.join(__dirname, "app_server", "views"));
//app.set("view engine", "html");

//app.engine("html", require("ejs").renderFile);








//routes
const route = require("./app_server/routes/route");
app.use("/", route);
global.globalstring="";



//sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 36000),
    store: new MongoStore({
      mongooseConnection: db,
      collection: 'sessions',
      
      url:'mongodb://localhost:27017/data'
    })
  })
);

/*
app.get('/signout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

});
*/

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}