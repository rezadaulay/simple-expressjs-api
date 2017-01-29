const mongoose = require("mongoose");
const schoolSchema = require('./school');
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    name: String,
    school: [{
	    type: Schema.Types.ObjectId,
	    ref: 'school'
    }]
});

module.exports = mongoose.model("student", studentSchema);