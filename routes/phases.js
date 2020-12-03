var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Phases`';
const mysql = require('../dbcon.js');

const getJobsQuery = 'SELECT `job_id`, `job_name`, `company_id`, `location` FROM `Jobs`;';
//const getPhasesQuery = 'SELECT `Phases`.`phase_id`, `Phases`.`phase_name` FROM `Phases`;';
const getNamesQuery = 'SELECT `Phases`.`phase_id`, `Phases`.`phase_name`, `Phases`.`job_id`, `Jobs`.`job_name` FROM `Phases` LEFT OUTER JOIN `Jobs` ON `Phases`.`job_id` = `Jobs`.`job_id`;';
//const deleteQuery = 'DELETE FROM `Phase_crew` WHERE `relation_id` = ?;';
const insertQuery = "INSERT INTO `Phases` (`phase_name`, `job_id`) VALUES(?,?);";

function getAllData(res) {
	let context = {};
	let jobRows;
	let phaseRows;
	let initQueryWorked = false;
	let secondQueryWorked = false;
	let errorEncountered = false;

	mysql.query(getNamesQuery, (err, rows, fields) => {
		if (err) {
			next(err);
			return;
		}
		else {
			//res.json({ rows: rows });
			let context = {};
			context = JSON.stringify(rows);
			initQueryWorked = true;
			phaseRows = rows;

			if (initQueryWorked) {
				mysql.query(getJobsQuery, (err, jobRows, fields) => {
					if (err) {
						next(err);
						return;
					}
					else {
						res.render('pages/Phases', {
							results: phaseRows,
							jidSelections: jobRows
						});

					}
				});
			}
		}
	});
};

router.get('/Phases', function (req, res, next) {

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

router.post('/Phases', function (req, res, next) {
	var pname = req.body["pName"];

	var jid = Number(req.body["jidVal"]);

	if (req.body["jidVal"] == "") {
		jid = null;
		console.log("job id was null");
	}

	console.log("added new phase");
	mysql.query(insertQuery, [pname, jid], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("no errors");
		getAllData(res);
	});
});

module.exports = router;
