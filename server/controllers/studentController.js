const mongoose = require("mongoose");
const Student = require("../data/student");
const School = require("../data/school");
const multer  = require('multer');

const router = require("express").Router();


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
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
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
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndRemove({ _id: id }, function (err, removed) {
        if (err)
            return res.send(err)
        res.json(removed);
    });
});

module.exports = router;