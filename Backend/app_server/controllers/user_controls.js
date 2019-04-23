var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var mongoose=require('mongoose');
var usersdb= mongoose.model("usersdb");
var user_schema= mongoose.model("usersdb");
var candidate = mongoose.model("candidate1");
var cand1=require('../models/candidate1');
var async= require("async");
var bcrypt = require('bcryptjs');


module.exports.deactivateA = function(req, res) {
     var uname=globalstring;
    //send json response
    usersdb.findOneAndDelete({roll_number:uname},function(err,result){
        if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
        else if(result.length==null)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        else{  
            res.status(403).send({status:403,token:globalstring,data: result, message: "operation successful "});
            
        }
    });

    
    
};
module.exports.searchuserRoll= function(req, res) {
    var uroll=req.params.query;
   //send json response
   usersdb.find({roll_number:uroll},function(err,result){
       if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
       else if(result.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});

       else{  
        res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
       }
   });

   
   
};
module.exports.searchuserUname= function(req, res) {
    var uname=req.params.query;
   //send json response
   usersdb.find({username:uname},function(err,result){
       if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
       else if(result.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
       else{ 
        res.status(400).send({status:400,token:globalstring,data: result, message: "found"}); 
          // console.log('done');
          // res.json(result);
       }
   });

   
   
};
module.exports.addAdmin= function(req, res) {
    var uname=req.body.username;
    var password=req.body.password;
    var roll=req.body.roll_number;
    var Cnic=req.body.CNIC;
    var dob=req.body.dob;
    var address=req.body.address;
    var gender=req.body.gender;
    var batch=req.body.batch;
    var GCnic=req.body.gcnic;
    var phone=req.body.phone_number;
    var type=false;
   
    usersdb.findOne({roll_number:roll},function(err,result){
        if(err){
            res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
        }
        else if (!result) {
            var savedata = new usersdb({
                username:req.body.username,
                password:req.body.password,
                roll_number:req.body.roll_number,
                CNIC:Cnic,
                dob:dob,
                Address:address,
                Gender:gender,
                Batch:batch,
                guardian_cnic:GCnic,
                phone_number:phone,
                type:type
            });
            console.log(req.body.roll_number);
           //ar savedata=new usersdb(req.body);
            
            savedata.save(function(err, result) {
                if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
                else if(result.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                else
                {
                    res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
                }
            });
           
        

        }
        else{  
            console.log('already exist')
            res.status(401).send({status:401,token:globalstring,data: result, message: "already exist"});
        }
    });

   
   
};
module.exports.addNewUser= function(req, res) {
    var uname=req.body.username;
    var password=req.body.password;
    var roll=req.body.roll_number;
    var Cnic=req.body.CNIC;
    var dob=req.body.dob;
    var address=req.body.address;
    var gender=req.body.gender;
    var batch=req.body.batch;
    var GCnic=req.body.gcnic;
    var phone=req.body.phone_number;
    var type=true;
    
if (req.body.username && req.body.roll_number && req.body.password) {
    var usersdb = {
        username:req.body.username,
        password:req.body.password,
        roll_number:req.body.roll_number,
        CNIC:Cnic,
        dob:dob,
        Address:address,
        Gender:gender,
        Batch:batch,
        guardian_cnic:GCnic,
        phone_number:phone,
        type:true
    }

    //use schema.create to insert data into the db
    user_schema.create(usersdb, function (err, user) {
      if (err){
        res.status(405).send({status:405,data: null, message: "internal error occured"});
      } 
      else if(user.length==0)res.status(404).send({status:404,data: null, message: "not found"});
      else { 
        globalstring=req.body.roll_number;
        res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
       // res.redirect('/index.html');

      }
    });
  }
    
    
   
   
};
module.exports.checklogin1= function(req, res) {
    var sess=req.session;
    console.log(req);
    //sess.username=req.body.username;
  if (req.body.roll_number && req.body.password) {
      usersdb.authenticate(req.body.roll_number, req.body.password, function(error, user) {
          if(error) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
       else if (!user) {
            res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
  
          //sendJSONresponse(res, 401, err);
          //res.render('signin.html');
        } else {
            console.log('user found');
            globalstring=req.body.roll_number;
            res.status(400).send({status:400,token:globalstring,data: user, message: "found"});
           // sess.username=req.body.username;
           // sess.username=req.body.username;
           // res.redirect('index.html');
          //sendJSONresponse(res, 200, user);
        }
      });
      
     // res.render('index.html');
    } 
    else {
        res.status(401).send({status:401,data: null, message: "field(s) empty"});

    }
    
    
   
   
};
module.exports.logout = function(req, res,next) {
    if (req.session) {
      console.log("destroying session " + req.session.userId);
      console.log('done');
      // delete session object
      req.session.destroy();
      res.locals.user = undefined;
      //res.redirect("/");
  
    }
};
//abiha
module.exports.UpdatePW = function(req, res) {
    var pass=req.body.password;
    //globalstring="16L-4321";
    var roll=globalstring;
   console.log("pass"+pass+"   global"+globalstring);
   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pass, salt, function(err, hash) {
        pass= hash;
        //newUser.save(callback);
    });
});
                user_schema.updateOne({ roll_number: roll }, { $set: {password: pass}}, function (err, userr) {
                    if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
                    else if(userr.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                    else res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});

                      //  res.send(userr);
                   
                    
                  });
        //}
        //)
    }; 
  module.exports.castVote = function(req, res) {
        async.parallel(
          {
            find_cand: function(callback) {
              cand1.find({
              roll_num: req.body.roll
              
              }).exec(callback);
            },
            find_user: function(callback) {
              usersdb.updateOne({ roll_number: globalstring }, { $set: {votedFor: req.body.roll}}).exec(callback);
            }
          },
          function(err, results) {
            if (err) {
                res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   

            }
            if (results.find_cand == null) {
                res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
            }
            console.log("req"+req.body.roll);

            // Successful, so render.
            console.log('votes:'+results.find_cand);
            
          candidate.updateOne({ roll_num: req.body.roll }, { $set: {votes: results.find_cand[0]["votes"]+1}}, function (err, userr) {
             if (err) console.log("err");
             
             res.status(400).send({status:400,token:globalstring,data: userr, message: "found"});
              })
              
          }
        );
      };
     
module.exports.viewVotes= function(req,res){
	var cand= req.params.candidate; 
	candidate.find({
      roll_num: cand

    }).exec(function(err,candInfo){
      if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
      else if(candInfo.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
      else {
        console.log(candInfo[0]["votes"]);
        //console.log(payment1);
        res.status(400).send({status:400,token:globalstring,data:candInfo[0]["votes"], message: "found"});
      
       // res.render("single-post.html", { data: candInfo[0]["votes"]});

      }

    });	
};
//fatima

module.exports.delete_v = function(req, res) {
    var rollnum=req.params.roll;
    console.log(rollnum);
    usersdb.findOneAndDelete({roll_number:rollnum}, function(err, result){
      if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
      else if(result.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
      else{
        res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
      }      
  });
  };
  module.exports.viewProfile_voter = function(req, res) {
    var roll=globalstring;
    console.log(roll);
 
    usersdb.findOne({roll_number:roll},function(err,voter){
     if (err)
            // return done(err);
            res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
         // check to see if theres already a user with that email
     if (voter) {
           console.log("Current Username : " + voter.username);
           console.log("roll number : " + voter.roll_number);
           console.log("Cnic : " + voter.CNIC);
           res.status(400).send({status:400,token:globalstring,data: voter, message: "found"});
         
     
           //res.render('ViewProfile.html', {
          // voter: voter
        // });
   }
 
 });
 };
 
 module.exports.viewProfile_admin = function(req, res) {
     var name=globalstring;
     console.log(name);
  
     usersdb.findOne({roll_number:name},function(err,admin){
      if (err)
      res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
          // check to see if theres already a user with that email
      if (admin) {
            console.log("Current Username : " + admin.username);
            console.log("roll number : " + admin.Address);
            console.log("Cnic : " + admin.CNIC);
            res.status(400).send({status:400,token:globalstring,data: admin, message: "found"});
            //res.render('ViewProfileAdmin.html', {
           // admin: admin
         // });
    }
  
  });
  };
  module.exports.updateProfileVoter = function(req, res,next) {
    var roll=globalstring;
    console.log(roll+"only");
    var username = req.body.username.trim();
    var address = req.body.address.trim();
    var cnic = req.body.cnic.trim();
    var phone = req.body.phone.trim();
    var guard = req.body.guard.trim();
    var batch = req.body.batch;
    var gender = req.body.gender.trim();
    var dob= req.body.phone.trim();
    usersdb.update({ roll_number: roll }, {
       $set: { username: username ,
       phone_number: phone,
       CNIC: cnic,
       Address: address,
       guardian_cnic:guard,
       Batch: batch,
       Gender:gender,
       DOB: dob
    }}

      , function (err, voter) {

      if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
      else if(voter.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});

      res.status(400).send({status:400,token:globalstring,data: result, message: "found"});

     // res.send(voter);

      });

};
module.exports.checkLogin = function requiresLogin(req, res, next) {
    //
    if (req.session && req.session.roll_number) {
      console.log("session active");
      next();
    } else {
      console.log("no session active");
      var err = new Error("You must be logged in to view this page.");
      err.status = 401;
      
      //res.redirect("/");
    }
  };