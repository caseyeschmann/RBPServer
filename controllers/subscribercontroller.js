const express = require('express');
const router = express.Router();
const {Subscriber} = require('../models')


router.post('/newsletter', function (req,res) {
    
    Subscriber.create({
        // using express req.body middleware to post our requests
        firstName: req.body.subscriber.firstName,
        lastName: req.body.subscriber.lastName,
        email: req.body.subscriber.email,
        // phoneNumber: req.body.subscriber.phoneNumber,
        // currentEmployer: req.body.subscriber.currentEmployer,
        // enterMessage: req.body.subscriber.enterMessage
    })
    .then(
        function onMailingList (subscriber) {
            res.json({
                subscriber: subscriber,
                message: 'Joined our subscriber list!',
                alert: 'Joined our subscriber list!'
            });
        }
        )
        .catch(err => res.status(500).json({error: err}))
    });


router.post('/texts', function (req,res) {
    
    Subscriber.create({
        // using express req.body middleware to post our requests
        firstName: req.body.subscriber.firstName,
        lastName: req.body.subscriber.lastName,
        // email: req.body.subscriber.email,
        phoneNumber: req.body.subscriber.phoneNumber,
        currentEmployer: req.body.subscriber.currentEmployer,
        // enterMessage: req.body.subscriber.enterMessage
    })
    .then(
        function onTextList (subscriber) {
            res.json({
                subscriber: subscriber,
                message: 'Joined our promotional texts list!',
                alert: 'Joined our promotional texts list!'

            });
        }
        )
        .catch(err => res.status(500).json({error: err}))
    });


router.post('/employment', function (req,res) {
    
    Subscriber.create({
        // using express req.body middleware to post our requests
        firstName: req.body.subscriber.firstName,
        lastName: req.body.subscriber.lastName,
        email: req.body.subscriber.email,
        phoneNumber: req.body.subscriber.phoneNumber,
        currentEmployer: req.body.subscriber.currentEmployer,
        enterMessage: req.body.subscriber.enterMessage
    })
    .then(
        function onApplicantsList (subscriber) {
            res.json({
                subscriber: subscriber,
                message: 'Joined our subscriber list!',
                alert: 'Joined our applicants list!',
            });
        }
        )
        .catch(err => res.status(500).json({error: err}))
    });






module.exports = router;