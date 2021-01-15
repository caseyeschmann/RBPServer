const express = require('express');
const router = express.Router();
const {Course} = require('../models')

const validateEmployee = require('../middleware/validateEmployee');

// Get ALL Courses - Not Restricted, will display on order page

router.get('/all', (req,res) => {
    Course.findAll()
    .then(courses => res.status(200).json(courses))
    .catch(err => res.status(500).json({error: err}))
});


// EMPLOYEES ONLY - CREATE, EDIT, DELETE COURSE OFFERINGS

// Create

router.post('/create', function (req,res) {
    
    Course.create({
        // using express req.body middleware to post our requests
        courseState: req.body.course.courseState,
        courseNumber: req.body.course.courseNumber,
        courseTitle: req.body.course.courseTitle,
        courseDate: req.body.course.courseDate,
        courseCategory: req.body.course.courseCategory,
        courseHours: req.body.course.courseHours,
        coursePrice: req.body.course.coursePrice,
        courseExpiration: req.body.course.courseExpiration
    })
    .then(
        function courseCreated(course) {
            res.json({
                course: course,
                message: 'Course Successfully Created!'
            });
        }
        )
        .catch(err => res.status(500).json({error: err}))
    });


// Update

    router.put('/edit/:id', (req,res) => {
        const query = req.params.id;
        Course.update(req.body, {where: {id: query}})
            .then((courseUpdated) => {
                Course.findOne({ where : {id: query} }).then((courseUpdateScorecard) => {
                    res.status(200).json({
                        scorecard: courseUpdateScorecard,
                        message: "Scorecard updated successfully",
                        courseChanged: courseUpdated
                    })
                })
            })
            .catch((err) => res.json({ error: err }))
    });


// Delete

    router.delete('/delete/:id', (req,res) => {
        Course.destroy({
            where: {id: req.params.id}
        })
        .then(course => res.status(200).json(course))
        .catch(err => res.json({ error: err}))
    })

    module.exports = router


    


// router.put('edit/:id', validateEmployee, function (req, res) {

//         const query = req.params.id;
//         Course.findOne({ where: { id: query } });

//         console.log('query: ', query);

//         let updatedCourse = Course.update({ where: { id: query } })
//             res.status(200).json({
//                 course: updatedCourse,
//                 message: "Course Successfully Updated!",
//             })
//             .catch(err => res.status(500).json({error: err}))
//     }
// )

    // router.put('/edit/:courseEntryId', validateEmployee, function (req, res) {
    //     const editCourse = {
    //         courseState: req.body.course.courseState,
    //         courseNumber: req.body.course.courseNumber,
    //         courseTitle: req.body.course.courseTitle,
    //         courseDate: req.body.course.courseDate,
    //         courseCategory: req.body.course.courseCategory,
    //         courseHours: req.body.course.courseHours,
    //         coursePrice: req.body.course.coursePrice,
    //         courseExpiration: req.body.course.courseExpiration,
    //         courseEntryId: req.body.course.id
    //     }
    
    //     const query = {where: {courseEntryId: req.params.courseEntryId}}
    
    //     Course.update(editCourse, query)
    //         .then((courses) => res.status(200).json(courses))
    //         .catch((err) => res.status(500).json({ error: err }))
    
    // })

// router.delete('/delete', validateEmployee, function (req,res) {
    
//     Course.destroy({
//         // using express req.body middleware to post our requests
//         courseState: req.body.course.courseState,
//         courseNumber: req.body.course.courseNumber,
//         courseTitle: req.body.course.courseTitle,
//         courseDate: req.body.course.courseDate,
//         courseCategory: req.body.course.courseCategory,
//         courseHours: req.body.course.courseHours,
//         coursePrice: req.body.course.coursePrice,
//         courseExpiration: req.body.course.courseExpiration
//     })
//     .then(
//         function courseDeleted(course) {
//             res.json({
//                 course: course,
//                 message: 'Course Successfully Deleted!'
//             });
//         }
//         )
//         .catch(err => res.status(500).json({error: err}))
//     });
    
    
    




    // // Get courses by STUDENT - Restricted
    
    // router.get('/mycourses', validateSession, (req, res) => {
    //     // digging into student object to pull out student ID
    //     let studentId = req.student.id
    //     Course.findAll({
    //         where: {owner: studentId}
    //     })
    //     .then(courses => res.status(200).json(courses))
    //     .catch(err => res.status(500).json({ error: err }))
    // });


// // Editing a Course Offering - Employees Only

// router.put('/edit', validateEmployee, function (req,res) {

//     Course.update({
//         // using express req.body middleware to post our requests
//         courseState: req.body.course.courseState,
//         courseNumber: req.body.course.courseNumber,
//         courseTitle: req.body.course.courseTitle,
//         courseDate: req.body.course.courseDate,
//         courseCategory: req.body.course.courseCategory,
//         courseHours: req.body.course.courseHours,
//         coursePrice: req.body.course.coursePrice,
//         courseExpiration: req.body.course.courseExpiration
//     })
//     .then(
//         function courseEdited(course) {
//             res.json({
//                 course: course,
//                 message: 'Course Information Successfully Updated!!'
//             });
//         }
//     )
//     .catch(err => res.status(500).json({error: err}))
// });

// // Deleting a Course Offering - Employees Only

// router.delete('/delete/:id', validateEmployee, function (req,res) {

//     const editCourse = {
//         courseState: req.body.course.courseState,
//         courseNumber: req.body.course.courseNumber,
//         courseTitle: req.body.course.courseTitle,
//         courseDate: req.body.course.courseDate,
//         courseCategory: req.body.course.courseCategory,
//         courseHours: req.body.course.courseHours,
//         coursePrice: req.body.course.coursePrice,
//         courseExpiration: req.body.course.courseExpiration
//     }
    
//     const query = {where: {id: req.params.id, employee: req.employee.id}}

//     Course.destroy(deleteCourse, query)
//     .then((courses) => res.status(200).json(courses))
//     .catch((err) => res.status(500).json({error: err}))

// });
