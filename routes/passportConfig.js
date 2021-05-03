const { compare } = require('../javascript/encryption')
const database = require("../database");
var Strategy   = require('passport-local').Strategy;

module.exports = function(passport) {

    //Local strategy to verify credentials
    passport.use(new Strategy(
      async function(username, password, done) {
        try {
          // find a user with that username
          const user = await database.query("SELECT * FROM users WHERE username = $1", [username]);
          console.log(user.rows)
          // if no user found, return
          if (user.rows.length === 0) {
            return done(null, false, {message: 'No user found.'});
          }
          // unhash passwords and check if they match, if not, incorrect password
          if ((compare(password, {salt: user.rows[0].salt, hashedpassword: user.rows[0].supersecretword})) === false) {
            return done(null, false, {message: 'Sorry, your password was incorrect'})
          }
          // otherwise return user
          console.log(user.rows[0].id)
          return done(null, {id: user.rows[0].id, username: user.rows[0].username}, {message: `Welcome ${user.rows[0].username}`})
        } catch(error) {
          console.log(error)
        }
      }
    ));
  
      // Serialise / Unserialise users in and out of the session
  
  // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
          done(null, user.id);
    });
  
    // used to deserialize the user 
    passport.deserializeUser(async function(user, done) {
      try {
        const result = await database.query("SELECT * FROM users WHERE id = $1", [user])
        if (result.rows == 0) {
          throw('Error when selecting user on session deserialise')
        }
        done(null, {id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email, admin: result.rows[0].admin})
      } catch(error) {
        console.log(error)
      }
    }); 
  }