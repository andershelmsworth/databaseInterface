var express = require('express');
var router = express.Router();

router.get('/jobs', function(req, res, next) {

	const myUsers = [{}, {}, {}];
	for (let i = 0; i < 3; i++) {
		myUsers[i].jid = i;
		myUsers[i].jname = "Job " + i;
		myUsers[i].cname = i;
		myUsers[i].jlocation = "Location " + i;
	}
	res.users = myUsers;
	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Jobs', {
		myUsers: myUsers
	});
});

module.exports = router;