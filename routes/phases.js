var express = require('express');
var router = express.Router();

router.get('/phases', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	const myUsers = [{}, {}, {}];
	for (let i = 0; i < 3; i++) {
		myUsers[i].pid = i;
		myUsers[i].pname = "hello " + i;
		myUsers[i].jid = i + i;
	}
	res.users = myUsers;
	res.render('pages/Phases', {
		myUsers: myUsers
	});
});

module.exports = router;