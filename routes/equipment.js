var express = require('express');
var router = express.Router();
const getAllQuery = 'SELECT * FROM `Equipment`';
const insertQuery = 'INSERT INTO `Equipment` (`equip_name`, `equip_type`, `equip_weight`, `equip_fuel_type`, `equip_purchase_date`) VALUES  (?,?,?,?,?)'
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

			res.render('pages/Equipment', {
				results: rows
			});
		}
	});
};

router.post('/AddEquipment', function (req, res, next) {
    //adds equipment to database
    var { ename, etype, eweight, ftype, edate } = req.body;
    mysql.query(insertQuery, [ename, etype, eweight, ftype, edate], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
		res.redirect('/equipment');
    });
});

router.get('/equipment', function (req, res, next) {

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
