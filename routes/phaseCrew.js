var express = require('express');
var router = express.Router();

router.get('/phaseCrew', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	const myUsers = [{}, {}, {}];

	for (let i = 0; i < 3; i++) {
		myUsers[i].rid = i;
		myUsers[i].pid = "hello " + i;
		myUsers[i].cid = "hello" + i + i;
	}

	res.render('pages/phaseCrew', {
		myUsers: myUsers
	});
});

module.exports = router;