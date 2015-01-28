var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Map = mongoose.model('Map');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'Warshark' });
});

// GET all maps
router.get('/maps', function(req, res, next) {
  	Map.find(function(err, maps){
    	if(err){ return next(err); }

    	res.json(maps);
  	});
});

// POST to maps to append one entry
router.post('/maps', function(req, res, next) {
  	var map = new Map(req.body);

  	map.save(function(err, map){
    	if(err){ return next(err); }

    	res.json(map);
  	});
});

// Definition for /maps param :map (id of map)
router.param('map', function(req, res, next, id) {
  	var query = Map.findById(id);

  	query.exec(function (err, map){
		if (err) { return next(err); }
		if (!map) { return next(new Error("can't find map")); }

    	req.map = map;
    	return next();
  	});
});

// Get one map
router.get('/maps/:map', function(req, res) {
  	res.json(req.post);
});

module.exports = router;
