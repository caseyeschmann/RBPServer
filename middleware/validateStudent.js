
// Student Validation

const jwt = require('jsonwebtoken');
const {Student} = require('../models');

const validateStudent = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    } else if (req.headers.authorization) {
        const {authorization} = req.headers;

        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
        console.log(payload);

        if(payload){

            // Student Validation

            Student.findOne({
                // finds a student whoose id matches the id assigned upon login
                where: {id: payload.id}
            })
            .then(student => {
                console.log("REQUEST BEFORE", req.student)
                req.student = student;
                // this creates a user object inside of my request object. this object stores the data we grabbed from the user table in the database
                
                console.log("REQUEST AFTER", req.student)
                next() //next jumps out of the callback function. We use this to stop triggering the callback function a second time.
            });

        } else {
            res.status(401).json({
                message: "Not authorized."
            })
        }
    } else {
        res.status(401).json({
            message: "Not Allowed"
        })
    }
}

module.exports = validateStudent;