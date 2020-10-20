var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Dashboard');
});

module.exports = router;