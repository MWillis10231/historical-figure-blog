var blogRouter = require('./blog');
var imageRouter = require('./images')
var accountRouter = require('./account')

// Secure routes
function requireLogin(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({error: "User is not logged in"});
    }
  }

module.exports = app => {
      app.use('/api/blog', requireLogin, blogRouter);
      app.use('/api/images', requireLogin, imageRouter);
      app.use('/api/account', accountRouter);
  }
