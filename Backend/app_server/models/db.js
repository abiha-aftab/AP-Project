var mongoose = require("mongoose");
var dbURI = "mongodb://localhost:27017/data";

if (process.env.NODE_ENV === "production") {
  //just to test I have placed this url
  dbURI = "mongodb://shamsa:shamsa123@ds263571.mlab.com:63571/loc8r";
}
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
//on connection
mongoose.connection.on("connected", () => {
  console.log("connected to db mongodb");
});

//on error
mongoose.connection.on("error", err => {
  if (err) {
    console.log("error in db connection" + err);
  }
});

//require("./showtimedb");
require("./candidate1");
require('./usersdb');