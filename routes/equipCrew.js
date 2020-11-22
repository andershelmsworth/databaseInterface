var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Equip_crew`';
const mysql = require('../dbcon.js');

const getCrewsQuery = 'SELECT `Crews`.`crew_id`, `Crews`.`crew_name` FROM `Crews`;';
const getEquipmentQuery = 'SELECT `Equipment`.`equip_id`, `Equipment`.`equip_name` FROM `Equipment`;';
const getNamesQuery = 'SELECT `Equip_crew`.`relation_id`, `Equip_crew`.`equip_id`, `Equipment`.`equip_name`, `Equip_crew`.`crew_id`, `Crews`.`crew_name`  FROM `Equip_crew` INNER JOIN `Equipment` ON `Equipment`.`equip_id` = `Equip_crew`.`equip_id` INNER JOIN Crews ON `Equip_crew`.`crew_id` = `Crews`.`crew_id` ORDER BY `Equip_crew`.`relation_id`;';
const deleteQuery = 'DELETE FROM `Equip_crew` WHERE `relation_id` = ?;';
const insertQuery = "INSERT INTO `Equip_crew` (`equip_id`, `crew_id`) VALUES(?,?);";

function getAllData(res) {
	let context = {};
	let pcRows;
	let crewRows;
	let equipRows;
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
							mysql.query(getEquipmentQuery, (err, trows, fields) => {
								if (err) {
									next(err);
									return;
								}
								else {
									res.render('pages/equipCrew', {
										results: pcRows,
										eidSelections: trows,
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

router.get('/equipCrew', function (req, res, next) {

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

router.post('/equipCrew', function (req, res, next) {
	var eid = Number(req.body["eid"]);
	var cid = Number(req.body["cid"]);
	console.log("added new pc relation");
	mysql.query(insertQuery, [eid, cid], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("no errors");
		getAllData(res);
	});
});

router.delete('/equipCrew', function (req, res, next) {
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

