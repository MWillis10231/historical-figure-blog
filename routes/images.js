var express = require('express')
var router = express.Router();
var path = require('path');
var serveIndex = require('serve-index')

// get a single image
router.get('/:imageName', function(req, res, next) {
    // get the name from the params, and find path
    const { imageName } = req.params
    const imagePath = path.join(__dirname, '../images', imageName)

    //console.log(imageName)
    //console.log(imagePath)

    res.sendFile(imagePath)
  });

  // get the image list

  router.use('/', serveIndex(path.join(__dirname, '../images'), {
    icons: true, 
    template: function(locals, callback) {
      callback(null, JSON.stringify(locals.fileList))
    }}))

  module.exports = router;