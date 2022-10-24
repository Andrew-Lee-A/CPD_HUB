const express = require('express')
const {
    getUserBookedCPD,
    getUserCompletedCPD,
    getUserPushedCPD,
    addUserBookedCPD,
    addUserCompletedCPD,
    deleteBookedCpdEvent
} = require('../controllers/userCpdController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

router.get('/bookedCPD', getUserBookedCPD)

router.patch('/bookedCPD', addUserBookedCPD)

router.get('/completedCPD', getUserCompletedCPD)

router.get('/pushedCPD', getUserPushedCPD)

// router.patch('/bookedCPD', addUserBookedCPD)

router.patch('/bookedCPD/:id',  deleteBookedCpdEvent)

module.exports = router