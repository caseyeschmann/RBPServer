const router = require('express').Router();
const {Student} = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// Student Signup
// completing an HTTP post request to create a student (followin our model)
router.post('/register', function (req,res) {
    
    Student.create({
        // using express req.body middleware to post our requests
        // isAdmin: req.body.student.isAdmin,
        firstName: req.body.student.firstName,
        lastName: req.body.student.lastName,
        email: req.body.student.email,
        // salting for a hashed password w/ bcrypt
        password: bcrypt.hashSync(req.body.student.password, 13),
        licenseState: req.body.student.licenseState,
        licenseNumber: req.body.student.licenseNumber
    })
    // confirming our postman result was JSONified
    .then(
        function studentRegistered(student) {
            // 3 parts: header, payload (data being sent), signature to decode
            let token = jwt.sign({id: student.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                student: student,
                message: 'Student has successfully registered!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});

// Student Login
router.post('/login', function(req,res) {
    Student.findOne({
        where: {
            email: req.body.student.email
        }
    })
    .then(function studentLoginSuccess(student) {
      if (student) {
        // bcrypt compare - data to compare, data to reference, callback taking the error or result
       bcrypt.compare(req.body.student.password, student.password, function (err, matches) {
        // matches is a placeholder for a "true" boolean   
        if (matches) {
   
           let token = jwt.sign({id: student.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
           
           res.status(200).json({
               student: student,
               message: "User logged in!",
               sessionToken: token
           })

           // error handling if the password entered does not match the password on file
            } else {
                res.status(502).send({error: "Login Failed"});
            }
            });
           } else {
               res.status(500).json({error: 'Student email not yet registered.'})
           }
       })
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;