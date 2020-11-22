//requirements
var express = require('express');
var app = express();
var CORS = require('cors');
var router = express.Router();
const mysql = require('../dbcon.js');
var bodyParser = require('body-parser');

//Post processing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: "text/plain" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CORS());

//SQL queries
const insertQuery = "INSERT INTO `Crews` (`crew_name`) VALUES(?);";
const getAllQuery = 'SELECT * FROM `Crews`';

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

			res.render('pages/Crews', {
				results: rows
			});
			console.log("reloaded");
		}
	});
};

router.get('/crews', function (req, res, next) {

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

router.post('/crews', function (req, res, next) {
	var cname = req.body["name"];
	console.log("posted");
	mysql.query(insertQuery, [cname], (err, result) => {
		if (err) {
			next(err);
			return;
		}
		console.log("no errors");
		getAllData(res);
		
	});
});


module.exports = router;
