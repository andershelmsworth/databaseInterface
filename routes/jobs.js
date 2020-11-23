var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Jobs`';
const getCompaniesQuery = 'SELECT * FROM `Companies`';
const insertQuery = 'INSERT INTO `Jobs` (`job_name`, `company_id`, `location`) VALUES (?,?,?)'
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
			mysql.query(getCompaniesQuery, (err, comprows, fields) => {
				if (err) {
					next(err);
					return;
				}
				else {
					let companies = {};
					companies = JSON.stringify(comprows);
					res.render('pages/Jobs', {
						results: rows,
						compResults: comprows
					});
				}
			});
		}
	});
};

router.post('/AddJob', function (req, res, next) {
	//adds job to database
	var { jname, cname, jlocation } = req.body;
    mysql.query(insertQuery, [jname, cname, jlocation], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/jobs');
    });
});

router.get('/jobs', function (req, res, next) {

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
