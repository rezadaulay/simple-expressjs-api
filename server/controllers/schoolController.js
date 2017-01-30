const mongoose = require("mongoose");
const School = require("../data/school");
const multer  = require('multer');
const path = require('path')
//var _ = require("underscore");
const fs = require('fs');

const router = require("express").Router();

const upload = multer({ dest: './app/dist/uploads/' })

router.get('/', function(req, res, next) {
    const page = req.query.page !== undefined ? parseFloat(req.query.page) : 1 ;
    const limit = req.query.limit !== undefined ? parseFloat(req.query.limit) : 10 ;
    const sortWith = req.query.sortWith !== undefined ? req.query.sortWith : 'name' ;
    const sortBy = req.query.sortBy !== undefined && req.query.sortBy === 'desc' ? -1 : 1 ;

    var sorting = {};
    sorting[sortWith] =sortBy;
    
    School.find({}).skip( (page-1) * limit ).limit(limit).sort(sorting).exec(function(err, schools){
        if (err)
            return res.send(err);
        
        res.json(schools);
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    School.findById(id, function(err, school) {
    console.log(school.logo);
        if (err)
            return res.send(err);

        res.json(school);
    });
});
router.post('/', upload.single('logo'), function(req, res, next) {
    var school = new School({
        name: req.body.name,
        tagline: req.body.tagline,
    });

    if( req.file !== undefined ){
        school.logo = req.file.filename/*+path.extname(req.file.originalname)*/;
    }

    school.save(function (err) {
        if (err)
            return res.send(err);
        
        res.json(school);
    });
});
router.put('/:id', upload.single('logo'), function(req, res, next) {
    var id = req.params.id;
    School.findById(id, function(err, school) {
        if (err)
            return res.send(err);

        school.name = req.body.name;
        school.tagline = req.body.tagline;
        if( req.file !== undefined ){
            if( school.logo !== undefined ){
                fs.unlink('./app/dist/uploads/'+school.logo, (err) => {
                    if (err){
                        console.log('failed deleted ./app/dist/uploads/'+school.logo);
                        console.log(err);
                    }
                });
            }
            school.logo = req.file.filename/*+path.extname(req.file.originalname)*/;
        }

        school.save(function(err) {
            if (err)
                return res.send(err);

            res.json(school);
        });
    });
});
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    School.findOneAndRemove({ _id: id }, function (err, removed) {
        if (err)
            return res.send(err)

            if( removed !== null && removed.logo !== undefined ){
                fs.unlink('./app/dist/uploads/'+removed.logo, (err) => {
                    if (err){
                        console.log('failed deleted ./app/dist/uploads/'+removed.logo);
                        console.log(err);
                    }
                });
            }
            res.json(removed);
    });
});

module.exports = router;