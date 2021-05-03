var express = require('express');
const mountRouters = require('./routes')
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport')
const passportConfig = require('./routes/passportConfig')
require('dotenv').config();
const database = require('./database')
var session = require('express-session')
  , pgSession = require('connect-pg-simple')(session);
var uid = require('uid-safe')


//app setup, port if not Heroku, local
var app = express();
var port = process.env.PORT || 5000

//passport Authentification strategy
passportConfig(passport);

const store = new pgSession({
  pool: database.pool(),
})

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
    store: store,
    secret: process.env.COOKIE_SECRET, 
    genid: uid(18, function (err, string) {
      if (err) {throw err}
      return string;
    }),
    resave: false, 
    saveUninitialized: false,
    cookie: { httpOnly: false }
  })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))

// If production
if (process.env.NODE_ENV === "production") {
    // server static content
    // NPM run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

// Initialise passport and restore authentication state from the session (if any)
app.use(passport.initialize());
app.use(passport.session());

// set up routes
mountRouters(app);

// catch-all if non-existant route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  }) 

  //start the app
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
