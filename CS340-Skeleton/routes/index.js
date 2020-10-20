var express = require('express');
var router = express.Router();
const session = require('express-session');

router.get('/', function(req, res, next) {
    sess = req.session;
    if (sess.email) {
        return res.redirect('/Dashboard');
    }
// 	// IF ENV.LOGGEDIN == TRUE
// 	// 	res.render('pages/dashboard');
// 	// ELSE
// 	//     res.render('pages/index');		

    res.redirect('/login');
});

module.exports = router;