const express = require('express')
const {
    getUserCPDSummary,
    updateCpdEvent,
    getUserDetailsCompletionStatus,
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

module.exports = router