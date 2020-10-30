var express = require('express');
var router = express.Router();
const session = require('express-session');

router.get('/', function(req, res, next) {
    sess = req.session;
// 	// IF ENV.LOGGEDIN == TRUE
// 	// 	res.render('pages/dashboard');
// 	// ELSE
// 	//     res.render('pages/index');		

    res.redirect('/Dashboard');
});

module.exports = router;