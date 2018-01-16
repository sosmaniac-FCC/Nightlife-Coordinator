require('dotenv').config();

var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./public/routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
	extended: false 
}));

mongoose.connect(process.env.MONGO_URI, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'src')));

app.use(session({
	secret: 'secretNight',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/html/index.html'));	
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});
