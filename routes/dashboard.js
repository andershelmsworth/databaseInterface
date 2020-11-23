var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Job_cost`';
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

			res.render('pages/Dashboard', {
				results: rows
			});
		}
	});
};

router.post('/filterDashboardForm', function (req, res, next) {
	var filterQuery = 'SELECT * FROM `Job_cost` WHERE date_time != 0';
	var { dtime2, eid2, jid2, cid2, pid2, ct2, hours2, rate2 } = req.body;
	if (dtime2 !== '') {
		filterQuery = filterQuery + ' AND date_time = ' + dtime2;
	}
	if (eid2 !== '') {
		filterQuery = filterQuery + ' AND equip_id = ' + eid2;
	}
	if (jid2 !== '') {
		filterQuery = filterQuery + ' AND job_id = ' + jid2;
	}
	if (cid2 !== '') {
		filterQuery = filterQuery + ' AND crew_id = ' + cid2;
	}
	if (pid2 !== '') {
		filterQuery = filterQuery + ' AND phase_id = ' + pid2;
	}
	if (ct2 !== '') {
		filterQuery = filterQuery + ' AND `cost_type` = "' + ct2 + '"';
	}
	if (hours2 !== '') {
		filterQuery = filterQuery + ' AND hours = ' + hours2;
	}
	if (rate2 !== '') {
		filterQuery = filterQuery + ' AND rate = ' + rate2;
	}
	query = mysql.query(filterQuery, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		let context = {};
		context = JSON.stringify(rows);

		res.render('pages/Dashboard', {
			results: rows
		});
	});
	console.log(query)
});

router.post('/resetDashboardForm', function (req, res, next) {
	res.redirect('/dashboard');
});

router.get('/dashboard', function (req, res, next) {

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
