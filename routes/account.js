const Router = require('express-promise-router')
const database = require('../database')
const router = new Router()
const passport = require('passport')
const { generateSalt, hash } = require('../javascript/encryption')

// Secure routes
function requireLogin(req, res, next) {
    //console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({error: "User is not logged in"});
    }
  }

router.post('/login', 
    passport.authenticate('local', 
    {
                            successRedirect: '/api/account/',
                            failureRedirect: '/api/account/fail',
                            failureFlash: false 
                        })
);

router.get('/', requireLogin, (req, res) => {
    console.log("Checking")
    //require login checks if they are logged in, and if they are, send the user
    res.status(200).send(req.user);
    //console.log(req.isAuthenticated())
    //console.log(req.session)
});

router.get('/fail', (req, res) => {
    res.status(404).send('User not found')
});

router.get('/logout', (req, res) => {
    //console.log(req.isAuthenticated())
    req.logout();
    res.send('You have been logged out');
    req.isAuthenticated()
    //console.log(req.session)
    //console.log(req.isAuthenticated())
})

router.post('/register/', async (req, res, next) => {
  try {
      // get the body and create consts
      const { signUpUsername } = req.body
      const { signUpPassword } = req.body
      const { signUpEmail } = req.body

      // throw an error if no body
      if (!req.body) {
          throw('Bad request')
      }
      // throw an error if information is missing
      if (!req.body.signUpUsername || !req.body.signUpPassword || !req.body.signUpEmail) {
          throw('Missing or incorrect input')
      }

      // make sure username && email are unique
      const uniqueQuery = `select * from users where username = $1 or email = $2`;
      const uniqueValues = [signUpUsername, signUpEmail]
      const uniqueTest = await database.query(uniqueQuery, uniqueValues)
      if (uniqueTest.rows != 0) {
          throw('A customer with this username or email already exists')
      }

      // salt and hash the password
      const secret = hash(signUpPassword, generateSalt(14));
      const salt = secret.salt
      const hashed = secret.hashedpassword

      // if all good, insert into the database
      const values = [signUpUsername, hashed, salt, signUpEmail]
      const newQuery = "INSERT INTO users (username, supersecretword, salt, email) VALUES ($1, $2, $3, $4)"
      await database.query(newQuery, values)
      res.status(200).send({signUpSuccess: true});
  } catch (error) {
      console.log(error)
      res.status(400).send(error)
  }
})

module.exports = router;
