var express = require('express');
var router = express.Router();

router.get('/companies', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Companies');
});

module.exports = router;