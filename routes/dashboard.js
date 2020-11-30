
var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Job_cost`';
const mysql = require('../dbcon.js');

const getEquipQuery = 'SELECT `equip_id`, `equip_name`, `equip_type`, `equip_weight`, `equip_fuel_type`, `equip_purchase_date` FROM `Equipment`';
const getJobsQuery = 'SELECT `job_id`, `job_name` FROM `Jobs`';
const getCrewsQuery = 'SELECT `crew_id`, `crew_name` FROM `Crews`;';
const getPhasesQuery = 'SELECT `phase_id`, `phase_name` FROM `Phases`;';
const getJCQuery = 'SELECT `job_cost_id`,  CAST(CONVERT(`date_time`, DATE) AS VARCHAR(10)) AS `caldate`, CONVERT(`date_time`, time) AS `time`, `equip_id`, `job_id`, `crew_id`, `phase_id`, `cost_type`, `hours`, `rate` FROM `Job_cost`;';
const deleteQuery = 'DELETE FROM `Job_cost` WHERE `job_cost_id` = ?;';
const insertQuery = "INSERT INTO `Phase_crew` (`phase_id`, `crew_id`) VALUES(?,?);";
const insertJobCostQuery = 'INSERT INTO `Job_cost` (`date_time`, `equip_id`, `job_id`, crew_id, phase_id, cost_type, hours, rate) VALUES (?,?,?,?,?,?,?,?)'
const updateQuery = 'UPDATE `Job_cost` SET `date_time` = ?, `equip_id` = ?, `job_id` = ?, `crew_id` = ?, `phase_id` = ?, `cost_type` = ?, `hours` = ?, `rate` = ? WHERE `job_cost_id` = ?;';

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
									return;
								}
								else {
									thirdQueryWorked = true;
									jRows = jrows;

									if (thirdQueryWorked) {
										mysql.query(getCrewsQuery, (err, crows, fields) => {
											if (err) {
												console.log(err)
												return;
											}
											else {
												fourthQueryWorked = true;
												cRows = crows;
												console.log(cRows);

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
		filterQuery = filterQuery + ' AND date_time >= ' + '"' + dtime2[0] + dtime2[1] + dtime2[2] + dtime2[3] + '-' + dtime2[5] + dtime2[6] + '-' + dtime2[8] + dtime2[9] + ' ' + dtime2[11] + dtime2[12] + ':' + dtime2[14] + dtime2[15] + ':00' + '"';
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
	query = mysql.query(filterQuery, (err, frows, fields) => {
        if (err) {
            next(err);
            return;
        }
		let context = {};
		context = JSON.stringify(frows);
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
															results: frows,
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
		});
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

router.post('/deleteJC', function (req, res, next) {
	var { jcid } = req.body;
	console.log("deleting jcid:", jcid);
	mysql.query(deleteQuery, [jcid], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("nope errors on delete");
		getAllData(res);
	});
});

router.post('/jcUpdate', function (req, res, next) {
	var { time, eid, jid, cid, pid, ct, hours, rt, jcid } = req.body;
	console.log("updating jcid:", jcid);

	if (eid == 'NULL') {
		eid = null;
	}
	if (jid == 'NULL') {
		jid = null;
	}
	if (cid == 'NULL') {
		cid = null;
	}
	if (pid == 'NULL') {
		pid = null;
	}

	mysql.query(updateQuery, [time, eid, jid, cid, pid, ct, hours, rt, jcid], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("nope errors on update");
		getAllData(res);
	});
});

router.post('/AddJobCost', function (req, res, next) {
	//adds jobCost to database
	var { dtime, eid, jid, cid, pid, ct, hours, rate } = req.body;
    mysql.query(insertJobCostQuery, [dtime, eid, jid, cid, pid, ct, hours, rate], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/dashboard');
    });
});

module.exports = router;
