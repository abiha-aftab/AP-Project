var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var mongoose=require('mongoose');
var candidate = mongoose.model("candidate1");
var usersdb= mongoose.model("usersdb");

var path = require("path");
function cleanInt(x) {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}


module.exports.getCandidateList = function(req, res) {

    //send json response
    candidate.find({},'username batch roll_num',function(err,result){
        if (err) throw err;
        else if(result.length==0){res.status(404).send({status:404,data: null, message: "not found"});}
        else{ 
            res.status(400).send({status:400,data: result, message: "found"}); 
           // res.json(result);
            //res.render("index");
        }
    });

    
    
};
module.exports.searchCandidateList = function(req, res) {
    var query=req.params.query;
    if(query==null){
        res.status(401).send({status:401,data: null, message: "field(s) empty"});
    }

    //send json response
    candidate.find({username: query}).exec(function(err,result){
        if (err) res.status(405).send({status:405,data: null, message: "Internal Error occured"});
        else if(result.length==0)res.status(404).send({status:404,data: null, message: "not found"});
        else{ 
            res.status(400).send({status:400,data: result, message: "found"});

           // res.json(result);
        }
    });

    
    
};
module.exports.filter_by_batch = function(req, res) {
    //check user's batch 
    var roll=globalstring;
    var batch1;
    var b;
    usersdb.find({roll_number:roll},{Batch:1, _id:0},function(err,result){
        if (err) throw err;
        else if(result==null){
            console.log('no user found ');
        }
        else{
            console.log('results '+result);
            batch1=JSON.stringify(result).slice(10,12);
            console.log('batch1 '+typeof(batch1));
             b=Number(batch1);
             candidate.find({batch:b},function(err,result){
                if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
                else if(result.length==0){ 
                    res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                }

                else{  
                    res.status(400).send({status:400,token:globalstring,data: result, message: "found"});

                }
        
        
            });
        }
    });
   
    //console.log(typeof(b));
    

    

    
    
};
//abiha
module.exports.creating = function(req, res) {
    //console.log("--req.body--"+ req.body);
    if (req.body.username && req.body.batch && req.body.roll_num && req.body.school && req.body.College) {
        var canddb ={
          Skills : req.body.Skills,
          Experience: req.body.Experience,
          username: req.body.username,
          password: req.body.password,
          batch: req.body.batch,
          roll_num:req.body.roll_num,
          school:req.body.school,
          College:req.body.College,
          votes:0
        }
    
        //use schema.create to insert data into the db
        candidate.create(canddb, function (err, candidate) {
          if (err){
            res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});        
          } 
          else if(canddb.length==null){
            res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});

          }
          else { 
            globalstring=req.body.roll_num;
           // res.json(candidate);
            //res.redirect('/');
            res.status(400).send({status:400,token:globalstring,data: candidate, message: "found"});
          }
        });
      }
    };
    module.exports.viewCandidate = function(req, res) {
     
        var user=req.params.roll_num;
        if(req.params==null){
            res.status(401).send({status:401,token:globalstring,data: null, message: "field(s) empty"});
        }
        candidate.find({
          roll_num: user
    
        }).exec(function(err,candInfo){
            if(err)res.status(405).send({status:405,token:globalstring, data: null, message: "internal error occured"});

          else if (candInfo.length==0) {
              console.log('here')
            res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
          }
          else {
            //console.log(payment);
            //console.log(payment1);
            res.status(400).send({status:400,token:globalstring,data: candInfo, message: "found"});
          //res.json(candInfo);
           // res.render("single-post.html", { data: candInfo });
    
          }
    
        });			
      };
      module.exports.Results= function(req,res){
	var result;
        candidate.aggregate(
            [
                {
                    $group:
                    {
                        _id:"$batch",
                        
                        maxVotes:{$max: "$votes"}	
                    }
                }
            ]
            ).exec(function(err,maxV){
                console.log(maxV);
                if(maxV.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                    candidate.find({
                        
                        $and:[
                            { votes: maxV[0]["maxVotes"]},
                            {batch:maxV[0]["_id"]}
                        
                        ]},function(err,rel){
                        if(err)throw err;
                        else{
                            res.status(400).send({status:400,token:globalstring,data: rel, message: "found"}); 
                        //console.log(rel[0]['roll_num']);
                        }
                    });
                    candidate.find( 
                        {
                        
                            $and:[
                                { votes: maxV[1]["maxVotes"]},
                                {batch:maxV[1]["_id"]}
                            
                            ]},function(err,rel){
                        if(err)throw err;
                        else{
                          //  console.log(maxV[1]["maxVotes"]);
                          res.status(400).send({status:400,token:globalstring,data: rel, message: "found"}); 
                        }
                    })
                    candidate.find( 
                        {
                        
                            $and:[
                                { votes: maxV[2]["maxVotes"]},
                                {batch:maxV[2]["_id"]}
                            
                            ]},function(err,rel){
                        if(err)throw err;
                        else{
                          //  console.log(maxV[1]["maxVotes"]);
                          res.status(400).send({status:400,token:globalstring,data: rel, message: "found"}); 
                        }
                    })

                
              
            });
           
           
            
            
        };
    module.exports.delete_c = function(req, res) {
        var rollnum=req.params.roll;
      console.log(rollnum);
      candidate.findOneAndDelete({roll_num:rollnum}, function(err, result){
        if (err) res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
        //throw err;
          //  res.json(err);
          else if(result.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        else{
           // console.log("deleted successfully!");
            //console.log(rollnum);
           // res.json({msg:"deleted successfully!"});
           res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
        }      
    });
    };
      