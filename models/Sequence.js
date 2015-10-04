var mongoose = require('mongoose');

var SequenceSchema = new mongoose.Schema({
	events: []
});

var EventsSchema = new mongoose.Schema({
	time: Number,
	events: [{
		layer: Number,
		type: String
	}]
});

SequenceSchema.methods.add = function(timecode, cb) {
	// console.log('in add.. timecode?', timecode);

	var newOBJ = {
        "time": timecode,
        "events": [
            {
                "layer": 0,
                "type": "sample"
            }
        ]
    };

	this.events.push(newOBJ);
};

mongoose.model('Sequence', SequenceSchema);
mongoose.model('Event', EventsSchema);