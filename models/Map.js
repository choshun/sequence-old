var mongoose = require('mongoose');

var MapSchema = new mongoose.Schema({
	rob: String,
	cho: String
	// nodes: [{type: mongoose.Schema.Types.ObjectId}]
});

mongoose.model('Map', MapSchema);