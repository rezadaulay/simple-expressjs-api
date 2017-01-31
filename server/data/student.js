const mongoose = require("mongoose");
const schoolSchema = require('./school');
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    name: {
	    type: String,
	    required: true,
	    minlength: 3,
	},
    school: {
	    required: true,
	    type: Schema.Types.ObjectId,
	    ref: 'school'
    }
});

module.exports = mongoose.model("student", studentSchema);
