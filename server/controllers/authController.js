const mongoose = require("mongoose");
const jwt    = require('jsonwebtoken');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require("../data/user");

const router = require("express").Router();


router.post('/login',
    passport.authenticate('basic',{
        session: false, 
    }),
    function(req, res) {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({ name: req.user.name }, "iloveyousomuch", {
          expiresIn: "1d" // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
    }
);

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function (err, user) {
        //console.log('password : '+ password);
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message:'Invalid Username'}); }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) return done(err);
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message:'Invalid Password'});
            }
        });
    });
  }
));

module.exports = router;