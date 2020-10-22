var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var connection = require('../dbcon.js');

router.get('/CreateAccount', function(req, res, next) {
	/*
		Server processing code, e.g. DB calls, goes here
	*/

	var register = async function(req,res){
		const password = req.body.pword;
		const encryptedPassword = await bcrypt.hash(password, 10);
		var users = {
		   "username": req.body.uname,
		   "email": req.body.email,
		   "password": encryptedPassword ,
		 }
		
		var query = connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
		  if (error) {
			res.send({
			  "code":400,
			  "failed":"error ocurred"
			})
		  } else {
			res.redirect("/Login");
			}
		});
		console.log(query.sql);
	  }

	router.post('/register', register);
	express().use('/api', router);
    res.render('pages/CreateAccount');
});

module.exports = router;
