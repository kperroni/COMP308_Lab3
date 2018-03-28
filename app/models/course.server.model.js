var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var courseSchema = new Schema({
	'courseCode' : String,
	'courseName' : String,
	'section' : String,
	'semester' : Number
});

module.exports = mongoose.model('Course', courseSchema);
