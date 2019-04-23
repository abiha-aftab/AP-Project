const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


        
//define schema herey
const user_schema=mongoose.Schema({
    
    username : {
        type : String,
        //required : true

    },
    password : {
        type : String,
       // required : true

    },
    roll_number: {
        
        type : String,
       unique: true
        //required : true

    },
    CNIC : {
        type : String,
      //  required : true

    },
    dob : {
      type : Date,
       // required : true

    },
    Address : {
      type : String,
//required : true

    },
    Gender: {
      type: String,
     // required: true
    },
    Batch : {
      type: Number,
     // required: true
    },
    guardian_cnic: {
      type: String,
     // required: true

    },
    votedFor:{
      type: String,
       // required: true
    },
    phone_number:{
      type: String,
     // required: true
    },
    type :{
      type: Boolean,
     // required: true
    }

    
});

//authenticate input against database
user_schema.statics.authenticate = function(roll_number, password, callback) {
    usersdb.findOne({ roll_number: roll_number }).exec(function(err, user) {
      if (err) { 
        Console.log("error in authenticate");  
        return callback(err); 
      } else if (!user) { 
        var err = new Error("User not found.");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err, result) { 
        if (result === true) {  
          return callback(null, user);
        } else {  
          return callback();  
        } 
      });  
    });  
  };
  
  //hashing a password before saving it to the database 
  user_schema.pre("save", function(next) {
    var user = this; 
    bcrypt.hash(user.password, 10, function(err, hash) { 
      if (err) {
        return next(err);
      }
      user.password = hash; 
      next();
    }); 
  });  
  
var usersdb = mongoose.model("usersdb", user_schema);
module.exports = usersdb;

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
module.exports.updateuser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

//var usersdb = module.exports = mongoose.model('usersdb',user_schema); 