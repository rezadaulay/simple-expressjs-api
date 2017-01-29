const mongoose = require("mongoose");
const Student = require("../data/student");
const School = require("../data/school");
const multer  = require('multer');

const router = require("express").Router();


router.get('/', function(req, res, next) {

    Student.find({}).exec(function(err, students){
        if (err)
            res.send(err);
        else
            res.json(students);
    });

    const page = req.query.page !== undefined ? parseFloat(req.query.page) : 1 ;
    const limit = req.query.limit !== undefined ? parseFloat(req.query.limit) : 10 ;
    const sortWith = req.query.sortWith !== undefined ? req.query.sortWith : 'name' ;
    const sortBy = req.query.sortBy !== undefined && req.query.sortBy === 'desc' ? -1 : 1 ;

    var sorting = {};
    sorting[sortWith] =sortBy;
    
    Student.find({}).skip( page-1 * limit ).limit(limit).sort(sorting).exec(function(err, students){
        if (err)
            res.send(err);
        else
            res.json(students);
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err)
            res.send(err);
        else
            res.json(student);
    });
});
router.post('/', function(req, res, next) {
    School.findById(req.body.school, function(err, school) {
        if (err)
            res.send(err);
        var student = new Student({
            name: req.body.name,
        });
        student.school = school;
        student.save(function(err) {
            if (err)
                res.send(err);

            res.json(student);
        });
    });
});
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err)
            res.send(err);

        student.name = req.body.name;
        student.save(function(err) {
            if (err)
                res.send(err);

            res.json(student);
        });
    });
});
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndRemove({ _id: id }, function (err, removed) {
        if (err){
            res.send(err)
        }
        else{
            res.json(removed);
        }
    });
});

module.exports = router;