const config = require('./config'); // get our config file

const express = require("express");
require('express-group-routes');

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const path = require("path");
const jwt    = require('jsonwebtoken');
const expressValidator = require('express-validator');

//controllers
const schoolController = require("./controllers/schoolController");
const studentController = require("./controllers/studentController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");

//Express request pipeline
const app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
	customValidators: {
	    isPDF: function(value, filename) {
			const extension = (path.extname(filename)).toLowerCase();
			return extension === '.pdf';
	    },isImage: function(value, filename) {
	    	//console.log(value);
	    	//console.log(path.extname(filename).toLowerCase());
    		const imageExt = [".jpg", ".jpeg", ".png", ".gif"];
      		var extension = path.extname(filename).toLowerCase();
	      	return imageExt.indexOf(extension) !== -1;
	    },maxSize: function(value, param, num) {
	    	console.log(param);
	    	console.log(num);
	    	return param <= num;
	    }
  	},

}));

app.group("/setup", (router) => {
    router.use("/user", userController);
});
app.use("/auth", authController);

const apiRoutes = express.Router();
// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});
app.group("/api", (router) => {
	router.use(apiRoutes);

    router.use("/schools", schoolController);
    router.use("/students", studentController);
});



app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

// Connect to mongodb database
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable