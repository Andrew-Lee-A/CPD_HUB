const express = require('express')
const {
    getUserCPDSummary,
    getUserStartDate,
    updateCpdEvent,
    getUserDetailsCompletionStatus,
    getUserDetails,
    updateUserDetails,
} = require('../controllers/userDetailsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

// GET a user's CPD Summary
router.get('/', getUserCPDSummary)

// UPDATE a user's CPD Summary
router.patch('/', updateCpdEvent)

// GET a user's details completion status - 
router.get('/getUserDetailsCompletionStatus', getUserDetailsCompletionStatus)

// GET a user's details

// UPDATE a user's details
// GET user details
router.get('/details', getUserDetails)

// UPDATE user details
router.patch('/details', updateUserDetails)

module.exports = router