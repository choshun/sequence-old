var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Sequence = mongoose.model('Sequence');
var Event = mongoose.model('Event');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'Sequence' });
});

// GET all sequences
router.get('/sequence', function(req, res, next) {
  	Sequence.find(function(err, sequence){
    	if (err) { return next(err); }

    	res.json(sequence);
  	});
});

// Definition for /sequences param :sequence (id of sequence)
router.param('sequence', function(req, res, next, id) {
    var query = Sequence.findById(id);

    // console.log('sequencecode param?', id, query);

    query.exec(function (err, sequence){
        if (err) { return next(err); }
        if (!sequence) { 
            return next(new Error("can't find sequence")); 
        }

        req.sequence = sequence;
        return next();
    });
});

// Definition for /sequences param :sequence (id of sequence)
router.param('timeCode', function(req, res, next, id) {
    

    var query = Sequence.findById(id);

    console.log('timecode param?', id);

    query.exec(function (err, sequence){
        if (err) { return next(err); }
        if (!sequence) { 
            return next(new Error("can't find sequence")); 
        }

        req.sequence = sequence;
        return next();
    });
});

// Get one map
router.get('/sequences/:sequence', function(req, res) {
    res.json(req.sequence);
});

// POST to sequences to append one entry
router.post('/sequence', function(req, res, next) {
  	var sequence = new Sequence();

    console.log('body?', req.body);

  	sequence.save(function(err, sequence) {
    	if (err) { 
            return next(err);
        }

        console.log('response?', sequence);

    	res.json(sequence);
  	});
});

router.put('/sequences/:sequence/:timeCode', function(req, res, next) {
  console.log('putting?!?!?!?!?');

  req.sequence.add(req.params[2], function(err, sequence) {
    if (err) { return next(err); }

    // console.log('sequence!??!?!', req.sequence);

    res.json(req.sequence);
  });
});

module.exports = router;
