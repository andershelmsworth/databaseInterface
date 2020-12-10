//This file connects to the database and exports the pool for use by Express
//Require mysql
let mysql = require('mysql');

//Create the pool
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'betbir4lkcia6tbe',
    password: 'mh7mag9ucn600q6v',
    database: 'kw0g8gn21r9clfie',
	port: 3306,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000
    });

//Export the pool
  module.exports = pool;