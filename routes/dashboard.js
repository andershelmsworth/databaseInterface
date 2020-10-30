var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	const myUsers = [{}, {}, {}];

	for (let i = 0; i < 3; i++) {
		myUsers[i].dt = i;
		myUsers[i].eid = "hello " + i;
		myUsers[i].jid = "hello" + i + i;
		myUsers[i].cid = "hello" + i + i + i;
		myUsers[i].pid = "hello" + i + i + i + i;
		myUsers[i].ct = "LS";
		myUsers[i].hr = i + i;
		myUsers[i].rt = 6 * i;
	}

	res.render('pages/dashboard', {
		myUsers: myUsers
	});
});

module.exports = router;