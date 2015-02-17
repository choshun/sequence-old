var mongoose = require('mongoose');

var SequenceSchema = new mongoose.Schema({
	time: Number,
	events: [{
		layer: Number,
		type: String
	}]
});

// {
//     "time": 0,
//     "events": [
//         {
//             "layer": 0,
//             "type": "sample"
//         }
//     ]
// }

mongoose.model('Sequence', SequenceSchema);