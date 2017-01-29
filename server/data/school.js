const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
    name: String,
    tagline: String,
    logo: String,
});


module.exports = mongoose.model("school", schoolSchema);