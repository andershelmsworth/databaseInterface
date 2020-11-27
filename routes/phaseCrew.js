var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Phase_crew`';
const mysql = require('../dbcon.js');

const getCrewsQuery = 'SELECT `Crews`.`crew_id`, `Crews`.`crew_name` FROM `Crews`;';
const getPhasesQuery = 'SELECT `Phases`.`phase_id`, `Phases`.`phase_name` FROM `Phases`;';
const getNamesQuery = 'SELECT `Phase_crew`.`relation_id`, `Phase_crew`.`phase_id`, `Phases`.`phase_name`, `Phase_crew`.`crew_id`, `Crews`.`crew_name`  FROM `Phase_crew` INNER JOIN `Phases` ON `Phases`.`phase_id` = `Phase_crew`.`phase_id` INNER JOIN Crews ON `Phase_crew`.`crew_id` = `Crews`.`crew_id` ORDER BY `Phase_crew`.`relation_id`;';
const deleteQuery = 'DELETE FROM `Phase_crew` WHERE `relation_id` = ?;';
const insertQuery = "INSERT INTO `Phase_crew` (`phase_id`, `crew_id`) VALUES(?,?);";

var CORS = require('cors');
var app = express();

var corsOptions = {
	origin: "localhost:8080",
	optionsSuccessStatus: 200,
	allowedHeaders: "Content-Type,Authorization"// some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(CORS(corsOptions));
app.options('/deleteJC', CORS(corsOptions));

function getAllData(res) {
	let context = {};
	let pcRows;
	let crewRows;
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

router.post('/phaseCrew', function (req, res, next) {
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

router.delete('/phaseCrew', function (req, res, next) {
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

