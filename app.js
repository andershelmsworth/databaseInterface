/******************
 * Load required packages, mostly boilerplate
 ******************/

/* Express for route handling */
var express = require('express');
var app = express();
const session = require('express-session');
//const redis = require('redis');
//const redisStore = require('connect-redis')(session);
//const client  = redis.createClient();
/* Load EJS view engine */
app.set('view engine', 'ejs');

/* load database info, instantiate connection*/
// var mysql = require('./dbcon.js');
// app.set('mysql', mysql);

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    //store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

/* body-parser used for parsing post requests as JSON */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

/* This allows accessing resources using '/resource' instead of '/public/resource' (CSS, Images, etc...) */
app.use(express.static(__dirname + '/public'));
app.use('/public',  express.static(__dirname + '/public'));

/******************
 * Route handling
 ******************/

/* Load in the code which processes the routing  */
var route_index = require("./routes/index.js");
var route_login = require("./routes/login.js");
var route_createAccount = require("./routes/createAccount.js");
var route_dashboard = require("./routes/dashboard.js");
var route_logout = require("./routes/logout.js");

/* tell our app (express) to use the above loaded functions */
app.use(route_index);
app.use(route_login);
app.use(route_createAccount);
app.use(route_dashboard);
app.use(route_logout);



/******************
 * Error pages
 ******************/

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



/******************
 * Launch communication
 ******************/

const port = 8080;
app.listen(port);
console.log('Server is running at http://localhost:8080/.\nCMD+C to quit.');

module.exports = app;