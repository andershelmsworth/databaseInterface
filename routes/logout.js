var express = require('express');
var router = express.Router();
const session = require('express-session');

router.get('/logout', function(req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
        req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;