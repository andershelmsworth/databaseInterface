var express = require('express');
var router = express.Router();

router.get('/jobs', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Jobs');
});

module.exports = router;