var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT `Equip_crew`.`relation_id`, `Equip_crew`.`equip_id`, `Equipment`.`equip_name`, `Equip_crew`.`crew_id`, `Crews`.`crew_name`  FROM `Equip_crew` INNER JOIN `Equipment` ON `Equipment`.`equip_id` = `Equip_crew`.`equip_id` INNER JOIN Crews ON `Equip_crew`.`crew_id` = `Crews`.`crew_id` ORDER BY `Equip_crew`.`relation_id`';
const getEquipmentQuery = 'SELECT * FROM `Equipment`';
const getCrewsQuery = 'SELECT * FROM `Crews`';
const insertQuery = 'INSERT INTO `Equip_crew` (`equip_id`, `crew_id`) VALUES (?,?)'
const deleteQuery = 'DELETE FROM Equip_crew WHERE relation_id = ?'
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
			mysql.query(getEquipmentQuery, (err, equiprows, fields) => {
				if (err) {
					next(err);
					return;
				}
				else {
					let Equipment = {};
					Equipment = JSON.stringify(equiprows);
					mysql.query(getCrewsQuery, (err, crewrows, fields) => {
						if (err) {
							next(err);
							return;
						}
						else {
							let Crews = {};
							Crews = JSON.stringify(crewrows);
							res.render('pages/equipCrew', {
								results: rows,
								equipResults: equiprows,
								crewResults: crewrows
							});
						}
					});
				}
			});
		}
	});
};

router.post('/AddEquipCrew', function (req, res, next) {
    //adds company to database
    var { eid, cid } = req.body;
    mysql.query(insertQuery, [eid, cid], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/equipCrew');
    });
});

router.post('/deleteEquipCrew', function (req, res, next) {
    //adds equipCrew to database
	var { rid } = req.body;
    mysql.query(deleteQuery, [rid], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/equipCrew');
    });
});

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

module.exports = router;
