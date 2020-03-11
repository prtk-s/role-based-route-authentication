var express = require('express');
var router = express.Router();
var {roleBased} = require('../routeAuth');
/* GET users listing. */
router.get('/a/b/:id', roleBased, function(req, res, next) {
  res.send('respond with a resource');
});