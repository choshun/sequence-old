var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Sequence = mongoose.model('Sequence');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'Sequence' });
});

// GET all sequences
router.get('/sequence', function(req, res, next) {
  	Sequence.find(function(err, sequence){
    	if(err){ return next(err); }

    	res.json(sequence);
  	});
});

// POST to sequences to append one entry
router.post('/sequence', function(req, res, next) {
  	var sequence = new Sequence(req.body);

  	sequence.save(function(err, sequence) {
    	if (err) { 
            return next(err);
        }
        console.log(res.json(sequence));
    	res.json(sequence);
  	});
});

// Definition for /sequences param :sequence (id of sequence)
router.param('sequence', function(req, res, next, id) {
  	var query = Sequence.findById(id);

  	query.exec(function (err, sequence){
		if (err) { return next(err); }
		if (!sequence) { 
            return next(new Error("can't find map")); 
        }

    	req.sequence = sequence;
    	return next();
  	});
});

// Get one map
router.get('/sequences/:sequence', function(req, res) {
  	res.json(req.post);
});

module.exports = router;
