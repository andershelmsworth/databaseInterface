var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Job_cost`';
const mysql = require('../dbcon.js');

const getEquipQuery = 'SELECT `equip_id`, `equip_name`, `equip_type`, `equip_weight`, `equip_fuel_type`, `equip_purchase_date` FROM `Equipment`;';
const getJobsQuery = 'SELECT `job_id`, `job_name`, `company_id`, `location` FROM `Jobs`;';
const getCrewsQuery = 'SELECT `Crews`.`crew_id`, `Crews`.`crew_name` FROM `Crews`;';
const getPhasesQuery = 'SELECT `Phases`.`phase_id`, `Phases`.`phase_name` FROM `Phases`;';
const getJCQuery = 'SELECT `date_time`, `equip_id`, `job_id`, `crew_id`, `phase_id`, `cost_type`, `hours`, `rate` FROM `Job_cost`;';
const deleteQuery = 'DELETE FROM `Phase_crew` WHERE `relation_id` = ?;';
const insertQuery = "INSERT INTO `Phase_crew` (`phase_id`, `crew_id`) VALUES(?,?);";

function getAllData(res) {
	let context = {};
	let eRows;
	let jRows;
	let cRows;
	let pRows;
	let initQueryWorked = false;
	let secondQueryWorked = false;
	let thirdQueryWorked = false;
	let fourthQueryWorked = false;
	let errorEncountered = false;

	mysql.query(getJCQuery, (err, rows, fields) => {
		if (err) {
			next(err);
			return;
		}
		else {
			//res.json({ rows: rows });
			let context = {};
			context = JSON.stringify(rows);
			initQueryWorked = true;
			jc = rows;

			if (initQueryWorked) {
				mysql.query(getEquipQuery, (err, erows, fields) => {
					if (err) {
						next(err);
						return;
					}
					else {
						secondQueryWorked = true;
						eRows = erows;

						if (secondQueryWorked) {
							mysql.query(getJobsQuery, (err, jrows, fields) => {
								if (err) {
									next(err);
									return;
								}
								else {
									thirdQueryWorked = true;
									jRows = jrows;

									if (thirdQueryWorked) {
										mysql.query(getCrewsQuery, (err, crows, fields) => {
											if (err) {
												next(err);
												return;
											}
											else {
												fourthQueryWorked = true;
												cRows = crows;

												if (fourthQueryWorked) {
													mysql.query(getPhasesQuery, (err, prows, fields) => {
														if (err) {
															next(err);
															return;
														}
														else {
															pRows = prows;

															res.render('pages/dashboard', {
																results: jc,
																eidSelections: eRows,
																jidSelections: jRows,
																cidSelections: cRows,
																pidSelections: pRows,
															});
														}
													});
												}
											}
										});
									}
								}
							});
						}
					}
				});
			}
		}
	});
}

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

//Not working yet
router.post('/dashboard', function (req, res, next) {
	var pid = Number(req.body["pid"]);
	var cid = Number(req.body["cid"]);
	console.log("added new pc relation");
	mysql.query(insertQuery, [pid, cid], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("no errors");
		getAllData(res);
	});
});

//Not working yet
router.delete('/dashboard', function (req, res, next) {
	var val = req.body["val"];
	console.log("deleting");
	mysql.query(deleteQuery, [val], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("no errors on delete");
		getAllData(res);
	});
});

module.exports = router;

