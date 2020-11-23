var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Companies`';
const insertQuery = 'INSERT INTO `Companies` (`company_name`, `budget`,`total_expenses`,`total_revenue`,`hq_location`) VALUES (?,?,?,?,?)'
const mysql = require('../dbcon.js');

function getAllData(res) {
	mysql.query(getAllQuery, (err, rows, fields) => {
		if (err) {
			next(err);
			return;
		}
		else {
			//res.json({ rows: rows });
			let context = {};
			context = JSON.stringify(rows);

			res.render('pages/Companies', {
				results: rows
			});
		}
	});
};

router.post('/AddCompany', function (req, res, next) {
    //adds company to database
    var { cname, cbudget, texpenses, trevenue, hqlocation } = req.body;
    mysql.query(insertQuery, [cname, cbudget, texpenses, trevenue, hqlocation], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/companies');
    });
});

router.get('/companies', function (req, res, next) {

	/*
		Server processing code, e.g. DB calls, goes here
	*/
	mysql.query(getAllQuery, (err, rows, fields) => {
		if (err) {
			next(err);
			return;
		}
		getAllData(res);
	});

});

module.exports = router;
