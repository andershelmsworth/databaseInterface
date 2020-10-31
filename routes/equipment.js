var express = require('express');
var router = express.Router();

router.get('/equipment', function(req, res, next) {

	const myUsers = [{}, {}, {}];
	for (let i = 0; i < 3; i++) {
		myUsers[i].eid = i;
		myUsers[i].ename = "Equip " + i;
		myUsers[i].etype = "Equip Type " + i;
		myUsers[i].eweight = i + 100;
		myUsers[i].ftype = "Fuel Type " + i;
		myUsers[i].pdate = i;
	}
	res.users = myUsers;	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Equipment', {
		myUsers: myUsers
	});
});

module.exports = router;