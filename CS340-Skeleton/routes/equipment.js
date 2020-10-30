var express = require('express');
var router = express.Router();

router.get('/equipment', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/

    res.render('pages/Equipment');
});

module.exports = router;