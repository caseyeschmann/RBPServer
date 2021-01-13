
const router = require('express').Router();
const {Employee} = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// Employee Signup
// completing an HTTP post request to create a student (followin our model)
router.post('/register', function (req,res) {
    
    Employee.create({
        // using express req.body middleware to post our requests
        isAdmin: req.body.employee.isAdmin,
        firstName: req.body.employee.firstName,
        lastName: req.body.employee.lastName,
        email: req.body.employee.email,
        // salting for a hashed password w/ bcrypt
        password: bcrypt.hashSync(req.body.employee.password, 13),
    })
    // confirming our postman result was JSONified
    .then(
        function employeeRegistered(employee) {
            // 3 parts: header, payload (data being sent), signature to decode
            let token = jwt.sign({id: employee.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                employee: employee,
                message: 'Employee has successfully registered!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});


// Employee Login
router.post('/login', function(req,res) {
    Employee.findOne({
        where: {
            email: req.body.employee.email
        }
    })
    .then(function employeeLoginSuccess(employee) {
      if (employee) {
        // bcrypt compare - data to compare, data to reference, callback taking the error or result
       bcrypt.compare(req.body.employee.password, employee.password, function (err, matches) {
        // matches is a placeholder for a "true" boolean   
        if (matches) {
   
           let token = jwt.sign({id: employee.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
           console.log('token status: ', token);
           
           res.status(200).json({
               employee: employee,
               message: "Employee successfully logged in!",
               sessionToken: token
           })

           // error handling if the password entered does not match the password on file
            } else {
                res.status(502).send({error: "Login Failed"});
            }
            });
           } else {
               res.status(500).json({error: 'Employee email not yet registered.'})
           }
       })
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;