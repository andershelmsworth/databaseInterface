var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Phase_crew`';
const mysql = require('../dbcon.js');

const getCrewsQuery = 'SELECT `Crews`.`crew_id`, `Crews`.`crew_name` FROM `Crews`;';
const getPhasesQuery = 'SELECT `Phases`.`phase_id`, `Phases`.`phase_name` FROM `Phases`;';

function getAllData(res) {
	let context = {};
	let pcRows;
	let crewRows;
	let phaseRows;
	let initQueryWorked = false;
	let secondQueryWorked = false;
	let errorEncountered = false;

	mysql.query(getAllQuery, (err, rows, fields) => {
		if (err) {
			next(err);
			return;
		}
		else {
			//res.json({ rows: rows });
			let context = {};
			context = JSON.stringify(rows);
			initQueryWorked = true;
			pcRows = rows;

			if (initQueryWorked) {
				mysql.query(getCrewsQuery, (err, srows, fields) => {
					if (err) {
						next(err);
						return;
					}
					else {
						secondQueryWorked = true;
						crewRows = srows;

						if (secondQueryWorked) {
							mysql.query(getPhasesQuery, (err, trows, fields) => {
								if (err) {
									next(err);
									return;
								}
								else {
									res.render('pages/phaseCrew', {
										results: pcRows,
										pidSelections: trows,
										cidSelections: crewRows
									});

								}
							});
						}
					}
				});
			}
		}
	});

	
};

router.get('/phaseCrew', function (req, res, next) {

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
