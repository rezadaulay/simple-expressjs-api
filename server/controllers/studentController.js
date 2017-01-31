const mongoose = require("mongoose");
const Student = require("../data/student");
const School = require("../data/school");
const multer  = require('multer');

const router = require("express").Router();

//validator
const studentValidator = require('../validators/student'); // get our config file

router.get('/', function(req, res, next) {

    Student.find({}).exec(function(err, students){
        if (err)
            return res.send(err);
        res.json(students);
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err)
            return res.send(err);
        res.json(student);
    });
});
router.post('/', function(req, res, next) {
    req.check(studentValidator.validationSchema);
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty())
          return res.status(400).send( result.array() );

        School.findById(req.body.school, function(err, school) {
            if (err)
                return res.send(err);
            var student = new Student({
                name: req.body.name,
            });
            student.school = school;
            student.save(function(err) {
                if (err)
                    return res.send(err);

                res.json(student);
            });
        });
    });
});
router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    req.check(studentValidator.validationSchema);
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty())
            return res.status(400).send( result.array() );

        Student.findById(id, function(err, student) {
            if (err)
                return res.send(err);

            student.name = req.body.name;
            student.save(function(err) {
                if (err)
                    return res.send(err);

                res.json(student);
            });
        });
    });
});
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndRemove({ _id: id }, function (err, removed) {
        if (err)
            return res.send(err)
        res.json(removed);
    });
});

module.exports = router;