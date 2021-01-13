let express = require('express');
let router = express.Router();


// validate session is imported as a variable & this sub-route becomes protected
router.get('/practice', function(req,res) {
    res.send('You have posted an order!')
})

module.exports = router;