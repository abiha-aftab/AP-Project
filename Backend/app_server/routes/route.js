const express = require("express");
const router = express.Router();



var ctrlCandidates = require("../controllers/cand_list");
var ctrlusers = require("../controllers/user_controls");




router.get("/voter/homepage",function(req,res,next){
	console.log("session"+req.session);
	if (req.session && req.session.roll_number) {
		
		console.log("session active");
		next();
	  } else {
		console.log("no session active");
		var err = new Error("You must be logged in to view this page.");
		err.status = 401;
	  }
	  
		
});


router.get("/voter/homepage",ctrlCandidates.getCandidateList);

router.get("/voter/search_Candidate/:query", ctrlCandidates.searchCandidateList);
router.delete("/voter/deactivate_account", ctrlusers.deactivateA);
router.get("/voter/view_candidate_list", ctrlCandidates.getCandidateList);
router.delete("/voter/deactivate_account", ctrlusers.deactivateA);

router.get("/admin/searchvoterUname/:query", ctrlusers.searchuserUname);
router.get("/admin/searchvoterRoll/:query", ctrlusers.searchuserRoll);

router.get("/admin/homepage", ctrlCandidates.getCandidateList);
router.get("/admin/view_candidate_list", ctrlCandidates.getCandidateList);
router.post("/admin/add_admin", ctrlusers.addAdmin);
router.get("/admin/view_candidate_list/filter", ctrlCandidates.filter_by_batch);

router.post("/signup",ctrlusers.addNewUser);
router.post("/login",ctrlusers.checklogin1);
router.get("/signout",ctrlusers.logout);

//abiha routes
router.patch("/admin/changePassword",ctrlusers.UpdatePW);
router.patch("/voter/changePassword",ctrlusers.UpdatePW);
router.patch("/voter/castVote",ctrlusers.castVote);
router.get("/admin/viewVotes/:candidate",ctrlusers.viewVotes);

router.get("/admin/viewCandidate/:roll_num", ctrlCandidates.viewCandidate);
router.get("/voter/viewCandidate/:roll_num", ctrlCandidates.viewCandidate);

router.post("/admin/addCandidate/", ctrlCandidates.creating);
router.get("/voter/results", ctrlCandidates.Results);
router.get("/admin/results", ctrlCandidates.Results);


//fatima routes




router.delete("/admin/deletevoter/:roll", ctrlusers.delete_v);
router.delete("/admin/deletecandidate/:roll", ctrlCandidates.delete_c);

router.get("/voter/ViewProfileVoter", ctrlusers.viewProfile_voter);
router.get("/admin/ViewProfileAdmin", ctrlusers.viewProfile_admin);



router.put("/voter/UpdateProfile", ctrlusers.updateProfileVoter);

router.put("/admin/UpdateProfile", ctrlusers.updateProfileVoter);






//router.post("/pop.html", ctrlLocations1.savePop);
//const movie=require('../models/showtimedb');;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//passport

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

















        

module.exports = router;