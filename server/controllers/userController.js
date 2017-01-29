const mongoose = require("mongoose");
const User = require("../data/user");

const router = require("express").Router();

router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
});

router.post('/', function(req, res, next) {
    var newUser = new User({
        name: 'nick', 
        password: 'password',
    });

    User.createUser(newUser, function(err, user){
      if (err)
            res.send(err);
        else
            res.json(user);
    });
    console.log('User saved successfully');
});


module.exports = router;