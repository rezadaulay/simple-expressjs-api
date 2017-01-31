const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
    name: {
	    type: String,
	    required: true,
	    minlength: 3,
	},
    tagline: {
	    type: String,
	    required: true,
	    minlength: 5,
	},
    logo: String,
});


module.exports = mongoose.model("school", schoolSchema);