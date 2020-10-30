var express = require('express');
var router = express.Router();

router.get('/crews', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	const myUsers = [{}, {}, {}];

	for (let i = 0; i < 3; i++) {
		myUsers[i].cid = i;
		myUsers[i].cname = "hello " + i;
	}

	res.render('pages/Crews', {
		myUsers: myUsers
	});
});

module.exports = router;