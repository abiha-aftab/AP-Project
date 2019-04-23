const mongoose = require('mongoose');

var candidate=mongoose.Schema({
   

    username:  {    
        type : String
        //required : true
    },
    batch : {
        type : Number
        //required : true
    },
    roll_num : {
        type : String,
        unique : true
       // required : true
    },
    votes : {
        type : Number
       // required : true
    },
    school : {
        type : String
       // required : true
    },
    College : {
        type : String
       // required : true
    },
   Experience:{
    type : String
   },
	password: {
        type : String
	},
   Skills: [String]
   
});


var candidate1 = mongoose.model("candidate1", candidate);
module.exports = candidate1;