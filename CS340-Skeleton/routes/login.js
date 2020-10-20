var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var connection = require('../dbcon.js');

router.get('/login', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/

	var loginUser = async function(req,res){
		var username = req.body.uname;
		const password = req.body.pword;
		
		var query = connection.query('SELECT * FROM users WHERE username = ?',[username], 
			async function (error, results, fields) {
				if (error) {
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
				} else {
				if(results.length > 0){
					const comparision = await bcrypt.compare(password, results[0].password)
					if (comparision) {
						res.redirect("/Dashboard");
						sess = req.session;
						sess.email = req.body.email;
					}
					else{
					res.send({
						"code":204,
						"success":"Email and password does not match"
					})
					}
				}
				else{
					res.send({
					"code":206,
					"success":"Email does not exits"
						});
				}
				}
			});
		console.log(query.sql);
	  }

	router.post('/loginUser', loginUser);
	express().use('/api', router);
    res.render('pages/login');
});

module.exports = router;