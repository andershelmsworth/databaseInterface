var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	const myUsers = [{}, {}, {}, {}, {}];

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

	myUsers[3].dt = 3;
	myUsers[3].eid = "hello " + 3;
	myUsers[3].jid = "hello" + 3 + 3;
	myUsers[3].cid = null;
	myUsers[3].pid = "hello" + 3 + 3 + 3 + 3;
	myUsers[3].ct = "LS";
	myUsers[3].hr = 3 + 3;
	myUsers[3].rt = 6 * 3;

	myUsers[4].dt = 4;
	myUsers[4].eid = "hello " + 4;
	myUsers[4].jid = "hello" + 4 + 4;
	myUsers[4].cid = "hello" + 4 + 4 + 4;
	myUsers[4].pid = null;
	myUsers[4].ct = "LS";
	myUsers[4].hr = 4 + 4;
	myUsers[4].rt = 6 * 4;

	res.render('pages/dashboard', {
		myUsers: myUsers
	});
});

module.exports = router;