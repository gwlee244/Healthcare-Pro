// Loading environmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}


const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 5000;
const api = require("./routes/api");
// Routes
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(passport.session()); // will call the deserializeUser

// Use routers
app.use("/api/user", api);
app.use("/api/patients", patients);
app.use("/api/doctors", doctors);

// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	// console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/'))
	});
}

// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
