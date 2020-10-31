var express = require('express');
var router = express.Router();

router.get('/companies', function(req, res, next) {

	const myUsers = [{}, {}, {}];
	for (let i = 0; i < 3; i++) {
		myUsers[i].cid = i;
		myUsers[i].cname = "Company " + i;
		myUsers[i].cbudget = "Budget " + i;
		myUsers[i].texpenses = i + 1000;
		myUsers[i].trevenue = i + 10000;
		myUsers[i].hqlocation = "Location " + i;
	}
	res.users = myUsers;

	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Companies', {
		myUsers: myUsers
	});
});

module.exports = router;