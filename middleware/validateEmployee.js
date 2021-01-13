
// Employee Validation

const jwt = require('jsonwebtoken');
const {Employee} = require('../models');

const validateEmployee = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    } else if (req.headers.authorization) {
        const {authorization} = req.headers;
        console.log('auth status: ', authorization);

        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
        console.log('payload status: ', payload);

        // const payload = jwt.decode(authorization, process.env.JWT_SECRET);

        if(payload){

            Employee.findOne({
                // finds an employee whoose id matches the id assigned upon login
                where: {id: payload.id}})

            .then(employee => {
                console.log("REQUEST BEFORE", req.employee)
                req.employee = employee;
                // this creates a user object inside of my request object. this object stores the data we grabbed from the user table in the database
                
                console.log("REQUEST AFTER", req.employee)
                next() //next jumps out of the callback function. We use this to stop triggering the callback function a second time.
            })

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

module.exports = validateEmployee;